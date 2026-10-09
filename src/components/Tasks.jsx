import Typography from "@mui/material/Typography";
import CrudButtons from "./CrudButtons";
import { Box } from "@mui/material";
import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

export default function Tasks({selection}) {
  const {tasks, setTasks} = useContext(TasksContext);
  
  let displayTasksType = [];
  if(selection == "done"){
    displayTasksType = tasks.filter((t) => {
      return t.isComplated;
    })
  }else if(selection == "unDone"){
    displayTasksType = tasks.filter((t) => {
      return !t.isComplated;
    })
  }else{
    displayTasksType = tasks
  }
  const displayTasks = displayTasksType.map((t) => {
    return(
      <Box
      key={t.id}
      sx={{
        p: "15px 10px",
        borderRadius: 1,
        bgcolor: "secondary.main",
        "&:hover": {
          bgcolor: "secondary.dark",
        },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ flex: 1, textAlign: "start" }}>
        <Typography sx={{ color: "text.main", fontSize: 22 }}>
          {t.title}
        </Typography>
        <Typography sx={{ color: "text.light", fontSize: 14 }}>
          {t.description}
        </Typography>
      </Box>
      <CrudButtons id={t.id} isComplated={t.isComplated}/>
    </Box>
    );
  });

  
  return (
    <>
    {displayTasks}
    </>
  );
}
