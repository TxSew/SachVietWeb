import {
  Box,
  Button,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { color } from "../../../Theme/color";
import { validateForm } from "../../../helpers/validateForm";
import { httpProducer } from "../../../submodules/controllers/http/axiosController";
import { Producer } from "../../../submodules/models/producerModel/producer";

const UpdateProducer = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Producer>({
    defaultValues: {},
  });

  const handleAddProducer = async (data: Producer) => {
    const producerUpdate = await httpProducer.post(data);
    if (producerUpdate)
      toast.success("Nhà cung cấp thêm thành công", {
        position: "top-right",
      });
  };
  return (
    <Box>
      <form action="" onSubmit={handleSubmit(handleAddProducer)}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            variant="h2"
            fontSize={"24px"}
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            Thêm nhà cung cấp
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
            Tên nhà cung cấp
          </Typography>
          <Controller
            control={control}
            name="name"
            defaultValue=""
            rules={{
              required: "Tên nhà cung cấp không được bỏ trống",
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
                placeholder={""}
              />
            )}
          />
          <Typography variant="caption" color={color.error}>
            {errors.name && errors.name?.message}
          </Typography>

          <Typography variant="h2" mt={2} fontSize={"18px"} fontWeight={"bold"}>
            Mã Code
          </Typography>
          <Controller
            control={control}
            name="code"
            rules={{
              required: "Vui lòng nhập mã code",
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
            {errors.code && errors.code.message}
          </Typography>
          <Typography variant="h2" mt={2} fontSize={"18px"} fontWeight={"bold"}>
            Từ khóa
          </Typography>
          <Controller
            control={control}
            name="keyword"
            rules={{
              required: "Vui lòng nhậ từ khóa",
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
            {errors.keyword && errors.keyword.message}
          </Typography>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateProducer;
