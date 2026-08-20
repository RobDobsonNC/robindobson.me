#!/usr/bin/env node
/**
 * Build entry point.
 *
 * Emits everything the WordPress side needs:
 *   dist/global-variables.json   -> option bricks_global_variables (+ categories)
 *   dist/global-classes.json     -> option bricks_global_classes  (+ categories)
 *   dist/theme-styles.json       -> option bricks_theme_styles
 *   dist/templates/<slug>.json   -> one importable Bricks template per page
 *   dist/coeus-bundle.json       -> all of the above, for the PHP importer
 *
 * Page modules live in src/pages/ and export:
 *   { slug, title, type, label, build(ctx) -> element tree }
 */

const fs = require('fs');
const path = require('path');

const tokens = require('./tokens');
const classes = require('./classes');
require('./components');          // side-effect: registers component classes
require('./components-pages');    // side-effect: registers inner-page classes
const { styles } = require('./theme-styles');
const seed = require('./seed');
const builder = require('./builder');

const DIST = path.join(__dirname, '..', 'dist');
const TPL_DIR = path.join(DIST, 'templates');
const BRICKS_VERSION = '2.0';

// ---------------------------------------------------------------------------
// Global variables
// ---------------------------------------------------------------------------
function buildVariables() {
  const categories = tokens.categories.map((cat) => ({
    id: 'cat-' + cat.key,
    name: cat.name,
  }));

  const variables = tokens.categories.flatMap((cat) =>
    cat.vars.map((varDef) => ({
      id: 'var-' + varDef.name,
      name: varDef.name,
      value: varDef.value,
      category: 'cat-' + cat.key,
      ...(varDef.label ? { label: varDef.label } : {}),
    }))
  );

  return { categories, variables };
}

// ---------------------------------------------------------------------------
// Global classes
// ---------------------------------------------------------------------------
function buildClasses() {
  const catNames = [...new Set(classes.defs.map((d) => d.category))];
  const categories = catNames.map((name) => ({
    id: 'cc-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name,
  }));
  const catId = Object.fromEntries(categories.map((c) => [c.name, c.id]));

  const globalClasses = classes.defs.map((d) => ({
    id: d.id,
    name: d.name,
    settings: d.settings,
    category: catId[d.category],
  }));

  return { categories, globalClasses };
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------
function loadPages() {
  const dir = path.join(__dirname, 'pages');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.js'))
    .sort()
    .flatMap((f) => {
      const mod = require(path.join(dir, f));
      // A module may export one page, or a `pages` array of them.
      return Array.isArray(mod.pages) ? mod.pages : [mod];
    });
}

function buildTemplates(classMap, globalClasses) {
  const pages = loadPages();
  const out = [];

  for (const page of pages) {
    builder.resetIds();
    const tree = page.build({ ...builder, classMap });
    const content = builder.flatten(tree, classMap, page.slug);

    // Bricks template export payload. `globalClasses` travels with the
    // template so an import on a clean site brings the styling with it.
    out.push({
      slug: page.slug,
      title: page.title,
      type: page.type || 'content',
      content,
      globalClasses,
      globalElements: [],
      settings: page.settings || {},
      version: BRICKS_VERSION,
      source: 'coeus-bricks-build',
    });
  }

  return out;
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------
function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(TPL_DIR, { recursive: true });

  const vars = buildVariables();
  const cls = buildClasses();
  const classMap = Object.fromEntries(cls.globalClasses.map((c) => [c.name, c.id]));

  const templates = buildTemplates(classMap, cls.globalClasses);

  const write = (file, data) =>
    fs.writeFileSync(path.join(DIST, file), JSON.stringify(data, null, 2) + '\n');

  write('global-variables.json', vars);
  write('global-classes.json', cls);
  write('theme-styles.json', styles);

  for (const tpl of templates) {
    fs.writeFileSync(
      path.join(TPL_DIR, `${tpl.slug}.json`),
      JSON.stringify(
        {
          // Shape accepted by Bricks > Templates > Import.
          templates: [
            {
              title: tpl.title,
              type: tpl.type,
              content: tpl.content,
              settings: tpl.settings,
              globalClasses: tpl.globalClasses,
              globalElements: [],
            },
          ],
          version: BRICKS_VERSION,
          source: 'coeus-bricks-build',
        },
        null,
        2
      ) + '\n'
    );
  }

  write('coeus-bundle.json', {
    generated: new Date().toISOString().slice(0, 10),
    bricksVersion: BRICKS_VERSION,
    variables: vars,
    classes: cls,
    themeStyles: styles,
    seed: seed.posts,
    templates: templates.map((t) => ({
      slug: t.slug, title: t.title, type: t.type,
      content: t.content, settings: t.settings,
    })),
  });

  const elementCount = templates.reduce((n, t) => n + t.content.length, 0);
  console.log(`variables : ${vars.variables.length} in ${vars.categories.length} categories`);
  console.log(`classes   : ${cls.globalClasses.length} in ${cls.categories.length} categories`);
  console.log(`seed      : ${seed.posts.length} posts`);
  console.log(`templates : ${templates.length} (${elementCount} elements)`);
  templates.forEach((t) => console.log(`            - ${t.slug} [${t.type}] ${t.content.length} el`));
}

main();
