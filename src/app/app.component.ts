import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { generateGrid, NUM_OF_COLUMNS } from './generateGrid';

type GridCoords = [number, number];

const state = {
  gameOver: false,
  cells: [...generateGrid()],
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;

  activePosition = [[6, 2], 3];

  get grid() {
    return [...state.cells];
  }

  ngAfterViewInit() {
    console.log(this.container.nativeElement);
    console.log(state);

    this.setPosition([4, 5], 3, true);
  }

  setPosition([row, col]: GridCoords, tailLen: number, isActive: boolean) {
    console.log('all cells', state.cells);
    // const value = isActive ? 1 : 0;
    const value = tailLen;
    const position = row * NUM_OF_COLUMNS + col;

    // state.cells[position - 1] = value;
    const head = [value];
    const tail = state.cells.slice(position, position + tailLen).fill(value);

    console.log('tail', tail);
    console.log('positions', '=>', position - 1, position);
    console.log('value', head);
  }
}
