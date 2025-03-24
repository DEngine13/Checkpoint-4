import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

// Define task-related routes
import TaskActions from "./modules/Task/TaskActions";

router.get("/api/tasks", TaskActions.browse);
router.get("/api/tasks/:id", TaskActions.read);
router.post("/api/tasks", TaskActions.add);
router.put("/api/tasks/:id", TaskActions.edit);
router.delete("/api/tasks/:id", TaskActions.destroy);

/* ************************************************************************* */

export default router;
