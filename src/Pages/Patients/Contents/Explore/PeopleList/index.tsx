import { AccountCircle } from "@mui/icons-material";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Search } from "@mui/icons-material";

export type PeopleRow = {
  name: string;
  regno: number;
  chno: number;
  age: number;
};

function PeopleList({ data }: { data: PeopleRow[] }) {
  return (
    <Paper sx={{ marginTop: "50px", padding: "20px" }}>
      <Grid container sx={{}} gap={1}>
        <Typography variant="h6">Find patients by</Typography>
        <Grid container direction="row" gap={2}>
          <Search sx={{ fontSize: "30px" }} />
          <TextField size="small" variant="standard" placeholder="Name" />
          <TextField
            size="small"
            variant="standard"
            placeholder="Reg. number"
          />
          <TextField size="small" variant="standard" placeholder="CH number" />
        </Grid>
        <Table>
          <colgroup>
            <col style={{ width: "1%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "605%" }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography fontWeight="bold">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Reg No</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">CH No</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Age</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((person) => (
              <Item data={person} />
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Paper>
  );
}

function Item({ data }: { data: PeopleRow }) {
  return (
    <TableRow
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "background.lightinput",
        },
      }}
    >
      <TableCell>
        <AccountCircle sx={{ color: "#0008" }} />
      </TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell>{data.regno}</TableCell>
      <TableCell>{data.chno}</TableCell>
      <TableCell>{data.age}</TableCell>
    </TableRow>
  );
}

export default PeopleList;
