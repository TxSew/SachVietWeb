import { Typography } from "@mui/material";

export const Status = (value: any, key: any) => {
  return (
    <>
      {value == key ? (
        <Typography>active</Typography>
      ) : (
        <Typography>unActive</Typography>
      )}
    </>
  );
};
