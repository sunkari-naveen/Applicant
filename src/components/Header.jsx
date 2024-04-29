import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";

export default function MenuAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Button size="large" sx={{ color: "white", display: "block" }}>
              Applicant
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
