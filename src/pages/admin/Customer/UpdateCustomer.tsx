import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import HttpCategoryController from "../../../submodules/controllers/http/httpCategoryController";
import HttpProducerController from "../../../submodules/controllers/http/httpProducerController";
import { Category } from "../../../submodules/models/ProductModel/Category";
import { Producer } from "../../../submodules/models/producerModel/producer";
import { useParams } from "react-router-dom";
import { Update } from "@mui/icons-material";
import { User } from "../../../submodules/models/UserModel/User";

var http = new HttpProducerController(BaseAPi);
const UpdateCustomer = () => {
  const { id } = useParams();
  const [Producer, setProducer] = useState<User>({});
  useEffect(() => {
    fetchProducerDetail();
  }, []);
  const fetchProducerDetail = async () => {
    const detailProducer = await http.getOne(Number(id));
    console.log(detailProducer);
    setProducer(detailProducer);
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      status: 1,
    },
  });

  const handleUpdate = async (data: Producer) => {
    const producerUpdate = await http.put(Number(id), data);
    if (producerUpdate) {
      toast.success("producer add successfully", {
        position: "bottom-right",
      });
    }
  };
  return (
    <Box>
      <form action="" onSubmit={handleSubmit(handleUpdate)}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            variant="h2"
            fontSize={"24px"}
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            Cập nhật Khách hàng {Producer.id}
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
          <Typography variant="h2" fontSize={"18px"} fontWeight={"bold"}>
            Tên Khách hàng
          </Typography>
          <Controller
            control={control}
            name="fullName"
            defaultValue="" // Set an initial value here
            rules={{
              required: "Tên khách hàng không được bỏ trống!",
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
              />
            )}
          />
          <Typography variant="caption" color={color.error}>
            {errors.fullName && errors.fullName?.message}
          </Typography>

          <Typography variant="h2" mt={2} fontSize={"18px"} fontWeight={"bold"}>
            Email
          </Typography>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email không được bỏ trống!",
            }}
            render={({ field }) => (
              <OutlinedInput
                type="text"
                {...field}
                sx={{
                  mt: 1,
                  "& > input": {
                    p: "7px",
                  },
                }}
                fullWidth
              />
            )}
          />
          <Typography variant="caption" color={color.error}>
            {errors.email && errors.email.message}
          </Typography>
          <Typography variant="h2" mt={2} fontSize={"18px"} fontWeight={"bold"}>
            Số điện thoại
          </Typography>
          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Số điện thoại không được bỏ trống!",
            }}
            render={({ field }) => (
              <OutlinedInput
                type="number"
                {...field}
                sx={{
                  mt: 1,
                  "& > input": {
                    p: "7px",
                  },
                }}
                fullWidth
              />
            )}
          />
          <Typography variant="caption" color={color.error}>
            {errors.phone && errors.phone.message}
          </Typography>

          <Typography variant="h2" mt={2} fontSize={"18px"} fontWeight={"bold"}>
            Trạng thái
          </Typography>
          <Controller
            control={control}
            name="status"
            rules={{
              required: "Price is not",
            }}
            render={({ field }) => (
              <FormControl fullWidth>
                <Select
                  {...field}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    mt: 1,
                    "& > div": {
                      p: "7px",
                    },
                  }}
                >
                  <MenuItem value={""}>
                    <em>[--Chọn trạng thái--]</em>
                  </MenuItem>
                  <MenuItem value={1}>
                    <em>Đang kinh doanh</em>
                  </MenuItem>
                  <MenuItem value={0}>
                    <em>Ngưng kinh doanh</em>
                  </MenuItem>
                </Select>
                {/* <FormHelperText>Without label</FormHelperText> */}
              </FormControl>
            )}
          />
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateCustomer;
