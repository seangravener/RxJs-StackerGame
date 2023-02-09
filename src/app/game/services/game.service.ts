import { Injectable } from '@angular/core';
import { NUM_OF_COLUMNS } from '../../generateGrid';
import { map, scan, timer } from 'rxjs';

const initialState = {
  level: 1,
  speed: 500,
  previousBlock: { x: 0, y: 0, id: 0 },
  gameOver: false,
  score: 0,
  highScore: 0,
  update: { x: 0, y: 0, id: 0 },
  blocks: [],
};

const blockPositions = [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];

@Injectable({
  providedIn: 'root',
})
export class GameService {
  blockMovement$ = timer(0, initialState.speed).pipe(
    map((val) => {
      const index = val % blockPositions.length;
      const [x, y] = [blockPositions[index] % blockPositions.length, 5];

      /*
        @Note If x is the horizontal coordinate,
        then location === y * NUM_OF_COLUMNS + x
      */
      const id = y * NUM_OF_COLUMNS + x;

      return { x, y, id };
    })
  );

  gameState$ = this.blockMovement$.pipe(
    scan((state) => {
      // blocks are stacked correctly, increment the level
      if (state.update.id === state.previousBlock.id) {
        state = {
          ...state,
          level: state.level + 1,
          speed: state.speed + 50,
        };
      }

      // @todo blocks misaligned? End game or,
      // update the game state with the current block position
      state = { ...state, previousBlock: state.update };

      return state;
    }, initialState)
  );

  constructor() {}
}
