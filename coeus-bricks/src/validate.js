#!/usr/bin/env node
/**
 * Structural validation of the build output.
 *
 * I cannot test an import against a live Bricks install from here, so this
 * checks everything that can be checked offline: referential integrity of the
 * element tree, that every class an element names actually exists, that ids
 * are unique, and that no class or variable is defined but unused.
 *
 * Exits non-zero on error so it can gate a commit or CI run.
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const read = (f) => JSON.parse(fs.readFileSync(path.join(DIST, f), 'utf8'));

const errors = [];
const warnings = [];

/**
 * Deliberately unused. These are spare vocabulary — modifiers and palette
 * entries the client can reach for in Bricks without an engineer, plus
 * `c-header__link--active`, which the header script toggles at runtime rather
 * than the templates applying. Anything NOT on this list that shows up unused
 * is genuinely dead and should be removed.
 */
const INTENTIONALLY_SPARE = new Set([
  'l-section--flush', 'l-section--clip', 'l-container--narrow', 'l-stack--lg',
  'l-row--center', 'c-eyebrow--on-dark', 'c-prose--lead',
  'c-section-heading--center', 'c-section-heading--flush',
  'c-section-heading__subtitle--on-dark', 'c-header__link--active',
  'c-sidebar-box--muted',
]);

const SPARE_VARIABLES = new Set([
  'clr-teal-coastal', 'clr-teal-mid', 'clr-secondary', 'ls-tight', 'sp-3xl',
]);

const bundle = read('coeus-bundle.json');
const classes = bundle.classes.globalClasses;
const variables = bundle.variables.variables;

const classById = new Map(classes.map((c) => [c.id, c]));
const classNames = new Set(classes.map((c) => c.name));
const varNames = new Set(variables.map((v) => v.name));

const usedClassIds = new Set();
const usedVarNames = new Set();

/* ---------------------------------------------------------------- classes */
const seenNames = new Set();
for (const cls of classes) {
  if (seenNames.has(cls.name)) errors.push(`Duplicate class name: ${cls.name}`);
  seenNames.add(cls.name);

  // BEM shape: block, block__element, block--modifier, block__element--modifier
  if (!/^[a-z]+-[a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$/.test(cls.name)) {
    warnings.push(`Class name is not strict BEM: ${cls.name}`);
  }
}

/* -------------------------------------------------------- variable usage */
function scanForVars(value) {
  if (typeof value === 'string') {
    for (const m of value.matchAll(/var\(--([a-z0-9-]+)\)/g)) {
      usedVarNames.add(m[1]);
      if (!varNames.has(m[1])) errors.push(`Undefined variable referenced: --${m[1]}`);
    }
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach(scanForVars);
  }
}
classes.forEach((c) => scanForVars(c.settings));
scanForVars(bundle.themeStyles);

/* -------------------------------------------------------------- templates */
for (const tpl of bundle.templates) {
  const ids = new Set();
  const byId = new Map();

  for (const el of tpl.content) {
    if (ids.has(el.id)) errors.push(`[${tpl.slug}] duplicate element id: ${el.id}`);
    ids.add(el.id);
    byId.set(el.id, el);
  }

  for (const el of tpl.content) {
    // Parent must be the root sentinel or a real element in this template.
    if (el.parent !== 0 && !ids.has(el.parent)) {
      errors.push(`[${tpl.slug}] element ${el.id} (${el.name}) has dangling parent ${el.parent}`);
    }

    for (const childId of el.children) {
      if (!ids.has(childId)) {
        errors.push(`[${tpl.slug}] element ${el.id} lists missing child ${childId}`);
        continue;
      }
      if (byId.get(childId).parent !== el.id) {
        errors.push(`[${tpl.slug}] child ${childId} does not point back to parent ${el.id}`);
      }
    }

    for (const classId of el.settings._cssGlobalClasses || []) {
      if (!classById.has(classId)) {
        errors.push(`[${tpl.slug}] element ${el.id} references unknown class id ${classId}`);
      } else {
        usedClassIds.add(classId);
      }
    }

    if (!el.name) errors.push(`[${tpl.slug}] element ${el.id} has no name`);
  }

  // Exactly one root chain: every element must be reachable from a root.
  const reachable = new Set();
  const walk = (id) => {
    if (reachable.has(id)) return;
    reachable.add(id);
    (byId.get(id).children || []).forEach(walk);
  };
  tpl.content.filter((e) => e.parent === 0).forEach((e) => walk(e.id));
  for (const el of tpl.content) {
    if (!reachable.has(el.id)) errors.push(`[${tpl.slug}] element ${el.id} is orphaned`);
  }
}

/* ------------------------------------------------------------ dead weight */
let spareClasses = 0;
for (const cls of classes) {
  if (usedClassIds.has(cls.id)) continue;
  if (INTENTIONALLY_SPARE.has(cls.name)) { spareClasses++; continue; }
  warnings.push(`Class defined but never applied: ${cls.name}`);
}

let spareVars = 0;
for (const v of variables) {
  if (usedVarNames.has(v.name)) continue;
  if (SPARE_VARIABLES.has(v.name)) { spareVars++; continue; }
  warnings.push(`Variable defined but never referenced: --${v.name}`);
}

/* ----------------------------------------------------------------- report */
const totalElements = bundle.templates.reduce((n, t) => n + t.content.length, 0);

console.log(`checked ${bundle.templates.length} templates, ${totalElements} elements, `
  + `${classes.length} classes, ${variables.length} variables`);
console.log(`${spareClasses} spare classes and ${spareVars} spare variables declared intentional`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  ! ${w}`));
}

if (errors.length) {
  console.log(`\n${errors.length} ERROR(S):`);
  errors.forEach((e) => console.log(`  x ${e}`));
  process.exit(1);
}

console.log('\nno structural errors');
