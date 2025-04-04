import "./homePage.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  deleteAllTasks,
  deleteTask,
  updateTask,
} from "../../services/Requests";

type Task = {
  Id: number;
  Title: string;
  Description: string;
  Status: string;
  Due_Date: string;
  Category_Id: number;
};

const initialFormState = {
  Title: "",
  Description: "",
  Status: "Pending",
  Due_Date: "",
  Category_Id: 1,
};

export default function HomePage() {
  const loadedTasks = useLoaderData() as Task[];
  const [tasks, setTasks] = useState<Task[]>(loadedTasks);
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState<string | null>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editFormData, setEditFormData] = useState(initialFormState);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isEditDialogOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isEditDialogOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Category_Id" ? Number(value) : value,
    }));
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "Category_Id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const newTask = {
      ...formData,
      Due_Date: new Date(formData.Due_Date).toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        formData,
      );
      setTasks((prev) => [{ ...newTask, Id: response.data.insertId }, ...prev]);
      setFormData(initialFormState);
    } catch (err) {
      setError("An error occurred while trying to save the task.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTask) return;

    try {
      const updatedTask = {
        ...editFormData,
        Due_Date: new Date(editFormData.Due_Date).toISOString().split("T")[0],
      };

      console.error(
        "Sending update for task:",
        editingTask.Id,
        "with data:",
        updatedTask,
      );

      await updateTask(editingTask.Id, updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.Id === editingTask.Id ? { ...task, ...updatedTask } : task,
        ),
      );

      setIsEditDialogOpen(false);
      setEditingTask(null);
    } catch (err) {
      setError("An error occurred while trying to update the task.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.Id !== id));
    } catch (error) {
      console.error("An error occurred while trying to delete a task", error);
      alert("Error: cannot delete the task");
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllTasks();
      setTasks([]);
    } catch (error) {
      console.error(
        "An error occurred while trying to delete all tasks",
        error,
      );
      alert("Error: cannot delete all tasks");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setEditFormData({
      Title: task.Title,
      Description: task.Description,
      Status: task.Status,
      Due_Date: task.Due_Date,
      Category_Id: task.Category_Id,
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setEditingTask(null);
    setError(null);
  };

  return (
    <main className="homepage-main">
      <div className="homepage-titles">
        <h1>Keikaku</h1>
        <h2>Plan your growth</h2>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="inputform">
          <div className="form-group">
            <label htmlFor="Title">Title</label>
            <input
              id="Title"
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Status">Status</label>
              <select
                id="Status"
                name="Status"
                value={formData.Status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending ⏳</option>
                <option value="In Progress">In Progress 🚧</option>
                <option value="Completed">Completed ✅</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="Due_Date">Due Date</label>
              <input
                id="Due_Date"
                type="date"
                name="Due_Date"
                value={formData.Due_Date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Category_Id">Category</label>
              <select
                id="Category_Id"
                name="Category_Id"
                value={formData.Category_Id}
                onChange={handleInputChange}
              >
                <option value={1}>Work 💼</option>
                <option value={2}>Fitness 🏋️</option>
                <option value={3}>Personal 👤</option>
                <option value={4}>Health ❤️</option>
                <option value={5}>Groceries 🛒</option>
              </select>
            </div>
          </div>
        </div>

        <div className="homepage-buttons">
          <button
            type="button"
            className="homepageReset"
            onClick={() => handleDeleteAll()}
          >
            ✖
          </button>
          <button type="submit" className="homepagePlus">
            +
          </button>
          <button type="button" className="homepageArchive">
            ↩
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.Id} className="task-card">
            <div className="task-header">
              <h3 className="task-title">{task.Title}</h3>
              <span className={`task-status ${task.Status.replace(" ", "-")}`}>
                {task.Status}
              </span>
            </div>
            <p className="task-description">{task.Description}</p>
            <div className="task-footer">
              <span className="task-category">
                {getCategoryEmoji(task.Category_Id)}
              </span>
              <time className="task-due-date">
                📅 {new Date(task.Due_Date).toLocaleDateString()}
              </time>
              <div className="task-buttons">
                <button
                  className="task-edit"
                  type="button"
                  onClick={() => handleEdit(task)}
                >
                  ✏️
                </button>
                <button
                  className="task-delete"
                  type="button"
                  onClick={() => handleDelete(task.Id)}
                >
                  ✖
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <dialog ref={dialogRef} className="edit-task-dialog">
        <form onSubmit={handleEditSubmit}>
          <h2>Edit Task</h2>
          <div className="dialog-form">
            <div className="form-group">
              <label htmlFor="edit-title">Title</label>
              <input
                id="edit-title"
                type="text"
                name="Title"
                value={editFormData.Title}
                onChange={handleEditInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-description">Description</label>
              <textarea
                id="edit-description"
                name="Description"
                value={editFormData.Description}
                onChange={handleEditInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-status">Status</label>
                <select
                  id="edit-status"
                  name="Status"
                  value={editFormData.Status}
                  onChange={handleEditInputChange}
                >
                  <option value="Pending">Pending ⏳</option>
                  <option value="In Progress">In Progress 🚧</option>
                  <option value="Completed">Completed ✅</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-due-date">Due Date</label>
                <input
                  id="edit-due-date"
                  type="date"
                  name="Due_Date"
                  value={editFormData.Due_Date}
                  onChange={handleEditInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-category">Category</label>
                <select
                  id="edit-category"
                  name="Category_Id"
                  value={editFormData.Category_Id}
                  onChange={handleEditInputChange}
                >
                  <option value={1}>Work 💼</option>
                  <option value={2}>Fitness 🏋️</option>
                  <option value={3}>Personal 👤</option>
                  <option value={4}>Health ❤️</option>
                  <option value={5}>Groceries 🛒</option>
                </select>
              </div>
            </div>
          </div>

          <div className="dialog-actions">
            <button type="button" onClick={handleCloseDialog}>
              Cancel
            </button>
            <button type="submit">Update Task</button>
          </div>

          {error && <div className="dialog-error">{error}</div>}
        </form>
      </dialog>
    </main>
  );
}

const getCategoryEmoji = (categoryId: number) => {
  const emojis: { [key: number]: string } = {
    1: "💼",
    2: "🏋️",
    3: "👤",
    4: "❤️",
    5: "🛒",
  };
  return emojis[categoryId] || "📁";
};
