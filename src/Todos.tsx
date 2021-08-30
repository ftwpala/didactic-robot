import React, { useRef } from "react";
import { TodoItem, TodoStatus } from "./TodoItem";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./ReactDatePicker.css";
import "./Todos.css";

import cyclePng from "./images/Cycle.png";

export const Todos = () => {
  const [newTodoInput, setNewTodoInput] = React.useState("");
  const [deadlineDate, setDeadlineDate] = React.useState<Date>();

  let todo1: TodoItem = { text: "Hello there!", itemStatus: TodoStatus.Todo };
  let todo2: TodoItem = {
    text: "General Kenobi!",
    itemStatus: TodoStatus.Todo,
  };
  let todoWithDate1: TodoItem = {
    text: "*Pulls out 4 lightsabers like an absolute MADMAN*",
    itemStatus: TodoStatus.Todo,
    itemDeadline: new Date(),
  };

  let Date2025 = new Date();
  Date2025.setFullYear(2025);

  let todoWithDate2: TodoItem = {
    text: "*Spins like a bayblade*",
    itemStatus: TodoStatus.Todo,
    itemDeadline: Date2025,
  };

  const [todos, setTodos] = React.useState([
    todo1,
    todo2,
    todoWithDate1,
    todoWithDate2,
  ]);

  const addInput = useRef<HTMLInputElement>(null);

  const focusAddTodoInput = () => {
    if (addInput.current) {
      addInput.current.focus();
    }
  };

  const isDeadlineClose = (date: Date) => {
    var Difference_In_Time = new Date().getTime() - date.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days > -7;
  };

  const cycleStatus = (itemIndex: number) => {
    let tempTodos = todos;
    let tempTodo = todos[itemIndex]; // get the object

    switch (tempTodo.itemStatus) {
      case TodoStatus.Todo:
        tempTodo.itemStatus = TodoStatus.InProgress;
        break;
      case TodoStatus.InProgress:
        tempTodo.itemStatus = TodoStatus.Done;
        break;
      case TodoStatus.Done:
        tempTodo.itemStatus = TodoStatus.Todo;
        break;
    }

    tempTodos[itemIndex] = tempTodo; //change the object at the specified position with our modified object

    setTodos([...tempTodos]); // spread the array to trigger a re-render
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodoInput) {
      focusAddTodoInput();
      return;
    }

    let newTodo: TodoItem = {
      text: newTodoInput,
      itemStatus: TodoStatus.Todo,
      itemDeadline: deadlineDate,
    };

    const todostemp = [newTodo, ...todos];
    setTodos(todostemp);
    setNewTodoInput("");

    focusAddTodoInput();
  };

  const removeTodo = (removeIndex: number) => {
    const todostemp = todos.filter((_, index) => index !== removeIndex);
    setTodos(todostemp);
  };

  return (
    <div className="col-lg-8 offset-lg-2 col-md-12 p-2">
      <h2>Todo</h2>
      <form id="newTodoForm" onSubmit={onSubmit} className="col-12">
        <input
          type="text"
          name="newTodoInput"
          id="newTodoInput"
          ref={addInput}
          value={newTodoInput}
          onChange={(e) => setNewTodoInput(e.target.value)}
          placeholder="Describe your note!"
          className="col-6"
        />
        <DatePicker
          selected={deadlineDate}
          onChange={(date: Date) => setDeadlineDate(date!)}
          placeholderText="Set a deadline!"
          className="col-5"
        />{" "}
        <button
          id="addTodoButton"
          type="submit"
          className="btn btn-primary col-1"
        >
          Add
        </button>
      </form>
      {todos.length === 0 && <div>Add some todos</div>}
      {todos.map((todo, i) => (
        <div
          key={`${todo}-${i}`}
          className={`col-12 d-flex todoItem todoStatus_${
            todo.itemStatus === "In Progress" ? "InProgress" : todo.itemStatus
          } ${
            todo.itemDeadline && isDeadlineClose(todo.itemDeadline)
              ? "deadline_close"
              : ""
          }`}
        >
          <span className="col-6 todoItemText">{todo.text}</span>
          <span
            className="col-3 todoItemStatusText"
            onClick={() => cycleStatus(i)}
          >
            {todo.itemStatus}
            <img
              className="mx-1"
              width="15px"
              height="15px"
              src={cyclePng}
              alt="Cycle Status"
            />
          </span>
          <span className="col-2">
            {todo.itemDeadline ? (
              <>{new Intl.DateTimeFormat().format(todo.itemDeadline)}</>
            ) : (
              <></>
            )}
          </span>
          <span
            className="todoItemButton col-1 text-center"
            onClick={() => removeTodo(i)}
          >
            &times;
          </span>
        </div>
      ))}
    </div>
  );
};
