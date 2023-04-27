import { TextField } from "@mui/material";
import InputGroup from "../Components/InputGroup";

function DM() {
  return (
    <>
      <InputGroup title="Visit Information">
        <TextField variant="standard" label="Visit type" size="small" />
        <TextField variant="standard" label="Full name" size="small" />
        <TextField variant="standard" label="Age" size="small" />
        <TextField variant="standard" label="Sex" size="small" />
        <TextField variant="standard" label="Height" size="small" />
        <TextField
          variant="standard"
          label="Waist Circumference (cm)"
          size="small"
        />
      </InputGroup>
      <InputGroup title="Address">
        <TextField variant="standard" label="Zone/Sub-City" size="small" />
        <TextField variant="standard" label="Woreda" size="small" />
        <TextField variant="standard" label="Kebele" size="small" />
        <TextField variant="standard" label="House Number" size="small" />
        <TextField variant="standard" label="Phone Number" size="small" />
      </InputGroup>
      <InputGroup title="More">
        <TextField variant="standard" label="Date of enrollment" size="small" />
        <TextField
          variant="standard"
          label="Full initial diagnosis"
          size="small"
        />
      </InputGroup>
    </>
  );
}

export default DM;
