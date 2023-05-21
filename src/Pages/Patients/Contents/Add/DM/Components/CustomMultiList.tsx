import { useState, useEffect, useRef } from "react";
import { isEqual } from "lodash";

import MultiList from "./MultiList";

import AddToList from "./CustomMultiSelector";

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
  const prevChosenValue = useRef<CategoryValuePair[] | CodeTextPair[]>([]);
  const prevTempChosen = useRef<CategoryValuePair[]>([]);

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
      if (!isEqual(chosen.get, tempChosen)) {
        chosen.set(tempChosen);
        prevChosenValue.current = chosen.get;
      }
    } else if (!isCategoryChosenSetFunction(chosen.set, choices)) {
      const data: CodeTextPair[] = tempChosen.map((chosen) => ({
        code: chosen.value.code,
        text: chosen.value.text,
      }));

      if (!isEqual(chosen.get, data)) {
        chosen.set(data);
        prevChosenValue.current = chosen.get;
      }
    }
  }, [tempChosen]);

  useEffect(() => {
    if (!isEqual(chosen.get, tempChosen)) {
      const newData = toCategoryValuePair(chosen.get);
      setTempChosen(newData);
      prevTempChosen.current = newData;
    }
  }, [chosen.get]);

  if (!chosen.get) return <></>;

  const itemsList = toCategoryValuePair(intermChosen.get).map((item) => ({
    id: item.category.code + item.value.code,
    text: item.value.text,
  }));
  const deleteItem = (item: { id: string; text: string }) => {
    let newData = [...intermChosen.get] as any;
    newData = newData.filter((dat: CategoryValuePair | CodeTextPair) => {
      if (isCategoryValuePair(dat)) {
        return !(dat.category.code + dat.value.code === item.id);
      } else {
        return !(dat.code === item.id);
      }
    });
    intermChosen.set(newData);
  };

  return (
    <>
      <MultiList
        addItem={setShowList}
        deleteItem={deleteItem}
        title={title}
        itemsList={itemsList}
      />
      <AddToList
        choices={toCategoryValuePair(choices)}
        chosen={intermChosen}
        open={{ get: showList, set: setShowList }}
        listType={!hasCategory ? "simple" : listType}
        title={title}
      />
    </>
  );
}

function isCategoryValuePairArray(
  choices: CategoryValuePair[] | CodeTextPair[]
): choices is CategoryValuePair[] {
  if (choices.length < 0) return true;

  return !!(choices[0] as CategoryValuePair)?.category;
}
function isCategoryBasedChosen(
  data: any,
  choices: CodeTextPair[] | CategoryValuePair[]
): data is CategoryBasedChosen {
  if (choices.length < 1) return true; //Bad already
  return !!(choices[0] as CategoryValuePair)?.category;
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
  return !!(data as CategoryValuePair)?.category;
}

function toCategoryValuePair(choices: CategoryValuePair[] | CodeTextPair[]) {
  if (isCategoryValuePairArray(choices)) return choices;
  else
    return choices.map((choice) => ({
      category: { code: "", text: "" },
      value: choice,
    }));
}

export default EditableList;
