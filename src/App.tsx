import Pages from "./Pages";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5e30fa",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Pages />
    </ThemeProvider>
  );
}

export default App;
