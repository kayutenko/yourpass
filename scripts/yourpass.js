
async function createPass() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "name": "Petr",
    "surname": "ivanov"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  var response = await fetch("https://yi8vccgkxg.execute-api.us-east-2.amazonaws.com/default/YourPass_CreatePass", requestOptions)
  if (response.ok) {
    let json = await response.json();
  } else {
    alert("HTTP error: " + response.status);
  }

};

