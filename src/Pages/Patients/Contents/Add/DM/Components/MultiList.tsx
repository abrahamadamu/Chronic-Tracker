import {
  Typography,
  Paper,
  List,
  ListItem,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

function MultiList({
  addItem,
  title,
  itemsList,
  deleteItem,
}: {
  addItem: (v: boolean) => void;
  title: string;
  itemsList: { id: string; text: string }[];
  deleteItem: (v: { id: string; text: string }) => void;
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      {/* <hr /> */}
      <List>
        {itemsList.map((item) => (
          <Item item={item} deleteItem={deleteItem} key={item.id} />
        ))}
      </List>
      <div style={{ flexGrow: 1 }} />
      <ListItem
        sx={{
          padding: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          color="secondary"
          sx={{ padding: "10px 20px" }}
          onClick={() => addItem(true)}
        >
          <Grid container>
            <Add />
            <Typography>Add</Typography>
          </Grid>
        </Button>
      </ListItem>
    </Paper>
  );
}

function Item({
  item,
  deleteItem,
}: {
  item: { id: string; text: string };
  deleteItem: (v: { id: string; text: string }) => void;
}) {
  return (
    <ListItem>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Typography>{item.text}</Typography>
        <IconButton onClick={() => deleteItem(item)}>
          <Delete />
        </IconButton>
      </Grid>
    </ListItem>
  );
}

export default MultiList;
