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
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { color } from "../../../Theme/color";
import { storage } from "../../../configs/fireBaseConfig";
import { validateForm } from "../../../helpers/validateForm";
import useToast from "../../../hooks/useToast/useToast";
import { httpCategory } from "../../../submodules/controllers/http/axiosController";
import { Category } from "../../../submodules/models/ProductModel/Category";

const CreateCategory = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setImg(event.target.files);
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [category, setCategory] = useState([]);

  const [img, setImg] = useState<any>([]);
  const { showToast, showErrorToast } = useToast();

  useEffect(() => {
    fetchCategory();
  }, []);

  const loadImageFile = async (images: any) => {
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `multipleFiles/${images[i].name}`);
      const data = await uploadBytes(imageRef, images[i]).then(() => {
        return storage
          .ref("multipleFiles")
          .child(images[i].name)
          .getDownloadURL()
          .then((url: any) => {
            return url;
          });
      });
      return data;
    }
  };

  const fetchCategory = async () => {
    try {
      const category = await httpCategory.getCategory({});
      setCategory(category);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async (data: Category) => {
    const image = await loadImageFile(img);
    if (image) {
      data.image = image;
      const category: Category = data;
      try {
        const categoryDto = await httpCategory.store(category);
        if (categoryDto) {
          showToast("Thêm danh mục sản phẩm thành công", {
            position: "top-right",
          });
        }
      } catch (err) {
        showErrorToast("tên danh mục đã tồn tại!", {
          position: "top-right",
        });
      }
    }
  };
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid, isSubmitting },
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
          {isValid && (
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Đang xử lý..." : "Lưu"}
            </Button>
          )}
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
            {...register("image")}
            onChange={handleImageChange}
            sx={{
              mt: 1,
              "& > input": {
                p: "7px",
              },
            }}
            fullWidth
          />
          {image && (
            <div>
              <h3>Preview:</h3>
              <img
                src={image}
                alt="Uploaded preview"
                style={{ maxWidth: "100px" }}
              />
            </div>
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
