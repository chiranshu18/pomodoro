import Task from "./task";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import { useState } from "react";
import axios from "axios";

const TaskList = ({
  tasks,
  setTasks,
  toggleTaskStatusToActive,
  toggleTaskStatusToDone,
  deleteTask,
  getTickingTime,
  seconds,
  user,
}) => {
  const finishAt = () => {
    const now = DateTime.now();
    const finishAt = now.plus({ minutes: getTickingTime(), seconds: seconds });
    return finishAt.toLocaleString(DateTime.TIME_SIMPLE);
  };

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    tomatoes: 0,
  });
  const [startDate, setStartDate] = useState(new Date());

  const handleAddTask = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle adding the task with the entered data
    console.log("Task:", newTask.title);
    console.log("description:", newTask.description);
    console.log("tomatoes:", newTask.tomatoes);

    axios
      .post("http://localhost:3000/api/task", {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        status: "TODO",
        dueDate: startDate,
        tomatoes: newTask.tomatoes,
        createdAt: new Date(),
        userId: user.sid,
      })
      .then((response) => {
        setTasks([...tasks, response.data]);
      });

    // Add the new task to the tasks array

    // Clear input fields
    setNewTask({
      title: "",
      description: "",
      tomatoes: 0,
    });

    setShowForm(false);
  };

  return (
    <div className="rounded-lg flex flex-col justify-center w-6/12 m-auto">
      <div className="border-b border-slate-100 text-white text-3xl text-center">
        <h1>Tasks</h1>
      </div>
      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleTaskStatusToActive={toggleTaskStatusToActive}
            toggleTaskStatusToDone={toggleTaskStatusToDone}
            deleteTask={deleteTask}
          />
        ))}
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-40 rounded-sm m-1 px-2 py-5"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mb-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mb-2"
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add Task
            </button>
          </div>
        </form>
      ) : (
        <button
          className="flex justify-center items-center bg-white bg-opacity-40 text-white rounded-sm m-1 px-2 py-5 cursor-pointer border-dashed"
          onClick={handleAddTask}
        >
          Add New Task
        </button>
      )}

      <div className="bg-white bg-opacity-25 p-2 rounded-b-lg border-t border-slate-100 text-center">
        <span className="text-white mr-2">
          Pomos: <span className="text-xl">1/2</span>
        </span>
        <span className="text-white">
          Finish At: <span className="text-xl">{finishAt()}</span>
        </span>
      </div>
    </div>
  );
};
export default TaskList;
