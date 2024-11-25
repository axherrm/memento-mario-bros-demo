import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Direction} from '../types.dts';

enum JumpingDirection {
  UP,
  DOWN,
  NONE
}

@Component({
  selector: 'mario',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './mario.component.html',
  styleUrl: './mario.component.scss'
})
export class Mario {

  private static moveSpeed: number = 5;
  private static baseY: number = 10;
  private static maxJumpHeight: number = 120;
  private static jumpFactor: number = 0.2;
  private static maxX: number = 682;

  jumpingDirection: JumpingDirection = JumpingDirection.NONE;
  position!: {
    x: number;
    y: number;
  };
  lives: number = 5;
  coins: number = 0;

  constructor() {
    this.position = {
      x: 0,
      y: Mario.baseY,
    }
    setInterval(() => this.computeJumpHeight(), 30)
  }

  private setHeightSafe(newHeight: number) {
    this.position.y = Math.min(Math.max(Mario.baseY, newHeight), Mario.maxJumpHeight);
    this.checkEnvironmentEvent();
  }

  private setXSafe(newX: number) {
    this.position.x = Math.min(Math.max(0, newX), Mario.maxX);
    this.checkEnvironmentEvent();
  }

  private checkEnvironmentEvent() {
    if (Math.abs(this.position.x - 502) < Mario.moveSpeed / 2 && this.position.y === Mario.baseY) {
      this.lives = Math.max(this.lives - 1, 0);
      return;
    }
    if (Math.abs(this.position.x - 305) < Mario.moveSpeed / 2 && this.position.y === Mario.baseY) {
      this.coins++;
    }
  }

  public move(direction: Direction) {
    switch (direction) {
      case Direction.LEFT:
        this.setXSafe(this.position.x - Mario.moveSpeed)
        break;
      case Direction.RIGHT:
        this.setXSafe(this.position.x + Mario.moveSpeed)
        break;
    }
  }

  public jump() {
    if (this.jumpingDirection !== JumpingDirection.NONE) {
      return;
    }
    this.jumpingDirection = JumpingDirection.UP;
  }

  private computeJumpHeight() {
    if (this.jumpingDirection === JumpingDirection.NONE) {
      return;
    }
    const distanceToMaxHeight = this.computeDistanceToMaxHeight();
    if (this.jumpingDirection === JumpingDirection.UP) {
      if (distanceToMaxHeight > 10) {
        this.computeRise();
      } else {
        this.jumpingDirection = JumpingDirection.DOWN;
        this.computeFall();
      }
    } else if (this.jumpingDirection === JumpingDirection.DOWN) {
      if (this.position.y > Mario.baseY) {
        this.computeFall();
      } else {
        this.jumpingDirection = JumpingDirection.NONE;
      }
    }
  }

  private computeDistanceToMaxHeight(): number {
    return Math.abs(this.position.y - Mario.maxJumpHeight);
  }

  private computeFall() {
    this.setHeightSafe(this.position.y - this.computeDistanceToMaxHeight() * Mario.jumpFactor);
  }

  private computeRise() {
    this.setHeightSafe(this.position.y + (this.computeDistanceToMaxHeight() * Mario.jumpFactor))
  }

}
