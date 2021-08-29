interface TodoItem {
    text: string;
    itemStatus: TodoStatus;
    itemDeadline?: Date;
  }

enum TodoStatus{
  Todo = "Todo",
  InProgress = "In Progress",
  Done = "Done"
}

export { TodoStatus };
export type { TodoItem };


