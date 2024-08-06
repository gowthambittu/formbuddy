const rules = [
  {
    sourceField: 'businessName',
    targetFields: ['riskName', 'insuredName'],
    condition: (value) => value !== '',
    transform: (value) => value.toUpperCase()
  },
  {
    sourceField: 'address',
    targetFields: ['locationAddress', 'insuredAddress'],
    condition: (value) => value !== '',
    transform: (value) => value.trim()
  },
  // Add more rules as needed
];

function applyRulesEngine(data, rules) {
  let mappedData = {};

  rules.forEach(rule => {
    if (data.hasOwnProperty(rule.sourceField)) {
      const value = data[rule.sourceField];
      if (rule.condition(value)) {
        const transformedValue = rule.transform(value);
        rule.targetFields.forEach(targetField => {
          mappedData[targetField] = transformedValue;
        });
      }
    }
  });

  return mappedData;
}


function captureFormData() {
  let formData = {};
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    formData[input.name] = input.value;
  });
  console.log(`saved ${JSON.stringify(formData)} from content js captureFormData func`);
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
    const mappedData = applyRulesEngine(data, rules);
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (mappedData.hasOwnProperty(input.name)) {
        input.value = mappedData[input.name];
      }
    });
  }
}


  const submitButton = document.getElementById('capture');
  
  if (submitButton) {
    console.log(' capture is present ');
    submitButton.addEventListener('click', captureFormData);
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

