// Inject a button into the YouTube page
const button = document.createElement('button');
button.textContent = 'Save Timestamp';
button.style.position = 'fixed';
button.style.top = '110px';
button.style.right = '10px';
button.style.zIndex = 1000;
button.style.padding = '10px';
button.style.backgroundColor = '#FF0000';
button.style.color = '#FFFFFF';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';

document.body.appendChild(button);

button.addEventListener('click', () => {
  const video = document.querySelector('video');
  const currentTime = video ? video.currentTime : 0;
  const title = document.title;
  const videoId = new URLSearchParams(window.location.search).get('v');

  chrome.runtime.sendMessage({
    type: 'saveTimestamp',
    title: title,
    timestamp: currentTime,
    url: window.location.href,
    videoId: videoId
  });
});
