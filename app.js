var main = document.querySelector("#main");
var page = document.querySelector("#page");
stats = document.querySelector("#stats");
function el(elt, elclass) {
  let eleming = document.createElement(elt);
  elclass != undefined ? (eleming.className = elclass) : {};
  return eleming;
}

var players = ["X", "0", "U", "Z"];
tourplayer = players[0];
var tour = 0;
var b;
var getplayer = () => players[tour % players.length];

var classics = [
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

windirs = [...diamond, ...block];

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
      streak = true;
      windir.forEach((ministep) => {
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
          // alert("a match!");
        } else {
          win = false;
          streak = false;
        }

        //
        //
        //

        // everydir.push(currentstep);
        console.log(currentP);
        // alldir.push(b[currentPcords[0]][currentPcords[1]])
        // alert(currentPcords);
      });
      if (win) {
        alert("win");
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

function checkwin() {
  b.forEach((row) => {
    // console.log(row);
    row.forEach((P) => {
      // console.log(checurr(P));
      if (checurr(P)) {
        alert(getplayer() + " Player won the game !!!!!!");
      }
    });
  });
}

function pclick() {
  // alert(this.coords);
  tour++;
  tourplayer = players[tour % players.length];
  stats.innerHTML = players[(tour + 1) % players.length] + "'s tour";
  // alert(this.className);
  // alert("it is " + tourplayer);
  this.innerHTML = tourplayer;
  this.onclick = null;
  this.classList.add("taken");
  let itshue = (360 / players.length) * (tour % players.length) - 60;
  let nexthue = (360 / players.length) * ((tour + 1) % players.length) - 60;
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
boardlen = [10, 10];

function startgame() {
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
startgame();

// console.log(b);
// b[2][4] = 1;
// main.innerHTML = main.innerHTML + b;
