import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { generateGrid, NUM_OF_COLUMNS } from './generateGrid';
import { combineLatest, fromEvent, interval, map, scan } from 'rxjs';

type GridCoords = [number, number];

const state = {
  gameOver: false,
  cells: [...generateGrid()],
};

// use the scan operator to keep track of the current level and the speed at which the blocks are moving
const initialState = {
  level: 1,
  speed: 1000,
  previousBlockPos: { x: 0, y: 0 },
  gameOver: false,
  // add default values for other properties
  blocks: [],
  score: 0,
  highScore: 0,
  update: {},
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;

  blockMovement$ = interval(1000).pipe(
    map((val) => {
      // calculate the position of the blocks based on the value emitted by the interval stream
      return {
        x: val % 3, // block can be in 3 positions (0, 1, 2)
        y: Math.floor(val / 3), // block can be in 3 rows (0, 1, 2)
      };
    })
  );

  button = document.querySelectorAll('body');
  buttonClicks$ = fromEvent(this.button, 'click');

  game$ = combineLatest([this.blockMovement$, this.buttonClicks$]);

  gameState$ = this.game$.pipe(
    scan((state, [update, click]) => {
      console.log(state);
      console.log(update);

      return { ...state, previousBlockPos: update };
    }, initialState)
  );

  get grid() {
    return [...state.cells];
  }

  ngAfterViewInit() {
    this.gameState$.subscribe((state) => {
      // console.log('state in sub: ', state);
    });
  }
}
