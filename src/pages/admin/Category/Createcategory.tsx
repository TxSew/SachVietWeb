import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import { storage } from "../../../configs/fireBaseConfig";
import HttpCategoryController from "../../../submodules/controllers/http/httpCategoryController";
import { Category } from "../../../submodules/models/ProductModel/Category";
import { validateForm } from "../../../helpers/validateForm";

var httpCategory = new HttpCategoryController(BaseAPi);

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState<any>([]);
  useEffect(() => {
    fetchCategory();
  }, []);
  const loadImageFile = async (images: any) => {
    if (images) {
      setIsLoading(true);
    }
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `multipleFiles/${images[i].name}`);
      await uploadBytes(imageRef, images[i])
        .then(() => {
          storage
            .ref("multipleFiles")
            .child(images[i].name)
            .getDownloadURL()
            .then((url: any) => {
              setUrl((prev: any) => [...prev, url]);
              setIsLoading(false);
              return url;
            });
        })
        .catch((err) => {});
    }
  };

  const fetchCategory = async () => {
    try {
      const category: any = await httpCategory.getCategory({});
      setCategory(category);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async (data: Category) => {
    data.image = url[0];
    const category: Category = data;
    try {
      const categoryDto = await httpCategory.store(category);
      if (categoryDto) {
        toast.success("Thêm danh mục sản phẩm thành công", {
          position: "bottom-right",
        });
      }
    } catch (err) {
      toast.error("tên danh mục đã tồn tại!", {
        position: "top-right",
      });
    }
  };
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: {
      status: "1",
      parentId: "1",
    },
  });

  return (
    <Box>
      <form action="" onSubmit={handleSubmit(handleAddCategory)}>
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
          mt={0}
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
              validate: validateForm,
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
                          <MenuItem key={e.id} value={e.id}>
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
            Hình ảnh danh mục
          </Typography>
          <OutlinedInput
            type="file"
            onChange={(e: any) => loadImageFile(e.target.files)}
            sx={{
              mt: 1,
              "& > input": {
                p: "7px",
              },
            }}
            fullWidth
          />
          {isLoading ? (
            <CircularProgress /> // Hiển thị CircularProgress khi đang tải dữ liệu
          ) : url.length > 0 ? (
            // Nếu mảng urls có chứa hình ảnh
            url.map((url: any, index: any) => (
              <img
                key={index}
                src={url}
                width={"100px"}
                alt={`Image ${index}`}
              />
            ))
          ) : (
            // Nếu mảng urls không có hình ảnh
            <div></div>
          )}
          <Typography variant="caption" color={color.error}>
            {errors.level && errors.level.message}
          </Typography>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateCategory;
