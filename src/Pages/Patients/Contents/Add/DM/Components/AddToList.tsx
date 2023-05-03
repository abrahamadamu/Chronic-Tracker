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

import { symptoms as symptomsData } from "Data/dm and hypertension";

const centerStyle = { placeItems: "center", justifyContent: "center" };

type ChoiceType = { category: string; value: string };

const choices: ChoiceType[] = symptomsData;

function AddToList() {
  const [open, setOpen] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<string>("");

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
}: {
  choices: ChoiceType[];
  category: boolean;
  currentCategory: { get: string; set: (v: string) => void };
}) {
  const [options, setOptions] = useState<string[]>([]);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!choices) return;
    setCategories(
      Array.from(new Set(symptomsData.map((item) => item.category)))
    );
  }, [choices]);

  useEffect(() => {
    let newOptions: string[];
    if (category) {
      newOptions = categories;
    } else {
      newOptions = choices
        .filter((choice) => choice.category === currentCategory.get)
        .map((choice) => choice.value);
    }
    newOptions.sort((a, b) => {
      a = (a + "").toLowerCase();
      b = (b + "").toLowerCase();
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
      {options.map((option) => (
        <ListItem
          key={option + currentCategory}
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
        >
          <Typography>{option}</Typography>
          {category ? (
            <ChevronRight sx={{ color: "gray" }} />
          ) : (
            <Checkbox sx={{ marginLeft: "20px", padding: "0" }} />
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default AddToList;
