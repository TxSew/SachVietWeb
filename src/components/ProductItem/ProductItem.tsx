import { CardMedia, Rating, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { Link } from "react-router-dom";
import { color } from "../../Theme/color";
import { Product } from "../../submodules/models/ProductModel/Product";
import { numberFormat } from "../../helpers/formatPrice";
interface ProductItem {
  products: Product;
}
const ProductItem = (Props: ProductItem) => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: "1px solid #eee"
      }}
    >
      <Link to={`/products/${Props.products.slug}`}>
        <CardMedia
          component="img"
          height={"170"}
          sx={{
            p: "20px",
            objectFit: "contain"
          }}
          title=""
          image={Props.products.image}
        />
      </Link>

      <CardContent>
        <Typography
          variant="body1"
          color={"#3333333"}
          fontSize={"14px"}
          textTransform={"capitalize"}
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            lineClamp: 2,
            "-webkit-line-clamp": 2,
            "-webkit-box-orient": "vertical"
          }}
        >
          {Props.products.title}
        </Typography>
        <Stack direction={"row"} spacing={2} mt={"10px"}>
          <Typography
            className="price"
            color={"gray"}
            fontSize={"16.5px"}
            fontWeight={"bold"}
          >
            {numberFormat(Number(Props.products.price))}
          </Typography>
          <Typography
            variant="caption"
            bgcolor={"lightBlue"}
            color={color.error}
            p={"1px 6px"}
            fontSize={"16.5px"}
            borderRadius={"3px"}
            fontWeight={"bold"}
          >
            {`-${Props.products.sale}%`}
          </Typography>
        </Stack>
        <Typography
          color={"#888888"}
          sx={{
            textDecoration: "line-through"
          }}
        >
          {`${numberFormat(Number(Props.products.price_sale))} `}
        </Typography>
      </CardContent>
      <Rating
        sx={{
          pl: 2
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
