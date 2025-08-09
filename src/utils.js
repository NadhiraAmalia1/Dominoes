export const countDoubleNumber = (dominoes) =>
  dominoes.filter(([a, b]) => a === b).length;

export const sort = (dominoes, order = "asc") => {
  const asc = order === "asc";
  return [...dominoes].sort((a, b) => {
    const sumA = a[0] + a[1];
    const sumB = b[0] + b[1];
    if (sumA !== sumB) return asc ? sumA - sumB : sumB - sumA;
    if (a[0] !== b[0]) return asc ? a[0] - b[0] : b[0] - a[0];
    return asc ? a[1] - b[1] : b[1] - a[1];
  });
};

export const removeDuplicates = (dominoes) => {
  const keys = dominoes.map(([a, b]) => `${Math.min(a, b)}|${Math.max(a, b)}`);

  const counts = keys.reduce((acc, key) => {
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return dominoes.filter((_, i) => counts[keys[i]] === 1);
};

export const flipAll = (dominoes) => dominoes.map(([a, b]) => [b, a]);

export const removeByTotal = (dominoes, total) =>
  dominoes.filter(([a, b]) => a + b !== Number(total));
