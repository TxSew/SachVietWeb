import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { color } from "../../../../Theme/color";

function Tabbar() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box
      sx={{
        p: "10px",
      }}
    >
      <Box>
        <Typography
          variant="body1"
          fontWeight={"bold"}
          textTransform={"uppercase"}
        >
          Danh mục sản phẩm
        </Typography>
      </Box>
      <Box pt={2} pb={2} borderBottom={"1px solid #eee"}>
        <Typography variant="h3" fontWeight={"bold"} fontSize={"17px"}>
          Giá
        </Typography>
        <FormGroup color={color.text_color} sx={{}}>
          <FormControlLabel control={<Checkbox />} label="0đ - 150.000đ" />
          <FormControlLabel
            control={<Checkbox />}
            label="150.000đ - 300.000đ"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="150.000đ - 300.000đ"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="300.000đ - 500.000đ"
          />
        </FormGroup>
      </Box>
      <Box pt={2} pb={2} borderBottom={"1px solid #eee"}>
        <Typography variant="h3" fontWeight={"bold"} fontSize={"17px"}>
          Nhà cung cấp
        </Typography>
        <FormGroup color={color.text_color} sx={{}}>
          <FormControlLabel control={<Checkbox />} label="NXB Trẻ" />
          <FormControlLabel control={<Checkbox />} label="Bách việt" />
          <FormControlLabel control={<Checkbox />} label="Phụ nữ" />
          <FormControlLabel control={<Checkbox />} label="Nhã Nam" />
        </FormGroup>
      </Box>
    </Box>
  );
}

export default Tabbar;
