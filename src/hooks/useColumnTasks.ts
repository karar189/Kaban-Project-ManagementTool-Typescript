import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { ColumnType } from "../utils/enums";
// import { debug } from "../utils/logging";
import { TaskModel } from "../utils/models";
import useTaskCollection from "./useTaskCollection";
import { pickChakraRandomColor } from "../utils/helpers";

const MAX_TASK_PER_COLUMN = 10;

function useColumnTasks(column: ColumnType) {
  const [tasks, setTasks] = useTaskCollection();

  const addEmptyTask = useCallback(() => {
    console.log(`ADding new empty task to ${column} column`);
    setTasks((allTasks) => {
      const columnTask = allTasks[column];
      if (useColumnTasks.length > MAX_TASK_PER_COLUMN) {
        alert(`Max task per column reached`);
        return allTasks;
      }

      const newColumnTask: TaskModel = {
        id: uuidv4(),
        title: "",
        color: pickChakraRandomColor(".100"),
        column,
      };

      return {
        ...allTasks,
        [column]: [newColumnTask, ...columnTask],
      };
    });
  }, [column, setTasks]);

  const deleteTask = useCallback(
    (id: TaskModel["id"]) => {
      //   debug(`Removing task ${id}..`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.filter((task) => task.id !== id),
        };
      });
    },
    [column, setTasks]
  );

  const updateTask = useCallback(
    (id: TaskModel["id"], updatedTask: Omit<Partial<TaskModel>, "id">) => {
      //   debug(`Updating task ${id} with ${JSON.stringify(updateTask)}`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        };
      });
    },
    [column, setTasks]
  );

  const dropTaskFrom = useCallback(
    (from: ColumnType, id: TaskModel["id"]) => {
      setTasks((allTasks) => {
        const fromColumnTasks = allTasks[from];
        const toColumnTasks = allTasks[column];
        const movingTask = fromColumnTasks.find((task) => task.id === id);

        console.log(`Moving task ${movingTask?.id} from ${from} to ${column}`);

        if (!movingTask) {
          return allTasks;
        }

        // remove the task from the original column and copy it within the destination column
        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [column]: [{ ...movingTask, column }, ...toColumnTasks],
        };
      });
    },
    [column, setTasks]
  );

  const swapTasks = useCallback(
    (i: number, j: number) => {
      //   debug(`Swapping task ${i} with ${j} in ${column} column`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: swap(columnTasks, i, j),
        };
      });
    },
    [column, setTasks]
  );

  return {
    tasks: tasks[column],
    addEmptyTask,
    updateTask,
    dropTaskFrom,
    deleteTask,
    swapTasks,
  };
}

export default useColumnTasks;
function swap(columnTasks: TaskModel[], i: number, j: number) {
  throw new Error("Function not implemented.");
}
