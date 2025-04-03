import axios from "axios";

// Retrieve all tasks
const getAllTasks = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/tasks`)
    .then((response) => response.data)
    .catch((error) =>
      console.error(
        "An error occured when trying to retrieve all tasks: ",
        error,
      ),
    );
};

// Retrieve task by ID
const getTaskById = (id: string | undefined) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`)
    .then((response) => response.data)
    .catch((error) =>
      console.error(
        `An error occured when trying to retrieve the task ${id}: `,
        error,
      ),
    );
};

// Add a task
const addTask = (newTask: string | undefined) => {
  return axios
    .post(`${import.meta.env.VITE_API_URL}/api/tasks`, newTask)
    .then((response) => response.data)
    .catch((error) =>
      console.error("An error occured when trying to add a task: ", error),
    );
};

// Modify a task
const updateTask = (
  id: number | undefined,
  updatedTask: string | undefined,
) => {
  return axios
    .put(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, updatedTask)
    .then((response) => response.data);
};

// Delete a task
const deleteTask = (id: number | undefined) => {
  return axios
    .delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`)
    .then(() => console.log(`Task ${id} deleted`))
    .catch((error) =>
      console.error(
        `An error occured while trying to delete the task ${id} :`,
        error,
      ),
    );
};

// Delete all tasks
const deleteAllTasks = () => {
  return axios
    .delete(`${import.meta.env.VITE_API_URL}/api/tasks`)
    .then(() => console.log("All tasks were deleted"))
    .catch((error) =>
      console.error("An error occured when trying to delete all tasks", error),
    );
};

export {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
};
