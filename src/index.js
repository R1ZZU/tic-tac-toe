import { GameState, getWinner, turn, isGameFinished } from './game-state.js';
import { setupCanvas } from './canvas-setup.js';
import { draw } from './renderer.js';

function* gameLoop(gameState) {
    let winner = -1;

    while (winner < 0 && !isGameFinished(gameState)) {
        const [rowIndex, colIndex] = yield;
        turn(gameState, rowIndex, colIndex);

        winner = getWinner(gameState);
    }

    setTimeout(() => {
        if (winner < 0) {
            alert(`It's a draw`);
        } else {
            alert(`Congratulations, ${['X', 'O'][winner]}! You won!`);
        }
    });
}

const game = gameLoop(GameState);
game.next();

const { canvas, ctx } = setupCanvas();

draw(canvas, ctx, GameState);

canvas.addEventListener('click', ({ layerX, layerY }) => {
    const row = Math.floor(layerY / canvas.height * 100 / 33);
    const col = Math.floor(layerX / canvas.width * 100 / 33);

    game.next([row, col]);
    draw(canvas, ctx, GameState);
});
