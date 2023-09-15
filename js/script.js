let url = "http://localhost:8080/api/get"; // Globle API endpoint
let quoteWordsCount; // Quote words count
let wpm;

const quoteInputElement = document.getElementById("quoteInput");
const quoteDisplayElement = document.getElementById("quoteDisplay");
const timerElement = document.getElementById("timer");
const resultElement = document.querySelector(".result");

//starting the timer on input

//checking the input with the quote
quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayvalue = quoteInputElement.value.split("");

  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayvalue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
      correct = false;
    }
  });
  if (correct) {
    displayResults();
    renderNewQuote();
  }
});

const generateNum = async () => {
  let num = Math.floor(Math.random() * 8);
  if (num == 0) {
    num = 1;
  }
  return num;
};

function getQuote(id) {
  return fetch(url + "?id=" + id)
    .then((response) => response.json())
    .then((data) => {
      quoteWordsCount = data.quote.split(" ");

      console.log(`quoteWordsArray is ${quoteWordsCount.length}`);
      //   quoteWordsArray.forEach((word, index) => {
      //     console.log(`${word} this is the ${index} quote word`);
      //   });

      return data.quote;
    })
    .catch((err) => console.log(err));
}

async function renderNewQuote() {
  const quote = await getQuote(await generateNum());
  // console.log(quote);
  quoteDisplayElement.innerText = "";
  const array = quote.split("");
  array.forEach((element) => {
    const characterSpan = document.createElement("span");
    // characterSpan.classList.add('correct')
    characterSpan.innerText = element;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}

let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(function () {
    timer.innerText = getTimerTime();
  }, 1000);
}

let actualTime;
function getTimerTime() {
  actualTime = Math.floor((new Date() - startTime) / 1000);
  return actualTime.toString();
}

const calWPM = (time) => {
  //   console.log(quoteWordsCount);
  console.log(`time is ${time} seconds`);
  wpm = Math.floor(quoteWordsCount.length / (time / 60));
  console.log(wpm);
  return wpm;
};

const displayResults = function () {
  let tempWpm = calWPM(actualTime);
  //   console.log(`${tempWpm} words per minute`);
  resultElement.innerText = `${tempWpm} words per minute`;
  //   console.log(`${tempWpm} words per minute`);
};
