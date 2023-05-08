import { FC } from "react";
export type TabType = {
  id: string;
  name: string;
  title: string;
  component: FC;
};
export type FormDataType = Record<string, string>;
