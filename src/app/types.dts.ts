export enum Direction {
  LEFT,
  RIGHT
}

export interface Memento {
  timestamp: Date;
  restore: () => void;
}

export interface Originator {
  save: () => Memento;
}
