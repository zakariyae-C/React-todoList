import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import { ShowModalContext } from "../context/ShowModalContext";
import { ShowEditModalContext } from "../context/ShowEditModalContext";
import { IdContext } from "../context/IdContext";

export default function CrudButtons({ id, isComplated }) {
  const { tasks, setTasks } = useContext(TasksContext);
  const { showModal, setShowModal } = useContext(ShowModalContext);
  const { showEditModal, setShowEditModal } = useContext(ShowEditModalContext);
  const { shareId, setShareId } = useContext(IdContext);

  function handleDeleteTask() {
    setShowModal(true);
    setShareId(id);
  }

  function handleEditTask() {
    setShowEditModal(true);
    setShareId(id);
  }

  // Update status of tasks
  function handleDoneTask() {
    const updateTodos = tasks.map((t) => {
      if (t.id == id) {
        t.isComplated = !t.isComplated;
      }
      return t;
    });
    setTasks(updateTodos);
    localStorage.setItem("tasks", JSON.stringify(updateTodos));
  }

  return (
    <Stack direction="row" spacing={1}>
      <Fab
        onClick={handleDoneTask}
        size="small"
        sx={{
          color: isComplated ? "white" : "success.main",
          bgcolor: isComplated ? "success.main" : "white",
          border: "1px solid",
          borderColor: "success.main",
          "&:hover": {
            color: "white",
            bgcolor: "success.main",
          },
        }}
        aria-label="done"
      >
        <DoneIcon fontSize="small" />
      </Fab>
      <Fab
        onClick={handleEditTask}
        size="small"
        sx={{
          color: "info.main",
          bgcolor: "white",
          border: "1px solid",
          borderColor: "info.main",
          "&:hover": {
            color: "white",
            bgcolor: "info.main",
          },
        }}
        aria-label="edit"
      >
        <EditIcon fontSize="small" />
      </Fab>
      <Fab
        onClick={handleDeleteTask}
        size="small"
        sx={{
          color: "danger.main",
          bgcolor: "white",
          border: "1px solid",
          borderColor: "danger.main",
          "&:hover": {
            color: "white",
            bgcolor: "danger.main",
          },
        }}
        aria-label="delete"
      >
        <DeleteIcon fontSize="small" />
      </Fab>
    </Stack>
  );
}
