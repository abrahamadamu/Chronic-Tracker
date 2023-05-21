import { Modal, Grid, Typography } from "@mui/material";
import { ModalWindow } from "./styles";
import { Close } from "@mui/icons-material";

import { CategoryValuePair } from "Data/data";

const centerStyle = { placeItems: "center", justifyContent: "center" };

function AddMedication({
  chosen,
  open,
}: {
  chosen: { get: CategoryValuePair[]; set: (v: CategoryValuePair[]) => void };
  open: { get: boolean; set: (v: boolean) => void };
}) {
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
            Add Medication
          </Typography>
          <Grid container gap={1} sx={{ flexGrow: 1, height: "0px" }}></Grid>
        </ModalWindow>
      </Grid>
    </Modal>
  );
}

export default AddMedication;
