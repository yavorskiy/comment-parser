import { Transform } from './index';
import { Block, Line } from '../primitives';
import { rewireSource } from '../util';

const pull = (offset: number) => (str) => str.slice(offset);
const push = (offset: number) => {
  const space = ''.padStart(offset, ' ');
  return (str) => str + space;
};

export default function indent(pos: number): Transform {
  let shift: (string) => string;
  const pad = (start: string) => {
    if (shift === undefined) {
      const offset = pos - start.length;
      shift = offset > 0 ? push(offset) : pull(-offset);
    }
    return shift(start);
  };

  const update = (line: Line): Line => ({
    ...line,
    tokens: { ...line.tokens, start: pad(line.tokens.start) },
  });

  return ({ source, ...fields }: Block): Block =>
    rewireSource({ ...fields, source: source.map(update) });
}
