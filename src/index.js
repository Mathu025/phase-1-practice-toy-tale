let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

  const toyCollection = document.getElementById("toy-collection");

    fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(toys => {
        toys.forEach(toy => {
          const card = document.createElement("div")
          card.className = "card";

          const name = document.createElement("h2")
          name.textContent = toy.name

          const image = document.createElement('img')
          image.src = toy.image
          image.className = "toy-avatar"

          const likes = document.createElement('p')
          likes.textContent = `${toy.likes} Likes`;

          const button = document.createElement('button')
          button.id = toy.id
          button.className = "like-btn"
          button.textContent = "Like ❤️"

          card.appendChild(name);
          card.appendChild(image);
          card.appendChild(likes);
          card.appendChild(button);

          toyCollection.appendChild(card)
        })
      })

      const toyForm = document.querySelector(".add-toy-form");

      toyForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const toyName = event.target.name.value
        const toyImage = event.target.image.value;

        const newToy = {
          name: toyName,
          image: toyImage,
          likes: 0
        };

        fetch("http://localhost:3000/toys", {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(newToy)
        })
        .then(response => response.json())
        .then(addedToy => {
          const card = document.createElement("div")
          card.className = "card";

          const name = document.createElement("h2")
          name.textContent = addedToy.name

          const image = document.createElement('img')
          image.src = addedToy.image
          image.className = "toy-avatar"

          const likes = document.createElement('p')
          likes.textContent = `${addedToy.likes} Likes`;

          const button = document.createElement('button')
          button.id = addedToy.id
          button.className = "like-btn"
          button.textContent = "Like ❤️"

          card.appendChild(name);
          card.appendChild(image);
          card.appendChild(likes);
          card.appendChild(button);

          toyCollection.appendChild(card)

          toyForm.reset();
        })
      })

      function createToyCard(toy) {
        const card = document.createElement("div")
          card.className = "card";

          const name = document.createElement("h2")
          name.textContent = toy.name

          const image = document.createElement('img')
          image.src = toy.image
          image.className = "toy-avatar"

          const likes = document.createElement('p')
          likes.textContent = `${toy.likes} Likes`;

          const button = document.createElement('button')
          button.id = toy.id
          button.className = "like-btn"
          button.textContent = "Like ❤️"

          button.addEventListener("click", () => {
            const toyId = button.id;
            const currentLikes = parseInt(likes.textContent);
            const newLikes = currentLikes + 1;

          fetch(`http://localhost:3000/toys/${toyId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({ likes: newLikes })
          })
          .then(response => response.json())
          .then(updatedToy => {
            likes.textContent = `${updatedToy.likes} Likes`;
          });
        });
        card.append(name,image,likes,button);
        toyCollection.appendChild(card);
      }
