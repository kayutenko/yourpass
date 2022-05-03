
async function createPass() {
  event.preventDefault();
  var firstName = document.querySelector('input[id="FirstName"]').value
  var secondName = document.querySelector('input[id="SecondName"]').value

  var myHeaders = new Headers();
  
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Access-Control-Allow-Origin", "*");
  // myHeaders.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
  // myHeaders.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  var raw = JSON.stringify({
    "name": firstName,
    "surname": secondName
  });

  console.log(raw)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  var response = await fetch("https://yi8vccgkxg.execute-api.us-east-2.amazonaws.com/default/YourPass_CreatePass", requestOptions)
  if (response.ok) {
    let json = await response.json();
    console.log(json);
    window.location.replace(json.url);
  } else {
    alert("HTTP error: " + response.status);
  }



};

