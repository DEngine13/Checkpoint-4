// Import
import type { RequestHandler } from "express";
import TaskRepository from "./TaskRepository"; // Access to data

// The B of BREAD - Browse (Read All) operation (Here, retrieve all the Tasks)
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const tasks = await TaskRepository.readAll();

    // Respond with the items in JSON format
    res.json(tasks);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
/* ************************************************************************* */

// The R of BREAD - Read operation (Here, retrieve a specific task)
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const taskId = Number(req.params.id);
    const task = await TaskRepository.read(taskId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (task == null) {
      res.sendStatus(404);
    } else {
      res.json(task);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
/* ************************************************************************* */

// The E of BREAD - Edit operation (Here, modify an existing task)
const edit: RequestHandler = async (req, res, next) => {
  try {
    const task = {
      Id: Number(req.params.id),
      Title: req.body.Title,
      Description: req.body.Description,
      Status: req.body.Status,
      Due_Date: req.body.Due_Date,
      Category_Id: req.body.Category_Id,
    };

    const affectedRows = await TaskRepository.update(task);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

/* ************************************************************************* */

// The A of BREAD - Add (Create) operation (Here, create a new task)
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newTask = {
      Id: req.body.Id,
      Title: req.body.Title,
      Description: req.body.Description,
      Status: req.body.Status,
      Due_Date: req.body.Due_Date,
      Category_Id: req.body.Category_Id,
    };

    // Create the item
    const insertId = await TaskRepository.create(newTask);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
/* ************************************************************************* */

// The D of BREAD - Destroy operation (Here, delete an existing task)
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);

    await TaskRepository.delete(taskId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroyAll: RequestHandler = async (req, res, next) => {
  try {
    await TaskRepository.deleteAll();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy, destroyAll };
