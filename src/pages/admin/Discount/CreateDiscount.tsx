import {
  Box,
  Button,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { color } from "../../../Theme/color";
import { Discount } from "../../../submodules/models/DiscountModel/Discount";
import HttpDiscountController from "../../../submodules/controllers/http/httpDiscountController";
import { BaseAPi } from "../../../configs/BaseApi";
import { validateForm } from "../../../helpers/validateForm";
const http = new HttpDiscountController(BaseAPi);
const CreateDiscount = () => {
  const redirect = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<Discount>({
    defaultValues: {
      status: "1",
    },
  });

  // console.log(watch().desc);
  //  upload image file base
  const handleAddDiscount = async (data: Discount) => {
    const addDiscount = await http.post(data);
    console.log(addDiscount);
  };

  return (
    <Box>
      <form action="" onSubmit={handleSubmit(handleAddDiscount)}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h2" fontSize={"24px"} fontWeight={"bold"}>
            Thêm mã giảm giá
          </Typography>
          <Button type="submit" variant="contained">
            Lưu
          </Button>
        </Stack>
        <Grid
          bgcolor={color.white}
          p={2}
          container
          mt={3}
          justifyContent={"space-between"}
        >
          <Grid xs={12} md={7.8} mb={3} fontSize={"20px"}>
            <Typography variant="h2" fontSize={"18px"} fontWeight={"bold"}>
              Mã giảm giá
            </Typography>
            <Controller
              control={control}
              name="code"
              defaultValue="" // Set an initial value here
              rules={{
                required: "Vui lòng nhập mã giảm giá",
                validate: validateForm,
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  sx={{
                    mt: 1,
                    "& > input": {
                      p: "7px",
                    },
                  }}
                  fullWidth
                  placeholder="Vui lòng nhập mã giảm giá"
                />
              )}
            />
            <Typography variant="caption" color={color.error}>
              {errors.code && errors.code.message}
            </Typography>
            {/*desc  */}
            <Typography
              variant="h2"
              fontSize={"18px"}
              fontWeight={"bold"}
              mt={2}
            >
              Số tiền giảm giá
            </Typography>
            <Controller
              control={control}
              name="discount"
              defaultValue="" // Set an initial value here
              rules={{
                required: "Vui lòng nhập số tiền giảm giá",
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  sx={{
                    mt: 1,
                    "& > input": {
                      p: "7px",
                    },
                  }}
                  fullWidth
                  placeholder="Vui lòng nhập số tiền giảm giá"
                />
              )}
            />
            <Typography variant="caption" color={color.error}>
              {errors.discount && errors.discount.message}
            </Typography>
            <Typography
              variant="h2"
              fontSize={"18px"}
              fontWeight={"bold"}
              mt={2}
            >
              Số tiền giới hạn nhập
            </Typography>
            <Controller
              control={control}
              name="payment_limit"
              rules={{
                required: "Vui lòng nhập số tiền giới hạn",
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  sx={{
                    mt: 1,
                    "& > input": {
                      p: "7px",
                    },
                  }}
                  fullWidth
                  placeholder="Vui lòng nhập số tiền giới hạn"
                />
              )}
            />
            <Typography variant="caption" color={color.error}>
              {errors.payment_limit && errors.payment_limit.message}
            </Typography>
            <Typography
              variant="h2"
              fontSize={"18px"}
              fontWeight={"bold"}
              mt={2}
            >
              Số lần tối thiểu được áp dụng
            </Typography>
            <Controller
              control={control}
              name="limit_number"
              rules={{
                required: "Vui lòng nhập số lần tối thiểu",
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  sx={{
                    mt: 1,
                    "& > input": {
                      p: "7px",
                    },
                  }}
                  fullWidth
                  placeholder="Vui lòng nhập số lần tối thiểu"
                />
              )}
            />
            <Typography variant="caption" color={color.error}>
              {errors.limit_number && errors.limit_number.message}
            </Typography>
          </Grid>
          <Grid xs={12} md={3.8}>
            <Typography variant="h2" fontSize={"18px"} fontWeight={"bold"}>
              Ngày giới hạn nhập
            </Typography>
            <Controller
              control={control}
              name="expiration_date"
              rules={{
                required: "Vui lòng nhập ngày giới hạn nhập",
              }}
              render={({ field }) => (
                <OutlinedInput
                  type="date"
                  {...field}
                  sx={{
                    mt: 1,
                    "& > input": {
                      p: "7px",
                    },
                  }}
                  fullWidth
                  placeholder="Giá không được để trống!"
                />
              )}
            />
            <Typography variant="caption" color={color.error}>
              {errors.expiration_date && errors.expiration_date.message}
            </Typography>

            <Typography
              variant="h2"
              mt={2}
              fontSize={"18px"}
              fontWeight={"bold"}
            >
              Mô tả ngắn
            </Typography>
            <Controller
              control={control}
              name="desc"
              render={({ field }) => (
                <OutlinedInput
                  type="text"
                  sx={{
                    mt: 1,
                    "& > input": {
                      p: "7px",
                    },
                  }}
                  fullWidth
                  placeholder="Vui lòng nhập mô tả ngắn"
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateDiscount;
