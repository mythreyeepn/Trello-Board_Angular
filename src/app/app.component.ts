import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor() {
  }

  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      "Some random idea",
      "This is another random idea",
      "build an awesome application"
    ]),
    new Column('Research', [
      "Lorem ipsum",
      "foo",
      "Random"
    ]),
    new Column('Todo', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]),
    new Column('Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ])
  ]);

  ngOnInit() {
    if (localStorage.getItem('dataSource')) {
      this.board.columns = JSON.parse(localStorage.getItem('dataSource'));
    } else {
      localStorage.setItem('dataSource', JSON.stringify(this.board.columns));
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  addNote(name) {
    this.board.columns = JSON.parse(localStorage.getItem('dataSource'));
    let textToAdd = prompt();
    if (textToAdd) {
      this.board.columns.map((colName) => {
        if (colName.name == name) {
          colName.tasks.push(textToAdd);
        }
      })
      localStorage.setItem('dataSource', JSON.stringify(this.board.columns));
    }

  }
  arrowClick(newIndex, index, item, colindex) {
    this.board.columns = JSON.parse(localStorage.getItem('dataSource'));
    this.board.columns[newIndex].tasks.push(item)
    this.board.columns[index].tasks.splice(colindex, 1)
    localStorage.setItem('dataSource', JSON.stringify(this.board.columns));
  }

}