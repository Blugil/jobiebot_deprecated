class  TicTacToe {

    consructor(playerOne, playerTwo) {
        this.state = [[' ',' ',' '],
                      [' ',' ',' '],
                      [' ',' ',' ']];
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.currentMove = playerTwo;
        this.allowedMoves = ['a0', 'a1', 'a2', 'b0', 'b1', 'b2', 'c0', 'c1', 'c2'];
        this.gameOver = false;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    printGame() {
        let gameString = state[0][0] + ' | ' + state[0][1] + ' | ' + state[0][2] + '\n'
                         state[1][0] + ' | ' + state[1][1] + ' | ' + state[1][2] + '\n'
                         state[2][0] + ' | ' + state[2][1] + ' | ' + state[2][2] + '\n';

        return gameString;
    }

    checkTurn(player) {
        if (player == this.currentMove)
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

    normalizeMove(move) {
        let normalized_move = (char)(move.charCodeAt(0) - 97) + move[1];
        return normalized_move;
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

    makeMove(player, move) {
        if (!this.checkTurn(player)) {
           return "It is not your turn!"; 
        }
        if (this.checkMove(move) > 0) {
            if (this.checkMove == 2)
                return `This is not a valid move, please enter ${this.allowedMoves.toString()}`;
            return `This spot is already filled, use printGame to see the board state`;
        }
        
        let normalized_move = this.normalizeMove(move);
        let piece = '';
        if (player == this.playerOne) {
            this.currentMove = playerTwo;
            piece = 'x';
        }
        else {
            this.currentMove = this.playerOne;
            piece = 'o';
        }

        let new_state = this.getState();

        new_state[normalized_move[0]][normalized_move[1]] = piece; 

        this.setState(new_state);
        return this.printGame();     
    }
}

module.exports = TicTacToe;