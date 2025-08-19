const tabButtons = Array.from(document.querySelectorAll('.tabbtn'));

const panels = {
  home: document.getElementById('panel-home'),
  points: document.getElementById('panel-points'),
  skill: document.getElementById('panel-skill'), // 운동 능력 분석 추가
  rank: document.getElementById('panel-rank'),
  more: document.getElementById('panel-more')
};

const ink = document.querySelector('.ink');

function activate(key) {
  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.target === key;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');
    if (isActive) {
      const span = btn.querySelector('span');
      const spanRect = span.getBoundingClientRect();
      const railRect = btn.parentElement.getBoundingClientRect();
      const centerX = spanRect.left + spanRect.width / 2 - railRect.left;
      ink.style.transform = `translateX(${centerX - 12}px)`;
    }
  });

  Object.entries(panels).forEach(([k, el]) => {
    el.classList.toggle('show', k === key);
  });
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => activate(btn.dataset.target));
});

const initActive = document.querySelector('.tabbtn.active');
if (initActive) {
  const span = initActive.querySelector('span');
  const spanRect = span.getBoundingClientRect();
  const railRect = initActive.parentElement.getBoundingClientRect();
  const centerX = spanRect.left + spanRect.width / 2 - railRect.left;
  ink.style.transform = `translateX(${centerX - 12}px)`;
}

// 페이지 로드 시 마지막 탭 불러오기
const savedTab = localStorage.getItem('activeTab') || 'home';
activate(savedTab);

// 탭 클릭 시 선택된 탭 저장
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.target;
    activate(key);
    localStorage.setItem('activeTab', key);
  });
});
