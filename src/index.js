const SERVER = 'http://localhost:3000/pups'
document.addEventListener("DOMContentLoaded", initializePage)

function initializePage(){
    fetchPups()

}

function fetchPups(){
    fetch(SERVER).then(function(data){
        return data.json()
    }).then(function(json){
        json.forEach(spanPup)
        var spans = document.querySelectorAll('span')
        spans.forEach((span) => span.addEventListener('click', pupDetails))

        // var buttons = document.querySelectorAll('button')
        // buttons.forEach((button) => button.addEventListener('click', updateTraitHandler))
        // document.querySelector('button').addEventListener('click', updateTraitHandler)
    })
}

function updateTraitHandler(event) {
  console.log('Event: ', event)
  let id = event.target.id
  // Grab the dog's ID
  let request = new Request(`http://localhost:3000/pups/${id}`)
  let options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: true
    })
  }
  fetch(request, options)
    .then(function(data) { return data.json() })
    .then(function(json) { console.log(json) })
};

function pupDetails(event){
    // console.log(event.target.id)
    let id = event.target.id
    // Grab the dog's ID
    fetch(`http://localhost:3000/pups/${id}`).then((data) => {
      return data.json()
    }).then((json) => {
      showPup(json)
      document.querySelector('button').addEventListener('click', updateTraitHandler)
    });
}

function spanPup(json){
    let pup = document.querySelector("#dog-bar")
    let pupHtml = `<span id="${json.id}">${json.name}</span>`
    pup.innerHTML += pupHtml
}

function showPup(json){
    let pup = document.querySelector("#dog-info")
    let pupHtml =  `<img src="${json.image}">
                    <h2>${json.name}</h2>
                    <button id="${json.id}">${json.isGoodDog ? 'Good Dog' : 'Bad Dog'}</button>`
    pup.innerHTML = pupHtml
    document.querySelector(`button[id=${json.id}]`).addEventListener('click', updateTraitHandler)
}
