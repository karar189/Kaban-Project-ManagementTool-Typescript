import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { ColumnType } from "./utils/enums";
import Column from "./components/Column";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <>
      <Heading
        fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
        fontWeight="extrabold"
        lineHeight="shorter"
        letterSpacing="tight"
        color="gray.900"
        textAlign="center"
        bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
        bgClip="text"
      >
        Kaban Management Tool{" "}
      </Heading>

      <Container maxWidth="container.lg" px={4} py={10}>
        <DndProvider backend={HTML5Backend}>
          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            spacing={{ base: 16, md: 4 }}
          >
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />
            <Column column={ColumnType.BLOCKED} />
            <Column column={ColumnType.COMPLETED} />
          </SimpleGrid>
        </DndProvider>
      </Container>
    </>
  );
}

export default App;
