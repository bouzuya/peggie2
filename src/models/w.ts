export type D = { type: string; date: string; value: number; note: string; };
export type W = D[];

const h = (date: string, value: number, note: string): D => {
  return { type: 'H', date, value, note };
};

const p = (date: string, value: number): D => {
  return { type: 'P', date, value, note: '' };
};

const w = (): W => {
  return [];
};

const add = (w: W, index: number, d: D): W => {
  const a1 = w.slice(0, index);
  const a2 = w.slice(index);
  const w2 = a1.concat([d], a2);
  return calculate(w2);
};

const remove = (w: W, index: number): W => {
  const a1 = w.slice(0, index);
  const a2 = w.slice(index + 1);
  const w2 = a1.concat(a2);
  return calculate(w2);
};

const calculate = (w: W): W => {
  return w.reduce(({ w, v }: { w: W; v: number; }, d: D) => {
    if (d.type === 'P') {
      const q = d.value - v;
      const note = q === 0 ? '' : '? ' + q;
      return {
        w: w.concat([
          Object.assign({}, d, { note })
        ]),
        v: 0
      };
    } else {
      return {
        w: w.concat([d]),
        v: v + d.value
      };
    }
  }, { w: [], v: 0 }).w;
};

const toString = (w: W): string => {
  return w.map((d: D) => {
    const { type, date, value, note } = d;
    return [type, date, value, note];
  }).map(a => a.join(' ')).join('\n');
};

export { add, remove, toString, w, p, h };
