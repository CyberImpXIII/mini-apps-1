import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            board : new Array(42).fill(null),
            whosTurn: "red",
            winner: null
        }
        this.clickHandler = this.clickHandler.bind(this);
    };

    clickHandler(column){
        if(!this.state.winner)
        for(let i = 41-(7-column); i >= 0; i = i-7){
            if(!this.state.board[i]){
                let newState = this.state.board.slice();
                newState[i] = this.state.whosTurn;
                this.setState({board: newState}, ()=>{
                    if(this.verticalCheck()){console.log(this.horizontalCheck())};
                    if(this.horizontalCheck()){console.log(this.verticalCheck())};
                    if(this.diagonalMinorCheck()){console.log(this.diagonalMinorCheck())};
                    if(this.diagonalMajorCheck()){console.log(this.diagonalMajorCheck())};
                    if(this.tieChecker()){console.log(this.tieChecker())}
                });
                this.nextTurn();
                break;
            }
        }
    }

    nextTurn(){
        if (this.state.whosTurn === "red"){
            this.setState({whosTurn: "blue"});
        }else{
            this.setState({whosTurn: "red"});
        }
    }

    horizontalCheck(){
        for(let i = 0; i < this.state.board.length ; i+=7){
            let count = 0;
            let color = null;
            for(let j = 0; j < 7; j++){
                    color === this.state.board[i+j] ? count++ : (color = this.state.board[i+j], count = 1);
                    if (count >=4 && color != null){
                        this.setState({winner: color});
                    }
            }
        }
    }

    verticalCheck(){
        for(let i = 0; i < 7 ; i++){
            let count = 0;
            let color = null;
            for(let j = 0; j < this.state.board.length; j+=7){
                    color === this.state.board[i+j] ? count++ : (color = this.state.board[i+j], count = 1);
                    if (count >=4 && color != null){
                        this.setState({winner: color});
                    }
            }
        }
    }

    diagonalMinorCheck(){
        for(let i = 0; i < 7 ; i++){
            let count = 0;
            let color = null;
            for(let j = 0; j < this.state.board.length; j+=8){
                    color === this.state.board[i+j] ? count++ : (color = this.state.board[i+j], count = 1);
                    if (count >=4 && color != null){
                        this.setState({winner: color});
                    }
            }
        }
        for(let i = 7; i < 7 ; i+=7){
            let count = 0;
            let color = null;
            for(let j = 0; j < this.state.board.length; j+=8){
                    color === this.state.board[i+j] ? count++ : (color = this.state.board[i+j], count = 1);
                    if (count >=4 && color != null){
                        this.setState({winner: color});
                    }
            }
        }
    }

    diagonalMajorCheck(){
        for(let i = 6; i >= 0 ; i--){
            let count = 0;
            let color = null;
            for(let j = 0; j < this.state.board.length; j+=6){
                    color === this.state.board[i+j] ? count++ : (color = this.state.board[i+j], count = 1);
                    if (count >=4 && color != null){
                        this.setState({winner: color});
                    }
            }
        }
        for(let i = 13; i < this.state.board.length; i+=7){
            let count = 0;
            let color = null;
            for(let j = 0; j < this.state.board.length; j+=6){
                    color === this.state.board[i+j] ? count++ : (color = this.state.board[i+j], count = 1);
                    if (count >=4 && color != null){
                        this.setState({winner: color});
                    }
            }
        }
    }

    tieChecker(){
        if(!this.state.board.includes(null)){
            this.setState({winner : "tie"});
            console.log('tie');
        }
    }

    render(){
        return(
            <div id='boardcontainer'>
                {this.state.board.map((val, i, arr)=>{
                    return(
                        <Box column={i%7+1} row={Math.floor(i/7)+1} position={i+1} key={i} clickHandler={this.clickHandler} color={val}/>
                    )
                }
                )}
            </div>
        );
    }
}

function Box(props){
    return(

        <div id={props.position} onClick={()=>{props.clickHandler(props.column)}} className={`row${props.row} column${props.column} ${props.color} box`}>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
