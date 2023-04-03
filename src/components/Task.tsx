import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, ScaleFade, Textarea } from "@chakra-ui/react";
import { TaskModel } from "../utils/models";
import { AutoResizeTextarea } from "./AutoResizeTextarea";
import { useTaskDragAndDrop } from "../hooks/useTaskDragAndDrop";

type TaskProps = {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel["id"], updatedTask: TaskModel) => void;
  onDelete: (id: TaskModel["id"]) => void;
  //   onDropHover: (i: number, j: number) => void;
};

function Task({
  index,
  task,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: TaskProps) {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task,
    index,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    handleUpdate(task.id, { ...task, title: newTitle });
  };

  const handleDeleteClick = () => {
    handleDelete(task.id);
  };

  return (
    <Box
      as="div"
      role="group"
      position="relative"
      rounded="lg"
      w={200}
      pl={3}
      pr={7}
      pt={3}
      pb={1}
      boxShadow="xl"
      cursor="grab"
      fontWeight="bold"
      userSelect="none"
      bgColor={task.color}
      opacity={isDragging ? 0.5 : 1}
    >
      <IconButton
        position="absolute"
        top={0}
        right={0}
        zIndex={100}
        aria-label="delete-task"
        size="md"
        colorScheme="solid"
        color={"gray.700"}
        icon={<DeleteIcon />}
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
        onClick={handleDeleteClick}
      />
      <AutoResizeTextarea
        value={task.title}
        fontWeight="semibold"
        cursor="inherit"
        border="none"
        p={0}
        resize="none"
        minH={70}
        maxH={200}
        focusBorderColor="none"
        color="gray.700"
        onChange={handleTitleChange}
        style={{
          outline: "none",
          boxShadow: "none",
        }}
      />
    </Box>
  );
}

export default Task;
