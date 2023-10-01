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
import { Category } from "../../../submodules/models/ProductModel/Category";
import { storage } from "../../../configs/fireBaseConfig";
import { ref, uploadBytes } from "firebase/storage";

var httpCategory = new HttpCategoryController(BaseAPi);
const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async () => {
    try {
      const category: any = await httpCategory.getAll();
      console.log(category);
      setCategory(category);
    } catch (err) {
      console.error(err);
    }
  };
  const editorRef = useRef<any>(null);
  const [images, setImages] = useState("");
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    loadImageFile(images);
  }, [images]);
  const loadImageFile = async (images: any) => {
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `multipleFiles/${images[i].name}`);
      await uploadBytes(imageRef, images[i])
        .then(() => {
          storage
            .ref("multipleFiles")
            .child(images[i].name)
            .getDownloadURL()
            .then((url: any) => {
              console.log(url);
              setUrl(url);
              return url;
            });
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
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

  const isDisabled = !(isDirty && isValid);
  const handleAddProduct = async (data: Category) => {
    data.image = url;
    const category: Category = data;
    console.log(category);

    const categoryDto = await httpCategory.store(category);
    if (categoryDto) {
      toast.success("category added successfully", {
        position: "bottom-right",
      });
    }
  };

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
            onChange={(e: any) => setImages(e.target.files)}
            sx={{
              mt: 1,
              "& > input": {
                p: "7px",
              },
            }}
            fullWidth
          />
          <Stack direction={"row"} flexWrap={"wrap"}>
            <img src={url} width={"150px"} alt="" />
          </Stack>
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
