class TicTacToe {

    constructor(playerOne, playerTwo) {
        this.state = [[' ',' ',' '],
                      [' ',' ',' '],
                      [' ',' ',' ']];
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.currentMove = 1;
        this.allowedMoves = ['a0', 'a1', 'a2', 'b0', 'b1', 'b2', 'c0', 'c1', 'c2'];
        this.gameOver = false;
        this.totalMoves = 0;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    getTotalMoves() {
        return this.totalMoves;
    }

    setTotalMoves(moves) {
        this.totalMoves = moves;
    }

    printGame() {
        let gameString = this.state[0][0] + ' | ' + this.state[0][1] + ' | ' + this.state[0][2] + '\n' +
                         '---------' + '\n' + 
                         this.state[1][0] + ' | ' + this.state[1][1] + ' | ' + this.state[1][2] + '\n' +
                         '---------' + '\n' + 
                         this.state[2][0] + ' | ' + this.state[2][1] + ' | ' + this.state[2][2] + '\n';

        return gameString;
    }

    normalizeMove(move) {
        let normalized_move = (move.charCodeAt(0) - 97).toString() + move[1];
        return normalized_move;
    }

    checkTurn(player) {
        if (player == this.playerOne && this.currentMove == 0)
            return true;
        else if (player == this.playerTwo && this.currentMove == 1)
            return true;
        else
            return false;
    }

    checkSpot(move) {
        let normalized_move = this.normalizeMove(move);

        if (this.state[normalized_move[0]][normalized_move[1]] == ' ')
            return true;
        else
            return false;
    }

    checkMove(move) {
        if (this.allowedMoves.includes(move))
            if (this.checkSpot(move))
                return 1;
            else
                return 0;
        else
            return 2;
    }

    checkGame() {
        //TODO: algorithm to check if there is game victory
        let game = this.state; 
        
        //checks vertical victories
        for (let i = 0; i < game.length; i++) {
            if (game[0][i] == 'x' || game[0][i] == 'o') {
                if (game[0][i] == game[1][i] && game[1][i] == game[2][i]) {
                    return true;
                }
            }
        }
        //checks horizontal victories
        for (let i = 0; i < game.length; i++) {
            if (game[i][0] == 'x' || game[i][0] == 'o') {
                if (game[i][0] == game[i][1] && game[i][1] == game[i][2]) {
                    return true;
                }
            }
        }
        //checks left diagonal win
        if (game[0][0] == 'x' || game[0][0] == 'o') {
            if (game[0][0] == game[1][1] && game[1][1] == game[2][2]) {
                return true;
            }
        }
        //checks right diagonal win
        if (game[2][0] == 'x' || game[2][0] == 'o') {
            if (game[2][0] == game[1][1] && game[1][1] == game[0][2]) {
                return true;
            }
        }
        
        //if no winnter on check return false
        return false;

    }

    //TODO: clean this up, this function is god awful and needs to be cleaned and organized...but it still works
    makeMove(player, move) {
        if (!this.checkTurn(player)) {
           return "It is not your turn!"; 
        }
        if (this.checkMove(move) != 1) {
            if (this.checkMove == 2)
                return `This is not a valid move, please enter ${this.allowedMoves.toString()}`;
            return `This spot is already filled, use printGame to see the board state`;
        }
        
        let normalized_move = this.normalizeMove(move);
        let new_state = this.state;

        if (this.currentMove == 0) {
            this.currentMove = 1;
            new_state[normalized_move[0]][normalized_move[1]] = 'o'; 
        }
        else {
            this.currentMove = 0;
            new_state[normalized_move[0]][normalized_move[1]] = 'x'; 
        }

        this.setState(new_state);
        if (this.getTotalMoves() <= 9) {
            this.setTotalMoves(this.totalMoves + 1);
        }
        else {
            this.gameOver = true;
            return `My-...oops I mean cat's game!`;
        }   
        
        if (this.checkGame()) {
            this.gameOver = true;
        }
        
        return this.printGame();     
    }
}

module.exports = TicTacToe;