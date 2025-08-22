// Theme toggle
(function () {
  const key = 'app-theme';
  const btn = document.getElementById('toggle-theme');
  const saved = localStorage.getItem(key);
  if (saved === 'dark') document.documentElement.classList.add('dark');
  btn && btn.addEventListener('click', function () {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(key, isDark ? 'dark' : 'light');
  });
})();

// Table search helper
window.attachTableSearch = function (inputSelector, tableSelector) {
  const input = document.querySelector(inputSelector);
  const table = document.querySelector(tableSelector);
  if (!input || !table) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    Array.from(table.querySelectorAll('tbody tr')).forEach((tr) => {
      const text = tr.innerText.toLowerCase();
      tr.style.display = text.includes(q) ? '' : 'none';
    });
  });
};

