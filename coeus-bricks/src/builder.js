/**
 * Bricks 2.x element builder.
 *
 * Bricks persists a template as a FLAT array of elements, each carrying its own
 * `id`, a `parent` id and an ordered `children` id list. Authoring that by hand
 * is unreadable, so pages here are written as a nested tree and flattened on
 * build.
 *
 * IDs are derived deterministically from an element's path in the tree rather
 * than randomised, so rebuilding a page produces byte-identical JSON. That is
 * what makes re-importing safe: Bricks matches on id, so an unchanged element
 * updates in place instead of duplicating.
 */

const crypto = require('crypto');

const ID_LEN = 6;
const used = new Set();

/** Deterministic 6-char id from a seed, with collision escape. */
function bid(seed) {
  let base = crypto.createHash('sha1').update(String(seed)).digest('hex');
  // Bricks ids must start with a letter to be valid CSS-selector-safe.
  let candidate = 'abcdefghijklmnopqrstuvwxyz'[parseInt(base.slice(0, 2), 16) % 26]
    + base.slice(2, 2 + ID_LEN - 1);
  let n = 0;
  while (used.has(candidate)) {
    base = crypto.createHash('sha1').update(seed + '#' + ++n).digest('hex');
    candidate = 'abcdefghijklmnopqrstuvwxyz'[parseInt(base.slice(0, 2), 16) % 26]
      + base.slice(2, 2 + ID_LEN - 1);
  }
  used.add(candidate);
  return candidate;
}

/** Reset the id registry between templates so ids stay short and stable. */
function resetIds() { used.clear(); }

/**
 * Node factory.
 * @param {string} name     Bricks element name, e.g. 'section', 'heading'
 * @param {object} opts     { classes, settings, label, children }
 */
function el(name, opts = {}) {
  const { classes = [], settings = {}, label, children = [] } = opts;
  return {
    __name: name,
    __classes: Array.isArray(classes) ? classes : [classes],
    __settings: settings,
    __label: label,
    __children: children.flat().filter(Boolean),
  };
}

// ---------------------------------------------------------------------------
// Element shorthands
// ---------------------------------------------------------------------------

const section   = (classes, children, o = {}) => el('section',    { classes, children, ...o });
const container = (classes, children, o = {}) => el('container',  { classes, children, ...o });
const block     = (classes, children, o = {}) => el('block',      { classes, children, ...o });
const divEl     = (classes, children, o = {}) => el('div',        { classes, children, ...o });

/** Plain single-line text (Bricks `text-basic`). */
const text = (classes, content, tag = 'p', o = {}) =>
  el('text-basic', { classes, settings: { text: content, tag }, ...o });

/** Rich text block (Bricks `text`) — accepts HTML. */
const richText = (classes, html, o = {}) =>
  el('text', { classes, settings: { text: html }, ...o });

const heading = (classes, content, tag = 'h2', o = {}) =>
  el('heading', { classes, settings: { text: content, tag }, ...o });

/** Decorative rule — a zero-content block styled entirely by its class. */
const rule = (classes = ['c-rule'], o = {}) => el('block', { classes, children: [], ...o });

/**
 * Link/button. Bricks link settings use `{type:'external', url}`; relative
 * URLs are preserved on import and can be repointed to internal post ids
 * later from the Bricks UI.
 */
const button = (classes, label, url, o = {}) =>
  el('button', {
    classes,
    settings: {
      text: label,
      link: url ? { type: 'external', url } : undefined,
      tag: url ? 'a' : 'button',
      ...(o.settings || {}),
    },
    label: o.label,
    children: o.children || [],
  });

const image = (classes, url, alt, o = {}) =>
  el('image', {
    classes,
    settings: {
      image: { url, external: true, filename: (url || '').split('/').pop() },
      altText: alt,
      ...(o.settings || {}),
    },
    label: o.label || alt,
  });

/** An anchor wrapper (`block` rendered as `<a>`), for whole-card links. */
const linkBlock = (classes, url, children, o = {}) =>
  el('block', {
    classes,
    settings: { tag: 'a', link: { type: 'external', url }, ...(o.settings || {}) },
    children,
    label: o.label,
  });

const icon = (classes, iconName, o = {}) =>
  el('icon', {
    classes,
    settings: { icon: { library: 'themify', icon: iconName }, ...(o.settings || {}) },
    label: o.label,
  });

// ---------------------------------------------------------------------------
// Flatten tree -> Bricks flat array
// ---------------------------------------------------------------------------

/**
 * @param {Array}  tree      root-level nodes
 * @param {object} classMap  { 'c-hero__title': 'classId' }
 * @param {string} seedNs    namespace so ids differ between templates
 */
function flatten(tree, classMap, seedNs = '') {
  const out = [];

  function walk(node, parentId, path) {
    const id = bid(`${seedNs}/${path}/${node.__name}`);

    const unknown = node.__classes.filter((c) => !classMap[c]);
    if (unknown.length) {
      throw new Error(
        `Unknown global class(es) [${unknown.join(', ')}] on <${node.__name}> at ${seedNs}/${path}. `
        + `Add them to classes.js.`
      );
    }

    const settings = { ...node.__settings };
    if (node.__classes.length) {
      settings._cssGlobalClasses = node.__classes.map((c) => classMap[c]);
    }
    // Drop undefined keys — Bricks stores them as literal nulls otherwise.
    for (const k of Object.keys(settings)) {
      if (settings[k] === undefined) delete settings[k];
    }

    const element = {
      id,
      name: node.__name,
      parent: parentId,
      children: [],
      settings,
    };
    if (node.__label) element.label = node.__label;

    out.push(element);

    node.__children.forEach((child, i) => {
      element.children.push(walk(child, id, `${path}.${i}`));
    });

    return id;
  }

  tree.flat().filter(Boolean).forEach((node, i) => walk(node, 0, String(i)));
  return out;
}

module.exports = {
  bid, resetIds, el, flatten,
  section, container, block, div: divEl,
  text, richText, heading, rule, button, image, linkBlock, icon,
};
