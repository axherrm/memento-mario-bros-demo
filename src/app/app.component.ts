import {Component, HostListener, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {Mario} from './mario/mario.component';
import {Direction} from './types.dts';
import {HistoryComponent} from './history/history.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, Mario, HistoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild(Mario)
  mario!: Mario;

  aPressed = false;
  dPressed = false;

  constructor() {
    setInterval(() => this.refreshMove(), 10)
  }

  @HostListener('window:keydown.d', ['$event'])
  handleKeydownD(event: KeyboardEvent) {
    this.dPressed = true;
    // this.mario.move(Direction.RIGHT);
  }

  @HostListener('window:keyup.d', ['$event'])
  handleKeyupD(event: KeyboardEvent) {
    this.dPressed = false;
  }

  @HostListener('window:keydown.a', ['$event'])
  handleKeydownA(event: KeyboardEvent) {
    // this.mario.move(Direction.LEFT);
    this.aPressed = true;
  }

  @HostListener('window:keyup.a', ['$event'])
  handleKeyupA(event: KeyboardEvent) {
    this.aPressed = false;
  }

  private refreshMove() {
    if (this.aPressed) {
      this.mario.move(Direction.LEFT);
    }
    if (this.dPressed) {
      this.mario.move(Direction.RIGHT);
    }
  }

  @HostListener('window:keydown.space', ['$event'])
  handleSpace(event: KeyboardEvent) {
    this.mario.jump();
  }


}
