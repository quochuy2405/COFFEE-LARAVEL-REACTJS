import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import * as React from "react";

export default function Loading({ loading, success }) {
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 3, position: "relative" }}>
        {success ? (
          <Fab
            aria-label="run"
            color="primary"
            sx={buttonSx}
            style={{ width: "40px", height: "40px" }}
          >
            <CheckIcon />
          </Fab>
        ) : (
          <Button
            variant="contained"
            style={{ background: "#ffffff", color: "#ffa900" }}
          >
            Đặt hàng
          </Button>
        )}
        {loading && (
          <CircularProgress
            size={18}
            sx={{
              color: green[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
}
