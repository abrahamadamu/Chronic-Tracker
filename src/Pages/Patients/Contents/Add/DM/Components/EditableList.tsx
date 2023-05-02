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

export type ListData = { category: string; value: string };

function EditableList({
  title,
  id,
  data,
}: {
  title: string;
  id: string;
  data: { get: Record<string, any>; set: (v: Record<string, any>) => void };
}) {
  const items: ListData[] = data.get[id];
  if (!items) return <></>;

  return (
    <Paper elevation={2} sx={{ padding: "10px" }}>
      <Typography variant="h6">{title}</Typography>
      {/* <hr /> */}
      <List>
        {items.map((item) => (
          <Item
            item={item}
            data={data}
            id={id}
            key={item.category + item.value}
          />
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

function Item({
  item,
  data,
  id,
}: {
  item: ListData;
  data: { get: Record<string, any>; set: (v: Record<string, any>) => void };
  id: string;
}) {
  return (
    <ListItem>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography>{item.value}</Typography>
        <IconButton
          onClick={() => {
            const newData = structuredClone(data.get);
            newData[id] = newData[id].filter(
              (dat: ListData) =>
                !(dat.category === item.category && dat.value === item.value)
            );
            data.set(newData);
          }}
        >
          <Delete />
        </IconButton>
      </Grid>
    </ListItem>
  );
}

export default EditableList;
