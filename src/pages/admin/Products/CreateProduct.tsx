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
import { Editor } from "@tinymce/tinymce-react";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import { storage } from "../../../configs/fireBaseConfig";
import HttpCategoryController from "../../../submodules/controllers/http/httpCategoryController";
import HttpProducerController from "../../../submodules/controllers/http/httpProducerController";
import HttpProductController from "../../../submodules/controllers/http/httpProductController";
import { Category } from "../../../submodules/models/ProductModel/Category";
import { Product } from "../../../submodules/models/ProductModel/Product";
import { Producer } from "../../../submodules/models/producerModel/producer";

var http = new HttpProducerController(BaseAPi);
var httpcategory = new HttpCategoryController(BaseAPi);
const httpProduct = new HttpProductController(BaseAPi);
const CreateProduct = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [url, setUrl] = useState<string[]>([]);
  const [Producer, setProducer] = useState<Producer[]>([] as Producer[]);
  const [Category, setCategory] = useState<Category[]>([] as Category[]);
  const [isLoadings, setIsLoadings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<any>(null);
  const redirect = useNavigate();
  useEffect(() => {
    fetchProducer();
    fetchCategory();
  }, []);

  const fetchProducer = async () => {
    try {
      const producer: any = await http.getAll();
      setProducer(producer.producers);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategory = async () => {
    try {
      const category: any = await httpcategory.getCategory();
      setCategory(category);
    } catch (err) {
      console.error(err);
    }
  };
  const handleAddProduct = async (data: any) => {
    data.image = url[0];
    const images = urls.map((e) => {
      return {
        image: e,
      };
    });
    const ProductDto = {
      product: data,
      productImages: images,
    };

    const storeProduct = await httpProduct.post(ProductDto);
    if (storeProduct) {
      toast.success("created new product successfully", {
        position: "bottom-right",
      });
      redirect("/admin/product");
    }
  };
  const loadImagesFiles = async (images: any) => {
    if (images) {
      setIsLoadings(true);
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
              setUrls((prev) => [...prev, url]);
              setIsLoadings(false);
              return url;
            });
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const loadImagesFile = async (images: any) => {
    if (images) {
      setIsLoading(true);
    }
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `imageUpload/${images[i].name}`);
      await uploadBytes(imageRef, images[i])
        .then(() => {
          storage
            .ref("imageUpload")
            .child(images[i].name)
            .getDownloadURL()
            .then((url: any) => {
              setUrl((prev) => [...prev, url]);
              setIsLoading(false);
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
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<Product>({
    defaultValues: {
      producerID: undefined,
      categoryId: undefined,
    },
  });
  return (
    <Box>
      <form action="" onSubmit={handleSubmit(handleAddProduct)}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h2" fontSize={"24px"} fontWeight={"bold"}>
            Thêm sản phẩm mới
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
              Tên sản phẩm
            </Typography>
            <Controller
              control={control}
              name="title"
              defaultValue="" // Set an initial value here
              rules={{
                required: "Tên sản phẩm không được bỏ trống!",
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
                  placeholder="Vui lòng nhập Ten của bạn!"
                />
              )}
            />
            <Typography variant="caption" color={color.error}>
              {errors.title && errors.title.message}
            </Typography>
            <Grid container mt={2} justifyContent={"space-between"}>
              <Grid xs={5.8}>
                <Typography variant="h2" fontSize={"18px"} fontWeight={"bold"}>
                  Loại sản phẩm
                </Typography>
                <Controller
                  control={control}
                  name="categoryId"
                  rules={{
                    required: "Vui lòng nhập Danh mục sản phẩm!",
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
                        {Category.map((e: any, i) => {
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
                  {errors.categoryId && errors.categoryId.message}
                </Typography>
              </Grid>
              <Grid xs={5.8}>
                <Typography variant="h2" fontSize={"18px"} fontWeight={"bold"}>
                  Nhà cung cấp
                </Typography>
                {/* Producer */}
                <Controller
                  control={control}
                  name="producerID"
                  rules={{
                    required: "Vui lòng nhập Nhà cung cấp sản phẩm !",
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
                        {Producer.map((e: Producer) => {
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
                  {errors.producerID && errors.producerID.message}
                </Typography>
              </Grid>
            </Grid>

            <Box>
              <Controller
                control={control}
                name="desc"
                render={({ field }) => (
                  <>
                    <Typography
                      variant="h2"
                      mt={3}
                      fontSize={"18px"}
                      fontWeight={"bold"}
                    >
                      Chi tiết sản phẩm
                    </Typography>
                    <Editor
                      apiKey="i6krl4na00k3s7n08vuwluc3ynywgw9pt6kd46v0dn1knm3i"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      {...field}
                      onEditorChange={(e) => field.onChange(e)}
                      value={field.value}
                      {...register("desc")}
                      init={{
                        height: 350,
                        menubar: false,
                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: "image",
                        file_picker_callback: function (callback, value, meta) {
                          // Provide file and text for the link dialog
                          if (meta.filetype == "file") {
                            callback("mypage.html", { text: "My text" });
                          }

                          // Provide image and alt text for the image dialog
                          if (meta.filetype == "image") {
                            callback("myimage.jpg", { alt: "My alt text" });
                          }

                          // Provide alternative source and posted for the media dialog
                          if (meta.filetype == "media") {
                            callback("movie.mp4", {
                              source2: "alt.ogg",
                              poster: "image.jpg",
                            });
                          }
                        },
                        plugins: [
                          "advlist",
                          "autolink",
                          "link",
                          "image",
                          "lists",
                          "charmap",
                          "preview",
                          "anchor",
                          "pagebreak",
                          "searchreplace",
                          "wordcount",
                          "visualblocks",
                          "visualchars",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "emoticons",
                          "template",
                          "help",
                        ],
                        toolbar:
                          " undo redo | link image | code |undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </>
                )}
              />
              <Typography variant="caption" color={color.error}>
                {errors.desc && errors.desc.message}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} md={3.8}>
            <Typography variant="h2" fontSize={"18px"} fontWeight={"bold"}>
              Giá gốc
            </Typography>
            <Controller
              control={control}
              name="price"
              rules={{
                required: "Vui lòng nhập giá gốc",
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
              {errors.price && errors.price.message}
            </Typography>

            <Typography
              variant="h2"
              mt={2}
              fontSize={"18px"}
              fontWeight={"bold"}
            >
              Khuyến mãi
            </Typography>
            <Controller
              control={control}
              name="sale"
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
              {errors.sale && errors.sale.message}
            </Typography>
            <Typography
              variant="h2"
              mt={2}
              fontSize={"18px"}
              fontWeight={"bold"}
            >
              Số lượng
            </Typography>
            <Controller
              control={control}
              name="quantity"
              rules={{
                required: "Vui lòng nhập số lượng sản phẩm!",
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  type="number"
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
              {errors.quantity && errors.quantity.message}
            </Typography>
            <Typography
              variant="h2"
              mt={2}
              fontSize={"18px"}
              fontWeight={"bold"}
            >
              Ảnh nổi bật
            </Typography>

            <OutlinedInput
              onChange={(e: any) => loadImagesFiles(e.target.files)}
              type="file"
              sx={{
                mt: 1,
                "& > input": {
                  p: "7px",
                },
              }}
              fullWidth
              placeholder="Vui lòng nhập Ten của bạn!"
            />
            {isLoading ? (
              <Box
                sx={{
                  ml: 2,
                  mt: 1,
                }}
              >
                <CircularProgress />
              </Box>
            ) : url.length > 0 ? (
              // Nếu mảng urls có chứa hình ảnh
              url.map((url, index) => (
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

            <Typography
              variant="h2"
              mt={2}
              fontSize={"18px"}
              fontWeight={"bold"}
            >
              Ảnh chi tiết
            </Typography>
            <OutlinedInput
              type="file"
              onChange={(e: any) => loadImagesFile(e.target.files)}
              inputProps={{ multiple: true }}
              sx={{
                mt: 1,
                "& > input": {
                  p: "7px",
                },
              }}
              fullWidth
              placeholder="Vui lòng nhập Ten của bạn!"
            />
            <Stack direction={"row"} flexWrap={"wrap"}>
              {isLoadings ? (
                <CircularProgress /> // Hiển thị CircularProgress khi đang tải dữ liệu
              ) : urls.length > 0 ? (
                // Nếu mảng urls có chứa hình ảnh
                urls.map((url, index) => (
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
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateProduct;
