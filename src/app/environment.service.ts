import { Injectable } from '@angular/core';
import {Mario} from './mario/mario.component';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private sounds: {
    coin: HTMLAudioElement,
    lostALife: HTMLAudioElement,
    gameOver: HTMLAudioElement,
  }

  constructor() {
    this.sounds = {
      coin: new Audio(),
      lostALife: new Audio(),
      gameOver: new Audio(),
    }
    this.sounds.coin.src = "coin.wav";
    this.sounds.coin.load();
    this.sounds.lostALife.src = "lost_a_life.wav";
    this.sounds.lostALife.load();
    this.sounds.gameOver.src = "game_over.wav";
    this.sounds.gameOver.load();
  }

  public checkForEvent(mario: Mario) {
    if (Math.abs(mario.position.x - 470) < Mario.MOVE_SPEED / 2 && mario.position.y === Mario.BASE_Y) {
      if (mario.lives > 1) {
        this.sounds.lostALife.play();
      } else {
        this.sounds.gameOver.play();
      }
      mario.lives = Math.max(mario.lives - 1, 0);
      return;
    }
    if (Math.abs(mario.position.x - 270) < Mario.MOVE_SPEED / 2 && mario.position.y === Mario.BASE_Y) {
      mario.coins++;
      this.sounds.coin.play();
    }
  }
}
