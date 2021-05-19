const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const btn_reset = document.querySelector('.btn__reset');
const hearts = document.querySelectorAll('.tries img');
const overlay = document.querySelector('#overlay');
let missed = 0;

const phrases = ["wait and see", "third time is the charm", "no news is good news", "ignorance is bliss", "as cold as ice"];

btn_reset.addEventListener('click', (e) => {
  overlay.style.display = 'none';
});

/* Generates a random phrase */
function getRandomPhraseAsArray(arr) {
  let randomNumber = Math.floor(Math.random() * arr.length);
  let randomPhrase = arr[randomNumber];
  let char = randomPhrase.split('');
  return char;
}

/* Adds each character to a list item */
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {

    let ul = document.querySelector('#phrase ul');
    let li = document.createElement('li');

    li.textContent = arr[i];
    ul.appendChild(li);

    if (arr[i] === ' ') {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }

    /*console.log(li);*/
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

/* Checks if clicked letter matches letter in the phrase */
function checkLetter(clickedBtn) {
  let checkLetter = document.querySelectorAll('#phrase li');
  /*console.log(checkLetter);*/
  let match = null;

  for (let i = 0; i < checkLetter.length; i++) {
    /*console.log(checkLetter[i].textContent);*/
    if (clickedBtn.textContent === checkLetter[i].textContent) {
      checkLetter[i].style.transition = "1s";
      checkLetter[i].className += ' show';
      match = clickedBtn.textContent;
    }

  }

  return match;
}

/* Listening for user to click on on-screen keyboard */
qwerty.addEventListener('click', (e) => {

  let char = e.target;

  if (char.tagName === 'BUTTON') {
    char.className = 'chosen';
    char.setAttribute('disabled', '');
    let correctLetter = checkLetter(char);

    if (correctLetter === null) {
      hearts[missed].src = "images/lostHeart.png";
      missed++;
    }

  }

  checkWin();
});

function checkWin() {

  let header = document.querySelector('.title');

  let letter = document.querySelectorAll('.letter');
  let show = document.querySelectorAll('.show');

  if (letter.length === show.length) {
    overlay.className = 'win';
    header.innerHTML = 'You won!';
    overlay.style.display = 'flex';
  } else if (missed > 4) {
    overlay.className = 'lose';
    header.innerHTML = 'You lost!';
    overlay.style.display = 'flex';
  }

}
