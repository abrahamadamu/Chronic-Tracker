import {
  Typography,
  List,
  ListItem,
  IconButton,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

function EditableList({ title, items }: { title: string; items: string[] }) {
  return (
    <Paper elevation={2} sx={{ padding: "10px" }}>
      <Typography variant="h6">{title}</Typography>
      {/* <hr /> */}
      <List>
        {items.map((text) => (
          <Item text={text} />
        ))}
        <ListItem>
          <Button color="secondary">
            <Grid container>
              <Add />
              <Typography>Add</Typography>
            </Grid>
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
}

function Item({ text }: { text: string }) {
  return (
    <ListItem>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography>{text}</Typography>
        <IconButton>
          <Delete />
        </IconButton>
      </Grid>
    </ListItem>
  );
}

export default EditableList;
