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
import { color } from "../../../Theme/color";
import { storage } from "../../../configs/fireBaseConfig";
import useToast from "../../../hooks/useToast/useToast";
import { httpCategory } from "../../../submodules/controllers/http/axiosController";
import { Category } from "../../../submodules/models/ProductModel/Category";

const UpdateCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [detail, setdetail] = useState<Category>({});
  const [url, setUrl] = useState<string>("");
  const { showToast } = useToast();

  useEffect(() => {
    fetchCategory();
    fetchOneCategory();
  }, []);
  const fetchOneCategory = async () => {
    const categoryOne = await httpCategory.getOne(Number(id));

    reset({
      parentId: categoryOne.parentId,
      name: categoryOne.name,
      status: categoryOne.status,
      parentName: categoryOne.parentName,
      id: categoryOne.id,
      image: categoryOne.image,
    });
    setdetail(categoryOne);
  };
  const [img, setImg] = useState<any>([]);

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

  const fetchCategory = async () => {
    try {
      const category = await httpCategory.getCategory({});
      setCategory(category);
    } catch (err) {
      console.error(err);
    }
  };

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

  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Category>({
    defaultValues: {
      status: "1",
    },
  });

  const ur = watch("image", "");

  useEffect(() => {
    if (ur) {
      setUrl(ur);
    }
  }, [ur]);
  const handelUpdateCategory = async (data: Category) => {
    const thumbnail = await loadImageFile(img);
    if (thumbnail) {
      data.image = thumbnail;
      const categoryDto = await httpCategory.put(Number(id), data);
      if (categoryDto) {
        showToast("Danh mục cập nhật thành công", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <Box>
      <form action="" onSubmit={handleSubmit(handelUpdateCategory)}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h2" fontSize={"24px"} fontWeight={"bold"}>
            Cập nhật danh mục {detail?.id}
          </Typography>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Lưu"}
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
            defaultValue=""
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
            onChange={handleImageChange}
            sx={{
              mt: 1,
              "& > input": {
                p: "7px",
              },
            }}
            fullWidth
          />

          {image ? (
            <div>
              <h3>Preview:</h3>
              <img
                src={image}
                alt="Uploaded preview"
                style={{ maxWidth: "100px" }}
              />
            </div>
          ) : (
            <Stack direction={"row"} flexWrap={"wrap"}>
              <img src={url} width={"150px"} alt="" />
            </Stack>
          )}
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
