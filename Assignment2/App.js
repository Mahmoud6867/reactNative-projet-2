
import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";

const App = () => {
  // Initialize an array of todos with some dummy data
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React Native", completed: false },
    { id: "2", title: "Build a todo app", completed: false },
    { id: "3", title: "Have fun", completed: true },
  ]);

  // Initialize a state for the input text
  const [text, setText] = useState("");

  // Define a function to add a new todo to the list
  const addTodo = () => {
    // Generate a random id for the new todo
    const id = Math.random().toString(36).substr(2, 9);
    // Create a new todo object with the input text and default completed status
    const newTodo = { id, title: text, completed: false };
    // Update the state with the new todo added to the array
    setTodos([...todos, newTodo]);
    // Clear the input text
    setText("");
  };

  // Define a function to toggle the completed status of a todo
  const toggleTodo = (id) => {
    // Find the index of the todo with the given id in the array
    const index = todos.findIndex((todo) => todo.id === id);
    // Copy the todo object and invert its completed status
    const updatedTodo = { ...todos[index], completed: !todos[index].completed };
    // Update the state with the updated todo replaced in the array
    setTodos([
      ...todos.slice(0, index),
      updatedTodo,
      ...todos.slice(index + 1),
    ]);
  };

  // Define a function to delete a todo from the list
  const deleteTodo = (id) => {
    // Filter out the todo with the given id from the array
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    // Update the state with the filtered array
    setTodos(updatedTodos);
  };

  // Define a function to render each item in the FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1 }}>{item.title}</Text>
        <Button
          title={item.completed ? "Done" : "Not Done"}
          onPress={() => toggleTodo(item.id)}
        />
        <Button title="Delete" onPress={() => deleteTodo(item.id)} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>To-Do List</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        style={{ borderWidth: 1, borderColor: "gray", padding: 10 }}
        value={text}
        onChangeText={(text) => setText(text)}
        placeholder="Enter a new todo"
      />
      <Button title="Add" onPress={addTodo} />
    </View>
  );
};

export default App;
