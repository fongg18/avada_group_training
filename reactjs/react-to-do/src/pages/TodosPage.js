import React, { useState, useEffect } from "react";
import { Card, Modal, TextField } from "@shopify/polaris";
import AppLayout from "../layout/AppLayout";
import TodoList from "../components/TodoList/TodoList";
import SpinnerCentered from "../components/SpinnerCentered/SpinnerCentered";
import {
  fetchTodos,
  addTodoApi,
  completeTodoApi,
  removeTodoApi
} from "../api";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const addTodo = async (text) => {
    if (!text) return;
    const added = await addTodoApi(text);
    setTodos((prev) => [...prev, added]);
    setNewTodo("");
    setModalActive(false);
  };

  const completeTodo = async (ids) => {
    const updatedTodos = await Promise.all(
      todos.map(async (todo) => {
        if (ids.includes(todo.id) && !todo.isCompleted) {
          const updated = await completeTodoApi(todo.id, todo);
          return updated;
        }
        return todo;
      })
    );
    setTodos(updatedTodos);
    setSelectedItems([]);
  };

  const removeTodo = async (ids) => {
    await Promise.all(ids.map((id) => removeTodoApi(id)));
    setTodos((prev) => prev.filter((t) => !ids.includes(t.id)));
    setSelectedItems([]);
  };

  const bulkActions = [
    {
      content: "Complete",
      onAction: () => completeTodo(selectedItems),
    },
    {
      content: "Delete",
      destructive: true,
      onAction: () => removeTodo(selectedItems),
    },
  ];

  return (
    <AppLayout
      title="Todoes"
      primaryAction={{ content: "Create", onAction: () => setModalActive(true) }}
    >
      <Card>
        {loading ? (
          <SpinnerCentered />
        ) : (
          <TodoList
            todos={todos}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            bulkActions={bulkActions}
            onComplete={completeTodo}
            onDelete={removeTodo}
          />
        )}
      </Card>
      <Modal
        open={modalActive}
        onClose={() => setModalActive(false)}
        title="Create todo"
        primaryAction={{
          content: "Add",
          onAction: () => addTodo(newTodo),
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setModalActive(false),
          },
        ]}
      >
        <Modal.Section>
          <TextField
            label="Title"
            value={newTodo}
            onChange={setNewTodo}
            autoComplete="off"
          />
        </Modal.Section>
      </Modal>
    </AppLayout>
  );
};

export default TodosPage;
