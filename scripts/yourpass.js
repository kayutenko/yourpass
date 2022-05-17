function identifyCustomer(subject_id) {
  ci360('attachIdentity', {
    'loginId': subject_id,
    'loginEventType': 'subject_id'
  });
  console.log("subject_id", subject_id, "attached");
}

function startSpinner() {
  console.log("Spinner started")
  let button = $("#submit_button");
  button.prop("disabled", true);
  let spiner = $("#submit_button span.spinner-border");
  spiner.prop("hidden", false);
};

function stopSpinner() {
  console.log("Spinner stoped")
  let button = $("#submit_button");
  button.prop("disabled", false);
  let spiner = $("#submit_button span.spinner-border");
  spiner.prop("hidden", true);
};

async function createPass(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  values.method = method;

  console.log(values);
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");  
  var raw = JSON.stringify(values);
  var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow',mode: 'cors'};

  var response = await fetch(aws_url, requestOptions)
  if (response.ok) {
    let json = await response.json();
    console.log(json);
    window.location = json.url;
  } else {
    console.log(response);
  }

};

async function patchPass(event) {
  event.preventDefault();
  startSpinner();

  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  values.method = method;
  const params =  new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  
  let passID = params.passID;
  
  if (passID != null) {
    
    console.log('Card will updated for pass id:', passID); 
    values.passID = passID;
    
    console.log(values);
    
    ci360("send", {
      "eventName": "custom",
      "apiEventKey": "passPersonalizedJS",
      "SSD_NAME": values.name,
      "SSD_SURNAME": values.surname,
      "SSD_PASS_ID": values.passID,
      "SSD_THEME": values.theme

    });

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");  
    // var raw = JSON.stringify(values);
    // var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow',mode: 'cors'};

    // var response = await fetch(aws_url, requestOptions)
    // if (response.ok) {

    //   let json = await response.json();
    //   console.log(json);
      
      
    //   let button_span = $("#submit_button span.sr-only");
    //   button_span.text("Pass updated successfully!")
    //   let button = $("#submit_button");
    //   button.css({"background-color": "#8bc34a", "border-color": "#689f38"});
      

    // } else {

    //   console.log(response);
    //   let button_span = $("#submit_button span.sr-only");
    //   button_span.text("Something went wrong :(")
    //   let button = $("#submit_button");
    //   button.css({"background-color": "#c02c3a", "border-color": "#7e1c25"});

    // }
    setTimeout(function() {
      let button_span = $("#submit_button span.sr-only");
      button_span.text("Thank you!")
      let button = $("#submit_button");
      button.css({"background-color": "#8bc34a", "border-color": "#689f38"});
      stopSpinner();
    }, 1000);

  } else {
    stopSpinner();
    let button_span = $("#submit_button span.sr-only");
    button_span.text("No pass id found, be sure to follow the link on the back of your pass")
    let button = $("#submit_button");
    button.css({"background-color": "#3f61ad", "border-color": "#3f51b5"});
    
  };
  
};


var current_url = window.location.href;
var aws_url = 'https://9v143smvb6.execute-api.us-east-2.amazonaws.com/default/yourPass';
var method = current_url.substring(current_url.lastIndexOf('/') + 1, current_url.lastIndexOf('.html'));

const params =  new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  
const passID = params.passID;

if (passID != null) {
    identifyCustomer(passID);
};

setTimeout(function() {
      ci360("send", {
      "eventName": "custom",
      "apiEventKey": "personalizationPageVisited",
      "SSD_PASS_ID": passID
    });
    console.log("Page view event sent");
}, 3000);






