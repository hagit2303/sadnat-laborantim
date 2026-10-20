// ניווט: חיצים, מקלדת, לחיצה, פס התקדמות, וחשיפה שלב אחרי שלב
(() => {
  const AUTO = '.rules3>.box,.ab2>.box,.noise>.box,.flow>*,.facts>.box,.dd2 li,.tip,.qw .bub,.qw .aside,.qw .lab,'
    + '.four>.box,.q4>.box,.teaser li,.ezt>.box,.map>.q,.letter>p,.case>*,.roles>.box,.steps li,.in>.burst,.in>.say,.qs2>li';
  document.querySelectorAll(AUTO).forEach(e => e.classList.add('step'));
  const S = [...document.querySelectorAll('.s')];
  const num = document.querySelector('.nav span');
  const bar = document.querySelector('.bar');
  let i = 0;
  const steps = s => [...s.querySelectorAll('.step')];
  function go(k, back) {
    i = Math.max(0, Math.min(S.length - 1, k));
    S.forEach((s, j) => s.classList.toggle('on', j === i));
    steps(S[i]).forEach(e => e.classList.toggle('shown', !!back));
    if (back && S[i].querySelector('[data-reveal]')) S[i].classList.add('revealed');
    if (num) num.textContent = (i + 1) + ' / ' + S.length;
    if (bar) bar.style.width = ((i + 1) / S.length * 100) + '%';
    try { history.replaceState(null, '', '#' + (i + 1)); } catch (e) {}
  }
  function next() {
    const hidden = steps(S[i]).filter(e => !e.classList.contains('shown'));
    if (hidden.length) { hidden[0].classList.add('shown'); return; }
    if (S[i].querySelector('[data-reveal]') && !S[i].classList.contains('revealed')) { S[i].classList.add('revealed'); return; }
    if (i < S.length - 1) go(i + 1);
  }
  function prev() {
    const shown = steps(S[i]).filter(e => e.classList.contains('shown'));
    if (shown.length) { shown[shown.length - 1].classList.remove('shown'); return; }
    if (i > 0) go(i - 1, true);
  }
  document.addEventListener('keydown', e => {
    if (['ArrowLeft', ' ', 'PageDown', 'Enter'].includes(e.key)) { e.preventDefault(); next(); }
    if (['ArrowRight', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); prev(); }
  });
  document.querySelector('main').addEventListener('click', e => {
    if (e.target.closest('a,button,iframe')) return;
    next();
  });
  document.querySelector('.nav .nx')?.addEventListener('click', next);
  document.querySelector('.nav .pv')?.addEventListener('click', prev);
  document.querySelectorAll('[data-reveal]').forEach(b => b.addEventListener('click', () => {
    b.closest('.s').classList.add('revealed');
  }));
  go((parseInt(location.hash.slice(1)) || 1) - 1);
})();
