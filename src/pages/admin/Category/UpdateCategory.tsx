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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import { storage } from "../../../configs/fireBaseConfig";
import HttpCategoryController from "../../../submodules/controllers/http/httpCategoryController";
import { Category } from "../../../submodules/models/ProductModel/Category";

var httpcategory = new HttpCategoryController(BaseAPi);
const UpdateCategory = () => {
  const { id } = useParams();

  const [category, setCategory] = useState([]);
  const [detail, setdetail] = useState<Category>({});
  useEffect(() => {
    fetchCategory();
    fetchOneCategory();
  }, []);

  const fetchOneCategory = async () => {
    const categoryOne = await httpcategory.getOne(Number(id));
    reset({
      parentId: categoryOne.parentId,
    });
    setdetail(categoryOne);
  };

  const fetchCategory = async () => {
    try {
      const category: any = await httpcategory.getCategory({});
      setCategory(category);
    } catch (err) {
      console.error(err);
    }
  };

  const [url, setUrl] = useState<string>("");
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

  const {
    handleSubmit,
    control,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: {
      status: "1",
    },
  });

  useEffect(() => {
    setValue("name", detail.name);
    setValue("parentName", detail.parentName);
    setValue("parentId", detail.parentId);
    setValue("status", detail.status);
  }, [
    detail.name,
    detail.parentName,
    detail.status,
    detail.parentId,
    setValue,
  ]);

  const handelUpdateCategory = async (data: Category) => {
    data.image = url;
    const categoryDto = await httpcategory.put(Number(id), data);
    if (categoryDto) {
      toast.success("Danh mục cập nhật thành công", {
        position: "top-right",
      });
    }
  };

  return (
    <Box>
      <form action="" onSubmit={handleSubmit(handelUpdateCategory)}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h2" fontSize={"24px"} fontWeight={"bold"}>
            Cập nhật danh mục {detail?.id}
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
            }}
            render={({ field }) => (
              <OutlinedInput
                {...register("name")}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                sx={{
                  mt: 1,
                  "& > input": {
                    p: "7px",
                  },
                }}
                fullWidth
                placeholder={detail.name}
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
                    <select
                      className=""
                      onChange={field.onChange}
                      value={field.value}
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        border: "1px solid #ccc",
                        padding: "8px 20px",
                        borderRadius: "3px",
                        fontSize: "14px",
                        color: "gray",
                      }}
                    >
                      <option value="">-- Chọn Danh Mục --</option>
                      {category.map((e: any) => {
                        return <option value={e.id}>{e.name}</option>;
                      })}
                    </select>
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
          <Stack direction={"row"} flexWrap={"wrap"}>
            <img src={url} width={"150px"} alt="" />
          </Stack>
          <Box width={"100%"}>
            <Typography
              variant="h2"
              mt={2}
              fontSize={"18px"}
              fontWeight={"bold"}
            >
              Trạng thái
            </Typography>
            <Controller
              control={control}
              name="status"
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
                    onChange={(e) => {
                      field.onChange(e);
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
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateCategory;
