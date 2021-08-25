import React, {useRef} from "react";
import './Todos.css';


export const Todos = () => {
  const [newTodoInput, setNewTodoInput] = React.useState("");
  const [todos, setTodos] = React.useState(["hello there", "general kenobi"]);

  const addInput = useRef<HTMLInputElement>(null);

  const focusAddTodoInput = () =>{
    if(addInput.current)
    {
      addInput.current.focus();  
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodoInput){
      focusAddTodoInput();
      return;
    }

    const todostemp = [newTodoInput, ...todos];
    setTodos(todostemp);
    setNewTodoInput("");

    focusAddTodoInput();
  };

  const removeTodo = (removeIndex: number) => {
    const todostemp = todos.filter((_, index) => index !== removeIndex);
    setTodos(todostemp);
  };

  return (
    <div className="main">
      <h2>Todo</h2>
      <form id="newTodoForm" onSubmit={onSubmit} >
        <input
          type="text"
          name="newTodoInput"
          id="newTodoInput"
          ref={addInput}
          value={newTodoInput}
          onChange={(e) => setNewTodoInput(e.target.value)}
          placeholder="Fix the thing.."
        />
        <button
          id="addTodoButton"
          type="submit"
        >
          Add
        </button>
      </form>
      <div>
        {todos.length === 0 && (
          <div>Add some todos</div>
        )}
        {todos.map((todo, i) => (
          <div
            key={`${todo}-${i}`}
            className="todoItem"
          >
            <span className="todoItemText">{todo}</span>
            <span className="todoItemButton" onClick={() => removeTodo(i)}>
              &times;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};