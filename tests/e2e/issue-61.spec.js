const { default: getParser } = require('../../lib');

test('fenced description', () => {
  const parsed = getParser({ spacing: 'preserve' })(`
  /**
   * @example "" \`\`\`ts
@transient()
class Foo { }
\`\`\`
  */`);

  const source = [
    {
      number: 1,
      source: '  /**',
      tokens: {
        start: '  ',
        delimiter: '/**',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '',
        end: '',
      },
    },
    {
      number: 2,
      source: '   * @example "" ```ts',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@example',
        postTag: ' ',
        name: '""',
        postName: ' ',
        type: '',
        postType: '',
        description: '```ts',
        end: '',
      },
    },
    {
      number: 3,
      source: '@transient()',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '@transient()',
        end: '',
      },
    },
    {
      number: 4,
      source: 'class Foo { }',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: 'class Foo { }',
        end: '',
      },
    },
    {
      number: 5,
      source: '```',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '```',
        end: '',
      },
    },
    {
      number: 6,
      source: '  */',
      tokens: {
        start: '  ',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '',
        end: '*/',
      },
    },
  ];

  expect(parsed).toEqual([
    {
      description: '',
      tags: [
        {
          tag: 'example',
          name: '',
          type: '',
          optional: false,
          description: '```ts\n@transient()\nclass Foo { }\n```',
          problems: [],
          source: source.slice(1),
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('fenced one-liner', () => {
  const parsed = getParser({ spacing: 'preserve' })(
    '/** @example "" ```ts @transient() class Foo { } ```*/'
  );

  const source = [
    {
      number: 0,
      source: '/** @example "" ```ts @transient() class Foo { } ```*/',
      tokens: {
        start: '',
        delimiter: '/**',
        postDelimiter: ' ',
        tag: '@example',
        postTag: ' ',
        name: '""',
        postName: ' ',
        type: '',
        postType: '',
        description: '```ts @transient() class Foo { } ```',
        end: '*/',
      },
    },
  ];

  expect(parsed).toEqual([
    {
      description: '',
      tags: [
        {
          tag: 'example',
          name: '',
          type: '',
          optional: false,
          description: '```ts @transient() class Foo { } ```',
          problems: [],
          source,
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('multiple fences', () => {
  const parsed = getParser({ spacing: 'preserve' })(`
  /**
   * @example "" \`\`\`ts
@one
\`\`\`
text
\`\`\`
@two
\`\`\`
  */`);

  const source = [
    {
      number: 1,
      source: '  /**',
      tokens: {
        start: '  ',
        delimiter: '/**',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '',
        end: '',
      },
    },
    {
      number: 2,
      source: '   * @example "" ```ts',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@example',
        postTag: ' ',
        name: '""',
        postName: ' ',
        type: '',
        postType: '',
        description: '```ts',
        end: '',
      },
    },
    {
      number: 3,
      source: '@one',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '@one',
        end: '',
      },
    },
    {
      number: 4,
      source: '```',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '```',
        end: '',
      },
    },
    {
      number: 5,
      source: 'text',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: 'text',
        end: '',
      },
    },
    {
      number: 6,
      source: '```',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '```',
        end: '',
      },
    },
    {
      number: 7,
      source: '@two',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '@two',
        end: '',
      },
    },
    {
      number: 8,
      source: '```',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '```',
        end: '',
      },
    },
    {
      number: 9,
      source: '  */',
      tokens: {
        start: '  ',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '',
        end: '*/',
      },
    },
  ];

  expect(parsed).toEqual([
    {
      description: '',
      tags: [
        {
          tag: 'example',
          name: '',
          type: '',
          optional: false,
          description: '```ts\n@one\n```\ntext\n```\n@two\n```',
          source: source.slice(1),
          problems: [],
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('custom fences', () => {
  const parsed = getParser({ spacing: 'preserve', fence: '###' })(`
  /**
   * @example "" ###ts
@one
###
text
###
@two
###
  */`);

  const source = [
    {
      number: 1,
      source: '  /**',
      tokens: {
        start: '  ',
        delimiter: '/**',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '',
        end: '',
      },
    },
    {
      number: 2,
      source: '   * @example "" ###ts',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@example',
        postTag: ' ',
        name: '""',
        postName: ' ',
        type: '',
        postType: '',
        description: '###ts',
        end: '',
      },
    },
    {
      number: 3,
      source: '@one',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '@one',
        end: '',
      },
    },
    {
      number: 4,
      source: '###',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '###',
        end: '',
      },
    },
    {
      number: 5,
      source: 'text',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: 'text',
        end: '',
      },
    },
    {
      number: 6,
      source: '###',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '###',
        end: '',
      },
    },
    {
      number: 7,
      source: '@two',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '@two',
        end: '',
      },
    },
    {
      number: 8,
      source: '###',
      tokens: {
        start: '',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '###',
        end: '',
      },
    },
    {
      number: 9,
      source: '  */',
      tokens: {
        start: '  ',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: '',
        end: '*/',
      },
    },
  ];

  expect(parsed).toEqual([
    {
      description: '',
      tags: [
        {
          tag: 'example',
          name: '',
          type: '',
          optional: false,
          description: '###ts\n@one\n###\ntext\n###\n@two\n###',
          source: source.slice(1),
          problems: [],
        },
      ],
      source,
      problems: [],
    },
  ]);
});