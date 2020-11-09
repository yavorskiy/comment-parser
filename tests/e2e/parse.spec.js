const { getSupportedCodeFixes } = require('typescript');
const { default: getParser } = require('../../lib');

test('description only', () => {
  const parsed = getParser()(`
  /**
   * Description
   */`);
  expect(parsed).toEqual([
    {
      description: 'Description',
      tags: [],
      source: [
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
          source: '   * Description',
          tokens: {
            start: '   ',
            delimiter: '*',
            postDelimiter: ' ',
            tag: '',
            postTag: '',
            name: '',
            postName: '',
            type: '',
            postType: '',
            description: 'Description',
            end: '',
          },
        },
        {
          number: 3,
          source: '   */',
          tokens: {
            start: '   ',
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
      ],
      problems: [],
    },
  ]);
});

test('description one-liner', () => {
  const parsed = getParser()(`
  /** Description */
  var a`);
  expect(parsed).toEqual([
    {
      description: 'Description',
      tags: [],
      source: [
        {
          number: 1,
          source: '  /** Description */',
          tokens: {
            start: '  ',
            delimiter: '/**',
            postDelimiter: ' ',
            tag: '',
            postTag: '',
            name: '',
            postName: '',
            type: '',
            postType: '',
            description: 'Description ',
            end: '*/',
          },
        },
      ],
      problems: [],
    },
  ]);
});

test('block closed on same line', () => {
  const parsed = getParser()(`
  /**
   * Description */`);
  expect(parsed).toEqual([
    {
      description: 'Description',
      tags: [],
      source: [
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
          source: '   * Description */',
          tokens: {
            start: '   ',
            delimiter: '*',
            postDelimiter: ' ',
            tag: '',
            postTag: '',
            name: '',
            postName: '',
            type: '',
            postType: '',
            description: 'Description ',
            end: '*/',
          },
        },
      ],
      problems: [],
    },
  ]);
});

test('no mid stars', () => {
  const parsed = getParser()(`
  /**
     Description
  */`);
  expect(parsed).toEqual([
    {
      description: 'Description',
      tags: [],
      source: [
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
          source: '     Description',
          tokens: {
            start: '     ',
            delimiter: '',
            postDelimiter: '',
            tag: '',
            postTag: '',
            name: '',
            postName: '',
            type: '',
            postType: '',
            description: 'Description',
            end: '',
          },
        },
        {
          number: 3,
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
      ],
      problems: [],
    },
  ]);
});

test('skip surrounding empty lines while preserving line numbers', () => {
  const parsed = getParser()(`
  /**
   *
   *
   * Description first line
   *
   * Description second line
   *
   */
  var a`);
  expect(parsed).toEqual([
    {
      description: 'Description first line Description second line',
      tags: [],
      source: [
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
          source: '   *',
          tokens: {
            start: '   ',
            delimiter: '*',
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
          number: 3,
          source: '   *',
          tokens: {
            start: '   ',
            delimiter: '*',
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
          number: 4,
          source: '   * Description first line',
          tokens: {
            start: '   ',
            delimiter: '*',
            postDelimiter: ' ',
            tag: '',
            postTag: '',
            name: '',
            postName: '',
            type: '',
            postType: '',
            description: 'Description first line',
            end: '',
          },
        },
        {
          number: 5,
          source: '   *',
          tokens: {
            start: '   ',
            delimiter: '*',
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
          number: 6,
          source: '   * Description second line',
          tokens: {
            start: '   ',
            delimiter: '*',
            postDelimiter: ' ',
            tag: '',
            postTag: '',
            name: '',
            postName: '',
            type: '',
            postType: '',
            description: 'Description second line',
            end: '',
          },
        },
        {
          number: 7,
          source: '   *',
          tokens: {
            start: '   ',
            delimiter: '*',
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
          number: 8,
          source: '   */',
          tokens: {
            start: '   ',
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
      ],
      problems: [],
    },
  ]);
});

test('description on the first line', () => {
  const parsed = getParser()(`
  /** Description first line
   *
   * Description second line
   */
  var a`);
  expect(parsed).toEqual([
    {
      description: 'Description first line Description second line',
      tags: [],
      source: [
        {
          number: 1,
          source: '  /** Description first line',
          tokens: {
            start: '  ',
            delimiter: '/**',
            postDelimiter: ' ',
            tag: '',
            postTag: '',
            name: '',
            postName: '',
            type: '',
            postType: '',
            description: 'Description first line',
            end: '',
          },
        },
        {
          number: 2,
          source: '   *',
          tokens: {
            start: '   ',
            delimiter: '*',
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
          number: 3,
          source: '   * Description second line',
          tokens: {
            start: '   ',
            delimiter: '*',
            postDelimiter: ' ',
            tag: '',
            postTag: '',
            name: '',
            postName: '',
            type: '',
            postType: '',
            description: 'Description second line',
            end: '',
          },
        },
        {
          number: 4,
          source: '   */',
          tokens: {
            start: '   ',
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
      ],
      problems: [],
    },
  ]);
});

test('skip empty blocks', () => {
  const parsed = getParser()(`
  /**
   *
   */
  var a`);
  expect(parsed).toHaveLength(0);
});

test('multiple blocks', () => {
  const parsed = getParser()(`
  /**
   * Description first line
   */
  var a

  /**
   * Description second line
   */
  var b`);

  expect(parsed).toHaveLength(2);

  expect(parsed).toEqual([
    {
      description: 'Description first line',
      tags: [],
      source: [
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
          source: '   * Description first line',
          tokens: {
            start: '   ',
            delimiter: '*',
            postDelimiter: ' ',
            tag: '',
            postTag: '',
            name: '',
            postName: '',
            type: '',
            postType: '',
            description: 'Description first line',
            end: '',
          },
        },
        {
          number: 3,
          source: '   */',
          tokens: {
            start: '   ',
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
      ],
      problems: [],
    },
    {
      description: 'Description second line',
      tags: [],
      source: [
        {
          number: 6,
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
          number: 7,
          source: '   * Description second line',
          tokens: {
            start: '   ',
            delimiter: '*',
            postDelimiter: ' ',
            tag: '',
            postTag: '',
            name: '',
            postName: '',
            type: '',
            postType: '',
            description: 'Description second line',
            end: '',
          },
        },
        {
          number: 8,
          source: '   */',
          tokens: {
            start: '   ',
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
      ],
      problems: [],
    },
  ]);
});

test('skip `/* */` blocks', () => {
  const parsed = getParser()(`
  /*
   *
   */
  var a`);
  expect(parsed).toHaveLength(0);
});

test('skip `/*** */` blocks', () => {
  const parsed = getParser()(`
  /***
   *
   */
  var a`);
  expect(parsed).toHaveLength(0);
});

test('tag only one-liner', () => {
  const parsed = getParser()(`/** @my-tag */`);
  const source = [
    {
      number: 0,
      source: '/** @my-tag */',
      tokens: {
        start: '',
        delimiter: '/**',
        postDelimiter: ' ',
        tag: '@my-tag',
        postTag: ' ',
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
          tag: 'my-tag',
          name: '',
          type: '',
          optional: false,
          description: '',
          problems: [],
          source,
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('tag only', () => {
  const parsed = getParser()(`
  /**
   *
   * @my-tag
   */
  var a`);
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
      source: '   *',
      tokens: {
        start: '   ',
        delimiter: '*',
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
      number: 3,
      source: '   * @my-tag',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@my-tag',
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
      number: 4,
      source: '   */',
      tokens: {
        start: '   ',
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
          tag: 'my-tag',
          name: '',
          type: '',
          optional: false,
          description: '',
          problems: [],
          source: source.slice(2),
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('tag and type only', () => {
  const parsed = getParser()(`
  /**
   *
   * @my-tag {my.type}
   */
  var a`);
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
      source: '   *',
      tokens: {
        start: '   ',
        delimiter: '*',
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
      number: 3,
      source: '   * @my-tag {my.type}',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@my-tag',
        postTag: ' ',
        name: '',
        postName: '',
        type: '{my.type}',
        postType: '',
        description: '',
        end: '',
      },
    },
    {
      number: 4,
      source: '   */',
      tokens: {
        start: '   ',
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
          tag: 'my-tag',
          name: '',
          type: 'my.type',
          optional: false,
          description: '',
          problems: [],
          source: source.slice(2),
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('tag and name only', () => {
  const parsed = getParser()(`
  /**
   *
   * @my-tag my-name
   */
  var a`);
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
      source: '   *',
      tokens: {
        start: '   ',
        delimiter: '*',
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
      number: 3,
      source: '   * @my-tag my-name',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@my-tag',
        postTag: ' ',
        name: 'my-name',
        postName: '',
        type: '',
        postType: '',
        description: '',
        end: '',
      },
    },
    {
      number: 4,
      source: '   */',
      tokens: {
        start: '   ',
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
          tag: 'my-tag',
          name: 'my-name',
          type: '',
          optional: false,
          description: '',
          problems: [],
          source: source.slice(2),
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('tag, type, and name', () => {
  const parsed = getParser()(`
  /**
   *
   * @my-tag {my.type} my-name
   */
  var a`);
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
      source: '   *',
      tokens: {
        start: '   ',
        delimiter: '*',
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
      number: 3,
      source: '   * @my-tag {my.type} my-name',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@my-tag',
        postTag: ' ',
        name: 'my-name',
        postName: '',
        type: '{my.type}',
        postType: ' ',
        description: '',
        end: '',
      },
    },
    {
      number: 4,
      source: '   */',
      tokens: {
        start: '   ',
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
          tag: 'my-tag',
          name: 'my-name',
          type: 'my.type',
          optional: false,
          description: '',
          problems: [],
          source: source.slice(2),
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('tag, type, name, and description', () => {
  const parsed = getParser()(`
  /**
   *
   * @my-tag {my.type} my-name description text
   */
  var a`);
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
      source: '   *',
      tokens: {
        start: '   ',
        delimiter: '*',
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
      number: 3,
      source: '   * @my-tag {my.type} my-name description text',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@my-tag',
        postTag: ' ',
        name: 'my-name',
        postName: ' ',
        type: '{my.type}',
        postType: ' ',
        description: 'description text',
        end: '',
      },
    },
    {
      number: 4,
      source: '   */',
      tokens: {
        start: '   ',
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
          tag: 'my-tag',
          name: 'my-name',
          type: 'my.type',
          optional: false,
          description: 'description text',
          problems: [],
          source: source.slice(2),
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('description contains /**', () => {
  const parsed = getParser()(`
  /**
   *
   * @my-tag {my.type} my-name description text /**
   */
  var a`);
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
      source: '   *',
      tokens: {
        start: '   ',
        delimiter: '*',
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
      number: 3,
      source: '   * @my-tag {my.type} my-name description text /**',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@my-tag',
        postTag: ' ',
        name: 'my-name',
        postName: ' ',
        type: '{my.type}',
        postType: ' ',
        description: 'description text /**',
        end: '',
      },
    },
    {
      number: 4,
      source: '   */',
      tokens: {
        start: '   ',
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
          tag: 'my-tag',
          name: 'my-name',
          type: 'my.type',
          optional: false,
          description: 'description text /**',
          problems: [],
          source: source.slice(2),
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('tag, type, name, and description separated by mixed spaces', () => {
  const parsed = getParser()(`
  /**
   *
   * @my-tag\t {my.type}\t my-name\t description text
   */
  var a`);
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
      source: '   *',
      tokens: {
        start: '   ',
        delimiter: '*',
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
      number: 3,
      source: '   * @my-tag\t {my.type}\t my-name\t description text',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@my-tag',
        postTag: '\t ',
        name: 'my-name',
        postName: '\t ',
        type: '{my.type}',
        postType: '\t ',
        description: 'description text',
        end: '',
      },
    },
    {
      number: 4,
      source: '   */',
      tokens: {
        start: '   ',
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
          tag: 'my-tag',
          name: 'my-name',
          type: 'my.type',
          optional: false,
          description: 'description text',
          problems: [],
          source: source.slice(2),
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('tag with multiline description', () => {
  const parsed = getParser()(`
  /**
   * @my-tag {my.type} my-name description line 1
   * description line 2
   * description line 3
   */
  var a`);
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
      source: '   * @my-tag {my.type} my-name description line 1',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@my-tag',
        postTag: ' ',
        name: 'my-name',
        postName: ' ',
        type: '{my.type}',
        postType: ' ',
        description: 'description line 1',
        end: '',
      },
    },
    {
      number: 3,
      source: '   * description line 2',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: 'description line 2',
        end: '',
      },
    },
    {
      number: 4,
      source: '   * description line 3',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: 'description line 3',
        end: '',
      },
    },
    {
      number: 5,
      source: '   */',
      tokens: {
        start: '   ',
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
          tag: 'my-tag',
          name: 'my-name',
          type: 'my.type',
          optional: false,
          description:
            'description line 1 description line 2 description line 3',
          problems: [],
          source: source.slice(1),
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('optional name', () => {
  const parsed = getParser()(`
  /**
   *
   * @my-tag {my.type} [my-name] description text
   */
  var a`);
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
      source: '   *',
      tokens: {
        start: '   ',
        delimiter: '*',
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
      number: 3,
      source: '   * @my-tag {my.type} [my-name] description text',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@my-tag',
        postTag: ' ',
        name: '[my-name]',
        postName: ' ',
        type: '{my.type}',
        postType: ' ',
        description: 'description text',
        end: '',
      },
    },
    {
      number: 4,
      source: '   */',
      tokens: {
        start: '   ',
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
          tag: 'my-tag',
          name: 'my-name',
          type: 'my.type',
          optional: true,
          description: 'description text',
          problems: [],
          source: source.slice(2),
        },
      ],
      source,
      problems: [],
    },
  ]);
});

test('report name errors', () => {
  const parsed = getParser()(`
  /**
   *
   * @my-tag {my.type} [my-name description text
   */
  var a`);
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
      source: '   *',
      tokens: {
        start: '   ',
        delimiter: '*',
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
      number: 3,
      source: '   * @my-tag {my.type} [my-name description text',
      tokens: {
        start: '   ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@my-tag',
        postTag: ' ',
        name: '',
        postName: '',
        type: '{my.type}',
        postType: ' ',
        description: '[my-name description text',
        end: '',
      },
    },
    {
      number: 4,
      source: '   */',
      tokens: {
        start: '   ',
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
  const problems = [
    {
      code: 'spec:name:unpaired-brackets',
      critical: true,
      message: 'unpaired brackets',
      line: 3,
    },
  ];
  expect(parsed).toEqual([
    {
      description: '',
      tags: [
        {
          tag: 'my-tag',
          name: '',
          type: 'my.type',
          optional: false,
          description: '',
          source: source.slice(2),
          problems,
        },
      ],
      source,
      problems,
    },
  ]);
});

test('misaligned block', () => {
  const parsed = getParser()(`
  /**
* @my-tag {my.type} my-name description line 1
      description line 2
    * description line 3
   */
  var a`);
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
      source: '* @my-tag {my.type} my-name description line 1',
      tokens: {
        start: '',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@my-tag',
        postTag: ' ',
        name: 'my-name',
        postName: ' ',
        type: '{my.type}',
        postType: ' ',
        description: 'description line 1',
        end: '',
      },
    },
    {
      number: 3,
      source: '      description line 2',
      tokens: {
        start: '      ',
        delimiter: '',
        postDelimiter: '',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: 'description line 2',
        end: '',
      },
    },
    {
      number: 4,
      source: '    * description line 3',
      tokens: {
        start: '    ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '',
        postTag: '',
        name: '',
        postName: '',
        type: '',
        postType: '',
        description: 'description line 3',
        end: '',
      },
    },
    {
      number: 5,
      source: '   */',
      tokens: {
        start: '   ',
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
          tag: 'my-tag',
          name: 'my-name',
          type: 'my.type',
          optional: false,
          description:
            'description line 1 description line 2 description line 3',
          problems: [],
          source: source.slice(1),
        },
      ],
      source,
      problems: [],
    },
  ]);
});
