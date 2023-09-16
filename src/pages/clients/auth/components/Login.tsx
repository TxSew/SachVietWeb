import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { color } from "../../../../Theme/color";
import { Controller, useForm } from "react-hook-form";
import { FormLogin } from "../../../../models/AuthModel/Login";

const Login = () => {
  const {
    handleSubmit,
    control,
     
    formState: { errors, isValid },
  } = useForm<FormLogin>();

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit((d) => {
        console.log(d);
      })}
    >
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
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              key={2}
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
        <label>Mật khẩu</label>
        <Controller
          control={control}
          defaultValue="" // Set an initial value here
          name="password"
          rules={{
            required: "Passwords must be at least",
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
      <Typography
        color={color.error}
        sx={{
          mt: "20px",
          mb: "10px",
          float: "right",
        }}
      >
        Quên mật khẩu?
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
        <Button type="submit" variant="outlined" >
          Đăng nhập
        </Button>
      </Box>
    </form>
  );
};

export default Login;
