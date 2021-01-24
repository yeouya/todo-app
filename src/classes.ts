import { v4 as uuid } from "uuid";

export class TodoItem implements Todo {
  id: string;
  text: string;
  isDone: boolean;
  currentTime: string;

  constructor(text: string) {
    this.id = uuid();
    this.text = text;
    this.isDone = false;
    this.currentTime = new Date().toLocaleString();
  }
}
