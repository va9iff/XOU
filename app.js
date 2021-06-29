var main = document.querySelector("#main");
var page = document.querySelector("#page");
stats = document.querySelector("#stats");
function el(elt, elclass) {
  let eleming = document.createElement(elt);
  elclass != undefined ? (eleming.className = elclass) : {};
  return eleming;
}

var players = ["Z", "X", "O", "U"];
tourplayer = players[0];
var tour = 0;
var b;
var getplayer = () => players[tour % players.length];

windirs = [
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [-1, 0],
  ],
];

function checurr(takenP) {
  var retrr;
  var e = false;
  var E = false;
  windirs.forEach((windir) => {
    // her bir win directionu
    windir.forEach((winstep) => {
      // her bir win addimi
      if (
        0 < takenP.coords[0] + winstep[0] &&
        takenP.coords[0] + winstep[0] < b.length - 1 &&
        takenP.coords[1] + winstep[1] < b.length &&
        0 < takenP.coords[1] + winstep[1]
      ) {
        //
        console.log("gecilmisdir");
        if (
          b[takenP.coords[0] + winstep[0]][takenP.coords[1] + winstep[1]].innerHTML ==
          b[takenP.coords[0]][takenP.coords[1]].innerHTML
        ) {
          // console.log("prr");
          if (e) {
            E = true;
          }
          e = true;
        } else {
          console.log("elslendin");
          // e = false;
        }
      }
    });

    e = false;
  });
  console.log(retrr);
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
  // alert(itshue);
  this.style.backgroundColor = "hsla(" + itshue + ", 60%, 50%, 1)";

  // main.style.background = "linear-gradient(160deg, hsl(" + itshue + ", 100%, 15%), hsl(" + itshue + ", 100%, 14%))";
  // checkwin();
  checurr(this);
  checkwin();
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
