import assert from 'node:assert/strict';
import test from 'node:test';
import { pageHref, pagePaths, parsePageHash } from '../lib/spa-navigation.ts';

test('all views and section links keep the same document at root and repository URLs', () => {
  for (const base of [
    'https://example.github.io/',
    'https://example.github.io/ashihara-kurabayashi-lab/',
  ]) {
    for (const path of pagePaths) {
      const url = new URL(pageHref(path, '/'), base);
      assert.equal(url.pathname, new URL(base).pathname);
      assert.deepEqual(parsePageHash(url.hash), { pathname: path, anchor: '' });
      const section = new URL(pageHref('#main', path), url);
      assert.equal(section.pathname, url.pathname);
      assert.deepEqual(parsePageHash(section.hash), {
        pathname: path,
        anchor: 'main',
      });
    }
  }
});

test('reload and history entries resolve the complete view and section from the URL', () => {
  for (const [hash, pathname, anchor] of [
    ['', '/', ''],
    ['#/', '/', ''],
    ['#/research', '/research', ''],
    ['#/research#projects', '/research', 'projects'],
    ['#/publications#year-2026', '/publications', 'year-2026'],
    ['#/students#faq', '/students', 'faq'],
    ['#/research/', '/research', ''],
    ['#about', '/', 'about'],
    ['#/missing', '/', ''],
    ['#/missing#faq', '/', ''],
    ['#/people#%E6%95%99%E5%93%A1', '/people', '教員'],
    ['#/people#%invalid', '/people', '%invalid'],
  ]) {
    assert.deepEqual(parsePageHash(hash), { pathname, anchor });
  }
});

test('cross-view anchors preserve their destination and hash links are idempotent', () => {
  assert.equal(
    pageHref('/research#projects', '/students'),
    '#/research#projects',
  );
  assert.equal(
    pageHref('#/publications#year-2026', '/students'),
    '#/publications#year-2026',
  );
  assert.equal(pageHref('#faq', '/students'), '#/students#faq');
  assert.equal(pageHref('#about', '/'), '#/#about');
});

test('external resources, mail links, and downloads keep native destinations', () => {
  for (const href of [
    'https://docs.google.com/forms/example',
    'https://www.google.com/maps',
    'https://doi.org/10.1000/example',
    'mailto:lab@example.com',
    '//example.com/paper.pdf',
    './paper.pdf',
  ]) {
    assert.equal(pageHref(href, '/research'), href);
  }
});
