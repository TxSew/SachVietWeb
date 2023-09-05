import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { color } from "../../../../Theme/color";

export const Register = () => {
  return (
    <form noValidate autoComplete="off">
      <FormControl
        sx={{
          mt: "10px",
        }}
        fullWidth
      >
        <Typography> Họ Tên</Typography>
        <OutlinedInput
          sx={{
            py: 1,
          }}
          fullWidth
          placeholder="Vui lòng nhập họ tên"
        />
      </FormControl>
      <FormControl
        sx={{
          mt: "20px",
        }}
        fullWidth
      >
        <Typography>Email</Typography>
        <OutlinedInput
          sx={{
            py: 1,
          }}
          fullWidth
          placeholder="Vui lòng nhập email của bạn"
        />
      </FormControl>
      <FormControl
        sx={{
          mt: "20px",
        }}
        fullWidth
      >
        <Typography>Tài khoản</Typography>
        <OutlinedInput
          sx={{
            py: 1,
          }}
          fullWidth
          placeholder="Vui lòng nhập tài khoản của bạn"
        />
      </FormControl>
      <FormControl
        sx={{
          mt: "20px",
        }}
        fullWidth
      >
        <Typography>Mật khẩu</Typography>
        <OutlinedInput
          sx={{
            py: 1,
          }}
          fullWidth
          placeholder="Vui lòng nhập Mật khẩu của bạn"
        />
      </FormControl>
      <Box mx={"auto"} textAlign={"center"}>
        <Button sx={{
             mt: "20px",
        }}  variant="outlined">Đăng kí</Button>
             <br/>
        <Typography variant="body1" pt={3} sx={{
        }}>
          Bằng việc đăng ký, bạn đã đồng ý với Fahasa.com về
           <Typography variant="body1" sx={{
             '& > a':{
                 textDecoration:"none",
             }
           }}>
            <Link color={color.text_color} to={"/"}>Điều khoản dịch vụ</Link> &
            <Link to={"/"}>Chính sách bảo mật</Link>
            </Typography>
        </Typography>
      </Box>
    </form>
  );
};
