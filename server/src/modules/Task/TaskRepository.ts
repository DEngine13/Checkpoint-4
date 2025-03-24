//import
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

//Typing
type Task = {
  Id: number;
  Title: string;
  Description: string;
  Status: string;
  Due_Date: Date;
  Category_Id: number;
};

//Repository
class TaskRepository {
  // The C of CRUD - Create operation (Here, add a task)

  async create(Task: Omit<Task, "id">) {
    // Execute the SQL INSERT query to add a new task to the "task" table
    const [result] = await databaseClient.query<Result>(
      "insert into Task (Id, Title, Description, Status, Due_Date, Category_Id) values (?, ?, ?, ?, ?, ?)",
      [
        Task.Id,
        Task.Title,
        Task.Description,
        Task.Status,
        Task.Due_Date,
        Task.Category_Id,
      ],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }
  /* ************************************************************************* */

  // The Rs of CRUD - Read operations (Here, retrieve a specific task)

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from Task where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Task;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all tasks from the "Task" table
    const [rows] = await databaseClient.query<Rows>("select * from Task");

    // Return the array of items
    return rows as Task[];
  }
  /* ************************************************************************* */

  // The U of CRUD - Update operation (Here, modify a task)
  // TODO: Implement the update operation to modify an existing item
  async update(Task: Task) {
    const [result] = await databaseClient.query<Result>(
      "update Task set Id = ?, Title = ?, Description = ?, Status = ?, Due_Date = ?, Category_Id = ?",
      [
        Task.Id,
        Task.Title,
        Task.Description,
        Task.Status,
        Task.Due_Date,
        Task.Category_Id,
      ],
    );
    // Return the rows affected by the operation
    return result.affectedRows;
  }
  /* ************************************************************************* */

  // The D of CRUD - Delete operation (Here, delete a task)
  // TODO: Implement the delete operation to remove an item by its ID
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from Task where id = ?",
      [id],
    );
    // Return the rows affected by the operation
    return result.affectedRows;
  }
}

export default new TaskRepository();
