import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { generateGrid, NUM_OF_COLUMNS } from './generateGrid';
import { filter, fromEvent, merge, switchMap, tap } from 'rxjs';

import { GameService } from './game/services/game.service';

const state = {
  gameOver: false,
  cells: [...generateGrid()],
};

const initialState = {
  level: 1,
  speed: 500,
  previousBlock: { x: 0, y: 0, id: 0 },
  gameOver: false,
  score: 0,
  highScore: 0,
  update: { x: 0, y: 0, id: 0 },
  blocks: [],
  // cells: state.cells,
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
  currentBlockId = 0;

  get grid() {
    return [...state.cells];
  }

  button = document.querySelectorAll('body');
  gameEvents$ = merge(
    fromEvent(this.button, 'click'),
    fromEvent(document, 'keyup').pipe(
      tap(console.log),
      filter((e: KeyboardEvent) => e.code === 'Space')
    )
  );

  gamePlay$ = this.gameEvents$.pipe(
    switchMap(() => this.gameService.blockMovement$)
  );

  constructor(private gameService: GameService) {}

  ngAfterViewInit() {
    this.gamePlay$.subscribe((update) => {
      this.currentBlockId = update.id;
    });
  }
}
