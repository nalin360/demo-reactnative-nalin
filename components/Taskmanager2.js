import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firestore from '../config/firebase'; // Update the path based on your file location

const Taskmanager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('tasks')
      .onSnapshot((querySnapshot) => {
        const tasks = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTasks(tasks);
      });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async () => {
    const newTask = {
      name: newTaskName,
      description: newTaskDescription,
      dueDate: newTaskDueDate,
      completed: false,
    };
    await firestore().collection('tasks').add(newTask);
    setNewTaskName('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
  };

  const handleEditTask = (index) => {
    setEditingTaskIndex(index);
    setNewTaskName(tasks[index].name);
    setNewTaskDescription(tasks[index].description);
    setNewTaskDueDate(tasks[index].dueDate);
  };

  const handleUpdateTask = async () => {
    const updatedTask = {
      name: newTaskName,
      description: newTaskDescription,
      dueDate: newTaskDueDate,
    };
    await firestore().collection('tasks').doc(tasks[editingTaskIndex].id).update(updatedTask);
    setEditingTaskIndex(null);
    setNewTaskName('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
  };

  const handleDeleteTask = async (index) => {
    await firestore().collection('tasks').doc(tasks[index].id).delete();
  };

  const handleToggleCompleted = async (index) => {
    await firestore()
      .collection('tasks')
      .doc(tasks[index].id)
      .update({ completed: !tasks[index].completed });
  };

  return (
    <View>
      <TextInput
        value={newTaskName}
        onChangeText={setNewTaskName}
        placeholder="Enter task name"
      />
      <TextInput
        value={newTaskDescription}
        onChangeText={setNewTaskDescription}
        placeholder="Enter task description"
      />
      <TextInput
        value={newTaskDueDate}
        onChangeText={setNewTaskDueDate}
        placeholder="Enter task due date"
      />
      {editingTaskIndex === null ? (
        <Button title="Add Task" onPress={handleAddTask} />
      ) : (
        <Button title="Update Task" onPress={handleUpdateTask} />
      )}
      {tasks.map((task, index) => (
        <View key={task.name}>
          <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
            {task.name}
          </Text>
          <Text>{task.description}</Text>
          <Text>Due: {task.dueDate}</Text>
          <Button title="Edit" onPress={() => handleEditTask(index)} />
          <Button title="Delete" onPress={() => handleDeleteTask(index)} />
          <Button
            title={task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
            onPress={() => handleToggleCompleted(index)}
          />
        </View>
      ))}
    </View>
  );
};

export default Taskmanager;
