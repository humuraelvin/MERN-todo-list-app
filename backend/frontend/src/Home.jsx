import React, { useState } from "react";
import Create from "./Create";
import { useEffect } from "react";
import axios from "axios";
import {
  BsCheckCircleFill,
  BsCircleFill,
  BsFillTrashFill,
} from "react-icons/bs"; // Assuming the icons are from the 'bs' set

function Home() {
  const [todos, setTodos] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/get")
      .then((response) => setTodos(response.data)) // Set todos with response.data
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3000/update/" + id)
      .then((response) => {
        location.reload();
      }) // Set todos with response.data
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/delete/" + id)
      .then((response) => {
        location.reload();
      }) // Set todos with response.data
      .catch((err) => console.log(err));
  }

  

  return (
    <div className="home">
      <h2>To do list app</h2>
      <Create />

      {todos.length === 0 ? (
        <div>
          <h2>No records yet </h2>
        </div>
      ) : (
        todos.map((todo) => {
          return (
            <div className="task" key={todo._id}>
              <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                &nbsp; &nbsp;
                {todo.done ? (
                  <BsCheckCircleFill className="icon" />
                ) : (
                  <BsCircleFill className="icon" />
                )}
                <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
              </div>
              <div>
                <span>
                  <BsFillTrashFill
                    onClick={() => handleDelete(todo._id)}
                    className="icon"
                  />
                </span>
              </div>
            </div>
          ); // Add key prop and return JSX
        })
      )}
    </div>
  );
}

export default Home;
