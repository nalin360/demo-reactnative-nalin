import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Taskmanager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);

    const handleAddTask = async () => {
        const response = await fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newTaskName,
            description: newTaskDescription,
            dueDate: newTaskDueDate,
            completed: false,
          }),
        });
        const task = await response.json(); // extract the JSON data from the response
        setTasks([...tasks, task]);
        /**
         * tasks state array. It creates a new array by 
         * spreading the existing tasks array ([...tasks]) 
         * and adds the new task object to the end of the array. 
         */
        setNewTaskName(''); // newTaskName
        setNewTaskDescription(''); // newTaskDescription
        setNewTaskDueDate(''); // newTaskDueDate
      };
    // -------------------------------------------------------------------------
    // const handleEditTask = async (index) => {
    //     const taskId = tasks[index]._id;
    //     const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         name: newTaskName,
    //         description: newTaskDescription,
    //         dueDate: newTaskDueDate,
    //       }),
    //     });
    //     const updatedTask = await response.json();
    //     const updatedTasks = [...tasks];
    //     updatedTasks[index] = updatedTask;
        
    //     setTasks(updatedTasks); //creates a copy of the tasks array using the spread operator 
    //     setEditingTaskIndex(null); // null, indicating that no task is currently being edited.
    //     setNewTaskName('');
    //     setNewTaskDescription('');
    //     setNewTaskDueDate('');
    //   };
    const handleEditTask = (index) => {
        setEditingTaskIndex(index);
        setNewTaskName(tasks[index].name);
        setNewTaskDescription(tasks[index].description);
        setNewTaskDueDate(tasks[index].dueDate);
    };
    //   -------------------------------------------------------------------------
    const handleUpdateTask = () => {
        const updatedTasks = [...tasks]; //creates a copy of the tasks array using the spread operator 
        updatedTasks[editingTaskIndex] = {
            ...updatedTasks[editingTaskIndex],
            /**
         * creates a new object by spreading the existing task object at that index 
         * (...updatedTasks[editingTaskIndex]) and then overwrites 
         * This line updates the task at the editingTaskIndex 
         * position in the updatedTasks array. 
         */
            name: newTaskName,
            description: newTaskDescription,
            dueDate: newTaskDueDate,
        }; 
        
        setTasks(updatedTasks);
        setEditingTaskIndex(null); // null, indicating that no task is currently being edited.
        setNewTaskName('');
        setNewTaskDescription('');
        setNewTaskDueDate('');
    };

    // ----------------------------------------------------------------------------
    const handleDeleteTask = async (index) => {
        const taskId = tasks[index]._id;
        await fetch(`http://localhost:5000/tasks/${taskId}`, {
          method: 'DELETE',
        });
        const updatedTasks = [...tasks]; // creates a copy of the tasks array 
        // Removes elements from an array
        //  splice method to remove the task at the specified index from the updatedTasks array. 
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks); //  updates the tasks state variable
      };
      
    const handleToggleCompleted = (index) => {
        const updatedTasks = [...tasks];
        // by defualt completed is false 
        // If the task was completed (true), it will be marked as incomplete (false), and vice versa.
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
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