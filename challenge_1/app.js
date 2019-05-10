const board = {
    table : [" "," "," "," "," "," "," "," "," "],
    whosTurn : true,
    //score = [0,0],
    gameOver : false,

    resetGameState(){
        board.table = [" "," "," "," "," "," "," "," "," "];
        board.gameOver = false;
    },

    winCondition(winner){
        board.gameOver = true;
    }

}

const checker = {

    checkAll(id){
        let win;
        if(id%2===0){
            if(win = this.checkDiagonalMajor()){return win}
            if(win = this.checkDiagonalMinor()){return win}
        }
        if(win = this.checkHorizontal()){return win}
        if(win = this.checkVertical()){return win}
    },

    checkVertical(){
        for(let i = 0; i < 3; i++){
            if(board.table[i]=== "x" && board.table[i+3]=== "x" && board.table[i+6] === "x"){
                document.getElementById('x-score').innerHTML = Number(document.getElementById('x-score').innerHTML) + 1;
                return "x";
            }else if(board.table[i]=== "o" && board.table[i+3]=== "o" && board.table[i+6] === "o"){
                document.getElementById('o-score').innerHTML = Number(document.getElementById('o-score').innerHTML) + 1;
                return "o";
            }
        }
    },

    checkHorizontal(){
        for(let i = 0; i < board.table.length; i+=3){
            if(board.table[i]=== "x" && board.table[i+1]=== "x" && board.table[i+2] === "x"){
                document.getElementById('x-score').innerHTML = Number(document.getElementById('x-score').innerHTML) + 1;
                return "x";
            }else if(board.table[i]=== "o" && board.table[i+1]=== "o" && board.table[i+2] === "o"){
                document.getElementById('o-score').innerHTML = Number(document.getElementById('o-score').innerHTML) + 1;
                return "o";
            }
        }
    },

    checkDiagonalMinor(){
        if(board.table[0]==="x" && board.table[4]==="x" && board.table[8]==="x"){
            document.getElementById('x-score').innerHTML = Number(document.getElementById('x-score').innerHTML) + 1;
            return "x";
        }else if(board.table[0]==="o" && board.table[4]==="o" && board.table[8]==="o"){
            document.getElementById('o-score').innerHTML = Number(document.getElementById('o-score').innerHTML) + 1;
            return "o";
        }
    },

    checkDiagonalMajor(){
        if(board.table[2]==="x" && board.table[4]==="x" && board.table[6]==="x"){
            document.getElementById('x-score').innerHTML = Number(document.getElementById('x-score').innerHTML) + 1;
            return "x";
        }else if(board.table[2]==="o" && board.table[4]==="o" && board.table[6]==="o"){
            document.getElementById('o-score').innerHTML = Number(document.getElementById('o-score').innerHTML) + 1;
            return "o";
        }
    }
}

const eventHandler = {
    renderboard(){
        let tablestr = "";
        for(let i = 0; i <  board.table.length; i++){
            tablestr += 
            `<div id='${i}' class='column${i%3+1} row${Math.floor(i/3+1)} box' >
            ${board.table[i]}
            </div>`
        }
        document.getElementById('gameboard').innerHTML = tablestr;
        tablestr = "";
        eventHandler.boxClick(); 
    },

    resetButton(){
        document.getElementById('restart').onclick = ()=>{
            board.resetGameState()
            eventHandler.renderboard();
        }
    },

    boxClick(){
        let renderedTable = document.getElementsByClassName('box');
        for (let i =0; i < renderedTable.length; i++){
            renderedTable[i].onclick = (e)=>{
                if(!board.gameOver){
                    if(board.table[e['target']['id']]===" "){
                        board.whosTurn ? board.table[e['target']['id']] = 'x' : board.table[e['target']['id']] = 'o';
                        eventHandler.renderboard();
                        if(checker.checkAll(Number(e['target']['id']))){
                            board.winCondition();                            
                        }else{
                            board.whosTurn = !board.whosTurn;
                            if(!board.table.includes(" ")){
                                console.log('its a tie')
                            }
                        }
                    }
                }
            };
        }
    },

    nameEntry(){
        let leftname = "";
        let rightname = "";
        document.getElementById('left-player').addEventListener("keydown", (e)=>{
            if(e['key']==="Enter"){
                e.preventDefault();
                document.getElementById('left-player-input').parentNode.removeChild(document.getElementById('left-player-input'));
                document.getElementById('left-name-switch').innerHTML =leftname;
            }else if(e['key']!=="Shift"){
                leftname += e['key'];
            }
        });
        document.getElementById('right-player').addEventListener("keydown", (e)=>{
            if(e['key']==="Enter"){
                e.preventDefault();
                document.getElementById('right-player-input').parentNode.removeChild(document.getElementById('right-player-input'));
                document.getElementById('right-name-switch').innerHTML =rightname;
            }else if(e['key']!=="Shift"){
                rightname += e['key'];
            }
        });
    
    }
}

window.onload = ()=>{
    eventHandler.renderboard();
    eventHandler.resetButton();
    eventHandler.nameEntry();
};

