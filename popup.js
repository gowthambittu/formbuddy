function captureFormData() {
  const formData = {};
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    formData[input.name] = input.value;
  });
  console.log(formData);
  chrome.runtime.sendMessage({ action: "saveFormData", data: formData }, response => {
    console.log('Data saved:', response);
  });
}

// Function to fill form data
function fillFormData(data) {
  if (data) {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }
}



document.getElementById('captureButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: captureFormData
    });
  });
});

document.getElementById('copyButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.runtime.sendMessage({action: "getFormData"}, response => {
      if (response.data) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: fillFormData,
          args: [response.data]
        });
      }
    });
  });
});
