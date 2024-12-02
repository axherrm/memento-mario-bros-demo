import {Component, Input} from '@angular/core';
import {Memento} from '../types.dts';
import {Mario} from '../mario/mario.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'history',
  imports: [
    NgForOf
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  @Input({required: true})
  originator!: Mario;
  history: Array<Memento> = [];

  public save() {
    const memento = this.originator.save();
    this.history.push(memento);
  }

  public restore(targetMemento: Memento) {
    let memento;
    do {
      memento = this.history.pop();
    } while (memento && memento !== targetMemento);
    if (!memento) {
      throw new Error('Memento not found');
    }
    memento.restore();
  }

}
