document.getElementById('saveOptions').addEventListener('click', () => {
    const autoCopy = document.getElementById('autoCopy').checked;
    chrome.storage.sync.set({autoCopy: autoCopy}, () => {
      alert('Options saved!');
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['autoCopy'], result => {
      document.getElementById('autoCopy').checked = result.autoCopy;
    });
  });
  