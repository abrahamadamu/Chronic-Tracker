import { useState, ReactNode, useMemo, useEffect } from "react";
import {
  Modal,
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import { ModalWindow } from "./styles";
import { ChevronRight } from "@mui/icons-material";

import {
  symptoms as symptomsData,
  SymptomDataFormat,
} from "Data/dm and hypertension";

type CodeTextPair = { code: string; text: string };

const centerStyle = { placeItems: "center", justifyContent: "center" };

const choices: SymptomDataFormat[] = symptomsData;

function AddToList() {
  const [open, setOpen] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<
    CodeTextPair | undefined
  >();

  const [chosen, setChosen] = useState<SymptomDataFormat[]>([]);

  return (
    <Modal open={open}>
      <Grid container sx={{ height: "100%", ...centerStyle }}>
        <ModalWindow
          container
          sx={{
            ...centerStyle,

            maxHeight: "70vh",
            height: "100%",
            flexDirection: "column",
          }}
          gap={2}
        >
          <Typography variant="h6">Select symptoms</Typography>
          <Grid container gap={1} sx={{ flexGrow: 1, height: "0px" }}>
            <Box
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography>Category</Typography>
              <ChoiceList
                category={true}
                currentCategory={{
                  get: currentCategory,
                  set: setCurrentCategory,
                }}
                choices={choices}
              />
            </Box>
            <Box
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography>Title</Typography>
              <ChoiceList
                category={false}
                currentCategory={{
                  get: currentCategory,
                  set: setCurrentCategory,
                }}
                choices={choices}
                chosen={{ get: chosen, set: setChosen }}
              />
            </Box>
          </Grid>
        </ModalWindow>
      </Grid>
    </Modal>
  );
}

function ChoiceList({
  category,
  choices,
  currentCategory,
  chosen,
}: {
  choices: SymptomDataFormat[];
  category: boolean;
  currentCategory: {
    get: CodeTextPair | undefined;
    set: (v: CodeTextPair | undefined) => void;
  };
  chosen?: { set: (v: SymptomDataFormat[]) => void; get: SymptomDataFormat[] };
}) {
  const [options, setOptions] = useState<CodeTextPair[]>([]);

  const [categories, setCategories] = useState<CodeTextPair[]>([]);

  useEffect(() => {
    if (!choices) return;
    let categoriesArray: any = symptomsData.map((item) => item.category);
    categoriesArray = categoriesArray.map((cat: Object) => JSON.stringify(cat));
    categoriesArray = Array.from(new Set(categoriesArray));
    categoriesArray = categoriesArray.map((cat: string) =>
      JSON.parse(cat)
    ) as typeof symptomsData;
    setCategories(categoriesArray);
  }, [choices]);

  useEffect(() => {
    let newOptions: { code: string; text: string }[];
    if (category) {
      newOptions = categories;
    } else {
      newOptions = choices
        .filter((choice) => choice.category.code === currentCategory.get?.code)
        .map((choice) => choice.value);
    }
    newOptions.sort((o1, o2) => {
      const a = (o1.text + "").toLowerCase();
      const b = (o2.text + "").toLowerCase();
      return a > b ? 1 : a < b ? -1 : 0;
    });
    setOptions(newOptions);
  }, [currentCategory, category, categories]);

  return (
    <List
      sx={{
        minWidth: "150px",
        width: "content",
        flexGrow: 1,
        overflow: "auto",
        backgroundColor: "background.lightinput",
        ...(!category ? { minWidth: "30vw" } : {}),
      }}
    >
      {options.map((option) => {
        const isChosen =
          chosen &&
          chosen.get.filter((item) => item.value.code === option.code).length >
            0;

        return (
          <ListItem
            key={option.code + currentCategory.get?.code}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor:
                category && currentCategory.get === option
                  ? "background.lightinput2"
                  : "unset",
              "&:hover": {
                backgroundColor: "background.lightinput2",
              },
            }}
            onMouseEnter={() => {
              if (category) {
                currentCategory.set(option);
              } else {
              }
            }}
            onClick={() => {
              if (isChosen) {
                chosen.set(
                  chosen.get.filter((item) => item.value.code !== option.code)
                );
              } else if (currentCategory.get) {
                chosen?.set([
                  ...chosen.get,
                  { category: currentCategory.get, value: option },
                ]);
              }
            }}
          >
            <Typography>{option.text}</Typography>
            {category ? (
              <ChevronRight sx={{ color: "gray" }} />
            ) : (
              <Checkbox
                sx={{ marginLeft: "20px", padding: "0" }}
                checked={isChosen}
              />
            )}
          </ListItem>
        );
      })}
    </List>
  );
}

export default AddToList;
