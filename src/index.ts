import { Problem } from './types';
import sourceParser, { Options as SourceOptions } from './source-parser';
import blockParser, { Options as BlockOptions } from './block-parser';
import specParser, {
  Tokenizer,
  tagTokenizer,
  nameTokenizer,
  typeTokenizer,
  descriptionTokenizer,
} from './spec-parser';
import { Block, Line, Spec } from './types';
import getSpacer, { Spacer } from './spacer';
import { splitLines } from './util';

export interface Options {
  startLine: number;
  fence: string;
  spacing: 'compact' | 'preserve' | Spacer;
  tokenizers: Tokenizer[];
}

export default function getParser({
  startLine = 0,
  fence = '```',
  spacing = 'compact',
  tokenizers = [
    tagTokenizer(),
    nameTokenizer(),
    typeTokenizer(),
    descriptionTokenizer(getSpacer(spacing)),
  ],
}: Partial<Options> = {}) {
  if (startLine < 0 || startLine % 1 > 0) throw new Error('Invalid startLine');

  const parseSource = sourceParser({ startLine });
  const parseBlock = blockParser({ fence });
  const parseSpec = specParser({ tokenizers });
  const join = getSpacer(spacing);

  const notEmpty = (line: Line): boolean =>
    line.tokens.description.trim() != '';

  return function (source: string): Block[] {
    const blocks: Block[] = [];
    for (const line of splitLines(source)) {
      const lines = parseSource(line);

      if (lines === null) continue;
      if (lines.find(notEmpty) === undefined) continue;

      const sections = parseBlock(lines);
      const specs = sections.slice(1).map(parseSpec);

      blocks.push({
        description: join(sections[0]),
        tags: specs,
        source: lines,
        problems: specs.reduce(
          (acc: Problem[], spec) => acc.concat(spec.problems),
          []
        ),
      });
    }
    return blocks;
  };
}