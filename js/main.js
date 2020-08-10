players = []

var playersJSON = localStorage.getItem("LsPlayers")
if (playersJSON != null) {
  players = JSON.parse(playersJSON);
}

function updateLs() {
  var playersJSON = JSON.stringify(players);
  localStorage.setItem("LsPlayers", playersJSON)

}
var toAppend="";


function createHTML() {
  var mainDiv = document.getElementById("main")
  toAppend = "";
  players.forEach(eachWinner)
  mainDiv.innerHTML = toAppend
}

function eachWinner(player, i) {

  toAppend += 
  `<div class="eachPlayer" id="player${i}">
        <div id="name" class="name"  "dateToName"  >Name: ${player.playerName}</div>
        <div id="date" class="date"  > ${player.date}</div>
        <div id="score" class="score">score: ${player.score}</div>
  </div>                 
`

}
var h1 = document.querySelector("h1");
var btn = document.getElementById("btn");
var danceInt = null;
var timeInt = null;
// var active = false;
var toAppend = ""
var tim =null;
var sco = null;
var lev = null;
var mis = null;
var po = null;

start()

function start() {
  // danceInt = null;    \
  tim =60;
   sco = 0;
  lev = 1;
   mis = 0;
   po = 10;
  
  toAppend = ""
  h1.removeEventListener("click",start)
  cont = document.querySelector(".container")
  h1.innerHTML=`Catch Me If You Can`
  h1.addEventListener("click", startGame);
  cont.innerHTML= `<div class="sidebar">            
  <div id="sco" class="box">Score: <br/>${sco}</div> 
  <div id="po" class="box">Points to Next Level:<br/>${po}</div>
  <div id="lev" class="box">Level:<br/>${lev}</div>
  <div id="mis" class="box">Missed Clicks:<br/>${mis}</div>
  <div id="tim" class="box">Timer:<br/>${tim}</div>
  <div class="box">
      <h4>High Scores: <br/></h4> 
      <div class="contain " id="main">
          
      </div>
  </div>           
      
</div>
  <div class="relative">                       
      <div id="btn">Click Me!</div>   
      
  </div>`
        createHTML()
}

var i = null;
var continu =''

function startGame() {
  alert("you ready to start?");
  h1.removeEventListener("click", startGame)
  
  btn = document.getElementById("btn");
  h1.style.border="none"
  h1.innerHTML=`<div class="stop">Stop</div><div class="continue">Press to Continue</div>`
  i = 2
  btn.addEventListener("mouseover", dance);
var stop = document.querySelector(".stop")
stop.addEventListener("click",stopp)
continu = document.querySelector(".continue")
continu.addEventListener("click",continues)
  timer()
  points()

}

var time = ``
function timer() {
  time = document.getElementById("tim")
    timeInt = setInterval(function () {
    tim = tim - 1
    time.innerHTML = ` Timer:<br/>${tim}`
    if (tim == 0) {
      endGame()      
    }
  }, 1000);
}

function dance() { // פונקצית בריחה של הדיב
  btn.style.animationDuration = `${i}s`
  danceInt = setTimeout(function () {
    btn.style.top = Math.floor(Math.random() * 600) + "px"; // מוקומות רנדומלי שהוא קופץ אליהם
    btn.style.left = Math.floor(Math.random() * 1000) + "px"; // מוקומות רנדומלי שהוא קופץ אליהם
  }, 300- 400 + 200 * i); // כל ריחוף מעל הדיב זה יברח אחרי 300 מילי שניות 

}
var relative = ``
//  toLocaleDateString

var poi = ``
var score = ``
var misPoi =``
var level = document.getElementById("lev")

function misPoint() {  
  misPoi = document.getElementById("mis");
 mis = mis + 1 * lev
 sco = sco - 1
 score.innerHTML = `  Score: <br/>${sco} `
 misPoi.innerHTML = ` Missed Clicks:<br/>${mis}`
} 
function points() {
  relative = document.querySelector("div.relative")
  score = document.getElementById("sco")
  relative.addEventListener("click",misPoint)
  
  btn.addEventListener("click", function (e) {
    //  e.preventDefault()
    e.stopPropagation()
    //  e.bubbles
    point()
  })
  function point() {
    poi = document.getElementById("po")    
    sco = sco + (lev * 10)
    po = po - 1
    console.log(sco)
    score.innerHTML = `Score: <br/>${sco} `
    poi.innerHTML = `  Points to Next Level:<br/>${po}`
    if (po == 0) {
      nextLevel()
    }
  }
}

function nextLevel() {
  tim = tim + 10 * lev
  lev++
  po = 10
  poi.innerHTML = `  Points to Next Level:<br/>${po}`
  level.innerHTML = `  Level:<br/>${lev}`
  time.innerHTML = `  Timer:<br/>${tim}`
  i = i - 0.25
  active = false
  // clearInterval(danceInt);
dance(i)
  if (lev == 6) {
    endGame()
  }
}


function endGame() {
  alert("Your Score Is :" + sco)
  if (lev == 6) {
    addPlayer()  
  }
  if (tim == 0) {
    relative.innerHTML= `<div class="gameOver">game over</div>`
    
    h1.innerHTML=`<div class="restart">Please Try Again </div>`  
  }
  btn.style.animationDuration = ``
  btn.removeEventListener("mouseover", dance);
  relative.removeEventListener("click",misPoint)
  
  clearTimeout(danceInt)
  clearInterval(timeInt)
  
  console.log(danceInt);
  h1.style.border=""
  h1.addEventListener("click",start)
 };

class Player {
  constructor(_name, _score, _date) {
    this.playerName = _name;
    this.score = _score;
    this.date = _date

  }
}

function addPlayer() {
  var name = prompt("Please Enter Your Name ")
const event = new Date();

var da = event.toLocaleTimeString();
if (sco > players[4].score) {
  players.pop()
  var myPlayer = new Player(name, sco, da);
  players.push(myPlayer)
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (sco > player.score) {
      
      players.pop()
       players.splice(i, 0, myPlayer)
      break
    }
    
  }
}
updateLs()
createHTML()
}
function stopp() {
  clearInterval(timeInt)
  btn.style.animationDuration = ``
  btn.removeEventListener("mouseover", dance);
  relative.removeEventListener("click",misPoint)
}
function continues() {
  continu.removeEventListener("click",continues)
  timeInt = setInterval(function () {
    tim = tim - 1
    time.innerHTML = ` Timer:<br/>${tim}`
    if (tim == 0) {
      
      endGame()      
    }
  }, 1000);
  btn.style.animationDuration = `${i}`
  btn.addEventListener("mouseover", dance);
  relative.addEventListener("click",misPoint)
}



