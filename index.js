import Star from './stars';
import drawStars from './drawStars';

let globals = {
    stars: [],
    first: "human",
    difficulty: "easy",
    symbol: "X",
}
let t3Game = {
    difficulty:"easy",
    first:"human",
    symbol:"X",
    winningCells:[[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]],
    initialize: ()=>{
        t3Game.win=null;
        t3Game.infoText="good luck!";
        t3Game.playerCells=[];
        t3Game.computerCells=[];
        t3Game.gameOver=false;
        t3Game.initializeBoard();
        t3Game.updateBoard();
    },
    initializeBoard:()=>{
        let html = "";
        for (let i=1;i<4;i++){
            html+=`<tr>
                <td id="cell${3*i-2}" class="cell"></td>
                <td id="cell${3*i-1}" class="cell"></td>
                <td id="cell${3*i}" class="cell"></td></tr>`;
        }
        document.querySelector("#gameBoard").innerHTML = html;
    },
    findPairs: (cells) => {
        let foundPairs = [];
        t3Game.winningCells.forEach(winningSet=>{
            let count = 0;
            //might be a problem here!
            cells.forEach((cell)=>{
                if (winningSet.includes(cell)) { count++; }
                if (count == 2) { foundPairs.push(winningSet)}
            })
        });
        return foundPairs;
    },
    move: () => {
        let playerWin = t3Game.winCheck(t3Game.playerCells);
        if (playerWin.length > 0) { t3Game.win = true; t3Game.infoText = "you win!"; t3Game.gameOver = true; t3Game.updateBoard(); return; }
        let possibleMoves = [];
        let allPairs = [];
        allPairs = allPairs.concat(t3Game.findPairs(t3Game.computerCells),t3Game.findPairs(t3Game.playerCells));
        if (allPairs.length > 0) { 
            allPairs.forEach((e)=>{
                e.forEach((i)=>{
                    if (!t3Game.computerCells.includes(i) && !t3Game.playerCells.includes(i)) {
                        possibleMoves.push(i);
                    }
                });
            });
        }
        let bestMoves = [5,1,3,7,9,2,4,6,8];
        if (t3Game.difficulty == "easy") { bestMoves = bestMoves.reverse(); }
        if (t3Game.playerCells.length == 0 && t3Game.computerCells.length == 0) { 
            if (t3Game.difficulty == "easy") { 
                t3Game.computerCells.push(bestMoves[Math.ceil(Math.random()*(bestMoves.length-1))]); 
            }
            if (t3Game.difficulty == "hard") { t3Game.computerCells.push(bestMoves[0]); }
            t3Game.updateBoard(); return;
        }
        bestMoves.forEach(e=>{
            if (!t3Game.computerCells.includes(e) && !t3Game.playerCells.includes(e) && !possibleMoves.includes(e)) { possibleMoves.push(e); }
        });
        if (possibleMoves[0]) { t3Game.computerCells.push(possibleMoves[0]); }
        if (t3Game.winCheck(t3Game.computerCells).length>0) { 
            t3Game.infoText = "you lost!"; t3Game.win = false; t3Game.gameOver = true;
        }
        if (t3Game.computerCells.length + t3Game.playerCells.length == 9) { t3Game.infoText = "nobody won"; t3Game.win = null; }
        t3Game.updateBoard();
    },
    pInput:(cell)=>{
        let cellNumber = parseInt(cell);
        if (t3Game.playerCells.includes(cellNumber) || t3Game.computerCells.includes(cellNumber) || t3Game.gameOver == true) { return; }
        else { t3Game.playerCells.push(cellNumber); t3Game.move(); }
    },
    setFirstHuman:()=>{
        if (t3Game.first != "human") {
            t3Game.first = "human";
            document.querySelector("#firstHuman").className = "selected";
            document.querySelector("#firstComputer").className = "";
        }
    },
    setFirstComputer:()=>{
        if (t3Game.first != "computer") {
            t3Game.first = "computer";
            document.querySelector("#firstHuman").className = "";
            document.querySelector("#firstComputer").className = "selected";
        }
    },
    setDifficultyEasy:()=>{
        if (t3Game.difficulty != "easy") {
            t3Game.difficulty = "easy";
            document.querySelector("#difficultyEasy").className = "selected";
            document.querySelector("#difficultyHard").className = "";
        }
    },
    setDifficultyHard:()=>{
        if (t3Game.difficulty != "hard") {
            t3Game.difficulty = "hard";
            document.querySelector("#difficultyEasy").className = "";
            document.querySelector("#difficultyHard").className = "selected";
        }
    },
    setSymbolX:()=>{
        if (t3Game.symbol != "X") {
            t3Game.symbol = "X";
            document.querySelector("#symbolX").className = "selected";
            document.querySelector("#symbolO").className = "";
        }
    },
    setSymbolO:()=>{
        if (t3Game.symbol != "O") {
            t3Game.symbol = "O";
            document.querySelector("#symbolX").className = "";
            document.querySelector("#symbolO").className = "selected";
        }
    },
    updateBoard: ()=>{
        document.querySelector("#infoText").innerText = t3Game.infoText;
        for (let i=1;i<10;i++){
            let symbol = ` `;
            if (t3Game.playerCells.includes(i)) { 
                symbol = t3Game.symbol; 
            }
            if (t3Game.computerCells.includes(i)) { 
                symbol = (t3Game.symbol == "X") ? "O" : "X"; 
            }
            document.querySelector(`#cell${i}`).innerText = symbol;
        }
        if (t3Game.win != null) {
            let winningCells = (t3Game.win == true) ? t3Game.winCheck(t3Game.playerCells) : t3Game.winCheck(t3Game.computerCells);
            //highlight winning cells
            let winningColor = (t3Game.win == true) ? "var(--c6)" : "var(--c7)";
            winningCells.forEach(i=>{
                i.forEach(j=>{
                    document.querySelector(`#cell${j}`).style.color = winningColor;
                })
                
            })
        }
    },
    winCheck:(cells)=>{
        let foundWin = [];
        t3Game.winningCells.forEach((e)=>{
            if (cells.includes(e[0]) && cells.includes(e[1]) && cells.includes(e[2])) {
                foundWin.push(e);
            }
        });
        return foundWin;
    },
}

window.addEventListener('load',()=>{
    globals.stars = drawStars();
    t3Game.initialize();
});
window.addEventListener('click',(e)=>{
    let tID = e.target.id;
    switch(tID) {
        case "firstHuman": t3Game.setFirstHuman(); break;
        case "firstComputer": t3Game.setFirstComputer(); break;
        case "difficultyEasy": t3Game.setDifficultyEasy(); break;
        case "difficultyHard": t3Game.setDifficultyHard(); break;
        case "symbolX": t3Game.setSymbolX(); break;
        case "symbolO": t3Game.setSymbolO(); break;
    }
    if (tID.slice(0,4) == "cell") {
        t3Game.pInput(tID.slice(4,5));
    }
    if (tID == "newGame") {
        t3Game.initialize();
        if (t3Game.first == "computer") {
            t3Game.move();
        }
    }
})