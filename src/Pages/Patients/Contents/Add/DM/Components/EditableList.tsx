import { useState } from "react";
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

import AddToList from "./AddToList";

import { CategoryValuePair } from "Data/dm and hypertension";

function EditableList({
  title,
  chosen,
  choices,
}: {
  title: string;
  chosen: { get: CategoryValuePair[]; set: (v: CategoryValuePair[]) => void };
  choices: CategoryValuePair[];
}) {
  const [showList, setShowList] = useState(false);

  if (!chosen.get) return <></>;

  return (
    <>
      <Paper elevation={2} sx={{ padding: "10px" }}>
        <Typography variant="h6">{title}</Typography>
        {/* <hr /> */}
        <List>
          {chosen.get.map((item) => (
            <Item
              item={item}
              data={chosen}
              key={item.category.code + item.value.code}
            />
          ))}
          <ListItem>
            <Button color="secondary" onClick={() => setShowList(true)}>
              <Grid container>
                <Add />
                <Typography>Add</Typography>
              </Grid>
            </Button>
          </ListItem>
        </List>
      </Paper>
      <AddToList
        choices={choices}
        chosen={chosen}
        open={{ get: showList, set: setShowList }}
      />
    </>
  );
}

function Item({
  item,
  data,
}: {
  item: CategoryValuePair;
  data: { get: CategoryValuePair[]; set: (v: CategoryValuePair[]) => void };
}) {
  return (
    <ListItem>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography>{item.value.text}</Typography>
        <IconButton
          onClick={() => {
            let newData = [...data.get];
            newData = newData.filter(
              (dat: CategoryValuePair) =>
                !(
                  dat.category.code === item.category.code &&
                  dat.value.code === item.value.code
                )
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
