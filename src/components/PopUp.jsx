import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function PopUp({ display = false }) {
  if (display) {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="filled" severity="info">
          This is a filled info Alert.
        </Alert>
      </Stack>
    );
  }
}
