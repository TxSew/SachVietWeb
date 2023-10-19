import { Autocomplete, Box, Fade, Modal } from "@mui/material";
import React, { useEffect } from "react";
import HttpProductController from "../../../../../submodules/controllers/http/httpProductController";
import { BaseAPi } from "../../../../../configs/BaseApi";

export default function SearchModel() {
  const http = new HttpProductController(BaseAPi);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    fetchSearhcData();
  }, []);
  const fetchSearhcData = async () => {
    const data = await http.getAll();
    console.log(data);
  };
  const options = ["Option 1", "Option 2"];
  return (
    <Autocomplete
      sx={{
        width: "100%",
        display: "block",
        height: "100%",
        "& input": {
          bgcolor: "background.paper",
          flex: 1,
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.background.paper),
        },
      }}
      id="custom-input-demo"
      options={options}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <input type="text" {...params.inputProps} />
        </div>
      )}
    />
  );
}
