const theTimeEl = document.getElementById("thetime");
const messageEl = document.getElementById("message");
const clockEl = document.getElementById("clock");
const hoursEl = document.getElementById("hourhand");
const minutesEl = document.getElementById("minutehand");
const hoursTEl = document.getElementById("hourhandtest");
const minutesTEl = document.getElementById("minutehandtest");
const hourtextEl = document.getElementById("hourtext");
const minutetextEl = document.getElementById("minutetext");
const hourtoggleEl = document.getElementById("hourtoggle");
const minutetoggleEl = document.getElementById("minutetoggle");

var date = randomDate(new Date(2012, 0, 1), new Date());
var hour = hours12(date);
var minutes = round5(date.getMinutes());
var hourT = 10;
var minutesT = 10;

function hours12(date) {
  return date.getHours() % 12 || 12;
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function round5(x) {
  if (x <= 55) {
    return Math.ceil(x / 5) * 5;
  } else {
    return 0;
  }
}
function setNewTime() {
  date = randomDate(new Date(2012, 0, 1), new Date());
  hour = hours12(date);
  minutes = round5(date.getMinutes());
}

function showTime() {
  theTimeEl.innerText =
    hour.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");
  hoursEl.setAttribute("transform", `rotate(${(360 / 12) * hour})`);
  minutesEl.setAttribute("transform", `rotate(${(360 / 60) * minutes})`);
}
showTime();

function showDefaultTHands() {
  hourT = 10;
  minutesT = 10;
  hoursTEl.setAttribute("transform", `rotate(${(360 / 12) * hourT})`);
  minutesTEl.setAttribute("transform", `rotate(${(360 / 60) * minutesT})`);
}

function checkAnswers() {
  minutesEl.classList.remove("incorrectanswer");
  hoursEl.classList.remove("incorrectanswer");

  if (minutes != round5(minutesT)) {
    minutesEl.classList.add("incorrectanswer");
  }
  if (hour != hourT) {
    hoursEl.classList.add("incorrectanswer");
  }
  if (minutes == round5(minutesT) && hour == hourT) {
    messageEl.classList.remove("hidden");
  }
  hoursEl.classList.remove("hidden");
  minutesEl.classList.remove("hidden");
  ClearTHandsSelection();
}

window.onload = function () {
  document.getElementById("buttonreset").addEventListener("click", function () {
    hoursEl.classList.add("hidden");
    minutesEl.classList.add("hidden");
    messageEl.classList.add("hidden");
    setNewTime();
    showTime();
    ClearTHandsSelection();
    showDefaultTHands();
  });
  document
    .getElementById("buttoncheck")
    .addEventListener("click", (e) => checkAnswers(), false);
  document.body.addEventListener("click", (e) => ClearTHandsSelection(), true);
};

//position T hands to initial state
showDefaultTHands();

//mouseover T hands
hoursTEl.addEventListener("mouseover", () => {
  hoursTEl.classList.add("handhover");
});
hoursTEl.addEventListener("mouseout", function () {
  hoursTEl.classList.remove("handhover");
});
minutesTEl.addEventListener("mouseover", () => {
  minutesTEl.classList.add("handhover");
});
minutesTEl.addEventListener("mouseout", function () {
  minutesTEl.classList.remove("handhover");
});

//selecting T hands
function hoursTSelection() {
  hoursTEl.classList.add("handselected");
  minutesTEl.classList.remove("handselected");
}
function minutesTSelection() {
  hoursTEl.classList.remove("handselected");
  minutesTEl.classList.add("handselected");
}

hoursTEl.addEventListener("click", () => hoursTSelection());
minutesTEl.addEventListener("click", () => minutesTSelection());

function ClearTHandsSelection() {
  hoursTEl.removeEventListener("click", hoursTSelection);
  minutesTEl.removeEventListener("click", minutesTSelection);
  hoursTEl.classList.remove("handselected");
  minutesTEl.classList.remove("handselected");
}

//moving T hands
function movehandT(element) {
  if (element.classList.contains("handselected")) {
    if (element == hoursTEl) {
      hourT == 12 ? (hourT = 1) : hourT++;
      element.setAttribute("transform", `rotate(${(360 / 12) * hourT})`);
    }
    if (element == minutesTEl) {
      minutesT == 60 ? (minutesT = 0) : (minutesT = minutesT + 5);
      minutesTEl.setAttribute("transform", `rotate(${(360 / 60) * minutesT})`);
    }
  }
}
hoursTEl.addEventListener("mouseover", () => movehandT(hoursTEl));
minutesTEl.addEventListener("mouseover", () => movehandT(minutesTEl));

//toggle
hourtoggleEl.addEventListener("change", function () {
  if (hourtoggleEl.checked) {
    hourtextEl.classList.remove("hidden");
  } else {
    hourtextEl.classList.add("hidden");
  }
});
minutetoggleEl.addEventListener("change", function () {
  if (minutetoggleEl.checked) {
    minutetextEl.classList.remove("hidden");
  } else {
    minutetextEl.classList.add("hidden");
  }
});
