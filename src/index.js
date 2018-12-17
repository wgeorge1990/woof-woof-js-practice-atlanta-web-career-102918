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
    })
}


function pupDetails(event){
    console.log(event.target)
}

function spanPup(json){
    let pup = document.querySelector("#dog-bar")
    let pupHtml = `<span id="${json.id}">${json.name}</span>`
    pup.innerHTML += pupHtml
}

function showPup(json){
    let pup = document.querySelector("#dog-info")
    let pupHtml = 
                    `<img src="${json.image}">
                    <h2>${json.name}</h2>
                    <button>${json.isGoodDog}</button>`
    pup.innerHTML += pupHtml
    
}


