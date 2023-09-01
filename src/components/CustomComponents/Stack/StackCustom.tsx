import React from "react";
import { Stack, StackProps } from "@mui/material";

function StackCustom({ children, ...rest }: StackProps) {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      {...rest}
    >
      {children}
    </Stack>
  );
}

export default StackCustom;
