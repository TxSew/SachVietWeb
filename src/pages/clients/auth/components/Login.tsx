import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { color } from "../../../../Theme/color";

const Login = () => {
  return (
    <form noValidate autoComplete="off">
      <FormControl
        sx={{
          mt: "10px",
        }}
        fullWidth
      >
        <label>Tài khoản</label>
        <OutlinedInput
          sx={{
            py: 1,
          }}
          fullWidth
          placeholder="Vui lòng nhập Tài khoản"
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
          placeholder="Vui lòng nhập mật khẩu"
        />
      </FormControl>
      <Typography color={color.error} sx={{
         mt: "20px",
         mb: "10px",
         float: "right",
      }}>Quên mật khẩu?</Typography>
      <Box
        mt={2}
        sx={{
          clear: "both",
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
