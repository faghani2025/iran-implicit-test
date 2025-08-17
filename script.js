const startBtn = document.getElementById('start-btn');
const stimulusEl = document.getElementById('stimulus');
const trialContainer = document.getElementById('trial-container');
const resultEl = document.getElementById('result');

// داده‌های تست (مثال)
const blocks = [
  ['مثال ۱', 'مثال ۲', 'مثال ۳', 'مثال ۴'],
  ['کلمه A', 'کلمه B', 'کلمه C', 'کلمه D']
];

let currentBlock = 0;
let currentTrial = 0;
let startTime = 0;
let results = [];

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  stimulusEl.textContent = blocks[currentBlock][currentTrial];
  startTime = Date.now();
});

document.addEventListener('keydown', function handler(e) {
  if (startTime === 0) return; // هنوز تست شروع نشده

  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const reactionTime = Date.now() - startTime;
    results.push({
      block: currentBlock + 1,
      trial: currentTrial + 1,
      stimulus: blocks[currentBlock][currentTrial],
      key: e.key,
      rt: reactionTime
    });

    currentTrial++;
    if (currentTrial < blocks[currentBlock].length) {
      stimulusEl.textContent = blocks[currentBlock][currentTrial];
      startTime = Date.now();
    } else {
      currentBlock++;
      if (currentBlock < blocks.length) {
        currentTrial = 0;
        stimulusEl.textContent = blocks[currentBlock][currentTrial];
        startTime = Date.now();
      } else {
        // پایان تست
        trialContainer.classList.add('hidden');
        resultEl.classList.remove('hidden');
        console.log('نتایج:', results);
        document.removeEventListener('keydown', handler);
      }
    }
  }
});
