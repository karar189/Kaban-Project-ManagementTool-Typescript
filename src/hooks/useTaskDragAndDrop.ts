import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { ItemType } from "../utils/enums";
import { DragItem, TaskModel } from "../utils/models";

export function useTaskDragAndDrop<T extends HTMLElement>({
  task,
  index,
}: {
  task: TaskModel;
  index: number;
}) {
  const ref = useRef<T>(null);

  // const [{isDragging}, drag] = useDrag<
  //   DragItem,
  //   void,
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    item: { from: task.column, id: task.id, index },
    type: ItemType.TASK,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return {
    ref,
    isDragging,
  };
}
