import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { color } from "../../../../Theme/color";
import { BaseAPi } from "../../../../configs/BaseApi";
import HttpAccountController from "../../../../submodules/controllers/http/httpAccountController";
import { User } from "../../../../submodules/models/UserModel/User";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { ResponseStatus } from "../../../../helpers/ResponsiveStatus";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const http = new HttpAccountController(BaseAPi);
  const redirect = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>({ mode: "all" });

  const handleLogin = async (data: User) => {
    try {
      const login = await http.login(data);
      if (login) {
        toast.success("Đăng nhập tài khoản thành công", {
          position: "top-right",
        });
        const { account, token, role } = login;
        localStorage.setItem("user", JSON.stringify(account));
        localStorage.setItem("token", JSON.stringify(token));
        if (role) {
          localStorage.setItem("role", JSON.stringify(role));
        }
      }
      // redirect("/");
      window.location.assign("/");
    } catch (err: any) {
      if (err.response.data.message === ResponseStatus.auth.notFound) {
        toast.error(
          "Tài khoản không có quyền truy cập, xin vui lòng thử lại!",
          {
            position: "top-right",
          }
        );
      }
      if (err.response.data.message === "Wrong password") {
        toast.warning("Mật khẩu  không đúng, xin vui lòng nhập lại!", {
          position: "top-right",
        });
      }
    }
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
      <FormControl
        sx={{
          mt: "10px",
        }}
        fullWidth
      >
        <label>Email</label>
        <Controller
          control={control}
          name="email"
          defaultValue="" // Set an initial value here
          rules={{
            required: "Vui lòng nhập email của bạn!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Tài khoản email không hợp lệ!",
            },
          }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              key={2}
              fullWidth
              placeholder="Vui lòng nhập Email của bạn!"
            />
          )}
        />
        <Typography variant="caption" color={color.error}>
          {errors.email && errors.email.message}
        </Typography>
      </FormControl>
      <FormControl
        sx={{
          mt: "16px",
        }}
        fullWidth
      >
        <Typography>Mật khẩu</Typography>
        <Controller
          control={control}
          defaultValue="" // Set an initial value here
          name="password"
          rules={{
            required: "Mật khẩu không được để trống!",
            minLength: {
              value: 5,
              message: "Mật khẩu yêu cầu 5 kí tự trở lên!",
            },
            maxLength: {
              value: 30,
              message: "Mật khẩu yêu cầu 30 kí tự trở xuống!",
            },
          }}
          render={({ field }) => (
            <OutlinedInput
              key={1}
              {...field}
              fullWidth
              placeholder="Vui lòng nhập mật khẩu"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <VisibilityOff
                        sx={{
                          fontSize: "14px",
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          fontSize: "14px",
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        <Typography variant="caption" color={color.error}>
          {errors.password && errors.password.message}
        </Typography>
      </FormControl>
      <Typography variant="caption" color={color.error}>
        {errors.password && errors.password.message}
      </Typography>
      <Typography
        variant="caption"
        display={"flex"}
        textAlign={"end"}
        justifyContent={"end"}
        pt={2}
      >
        <Link to={"ChangePassword"} style={{ color: "red" }}>
          Quên mật khẩu?
        </Link>
      </Typography>
      <Box
        mt={2}
        sx={{
          clear: "both",
          display: "flex",
          direction: "column",
          justifyContent: "center",
        }}
      >
        <Button
          type="submit"
          variant="outlined"
          style={{
            width: "100%",
            fontSize: "12px",
            fontWeight: "bold",
            background: "#BDB5B5",
            color: "#000",
            border: "none",
            padding: "8px 0",
          }}
        >
          Đăng nhập
        </Button>
      </Box>
      <Box
        mt={2}
        sx={{
          clear: "both",
          display: "flex",
          direction: "column",
          justifyContent: "center",
        }}
      >
        <Button
          type="submit"
          variant="outlined"
          style={{
            width: "100%",
            fontSize: "12px",
            fontWeight: "bold",
            background: "#2489F4",
            color: "#fff",
            border: "none",
            padding: "8px 0",
          }}
        >
          Đăng nhập bằng facebook
        </Button>
      </Box>
    </form>
  );
};

export default Login;
