
async function createPass(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());

  console.log(values);
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");  

  var raw = JSON.stringify(values);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    mode: 'cors'
  };

  var response = await fetch("https://yi8vccgkxg.execute-api.us-east-2.amazonaws.com/default/YourPass_CreatePass", requestOptions)
  if (response.ok) {
    let json = await response.json();
    console.log(json);
    window.location = json.url;
  } else {
    console.log(response);
  }

};

const form = document.querySelector('form');
form.addEventListener('submit', createPass);

