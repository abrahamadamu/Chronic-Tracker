import { useState, useEffect, useMemo } from "react";
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

import { CategoryValuePair, CodeTextPair } from "Data/data";

type CategoryChosenSetFunction = (v: CategoryValuePair[]) => void;
type CategoryBasedChosen = {
  get: CategoryValuePair[];
  set: CategoryChosenSetFunction;
};
type SimpleChosen = { get: CodeTextPair[]; set: (v: CodeTextPair[]) => void };

function EditableList({
  title,
  chosen,
  choices,
  listType,
}: {
  title: string;
  chosen: CategoryBasedChosen | SimpleChosen;
  choices: CodeTextPair[] | CategoryValuePair[];
  listType?: "simple";
}) {
  const [showList, setShowList] = useState(false);

  const hasCategory =
    isCategoryValuePairArray(choices) && isCategoryBasedChosen(chosen, choices);

  const [tempChosen, setTempChosen] = useState<CategoryValuePair[]>([]);

  const intermChosen: {
    get: CategoryValuePair[];
    set: (v: CategoryValuePair[]) => void;
  } = { get: tempChosen, set: setTempChosen };

  useEffect(() => {
    if (hasCategory) {
      chosen.set(tempChosen);
    } else if (!isCategoryChosenSetFunction(chosen.set, choices)) {
      const data: CodeTextPair[] = tempChosen.map((chosen) => ({
        code: chosen.value.code,
        text: chosen.value.text,
      }));
      chosen.set(data);
    }
  }, [tempChosen]);

  if (!chosen.get) return <></>;

  return (
    <>
      <Paper elevation={2} sx={{ padding: "10px" }}>
        <Typography variant="h6">{title}</Typography>
        {/* <hr /> */}
        <List>
          {toCategoryValuePair(intermChosen.get).map((item) => (
            <Item
              item={item}
              data={
                intermChosen as {
                  get: CategoryValuePair[] | CodeTextPair[];
                  set: (v: CategoryValuePair[] | CodeTextPair[]) => void;
                }
              }
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
        choices={toCategoryValuePair(choices)}
        chosen={intermChosen}
        open={{ get: showList, set: setShowList }}
        listType={!hasCategory ? "simple" : listType}
      />
    </>
  );
}

function isCategoryValuePairArray(
  choices: CategoryValuePair[] | CodeTextPair[]
): choices is CategoryValuePair[] {
  if (choices.length === 0) return true;

  return !!(choices[0] as CategoryValuePair).category;
}
function isCategoryBasedChosen(
  data: any,
  choices: any
): data is CategoryBasedChosen {
  if (choices.length < 1) return true; //Bad already
  return !!choices[0].category;
}
function isCategoryChosenSetFunction(
  data: any,
  full: CodeTextPair[] | CategoryValuePair[]
): data is CategoryChosenSetFunction {
  return isCategoryBasedChosen(full, full);
}

function isCategoryValuePair(
  data: CategoryValuePair | CodeTextPair
): data is CategoryValuePair {
  return !!(data as CategoryValuePair).category;
}

function toCategoryValuePair(choices: CategoryValuePair[] | CodeTextPair[]) {
  if (isCategoryValuePairArray(choices)) return choices;
  else
    return choices.map((choice) => ({
      category: { code: "", text: "" },
      value: choice,
    }));
}

function Item({
  item,
  data,
}: {
  item: CategoryValuePair;
  data: {
    get: CategoryValuePair[] | CodeTextPair[];
    set: (v: CategoryValuePair[] | CodeTextPair[]) => void;
  };
}) {
  return (
    <ListItem>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Typography>{item.value.text}</Typography>
        <IconButton
          onClick={() => {
            let newData = [...data.get] as any;
            newData = newData.filter(
              (dat: CategoryValuePair | CodeTextPair) => {
                if (isCategoryValuePair(dat)) {
                  return !(
                    dat.category.code === item.category.code &&
                    dat.value.code === item.value.code
                  );
                } else {
                  return !(
                    dat.code === (item as any).code &&
                    dat.code === (item as any).code
                  );
                }
              }
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
