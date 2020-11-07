import getParser from '../../src/index';
import { seedTokens } from '../../src/util';

test('block with tags', () => {
  const parsed = getParser()(`
  /**
   * Description may go 
   * over few lines followed by @tags
   * @param {string} name name parameter
   *
   * @param {any} value value of any type
   */`);
  expect(parsed).toEqual([
    {
      description: 'Description may go over few lines followed by @tags',
      tags: [
        {
          tag: 'param',
          name: 'name',
          type: 'string',
          optional: false,
          description: 'name parameter',
          problems: [],
          source: [
            {
              number: 4,
              source: '   * @param {string} name name parameter',
              tokens: seedTokens({
                start: '   ',
                delimiter: '*',
                postDelimiter: ' ',
                tag: '@param',
                postTag: ' ',
                name: 'name',
                postName: ' ',
                type: '{string}',
                postType: ' ',
                description: 'name parameter',
              }),
            },
            {
              number: 5,
              source: '   *',
              tokens: seedTokens({
                start: '   ',
                delimiter: '*',
              }),
            },
          ],
        },
        {
          tag: 'param',
          name: 'value',
          type: 'any',
          optional: false,
          description: 'value of any type',
          problems: [],
          source: [
            {
              number: 6,
              source: '   * @param {any} value value of any type',
              tokens: seedTokens({
                start: '   ',
                delimiter: '*',
                postDelimiter: ' ',
                tag: '@param',
                postTag: ' ',
                name: 'value',
                postName: ' ',
                type: '{any}',
                postType: ' ',
                description: 'value of any type',
              }),
            },
            {
              number: 7,
              source: '   */',
              tokens: seedTokens({
                start: '   ',
                end: '*/',
              }),
            },
          ],
        },
      ],
      source: [
        {
          number: 1,
          source: '  /**',
          tokens: seedTokens({
            start: '  ',
            delimiter: '/**',
          }),
        },
        {
          number: 2,
          source: '   * Description may go ',
          tokens: seedTokens({
            start: '   ',
            delimiter: '*',
            postDelimiter: ' ',
            description: 'Description may go ',
          }),
        },
        {
          number: 3,
          source: '   * over few lines followed by @tags',
          tokens: seedTokens({
            start: '   ',
            delimiter: '*',
            postDelimiter: ' ',
            description: 'over few lines followed by @tags',
          }),
        },
        {
          number: 4,
          source: '   * @param {string} name name parameter',
          tokens: seedTokens({
            start: '   ',
            delimiter: '*',
            postDelimiter: ' ',
            tag: '@param',
            postTag: ' ',
            name: 'name',
            postName: ' ',
            type: '{string}',
            postType: ' ',
            description: 'name parameter',
            end: '',
          }),
        },
        {
          number: 5,
          source: '   *',
          tokens: seedTokens({
            start: '   ',
            delimiter: '*',
          }),
        },
        {
          number: 6,
          source: '   * @param {any} value value of any type',
          tokens: seedTokens({
            start: '   ',
            delimiter: '*',
            postDelimiter: ' ',
            tag: '@param',
            postTag: ' ',
            name: 'value',
            postName: ' ',
            type: '{any}',
            postType: ' ',
            description: 'value of any type',
          }),
        },
        {
          number: 7,
          source: '   */',
          tokens: seedTokens({
            start: '   ',
            end: '*/',
          }),
        },
      ],
      problems: [],
    },
  ]);
});

test.each([
  ['empty', '/**\n*\n*/'],
  ['one-star', '/*\n*\n*/'],
  ['three-star', '/***\n*\n*/'],
  ['empty one-liner', '/** */'],
  ['one-star oneliner', '/* */'],
  ['three-star oneliner', '/*** */'],
])('skip block - %s', (name, source) => {
  expect(getParser()(source)).toEqual([]);
});

test.each([
  ['negative', -1],
  ['float', 1.5],
])('invalid strat line - %s', (name, startLine) => {
  expect(() => getParser({ startLine })).toThrow('Invalid startLine');
});