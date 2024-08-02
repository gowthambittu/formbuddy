chrome.runtime.onInstalled.addListener(() => {
	console.log('Extension installed');
  });

  

let formData = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveFormData") {
	formData = request.data;
	console.log('Form data saved:', formData);
	chrome.storage.local.set({ [request.url]: request.data }, () => {
	  console.log('Form data saved:', request.data);
	});
	sendResponse({status: "success", data: formData});
  } else if (request.action === "getFormData") {
	chrome.storage.local.get(null, (items) => {
	  console.log('All stored data:', items);
	  sendResponse({data: formData});
	});
  }
  return true;
});