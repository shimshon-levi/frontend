import React from "react";
import { Box, Typography } from "@mui/material";

const NotFoundPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" color="error">
        שגיאה 404 - הדף לא נמצא
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
