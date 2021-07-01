var main = document.querySelector("#main");
var page = document.querySelector("#page");
var startmenu = document.querySelector("#startmenu");
var wincons = document.querySelector("#wincons");
var winnerplayertext = document.querySelector("#winnerplayertext");
var winpopup = document.querySelector("#winpopup");
var winpopupwrapper = document.querySelector("#winpopupwrapper");
stats = document.querySelector("#stats");
function el(elt, elclass) {
  let eleming = document.createElement(elt);
  elclass != undefined ? (eleming.className = elclass) : {};
  return eleming;
}

var players = [
  "Z",
  "X",
  "O",
  "U",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
];
tourplayer = players[0];
var playerLen = 4;
var tour = 0;
var b;
var getplayer = () => players[tour % playerLen];

function currentPlayerName() {
  return players[tour % playerLen];
}

var classic = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [-1, 1],
    [-2, 2],
  ],
];

var diamond = [
  [
    [0, 0],
    [1, 1],
    [0, 2],
    [-1, 1],
  ],
];

var block = [
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
];

var winPatObj = {
  classic: classic,
  diamond: diamond,
  block: block,
};

winPatButs = document.querySelectorAll(".winpat");

var buts = [];

function winPatButClick(but) {
  // alert(e);
  // windirs = [...windirs, winPatBut.pathList];
  return () => {
    // alert(but);
    // windirs = [...windirs, ...but.pathList];
    but.classList.toggle("selectedwindir");

    but.isTurned = !but.isTurned;
    // alert(but.isTurned);
  };
}

winPatButs.forEach((winPatBut) => {
  winPatBut.onclick = winPatButClick(winPatBut);
  winPatBut.pathList = winPatObj[winPatBut.id];
  winPatBut.isTurned = false;
  buts.push(winPatBut);
});

var windirs = [];
// windirs = [classic];

function checurr(takenP) {
  var retrr;
  var e = false;
  var E = false;
  windirs.forEach((windir) => {
    let alldir = [];
    windir.forEach((winstep) => {
      let everydir = [];
      // alert("now for" + winstep);
      win = false;
      let iswining = [];
      streak = true;
      windir.forEach((ministep) => {
        try {
          let currentstep = [
            [parseInt(winstep[0]) - parseInt(ministep[0])],
            [parseInt(winstep[1]) - parseInt(ministep[1])],
          ];
          let currentPcords = [
            parseInt(currentstep[0]) + parseInt(takenP.coords[0]),
            parseInt(currentstep[1]) + parseInt(takenP.coords[1]),
          ];
          let currentP = b[currentPcords[0]][currentPcords[1]];
          //
          //
          // alert(currentP.innerHTML == takenP.innerHTML);

          if (streak && currentP.innerHTML == takenP.innerHTML) {
            win = true;
            iswining.push(currentP);
            // alert("a match!");
          } else {
            win = false;
            streak = false;
            iswining = [];
          }

          //
          //
          //

          // everydir.push(currentstep);
          // console.log(currentP);
          // alldir.push(b[currentPcords[0]][currentPcords[1]])
          // alert(currentPcords);
        } catch (err) {
          win = false;
          streak = false;
          iswining = [];
        }
      });
      if (win) {
        // alert("win");
        iswining.forEach((winnerP) => {
          winnerP.style.backgroundColor = "black";
          winnerP.innerHTML = currentPlayerName() + " won";
          stats.innerHTML = winnerP.innerHTML + " the game";
          startbutton.style.visibility = "visible";
          startmenu.style.display = "flex";
          winnerplayertext.innerHTML = currentPlayerName();
          winpopupwrapper.style.top = 0;
          windir = [];
        });
      }
      // everydir.forEach(() => {});
      // alldir.push(everydir);
    });

    e = false;
  });
  // return retrr;
  // return e;
  return E;
}

winpopup.addEventListener("click", (e) => {
  // alert(e);
  winpopupwrapper.style.top = "100%";
});

// function checkwin() {
//   b.forEach((row) => {
//     // console.log(row);
//     row.forEach((P) => {
//       // console.log(checurr(P));
//       if (checurr(P)) {
//         alert(getplayer() + " Player won the game !!!!!!");
//       }
//     });
//   });
// }

function pclick() {
  // alert(this.coords);
  tour++;
  tourplayer = players[tour % playerLen];
  stats.innerHTML = players[(tour + 1) % playerLen] + "'s tour";
  // alert(this.className);
  // alert("it is " + tourplayer);
  this.innerHTML = tourplayer;
  this.onclick = null;
  this.classList.add("taken");
  let itshue = (360 / playerLen) * (tour % playerLen) - 60;
  let nexthue = (360 / playerLen) * ((tour + 1) % playerLen) - 60;
  // alert(itshue);
  this.style.backgroundColor = "hsla(" + itshue + ", 60%, 50%, 1)";
  page.style.boxShadow = "0 0 7px 2px inset " + "hsla(" + nexthue + ", 60%, 50%, 0.8)";
  // "hsla(" + itshue + ", 60%, 50%, 1)";

  // main.style.background = "linear-gradient(160deg, hsl(" + itshue + ", 100%, 15%), hsl(" + itshue + ", 100%, 14%))";
  // checkwin();
  checurr(this);
  // checkwin();
}

var nelm = (elt, aclass) => {
  //new element to main
  elem = el(elt);
  aclass != undefined ? (elem.className = aclass) : {};
  main.appendChild(elem);
  return elem;
};
boardlen = [7, 7];

function startgame() {
  windirs = [];
  buts.forEach((but) => {
    if (but.isTurned) windirs = [...windirs, ...but.pathList];
    // alert(but);
  });

  if (windirs.length == 0) return alert("win con is required");

  startbutton.style.visibility = "hidden";
  startmenu.style.display = "none";

  wincons.innerHTML = "";
  buts.forEach((but) => {
    if (but.isTurned) wincons.innerHTML = wincons.innerHTML + but.id + " ";
  });

  main.innerHTML = "";
  b = [];
  for (let i = 0; i < boardlen[0]; i++) {
    let visRow = nelm("div", "arow");
    let nX = [];
    for (let ix = 0; ix < boardlen[1]; ix++) {
      but = el("button", "but");
      nX.push(but);
      but.VGF = "Y";
      // but.addEventListener("click", pclick);
      but.onclick = pclick;
      but.innerHTML = i + ";" + ix;
      but.coords = [i, ix];
      // console.log(but.coords);
      // but.style.width = "calc(100px /" + i + " )";
      visRow.appendChild(but);
    }
    b.push(nX);
  }
}
// startgame();

// console.log(b);
// b[2][4] = 1;
// main.innerHTML = main.innerHTML + b;

startbutton = document.querySelector("#startbutton");
startbutton.onclick = startgame;
// startbutton.style.visibility = "hidden";

document.querySelector("#xdim").addEventListener("input", function (evt) {
  boardlen[0] = this.value;
});
document.querySelector("#ydim").addEventListener("input", function (evt) {
  if (this.value < 1) this.value = 1;
  boardlen[1] = this.value;
});

document.getElementById("classic").click();

document.querySelector("#playerlen").addEventListener("input", function (evt) {
  playerLen = this.value;
});
