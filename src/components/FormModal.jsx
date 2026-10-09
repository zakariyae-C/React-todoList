import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { ShowEditModalContext } from "../context/ShowEditModalContext";
import { TasksContext } from "../context/TasksContext";
import { IdContext } from "../context/IdContext";

export default function FormModal() {
  const { showEditModal, setShowEditModal } = useContext(ShowEditModalContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const { shareId, setShareId } = useContext(IdContext);

  const selectedTask = tasks.find((t) => t.id === shareId);

  function handleCloseModal() {
    setShowEditModal(false);
    setShareId("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const updateTodos = tasks.map((t) => {
      if (t.id == shareId) {
        t.title = formJson.title;
        t.description = formJson.description;
      }
      return t;
    });

    setTasks(updateTodos);
    handleCloseModal();
    setShareId("");
    localStorage.setItem("tasks", JSON.stringify(updateTodos));
  };

  return (
    <>
      <Dialog open={showEditModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              defaultValue={selectedTask ? selectedTask.title : ""}
              label="Task Title"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              defaultValue={selectedTask ? selectedTask.description : ""}
              label="Title Description"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#ababab",
              bgcolor: "white",
              "&:hover": { color: "#979797" },
            }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button type="submit" form="subscription-form">
            Submit Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
