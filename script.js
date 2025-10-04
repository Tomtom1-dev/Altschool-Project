
const display = document.getElementById("display")
const startBtn = document.getElementById("startBtn")
const stopBtn = document.getElementById("stopBtn")
const resetBtn = document.getElementById("resetBtn")
const lapBtn = document.getElementById("lapBtn")
const lapsContainer = document.getElementById("lapsContainer")
const lapsList = document.getElementById("lapsList")
const themeToggle = document.getElementById("themeToggle")
const themeIcon = document.querySelector(".theme-icon")


let hours = 0
let minutes = 0
let seconds = 0
let intervalId = null
let isRunning = false
let lapCounter = 0


function formatTime(num) {
  return num < 10 ? "0" + num : num
}


function updateDisplay() {
  display.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds)
}


function startTimer() {
  
  if (isRunning) return

  isRunning = true

  intervalId = setInterval(() => {
    seconds++


    if (seconds === 60) {
      seconds = 0
      minutes++
    }


    if (minutes === 60) {
      minutes = 0
      hours++
    }

 
    updateDisplay()
  }, 1000)
}


function stopTimer() {
  if (!isRunning) return

  clearInterval(intervalId)
  isRunning = false
}


function resetTimer() {

  stopTimer()


  hours = 0
  minutes = 0
  seconds = 0

  lapCounter = 0
  lapsList.innerHTML = ""
  lapsContainer.classList.remove("show")

 
  updateDisplay()
}

function recordLap() {

  if (!isRunning) return

  lapCounter++

  
  const lapItem = document.createElement("div")
  lapItem.className = "lap-item"

  const lapNumber = document.createElement("span")
  lapNumber.className = "lap-number"
  lapNumber.textContent = `Lap ${lapCounter}`

  const lapTime = document.createElement("span")
  lapTime.className = "lap-time"
  lapTime.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds)

  lapItem.appendChild(lapNumber)
  lapItem.appendChild(lapTime)

 
  lapsList.insertBefore(lapItem, lapsList.firstChild)


  lapsContainer.classList.add("show")
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme")

 
  if (document.body.classList.contains("dark-theme")) {
    themeIcon.textContent = "☀️"
    localStorage.setItem("theme", "dark")
  } else {
    themeIcon.textContent = "🌙"
    localStorage.setItem("theme", "light")
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme")
    themeIcon.textContent = "☀️"
  }
}


startBtn.addEventListener("click", startTimer)
stopBtn.addEventListener("click", stopTimer)
resetBtn.addEventListener("click", resetTimer)
lapBtn.addEventListener("click", recordLap)
themeToggle.addEventListener("click", toggleTheme)

loadTheme()
