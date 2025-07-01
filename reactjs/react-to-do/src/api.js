const API_URL = "http://localhost:5000/api/todos";

export async function fetchTodos() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addTodoApi(text) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, isCompleted: false })
  });
  return res.json();
}

export async function completeTodoApi(id, todo) {
  const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...todo, isCompleted: true })
  });
  return res.json();
}

export async function removeTodoApi(id) {
  await fetch(`http://localhost:5000/api/todo/${id}`, { method: "DELETE" });
}