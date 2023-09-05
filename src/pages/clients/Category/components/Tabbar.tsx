import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
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
    <Box sx={{
       p:"10px"
    }}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" , py:"10px" , borderBottom:"1px solid #eee" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader  component="div" id="nested-list-subheader">
            Tất cả danh mục
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemText primary="Sách tiếng việt" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Sách tiếng anh" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Sách tiếng nga" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Bulys code well" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Box pt={2} pb={2}  borderBottom={"1px solid #eee"}>
        <Typography variant="h3" fontWeight={"bold"} fontSize={"17px"}>Giá</Typography>
        <FormGroup color={color.text_color} sx={{
        }}>
          <FormControlLabel
            control={<Checkbox  />}
            label="0đ - 150.000đ"
          />
          <FormControlLabel  control={<Checkbox />} label="150.000đ - 300.000đ" />
          <FormControlLabel  control={<Checkbox />} label="150.000đ - 300.000đ" />
          <FormControlLabel  control={<Checkbox />} label="300.000đ - 500.000đ" />
        </FormGroup>
      </Box>
      <Box pt={2} pb={2}  borderBottom={"1px solid #eee"}>
        <Typography variant="h3" fontWeight={"bold"} fontSize={"17px"}>Nhà cung cấp</Typography>
        <FormGroup color={color.text_color} sx={{
        }}>
          <FormControlLabel
            control={<Checkbox  />}
            label="NXB Trẻ"
          />
          <FormControlLabel  control={<Checkbox />} label="Bách việt" />
          <FormControlLabel  control={<Checkbox />} label="Phụ nữ" />
          <FormControlLabel  control={<Checkbox />} label="Nhã Nam" />
        </FormGroup>
      </Box>
    </Box>
  );
}

export default Tabbar;
