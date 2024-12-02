import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Direction} from '../types.dts';
import {EnvironmentService} from '../environment.service';

enum JumpingDirection {
  UP,
  DOWN,
  NONE
}

export interface Position {
  x: number;
  y: number;
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

  public static MOVE_SPEED: number = 5;
  public static BASE_Y: number = 10;
  public static MAX_JUMP_HEIGHT: number = 120;
  public static JUMP_FACTOR: number = 0.2;
  public static MAX_X: number = 682;

  jumpingDirection: JumpingDirection = JumpingDirection.NONE;
  position!: Position;
  lives: number = 5;
  coins: number = 0;

  constructor(readonly environmentService: EnvironmentService) {
    this.position = {
      x: 0,
      y: Mario.BASE_Y,
    }
    setInterval(() => this.computeJumpHeight(), 30)
  }

  private setHeightSafe(newHeight: number) {
    this.position.y = Math.min(Math.max(Mario.BASE_Y, newHeight), Mario.MAX_JUMP_HEIGHT);
    this.environmentService.checkForEvent(this);
  }

  private setXSafe(newX: number) {
    this.position.x = Math.min(Math.max(0, newX), Mario.MAX_X);
    this.environmentService.checkForEvent(this);
  }

  public move(direction: Direction) {
    switch (direction) {
      case Direction.LEFT:
        this.setXSafe(this.position.x - Mario.MOVE_SPEED)
        break;
      case Direction.RIGHT:
        this.setXSafe(this.position.x + Mario.MOVE_SPEED)
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
      if (this.position.y > Mario.BASE_Y) {
        this.computeFall();
      } else {
        this.jumpingDirection = JumpingDirection.NONE;
      }
    }
  }

  private computeDistanceToMaxHeight(): number {
    return Math.abs(this.position.y - Mario.MAX_JUMP_HEIGHT);
  }

  private computeFall() {
    this.setHeightSafe(this.position.y - this.computeDistanceToMaxHeight() * Mario.JUMP_FACTOR);
  }

  private computeRise() {
    this.setHeightSafe(this.position.y + (this.computeDistanceToMaxHeight() * Mario.JUMP_FACTOR))
  }

}
