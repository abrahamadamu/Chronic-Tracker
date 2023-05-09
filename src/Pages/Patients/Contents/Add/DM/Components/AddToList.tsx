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
import { ChevronRight, Close } from "@mui/icons-material";

import { CategoryValuePair } from "Data/data";

type CodeTextPair = { code: string; text: string };
type ListType = "category" | "value" | "simple";

const centerStyle = { placeItems: "center", justifyContent: "center" };

function AddToList({
  choices,
  chosen,
  open,
  listType,
}: {
  choices: CategoryValuePair[];
  chosen: { get: CategoryValuePair[]; set: (v: CategoryValuePair[]) => void };
  open: { get: boolean; set: (v: boolean) => void };
  listType?: "simple";
}) {
  const [currentCategory, setCurrentCategory] = useState<
    CodeTextPair | undefined
  >();

  return (
    <Modal open={open.get}>
      <Grid
        id="emptycontainer"
        container
        sx={{ height: "100%", ...centerStyle }}
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "emptycontainer")
            open.set(false);
        }}
      >
        <ModalWindow
          container
          sx={{
            ...centerStyle,

            maxHeight: "70vh",
            height: "100%",
            flexDirection: "column",
            position: "relative",
          }}
          gap={2}
        >
          <Close
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              cursor: "pointer",
              fontSize: "30px",
              "&:hover": { color: "red" },
            }}
            onClick={() => open.set(false)}
          />
          <Typography variant="h6" sx={{ marginTop: "20px" }}>
            Select symptoms
          </Typography>
          <Grid container gap={1} sx={{ flexGrow: 1, height: "0px" }}>
            {listType !== "simple" ? (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ChoiceList
                  type="simple"
                  currentCategory={{
                    get: currentCategory,
                    set: setCurrentCategory,
                  }}
                  choices={choices}
                  chosen={chosen}
                />
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography>Category</Typography>
                  <ChoiceList
                    type="category"
                    currentCategory={{
                      get: currentCategory,
                      set: setCurrentCategory,
                    }}
                    choices={choices}
                    chosen={chosen}
                  />
                </Box>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography>Title</Typography>
                  <ChoiceList
                    type="value"
                    currentCategory={{
                      get: currentCategory,
                      set: setCurrentCategory,
                    }}
                    choices={choices}
                    chosen={chosen}
                  />
                </Box>
              </>
            )}
          </Grid>
        </ModalWindow>
      </Grid>
    </Modal>
  );
}

function ChoiceList({
  type,
  choices,
  currentCategory,
  chosen,
}: {
  choices: CategoryValuePair[];
  type: ListType;
  currentCategory: {
    get: CodeTextPair | undefined;
    set: (v: CodeTextPair | undefined) => void;
  };
  chosen?: { set: (v: CategoryValuePair[]) => void; get: CategoryValuePair[] };
}) {
  const [options, setOptions] = useState<CodeTextPair[]>([]);

  const [categories, setCategories] = useState<CodeTextPair[]>([]);
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);

  useEffect(() => {
    if (type == "category" && chosen?.get) {
      setChosenCategories(chosen.get.map((cat) => cat.category.code));
    }
  }, [chosen?.get]);

  useEffect(() => {
    if (!choices) return;
    let categoriesArray: any = choices.map((item) => item.category);
    categoriesArray = categoriesArray.map((cat: Object) => JSON.stringify(cat));
    categoriesArray = Array.from(new Set(categoriesArray));
    categoriesArray = categoriesArray.map((cat: string) =>
      JSON.parse(cat)
    ) as typeof choices;
    setCategories(categoriesArray);
  }, [choices]);

  useEffect(() => {
    let newOptions: { code: string; text: string }[];
    if (type === "category") {
      newOptions = categories;
    } else if (type === "value") {
      newOptions = choices
        .filter((choice) => choice.category.code === currentCategory.get?.code)
        .map((choice) => choice.value);
    } else {
      newOptions = choices.map((choice) => ({
        code: choice.value.code,
        text:
          (choice.category.text ? "(" + choice.category.text + ") " : "") +
          choice.value.text,
      }));
    }
    newOptions.sort((o1, o2) => {
      const a = (o1.text + "").toLowerCase();
      const b = (o2.text + "").toLowerCase();
      return a > b ? 1 : a < b ? -1 : 0;
    });
    setOptions(newOptions);
  }, [currentCategory, type, categories]);

  return (
    <List
      sx={{
        minWidth: "150px",
        width: "content",
        flexGrow: 1,
        overflow: "auto",
        backgroundColor: "background.lightinput",
        ...(type === "value" ? { minWidth: "30vw" } : {}),
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
                type === "category" && currentCategory.get === option
                  ? "background.lightinput2"
                  : "unset",
              "&:hover":
                type !== "category"
                  ? {
                      backgroundColor: "background.lightinput2",
                    }
                  : {},
            }}
            onMouseEnter={() => {
              if (type === "category") {
                currentCategory.set(option);
              } else {
              }
            }}
            onClick={() => {
              if (type === "category") return;

              if (isChosen) {
                chosen.set(
                  chosen.get.filter((item) => item.value.code !== option.code)
                );
              } else if (type === "value") {
                if (currentCategory.get) {
                  chosen?.set([
                    ...chosen.get,
                    { category: currentCategory.get, value: option },
                  ]);
                }
              } else if (type === "simple") {
                if (!chosen) return;
                const chosenChoice = choices.filter(
                  (choice) => choice.value.code === option.code
                )[0];

                chosen.set([
                  ...chosen.get,
                  {
                    category: chosenChoice.category,
                    value: chosenChoice.value,
                  },
                ]);
              }
            }}
          >
            <Typography
              fontWeight={
                type === "category" && chosenCategories.includes(option.code)
                  ? "bold"
                  : ""
              }
            >
              {option.text}
            </Typography>
            {type === "category" ? (
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
