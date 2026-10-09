import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AddButton({name}) {
  return (
    <Stack spacing={2}>
      <Button variant="contained">{name}</Button>
    </Stack>
  );
}