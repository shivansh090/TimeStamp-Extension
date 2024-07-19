document.addEventListener('DOMContentLoaded', () => {
  const timestampsContainer = document.getElementById('timestamps');

  chrome.storage.sync.get('timestamps', (data) => {
    const timestamps = data.timestamps || [];

    timestamps.forEach((entry) => {
      const div = document.createElement('div');
      div.className = 'timestamp';

      const a = document.createElement('a');
      a.href = `${entry.url}&t=${Math.floor(entry.timestamp)}s`;
      a.textContent = `${entry.title} - ${formatTime(entry.timestamp)}`;
      a.target = '_blank';

      div.appendChild(a);
      timestampsContainer.appendChild(div);
    });
  });
});

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h > 0 ? h + ':' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}
