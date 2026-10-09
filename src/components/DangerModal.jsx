import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { ShowModalContext } from "../context/ShowModalContext";
import { TasksContext } from "../context/TasksContext";
import { IdContext } from "../context/IdContext";

export default function DangerModal() {
  const { showModal, setShowModal } = useContext(ShowModalContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const { shareId, setShareId } = useContext(IdContext);

  function handleCloseModal() {
    setShowModal(false);
    setShareId("");
  }

  function handleConfirmDeleting() {
    const deleteTasks = tasks.filter((t) => {
      return t.id != shareId;
    });
    setTasks(deleteTasks);
    setShowModal(false);
    setShareId("");
    localStorage.setItem("tasks", JSON.stringify(deleteTasks));
  }
  return (
    <>
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All these action can't be undone. All values associated with this
            field will be lost
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#ababab",
              bgcolor: "white",
              "&:hover": { color: "#979797" },
            }}
            onClick={handleCloseModal}
            autoFocus
          >
            cancel
          </Button>
          <Button onClick={handleConfirmDeleting}>Yes. I confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
