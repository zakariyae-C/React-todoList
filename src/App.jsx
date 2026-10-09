import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red, indigo, grey, green, lightBlue } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box, isEmpty } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tasks from "./components/Tasks";
import { TasksContext } from "./context/TasksContext";
import { ShowModalContext } from "./context/ShowModalContext";
import { ShowEditModalContext } from "./context/ShowEditModalContext";
import { IdContext } from "./context/IdContext";
import { useState, useEffect } from "react";
import PopUp from "./components/PopUp";
import { v4 as uuidv4 } from "uuid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DangerModal from "./components/DangerModal";
import FormModal from "./components/FormModal";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: indigo[500],
      dark: indigo[800],
    },
    text: {
      main: grey[50],
      light: grey[400],
    },
    success: {
      main: green[800],
      light: green[500],
      dark: green[900],
    },
    info: {
      main: lightBlue[700],
      light: green[500],
      dark: green[900],
    },
    danger: {
      main: red[800],
      light: red[500],
      dark: red[900],
    },
  },
  typography: {
    fontFamily: "Ubuntu, sans-serif",
  },
});

function App() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) ?? [],
  );
  const [text, setText] = useState("");
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [shareId, setShareId] = useState("");

  function handleAddNewTasks() {
    if (isEmpty(text)) {
      setDisplayPopUp(true);
    } else {
      setDisplayPopUp(false);
      setText("");
      const addTasks = [
        {
          id: uuidv4(),
          title: text,
          description: "",
          isComplated: false,
        },
        ...tasks,
      ];
      setTasks(addTasks);
      localStorage.setItem("tasks", JSON.stringify(addTasks));
    }
  }

  const [selectTasks, setSelectTasks] = useState("all");

  const handleSelectTasks = (event, newSelection) => {
    setSelectTasks(newSelection);
  };

  // Display tasks stored in localStorage after reloading the page
  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    setTasks(storageTasks);
  }, []);
  return (
    <>
      <TasksContext value={{ tasks, setTasks }}>
        <ShowModalContext value={{ showModal, setShowModal }}>
          <ShowEditModalContext value={{ showEditModal, setShowEditModal }}>
            <IdContext value={{ shareId, setShareId }}>
              <ThemeProvider theme={theme}>
                <Card sx={{ minWidth: 700, bgcolor: "white" }}>
                  <CardContent>
                    <h2 style={{ marginBottom: "20px" }}>Todo List</h2>
                    {/* pop up to tell the user that he must enter a task  */}
                    <PopUp display={displayPopUp} />
                    {/* Buttons to change between tasks states */}
                    <ToggleButtonGroup
                      value={selectTasks}
                      exclusive
                      onChange={handleSelectTasks}
                      aria-label="select tasks"
                    >
                      <ToggleButton color="info" value="all" aria-label="all">
                        All
                      </ToggleButton>
                      <ToggleButton
                        color="success"
                        value="done"
                        aria-label="done"
                      >
                        Done
                      </ToggleButton>
                      <ToggleButton
                        color="danger"
                        value="unDone"
                        aria-label="undone"
                      >
                        Undone
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <Box
                      sx={tasks.length > 0 ? {
                        marginTop: "15px",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: "40px",
                          pointerEvents: "none", // clicks pass through to the tasks
                          background:
                            "linear-gradient(to top, rgba(10, 10, 10, 0.51), transparent)",
                        },
                      } : {}}
                    >
                      <Stack
                        spacing={2}
                        sx={{
                          maxHeight: "400px",
                          overflowY: "auto",
                          scrollbarWidth: "none", // Firefox
                          "&::-webkit-scrollbar": { display: "none" }, // Chrome, Edge, Safari
                        }}
                      >
                        {tasks.length == 0 ? (
                          <span style={{ marginTop: "10px", color: "#ababab" }}>
                            You don't have tasks yet! add one.
                          </span>
                        ) : (
                          <Tasks selection={selectTasks} />
                        )}
                      </Stack>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{ p: "16px", display: "flex", alignItems: "center" }}
                  >
                    <TextField
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      id="outlined-basic"
                      label="new task"
                      variant="outlined"
                      size="small"
                      sx={{ flex: 1 }}
                    />
                    <Stack spacing={2}>
                      <Button
                        onClick={handleAddNewTasks}
                        disabled={text.length == 0}
                        variant="contained"
                      >
                        Add New Task
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
                {/* Display Danger Modal */}
                <DangerModal />
                <FormModal />
              </ThemeProvider>
            </IdContext>
          </ShowEditModalContext>
        </ShowModalContext>
      </TasksContext>
    </>
  );
}
export default App;
