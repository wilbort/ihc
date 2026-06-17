export function fmt12(time24) {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const suffix = h >= 12 ? 'p.m.' : 'a.m.';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}
