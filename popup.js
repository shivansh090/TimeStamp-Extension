document.addEventListener('DOMContentLoaded', () => {
  const currentTimestampsContainer = document.getElementById('current-timestamps');
  const allTimestampsContainer = document.getElementById('all-timestamps');
  const showAllButton = document.getElementById('show-all');

  let currentVideoId = null;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const urlParams = new URLSearchParams(new URL(tabs[0].url).search);
    currentVideoId = urlParams.get('v');
    loadTimestamps();
  });

  showAllButton.addEventListener('click', () => {
    allTimestampsContainer.style.display = allTimestampsContainer.style.display === 'none' ? 'block' : 'none';
  });

  function loadTimestamps() {
    chrome.storage.sync.get('timestamps', (data) => {
      const timestamps = data.timestamps || [];
      const currentTimestamps = timestamps.filter(entry => entry.videoId === currentVideoId);
      const allTimestamps = timestamps;

      displayTimestamps(currentTimestamps, currentTimestampsContainer);
      displayTimestamps(allTimestamps, allTimestampsContainer);
    });
  }

  function displayTimestamps(timestamps, container) {
    container.innerHTML = '';
    if (timestamps.length === 0) {
      const noTimestampsMessage = document.createElement('p');
      noTimestampsMessage.textContent = 'No timestamps available.';
      container.appendChild(noTimestampsMessage);
    } else {
      timestamps.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'timestamp';

        const a = document.createElement('a');
        a.href = `${entry.url}&t=${Math.floor(entry.timestamp)}s`;
        a.textContent = `${entry.title} - ${formatTime(entry.timestamp)}`;
        a.target = '_blank';

        div.appendChild(a);
        container.appendChild(div);
      });
    }
  }

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + ':' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }
});
