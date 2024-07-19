chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'saveTimestamp') {
    chrome.storage.sync.get('timestamps', (data) => {
      const timestamps = data.timestamps || [];
      timestamps.push({
        title: message.title,
        timestamp: message.timestamp,
        url: message.url
      });
      chrome.storage.sync.set({ timestamps }, () => {
        console.log('Timestamp saved');
      });
    });
  }
});
