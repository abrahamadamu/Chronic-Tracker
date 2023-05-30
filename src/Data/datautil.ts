import { CategoryValuePair, CodeTextPair, allExports } from "./data";

export function getCodes(data: CategoryValuePair[] | CodeTextPair[]) {
  const codes = data.map((dat) => {
    return isCodeTextPair(dat) ? dat.code : dat.value.code;
  });

  return codes;
}

export function getCategoryValuePair(codes: string[]) {
  let result = codes.map((code) => {
    const collections = Object.values(allExports).filter(
      (item) => !isCodeTextPairArray(item)
    ) as CategoryValuePair[][];

    for (const collection of collections) {
      const found = collection.find((item) => item.value.code === code);

      if (!!found) return found;
    }
  });

  return result.filter((item) => !!item) as CategoryValuePair[];
}

export function getCodeTextPair(codes: string[]) {
  let result = codes.map((code) => {
    const collections = Object.values(allExports).filter((item) =>
      isCodeTextPairArray(item)
    ) as CodeTextPair[][];

    for (const collection of collections) {
      const found = collection.find((item) => item.code === code);

      if (!!found) return found;
    }
  });

  return result.filter((item) => !!item) as CodeTextPair[];
}

function isCodeTextPair(data: any): data is CodeTextPair {
  return !!(data as CodeTextPair).code;
}
function isCodeTextPairArray(data: any): data is CodeTextPair[] {
  return !!((data as CodeTextPair[])[0] && (data as CodeTextPair[])[0].code);
}
