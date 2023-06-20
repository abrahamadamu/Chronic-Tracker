import { useState, useEffect, useCallback } from "react";
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
import { Search, AccountCircle } from "@mui/icons-material";
import lodash from "lodash";

import { backend } from "Config/data";

import { PeopleRow } from "..";
import { toTitleCase } from "Common/utilities";

const searchSafe = lodash.debounce((search: Function) => search(), 1000, {
  leading: true,
});

function SearchPeople({ data }: { data: PeopleRow[] }) {
  const [people, setPeople] = useState([]);
  const [searchInputs, setSearchInputs] = useState<Record<string, any>>({});

  function search() {
    fetch(backend + "/patients/find", {
      method: "POST",
      body: JSON.stringify(searchInputs),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((json) => {
        console.log({ json });
        setPeople(json);
      });
    });
  }

  useEffect(() => {
    searchSafe(search);
  }, [searchInputs]);

  return (
    <Paper sx={{ marginTop: "50px", padding: "20px" }}>
      <Grid container sx={{}} gap={1}>
        <Typography variant="h6">Find patients by</Typography>
        <Grid container direction="row" gap={2}>
          <Search sx={{ fontSize: "30px" }} />
          {[
            { name: "firstname", text: "First Name", number: false },
            { name: "fathername", text: "Father's Name", number: false },
            { name: "grandfathername", text: "G.Father's Name", number: false },
            { name: "regno", text: "Reg No", number: true },
            { name: "chno", text: "Ch No", number: true },
          ].map((input) => (
            <SearchInputs
              key={input.name}
              name={input.name}
              number={input.number}
              text={input.text}
              searchInputs={{ get: searchInputs, set: setSearchInputs }}
            />
          ))}
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
            {people.map((person) => (
              <Item data={person} />
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Paper>
  );
}

function SearchInputs({
  name,
  text,
  number,
  searchInputs,
}: {
  name: string;
  text: string;
  number?: boolean;
  searchInputs: {
    get: Record<string, any>;
    set: (v: Record<string, any>) => void;
  };
}) {
  return (
    <TextField
      size="small"
      variant="standard"
      placeholder={text}
      type={number ? "number" : "text"}
      value={searchInputs.get[name] ?? ""}
      onChange={(e) => {
        searchInputs.set({
          ...searchInputs.get,
          [name]: number ? Number(e.target.value) : e.target.value,
        });
      }}
    />
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
      <TableCell>
        {toTitleCase(
          (data.firstname ?? "") +
            " " +
            (data.fathername ?? "") +
            " " +
            (data.grandfathername ?? "")
        )}
      </TableCell>
      <TableCell>{data.regno}</TableCell>
      <TableCell>{data.chno}</TableCell>
      <TableCell>{data.age}</TableCell>
    </TableRow>
  );
}

export default SearchPeople;
