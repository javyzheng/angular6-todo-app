import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc = '';

  constructor(
    private service: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let filter = params['filter'];
      this.filterTodos(filter);
    });
  }
  addTodo(){
    this.service
      .addTodo(this.desc)
      .then(todo => {
        this.todos = [...this.todos, todo];
        this.desc = '';
      });
  }
  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .toggleTodo(todo)
      .then(t => {
        this.todos = [
          ...this.todos.slice(0,i),
          t,
          ...this.todos.slice(i+1)
          ];
      });
  }
  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .deleteTodoById(todo.id)
      .then(()=> {
        this.todos = [
          ...this.todos.slice(0,i),
          ...this.todos.slice(i+1)
        ];
      });
  }

  filterTodos(filter: string): void {
    this.service
      .filterTodos(filter)
      .then(todos => this.todos = [...todos]);
  }

  onTextChanges(value) {
    this.desc = value;
  }
}
