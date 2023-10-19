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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import HttpProducerController from "../../../submodules/controllers/http/httpProducerController";
import { Producer } from "../../../submodules/models/producerModel/producer";

var http = new HttpProducerController(BaseAPi);
const UpdateProducer = () => {
  const { id } = useParams();
  const [Producer, setProducer] = useState<Producer>({});
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
  } = useForm<Producer>({
    defaultValues: {
      status: "1",
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
            Cập nhật nhà cung cấp {Producer.id}
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
            defaultValue="" // Set an initial value here
            rules={{
              required: "Tên nhà cung cấp không được bỏ trống!",
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
                placeholder={Producer?.name}
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
                placeholder={Producer?.code}
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
              required: "Vui lòng nhập từ khóa",
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
                placeholder={Producer?.keyword}
              />
            )}
          />
          <Typography variant="caption" color={color.error}>
            {errors.keyword && errors.keyword.message}
          </Typography>
          <Typography variant="h2" mt={2} fontSize={"18px"} fontWeight={"bold"}>
            Trạng thái
          </Typography>
          <Controller
            control={control}
            name="status"
            rules={{
              required: "Vui lòng nhập trạng thái",
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

export default UpdateProducer;
