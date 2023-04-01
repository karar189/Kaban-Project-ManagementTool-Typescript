import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, ScaleFade, Textarea } from "@chakra-ui/react";
import { TaskModel } from "../utils/models";

type TaskProps = {
  index: number;
  task: TaskModel;
  //   onUpdate: (id: TaskModel["id"], updatedTask: TaskModel) => void;
  //   onDelete: (id: TaskModel["id"]) => void;
  //   onDropHover: (i: number, j: number) => void;
};

function Task({ index, task }: TaskProps) {
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
        // onClick={handleDeleteClick}
      />
      <Textarea
        value={task.title}
        fontWeight="semibold"
        cursor="inherit"
        color="gray.700"
        border="none"
        p={0}
        resize="none"
        minH={70}
        maxH={200}
        focusBorderColor="none"
      ></Textarea>
    </Box>
  );
}

export default Task;
