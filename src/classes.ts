import { Todo as TypeTodo } from "./types";
import { v4 as uuid } from "uuid";

export class Todo implements TypeTodo {
  id: string;
  text: string;
  isDone: boolean;

  constructor(text: string) {
    this.id = uuid();
    this.text = text;
    this.isDone = false;
  }
}
