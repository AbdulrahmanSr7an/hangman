let statGame = document.querySelector(".start-game");
let btn = document.querySelector(".btn");
let hangman = document.querySelector(".hangman");
let contInp = document.querySelector(".container-inputs");
let drawHang = hangman.querySelectorAll(".draw");
let inps = document.querySelector(".inputs");
let chars = document.querySelector(".char");
let divChars = chars.querySelectorAll("div");
let word;
let a = 0;
let choices = document.querySelector(".choices");
let choice = choices.querySelectorAll("div");
let win = document.querySelector(".win");
let winBtn = document.querySelector(".winbtn");
let loseBtn = document.querySelector(".losebtn");
let lose = document.querySelector(".lose");
const success = new Audio("game-bonus-02-294436.mp3");
const fail = new Audio("spin-fail-295088.mp3");
const youLose = new Audio("you-loseheavy-echoed-voice-230555.mp3");
const youWin = new Audio("/you-win-sfx-442128.mp3");
const categoryData = {
  countries: [
    "Egypt",
    "Japan",
    "Brazil",
    "Canada",
    "Germany",
    "Australia",
    "France",
    "Italy",
  ],
  fruits: [
    "Apple",
    "Banana",
    "Mango",
    "Orange",
    "Strawberry",
    "Pineapple",
    "Grapes",
    "Watermelon",
  ],
  animals: [
    "Lion",
    "Elephant",
    "Tiger",
    "Giraffe",
    "Zebra",
    "Kangaroo",
    "Panda",
    "Wolf",
  ],
};
// const arr = ["countries", "fruits", "animals"];
let counter;
btn.addEventListener("click", function () {
  statGame.style.display = "none";
  // hangman.classList.add("block");
  choices.style.display = "flex";
});
choice.forEach(ele => {
  ele.addEventListener("click", function () {
    let catg = ele.textContent.toLowerCase();
    word = categoryData[catg][Math.floor(Math.random() * 8)].toLowerCase();
    console.log(word);

    counter = word.length;
    choices.style.display = "none";
    hangman.classList.add("block");
    contInp.style.display = "flex";
    for (let i = 0; i < word.length; i++) {
      let inp = document.createElement("input");
      inp.disabled = true;
      inps.appendChild(inp);
    }
    divChars.forEach((ele) => {
      ele.addEventListener("click", function (e) {
        ele.style.opacity = 0.5;
        ele.style.cursor = "default";
        ele.style.pointerEvents = "none";
        if (word.indexOf(ele.textContent.toLowerCase()) > -1) {
          for (let i = 0; i < word.length; i++) {
            if (word[i].toLowerCase() === ele.textContent.toLowerCase()) {
              document.querySelectorAll("input")[i].value = ele.textContent;
              success.currentTime = 0;
              success.play();
              counter--;
            }
          }
        } else {
          drawHang[a].style.display = "block";
          fail.currentTime = 0; 
          fail.play();
          a++;
        }
        if (counter === 0) {
          hangman.classList.remove("block");
          contInp.style.display = "none";
          youWin.play()
          win.style.display = "flex";
          win.document.querySelector("p").textContent = `The Word is : ${word}`;
          winBtn.addEventListener("click", function () {
            window.location.reload()
          })
        }
        if (a === 10) {
          hangman.classList.remove("block");
          contInp.style.display = "none";
          youLose.play();
          lose.style.display = "flex";
          lose.document.querySelector("p").textContent = `The Word is : ${word}`;
          loseBtn.addEventListener("click", function () {
            window.location.reload();
          });
        }
      });
    });
  })
})
