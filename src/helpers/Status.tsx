import { Typography } from "@mui/material";
import React from "react";

export const Status = (value: any) => {
  return (
    <React.Fragment>
      {value == null ? (
        <Typography>active</Typography>
      ) : (
        <Typography>unActive</Typography>
      )}
    </React.Fragment>
  );
};
