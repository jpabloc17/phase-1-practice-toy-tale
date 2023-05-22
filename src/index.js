let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => {
      createCards(toy);
    }))
    
    addNewToy()

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
});


function createCards(toys){
  const toysContainer = document.getElementById("toy-collection");
    const div = document.createElement("div");
    const h2 = document.createElement("h2")
    h2.textContent = toys.name
    const img = document.createElement("img")
    img.className = "toy-avatar";
    img.src = toys.image;
    const p = document.createElement("p");
    p.textContent = `${toys.likes} Likes`;
    const btn = document.createElement("button");
    btn.className = "like-btn";
    btn.id = toys.id;
    btn.textContent = "Like ❤️"
    div.className = "card";
    div.append(h2, img, p, btn);
    toysContainer.appendChild(div);
    btn.addEventListener("click", () => {
      p.textContent = `${toys.likes += 1} Likes`;
      increaseLikes(toys.id, toys.likes)
  })
}

function increaseLikes(id, newNumberOfLikes){
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({
        "likes": newNumberOfLikes
      })
    })
}



function sendItOut(newToy){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      ...newToy,
      "likes": 0,
    })
  }).then((response) => response.json())
    .then((responseToy) => createCards(responseToy))
}

function addNewToy(){
  const form = document.querySelector("form.add-toy-form")
  form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target));
  console.log(formData);
  sendItOut(formData)
  })
}