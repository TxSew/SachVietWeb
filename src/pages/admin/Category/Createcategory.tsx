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
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import HttpCategoryController from "../../../submodules/controllers/http/httpCategoryController";
import HttpProducerController from "../../../submodules/controllers/http/httpProducerController";
import { Category } from "../../../submodules/models/ProductModel/Category";
import { Producer } from "../../../submodules/models/producerModel/producer";

var http = new HttpProducerController(BaseAPi);
var httpcategory = new HttpCategoryController(BaseAPi);
const CreateCategory = () => {
  const [Producer, setProducer] = useState<Producer[]>([] as Producer[]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetchProducer();
    fetchCategory();
  }, []);
  const fetchProducer = async () => {
    try {
      const producer: any = await http.getAll();
      setProducer(producer);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategory = async () => {
    try {
      const category: any = await httpcategory.getAll();
      console.log(category);
      setCategory(category);
    } catch (err) {
      console.error(err);
    }
  };
  const editorRef = useRef<any>(null);

  // if (editorRef.current) {
  //   console.log(editorRef.current.getContent());
  // }

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<Category>({
    defaultValues: {
      status: "1",
    },
  });

  // console.log(watch().desc);
  const isDisabled = !(isDirty && isValid);
  //  upload image file base
  const handleAddProduct = async (data: Category) => {
    console.log("dat", data);
    const categoryDto = await httpcategory.store(data);
    console.log(categoryDto);
    if (categoryDto) {
      toast.success("category added successfully", {
        position: "bottom-right",
      });
    }
  };
  function renderCategories(categories: any, parentId: number = 1) {
    categories.forEach((e: any) => {
      const id = e.id;
      const name = e.name;
      if ((e.parentId = parentId)) {
        return (
          <>
            <MenuItem value={id}>
              <em>{name}</em>
            </MenuItem>
            {renderCategories(categories, parentId)}
          </>
        );
      }
    });
  }
  return (
    <Box>
      <form action="" onSubmit={handleSubmit(handleAddProduct)}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h2" fontSize={"24px"} fontWeight={"bold"}>
            Thêm danh mục mới
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
            Tên danh mục
          </Typography>
          <Controller
            control={control}
            name="name"
            defaultValue="" // Set an initial value here
            rules={{
              required: "Tên danh mục không được bỏ trống!",
            }}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                {...register("name")}
                sx={{
                  mt: 1,
                  "& > input": {
                    p: "7px",
                  },
                }}
                fullWidth
                placeholder="Vui lòng nhập Ten của bạn!"
              />
            )}
          />
          <Typography variant="caption" color={color.error}>
            {errors.name && errors.name?.message}
          </Typography>

          <Grid container mt={2} justifyContent={"space-between"}>
            <Grid xs={5.8}>
              <Typography variant="h2" fontSize={"18px"} fontWeight={"bold"}>
                Danh mục cha
              </Typography>
              <Controller
                control={control}
                name="parentId"
                rules={{
                  required: "Vui lòng nhập Danh mục sản phẩm!",
                }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select
                      {...field}
                      {...register("parentId")}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        mt: 1,
                        "& > div": {
                          p: "7px",
                        },
                      }}
                      defaultValue="2"
                    >
                      {category.map((e: any) => {
                        return (
                          <MenuItem value={e.id}>
                            <em>{e.name}</em>
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {/* <FormHelperText>Without label</FormHelperText> */}
                  </FormControl>
                )}
              />
              <Typography variant="caption" color={color.error}>
                {errors.parentId && errors.parentId.message}
              </Typography>
              <Grid xs={5.8}></Grid>
            </Grid>
          </Grid>
          <Typography variant="h2" mt={2} fontSize={"18px"} fontWeight={"bold"}>
            Sắp xếp
          </Typography>
          <Controller
            control={control}
            name="level"
            rules={{
              required: "Price is not",
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
                placeholder="Giá không được để trống!"
              />
            )}
          />
          <Typography variant="caption" color={color.error}>
            {errors.level && errors.level.message}
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

export default CreateCategory;
