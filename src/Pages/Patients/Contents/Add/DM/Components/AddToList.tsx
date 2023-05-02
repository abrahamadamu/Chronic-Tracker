import { useState } from "react";
import { Modal, Grid } from "@mui/material";
import { ModalWindow } from "./styles";

const centerStyle = { placeItems: "center", justifyContent: "center" };

function AddToList() {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open}>
      <Grid container sx={{ height: "100%", ...centerStyle }}>
        <ModalWindow
          container
          sx={{
            ...centerStyle,
          }}
        >
          <h1>Yaaaas</h1>
        </ModalWindow>
      </Grid>
    </Modal>
  );
}

export default AddToList;
