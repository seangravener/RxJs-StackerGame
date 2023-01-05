import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { generateGrid, NUM_OF_COLUMNS } from './generateGrid';
import { combineLatest, fromEvent, interval, map, scan, timer } from 'rxjs';

type GridCoords = [number, number];

const state = {
  gameOver: false,
  cells: [...generateGrid()],
};

const initialState = {
  level: 1,
  speed: 500,
  previousBlockPos: { x: 0, y: 0, n: 0 },
  gameOver: false,
  blocks: [],
  score: 0,
  highScore: 0,
  update: {},
};

const blockPositions = [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;
  n = 0;

  // If x is the horizontal coordinate, location = y * NUM_OF_COLUMNS + x
  blockMovement$ = timer(0, initialState.speed).pipe(
    map((val) => {
      const index = val % blockPositions.length;
      const [x, y] = [blockPositions[index] % blockPositions.length, 5];
      const n = y * NUM_OF_COLUMNS + x;

      return { x, y, n };
    })
  );

  button = document.querySelectorAll('body');
  buttonClicks$ = fromEvent(this.button, 'click');

  // @todo init blockmovement where it can be reinitialized
  game$ = combineLatest([this.blockMovement$, this.buttonClicks$]);

  gameState$ = this.game$.pipe(
    scan((state, [update, click]) => {
      // blocks are stacked correctly, increment the level
      if (update.n === 37) {
        state = {
          ...state,
          level: state.level + 1,
          speed: state.speed + 50,
        };
      }

      // blocks are not stacked correctly, end the game

      // update the game state with the current block position
      state = { ...state, previousBlockPos: update };

      console.log(state.previousBlockPos);
      return state;
    }, initialState)
  );

  get grid() {
    return [...state.cells];
  }

  ngAfterViewInit() {
    this.gameState$.subscribe((state) => {
      this.n = state.previousBlockPos.n;
      // console.log('state in sub: ', state);
    });
  }
}
