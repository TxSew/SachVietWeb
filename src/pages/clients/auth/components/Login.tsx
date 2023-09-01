import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <form noValidate autoComplete="off">
      <FormControl
        sx={{
          mt: "10px",
        }}
        fullWidth
      >
        <label>Số điện thoại/Email</label>
        <OutlinedInput
          sx={{
            py: 1,
          }}
          fullWidth
          placeholder="Please enter text"
        />
      </FormControl>
      <FormControl
        sx={{
          mt: "20px",
        }}
        fullWidth
      >
        <label>Mật khẩu</label>
        <OutlinedInput
          sx={{
            py: 1,
          }}
          fullWidth
          placeholder="Please enter Password"
        />
      </FormControl>
      <Typography>Quên mật khẩu?</Typography>
      <Box
        mt={2}
        sx={{
          display: "flex",
          direction: "column",
          justifyContent: "center",
        }}
      >
        <Button variant="outlined">Đăng nhập</Button>
      </Box>
    </form>
  );
};

export default Login;
