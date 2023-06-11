function flipCard(card) {
    card.classList.toggle('card-flipped');
  }

  function addToFavorites(event) {
    const card = event.target.closest('.card');
    if (card) {
      const cardData = card.outerHTML;
      let favoritesArray = [cardData]; // New array with only the current card
  
      localStorage.setItem('favorites', JSON.stringify(favoritesArray));
      
      displayFavorites();
    }
  }
  
  
  function displayFavorites() {
    const favorites = localStorage.getItem('favorites');
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = ''; // Clear the existing favorites
  
    if (favorites) {
      const favoritesArray = JSON.parse(favorites);
  
      favoritesArray.forEach(cardData => {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = cardData;
        const card = tempContainer.firstChild;
        card.classList.remove('card-flipped');
        favoritesContainer.appendChild(card);
      });
    }
  }
  
  const buttons = document.querySelectorAll('.BUTTN');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', addToFavorites);
  }

  displayFavorites();


let storedJoke = "";

  function fetchJoke() {
    if (storedJoke !== "") {
      typeOutJoke(storedJoke);
    } else {
      fetch("https://v2.jokeapi.dev/joke/Miscellaneous,Pun?blacklistFlags=nsfw,racist,sexist,explicit&format=txt&type=twopart%22")
        .then(response => response.text())
        .then(joke => {
          storedJoke = joke;
          typeOutJoke(storedJoke);
        })
        .catch(error => {
          console.error("Error fetching joke:", error);
        });
    }
  }



  
  

  

    function typeOutJoke(joke) {
    const jokeElement = document.getElementById("Joke");
    const cursorElement = document.getElementById("Cursor");
    let index = 0;
  
    // Clear any existing text
    jokeElement.innerText = "";
  
    const typingInterval = setInterval(() => {
      const currentChar = joke[index];
      if (currentChar === " ") {
        jokeElement.innerHTML += "&nbsp;";
      } else {
        jokeElement.innerText += currentChar;
      }
      index++;
  
      if (index === joke.length) {
        clearInterval(typingInterval);
        cursorElement.style.display = "none";
  
        setTimeout(() => {
          deleteJoke(jokeElement, cursorElement);
        }, 1000);
      }
    }, 100);
  
    cursorBlink(cursorElement);
  }
  
  function deleteJoke(jokeElement, cursorElement) {
      let index = jokeElement.innerText.length;
  
      const deletingInterval = setInterval(() => {
        jokeElement.innerText = jokeElement.innerText.slice(0, -1);
        index--;
  
        if (index === 0) {
          clearInterval(deletingInterval);
          cursorElement.style.display = "inline";
  
          setTimeout(() => {
            typeOutJoke(storedJoke);
          }, 1000);
        }
      }, 50);
    }
  
    function cursorBlink(cursorElement) {
      setInterval(() => {
        cursorElement.style.opacity = cursorElement.style.opacity === "0" ? "1" : "0";
      }, 500);
    }
  