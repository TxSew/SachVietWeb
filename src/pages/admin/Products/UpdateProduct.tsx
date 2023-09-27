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
import { Editor } from "@tinymce/tinymce-react";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { color } from "../../../Theme/color";
import { BaseAPi } from "../../../configs/BaseApi";
import { storage } from "../../../configs/fireBaseConfig";
import HttpCategoryController from "../../../submodules/controllers/http/httpCategoryController";
import HttpProducerController from "../../../submodules/controllers/http/httpProducerController";
import HttpProductController from "../../../submodules/controllers/http/httpProductController";
import { Category } from "../../../submodules/models/ProductModel/Category";
import { Product } from "../../../submodules/models/ProductModel/Product";
import { Producer } from "../../../submodules/models/producerModel/producer";
import { toast } from "react-toastify";

var http = new HttpProducerController(BaseAPi);
var httpcategory = new HttpCategoryController(BaseAPi);
const httpProduct = new HttpProductController(BaseAPi);

const CreateProduct = () => {
  var id = useParams();
  const parInt: any = id.id;
  const [Producer, setProducer] = useState<Producer[]>([] as Producer[]);
  const [Category, setCategory] = useState<Category[]>([] as Category[]);
  const [ProductUpdate, setProductUpdate] = useState<Product>({});
  useEffect(() => {
    fetchProducer();
    fetchCategory();
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    const dataProduct = await httpProduct.getOneUpdate(parInt);
    setProductUpdate(dataProduct);
  };
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
  } = useForm<Product>({
    defaultValues: {
      producerID: undefined,
      status: "1",
      categoryId: undefined,
    },
  });

  // console.log(watch().desc);
  const isDisabled = !(isDirty && isValid);
  //  upload image file base
  const handleUpdateProduct = async (data: Product) => {
    const images = url.map((e) => {
      return {
        image: e,
      };
    });
    const ProductDto = {
      product: data,
      productImages: images,
    };
    const UpdatedProduct = await httpProduct.put(parInt, ProductDto);
    if (UpdatedProduct) {
      toast.success("Sản phẩm cập nhật thành công", {
        position: "bottom-right",
      });
    }
  };
  const [images, setImages] = useState("");
  const [url, setUrl] = useState<string[]>([]);
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

              setUrl((prev) => prev.concat(url));
              return url;
            });
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <Box>
      <form action="" onSubmit={handleSubmit(handleUpdateProduct)}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h2" fontSize={"24px"} fontWeight={"bold"}>
            Cập nhật sản phẩm {ProductUpdate?.id}
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
                  placeholder={ProductUpdate?.title}
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
                        placeholder: ProductUpdate.desc,
                        height: 250,
                        menubar: false,
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
                          "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
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
                required: "Vui lòng nhập giá gốc!",
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
                  placeholder={String(ProductUpdate?.price)}
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
              name="price_sale"
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
                  placeholder={String(ProductUpdate?.price_sale)}
                />
              )}
            />
            <Typography variant="caption" color={color.error}>
              {errors.price_sale && errors.price_sale.message}
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
                required: "required",
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
                  placeholder={String(ProductUpdate?.quantity)}
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
              Ảnh sản phẩm
            </Typography>

            <OutlinedInput
              type="file"
              onChange={(e: any) => setImages(e.target.files)}
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
              {url.map((e, i) => {
                return <img src={e} width={"150px"} alt="" />;
              })}
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateProduct;
