// src/components/PrivateHeader.tsx
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LogoutButton from "./LogoutButton";

export default function PrivateHeader() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Smart Docs
        </Typography>
        <Box>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
