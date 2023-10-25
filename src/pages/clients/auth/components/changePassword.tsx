import {
  Box,
  Button,
  FormControl,
  Grid,
  OutlinedInput,
  Typography
} from "@mui/material";
import React from "react";
import { color } from "../../../../Theme/color";
import { Link, NavLink } from "react-router-dom";

const ChangePassword = () => {
  return (
    <form autoComplete="off">
      <FormControl
        sx={{
          mt: "10px"
        }}
        fullWidth
      >
        <label>Email</label>
        <Grid position={"relative"} display={"flex"} alignItems={"center"}>
          <OutlinedInput
            key={1}
            fullWidth
            placeholder="Vui lòng nhập Email của bạn!"
          />
          <NavLink
            to={""}
            style={{
              position: "absolute",
              right: "0",
              padding: "7px 14px",
              fontSize: "10px",
              color: "grey"
            }}
          >
            <Typography>Gửi</Typography>
          </NavLink>
        </Grid>
      </FormControl>
      <Typography variant="caption" color={color.error}></Typography>
      <FormControl
        sx={{
          mt: "20px"
        }}
        fullWidth
      >
        <label>Mã OPT</label>
        <OutlinedInput key={1} fullWidth placeholder="Vui lòng nhập mã OPT" />
      </FormControl>
      <Typography variant="caption" color={color.error}></Typography>
      <FormControl
        sx={{
          mt: "20px"
        }}
        fullWidth
      >
        <label>Mật khẩu</label>
        <OutlinedInput
          key={1}
          fullWidth
          placeholder="Vui lòng nhập mật khẩu mới"
        />
      </FormControl>
      <Typography variant="caption" color={color.error}></Typography>
      <Box
        mt={2}
        sx={{
          clear: "both",
          display: "flex",
          direction: "column",
          justifyContent: "center"
        }}
      >
        <Button type="submit" variant="outlined">
          Gửi
        </Button>
      </Box>
    </form>
  );
};

export default ChangePassword;
