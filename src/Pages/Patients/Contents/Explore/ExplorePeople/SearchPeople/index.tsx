import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { Search, AccountCircle } from "@mui/icons-material";
import lodash from "lodash";

import Api from "Services/api";

import { PeopleRow } from "..";
import { toTitleCase } from "Common/utilities";

const searchDebouncer = lodash.debounce((search: Function) => search(), 1000, {
  leading: true,
});

function SearchPeople() {
  const [people, setPeople] = useState([]);
  const [searchInputs, setSearchInputs] = useState<Record<string, any>>({});

  const [searching, setSearching] = useState(false);

  const debouncerWaiting = useRef(false);

  function safeSearch() {
    debouncerWaiting.current = true;
    searchDebouncer(search);

    function search() {
      setSearching(true);
      debouncerWaiting.current = false;

      Api.post("/patients/find", searchInputs)
        .then((response) => {
          setPeople(response.data);
        })
        .finally(() => setSearching(false));
    }
  }

  useEffect(() => {
    safeSearch();
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

        {searching || debouncerWaiting.current ? (
          <LinearProgress sx={{ margin: "20px", width: "100%" }} />
        ) : people?.length > 0 ? (
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
              {people.map((person, i) => (
                <Item key={(person as any)._id ?? i} data={person} />
              ))}
            </TableBody>
          </Table>
        ) : (
          <Grid container justifyContent="center" sx={{ padding: "40px" }}>
            <Typography variant="h6" color="#0008">
              No results found
            </Typography>
          </Grid>
        )}
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
          [name]: number
            ? e.target.value === ""
              ? ""
              : Number(e.target.value)
            : e.target.value,
        });
      }}
    />
  );
}

function Item({ data }: { data: PeopleRow }) {
  const navigate = useNavigate();
  return (
    <TableRow
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "background.lightinput",
        },
      }}
    >
      <TableCell onClick={clk}>
        <AccountCircle sx={{ color: "#0008" }} />
      </TableCell>
      <TableCell onClick={clk}>
        {toTitleCase(
          (data.firstname ?? "") +
            " " +
            (data.fathername ?? "") +
            " " +
            (data.grandfathername ?? "")
        )}
      </TableCell>
      <TableCell onClick={clk}>{data.regno}</TableCell>
      <TableCell onClick={clk}>{data.chno}</TableCell>
      <TableCell onClick={clk}>{data.age}</TableCell>
    </TableRow>
  );

  function clk() {
    navigate(data.regno + "");
  }
}

export default SearchPeople;
