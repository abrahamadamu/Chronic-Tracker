import { BrowserRouter } from "react-router-dom";
import Pages from "./Pages";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    text: {
      primary: "#000b",
    },
    primary: {
      main: "#a830fa",
    },
    secondary: {
      main: "#249db7",
    },
    background: {
      lightinput: "#f9f9fd",
      lightinput2: "#eaeafd",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
