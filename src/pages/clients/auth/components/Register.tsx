import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { color } from "../../../../Theme/color";
import { BaseAPi } from "../../../../configs/BaseApi";
import { FormRegister } from "../../../../models/AuthModel/Register";
import HttpAccountController from "../../../../submodules/controllers/http/httpAccountController";
import { User } from "../../../../submodules/models/UserModel/User";
export const Register = () => {
  const http = new HttpAccountController(BaseAPi);
  const redirect = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>({
    mode: "all",
  });
  const RegisterSubmit = async (register: User) => {
    console.log(register);
    try {
      const Sign = await http.register(register);
      if (Sign) {
        toast.success("Register Success", {
          position: "bottom-right",
        });
        localStorage.setItem("user", JSON.stringify(register));
        redirect("/");
      }
    } catch (err: any) {
      if (err.response.data.message === "Email already exists") {
        toast.error("Tai khoan email ton tai", {
          position: "bottom-right",
        });
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
              sx={{
                py: 1,
              }}
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
          mt: "20px",
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
              sx={{
                py: 1,
              }}
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
          mt: "20px",
        }}
        fullWidth
      >
        <Typography>Số điện thoại</Typography>
        <Controller
          control={control}
          name="phone"
          rules={{
            required: "Vui lòng nhập số diện thoại!",
          }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              sx={{
                py: 1,
              }}
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
          mt: "20px",
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
          }}
          render={({ field }) => (
            <OutlinedInput
              key={1}
              {...field}
              sx={{
                py: 1,
              }}
              fullWidth
              placeholder="Vui lòng nhập mật khẩu"
            />
          )}
        />
      </FormControl>
      <Typography variant="caption" color={color.error}>
        {errors.password && errors.password.message}
      </Typography>
      <Box mx={"auto"} textAlign={"center"}>
        <Button
          sx={{
            mt: "20px",
          }}
          type="submit"
          variant="outlined"
        >
          Đăng kí
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
