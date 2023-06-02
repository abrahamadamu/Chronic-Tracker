import { ReactNode } from "react";
import { Typography } from "@mui/material";
import { SubContainer } from "./styled";

function InputGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <SubContainer>
      <Typography
        fontWeight="bold"
        sx={{ gridColumnEnd: "span 2", marginY: "10px" }}
      >
        {title}
      </Typography>
      {children}
    </SubContainer>
  );
}

export default InputGroup;
