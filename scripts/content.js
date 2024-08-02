console.log('content js file loaded');
// Check if the DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    // Your code here
  });
} else {
  console.log('DOM already loaded');
  // Your code here

}

function onFormSubmit(event){
  console.log('from onFormSubmit meyjod');
  let formData;
  formData=captureFormData();
  console.log('calling sendmessagetobackground');
  sendMessageToBackground(formData);
}

function captureFormData() {
  let formData = {};
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    formData[input.name] = input.value;
  });
  console.log(`saved ${JSON.stringify(formData)} from content js captureFormData func`);
  // const {res} = await chrome.runtime.sendMessage({ action: "saveFormData", data: formData });
  // console.log(res);
  return formData;
}

function sendMessageToBackground(formData){
  console.log('inside sendmessagebackground');
  if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage({action:'saveFormData',data:formData},(response)=>{
      console.log('Data saved to local store ',response);
    });
  } else {
    console.error('chrome.runtime.sendMessage is not available');
  }
}

function fillFormData(data) {
  console.log('fillFormData is called');
  console.log(data);
  if (data) {
    // const inputs = document.querySelectorAll('input, textarea, select');
    // inputs.forEach(input => {
    //   if (data[input.name]) {
    //     input.value = data[input.name];
    //   }
    // 
    console.log(data.data.firstName);
    document.getElementById('firstName').value = data.data.firstName || 'na';
    document.getElementById('lastName').value = data.data.lastName || 'na';
    document.getElementById('email').value = data.data.email || 'na';
    };
  }


  const submitButton = document.getElementById('capture');
  
  if (submitButton) {
    console.log(' capture is present ');
    submitButton.addEventListener('click', onFormSubmit);
  }



  const fillButton = document.getElementById("fillbutton")
if(fillButton){
  console.log('clicked fill button ');
  let formData;
  chrome.runtime.sendMessage({action:'getFormData'},(response)=>{
    formData=response;
  });
    fillButton.addEventListener('click', () => fillFormData(formData));
}

