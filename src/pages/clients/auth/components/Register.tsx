import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { color } from "../../../../Theme/color";
import { BaseAPi } from "../../../../configs/BaseApi";
import HttpAccountController from "../../../../submodules/controllers/http/httpAccountController";
import { User } from "../../../../submodules/models/UserModel/User";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handelClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

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
    formState: { errors, isSubmitting },
    watch,
  } = useForm<User>({
    mode: "all",
  });

  const validatePasswordConfirmation = (value: any) => {
    const password = control._getWatch("password");
    return value === password || "Mật khẩu nhập lại không khớp!";
  };
  const RegisterSubmit = async (register: User) => {
    try {
      const Sign = await http.register(register);
      if (Sign) {
        toast.success("Đăng kí tài khoản thành công", {
          position: "top-right",
        });
        localStorage.setItem("user", JSON.stringify(register));
      }
    } catch (err: any) {
      if (err.response.data.message === "email already exists") {
        toast.error(
          "Tài khoản email của bạn đã tồn tại, vui lòng thử lại tài khoản khác!",
          {
            position: "top-right",
            delay: 1,
          }
        );
      }
    }
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit(RegisterSubmit)}>
      <FormControl
        sx={{
          mt: "10px",
        }}
        fullWidth
      >
        <Typography> Họ Tên</Typography>
        <Controller
          control={control}
          defaultValue="" // Set an initial value here
          name="fullName"
          rules={{
            required: "Tên của bạn không được bỏ trống!",
          }}
          render={({ field }) => (
            <OutlinedInput
              key={1}
              {...field}
              fullWidth
              placeholder="Vui lòng nhập tên của bạn!"
            />
          )}
        />
      </FormControl>
      <Typography variant="caption" color={color.error}>
        {errors.fullName && errors.fullName.message}
      </Typography>
      <FormControl
        sx={{
          mt: "16px",
        }}
        fullWidth
      >
        <Typography>Email</Typography>
        <Controller
          control={control}
          name="email"
          defaultValue="" // Set an initial value here
          rules={{
            required: "Email không được bỏ trống!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Email không hợp lệ!",
            },
          }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              fullWidth
              placeholder="Vui lòng nhập Email của bạn!"
            />
          )}
        />
      </FormControl>
      <Typography variant="caption" color={color.error}>
        {errors.email && errors.email.message}
      </Typography>
      <FormControl
        sx={{
          mt: "16px",
        }}
        fullWidth
      >
        <Typography>Số điện thoại</Typography>
        <Controller
          control={control}
          name="phone"
          rules={{
            required: "Vui lòng nhập số diện thoại!",
            pattern: {
              value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
              message: "Số điện thoại không hợp lệ!",
            },
          }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              fullWidth
              placeholder="Vui lòng nhập mật khẩu"
            />
          )}
        />
      </FormControl>
      <Typography variant="caption" color={color.error}>
        {errors.phone && errors.phone.message}
      </Typography>

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

      <FormControl
        sx={{
          mt: "16px",
        }}
        fullWidth
      >
        <Typography>Nhập lại mật khẩu</Typography>
        <Controller
          control={control}
          defaultValue="" // Set an initial value here
          name="confirmPassword"
          rules={{
            required: "Mật khẩu không được để  trống!",
            validate: validatePasswordConfirmation,
          }}
          render={({ field }) => (
            <OutlinedInput
              key={1}
              {...field}
              fullWidth
              placeholder="Vui lòng nhập mật khẩu"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handelClickShowConfirmPassword}
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
          {errors.confirmPassword && errors.confirmPassword.message}
        </Typography>
      </FormControl>
      <Box mx={"auto"} textAlign={"center"}>
        <Button
          sx={{
            mt: "16px",
          }}
          type="submit"
          variant="outlined"
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Đăng kí"}
        </Button>
        <br />
        <Box pt={3} sx={{}}>
          Bằng việc đăng ký, bạn đã đồng ý với Fahasa.com về
          <Typography
            variant="body1"
            sx={{
              "& > a": {
                textDecoration: "none",
              },
            }}
          >
            <Link color={color.text_color} to={"/"}>
              Điều khoản dịch vụ
            </Link>{" "}
            &<Link to={"/"}>Chính sách bảo mật</Link>
          </Typography>
        </Box>
      </Box>
    </form>
  );
};
