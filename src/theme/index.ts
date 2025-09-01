import { createTheme } from "@mui/material";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: 'Heebo, "Segoe UI", Arial, sans-serif',
  },
  components: {
    MuiButton: { defaultProps: { variant: "contained" } },
  },
});

export default theme;
