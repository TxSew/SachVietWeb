import { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Badge, CardMedia, Rating, Stack } from "@mui/material";
import { color } from "../../Theme/color";

const ProductItem = () => {
  console.log("re-rendering product");

  return (
    <Card
      variant="outlined"
      sx={{
        border: "1px solid  #eee",
      }}
    >
      <CardMedia
        component="img"
        height={"190"}
        sx={{
          p: 1,
        }}
        title=""
        image="https://cdn0.fahasa.com/media/catalog/product/z/4/z4635487376781_5f7b28f99f2375c670f627e4e1822c15.jpg"
      />

      <CardContent>
        <Typography variant="body1" color={color.text_color} fontSize={16}>
          Không Diệt Không Sinh Đừng Sợ Hãi - Bìa Cứng - Phiên Bản Đặc
        </Typography>
        <Stack direction={"row"} spacing={3} mt={2}>
          <Typography
            className="price"
            color={color.error}
            fontSize={18}
            fontWeight={"bold"}
          >
            340.000
          </Typography>
          <Typography
            variant="caption"
            bgcolor={color.error}
            color={color.white}
            p={"3px 10px"}
            borderRadius={"3px"}
            fontWeight={"bold"}
          >
            -5%
          </Typography>
        </Stack>
        <Typography
          color={color.text_color}
          sx={{
            textDecoration: "line-through",
          }}
        >
          70.000
        </Typography>
      </CardContent>
      <Rating
        sx={{
          p: 2,
        }}
        defaultChecked={true}
        defaultValue={2}
        name="read-only"
        size="medium"
        readOnly
      />
    </Card>
  );
};

ProductItem.propTypes = {};

export default memo(ProductItem);
