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
        border: "1px solid #eee",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Link
        to={`/products/${Props.products.slug}`}
        style={{
          height: "170px",
          display: "flex",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <CardMedia
          component="img"
          height={"170"}
          sx={{
            p: "20px",
            width: "180px",
            objectFit: "contain",
          }}
          title=""
          image={Props.products.image}
        />
      </Link>

      <CardContent
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Typography
          variant="body1"
          color={"#3333333"}
          fontSize={"14px"}
          textTransform={"capitalize"}
          sx={{
            overflow: "hidden",
            textAlign: "center",
            display: "-webkit-box",
            lineClamp: 2,
            "-webkit-line-clamp": 2,
            "-webkit-box-orient": "vertical",
            flexShrink: 0,
          }}
        >
          {Props.products.title}
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{
            marginTop: "auto",
            paddingTop: "10px",
            lineHeight: 1,
          }}
        >
          <Typography
            className="price"
            color={color.btnRed}
            fontSize={"16.5px"}
            fontWeight={"bold"}
            lineHeight={1}
          >
            {numberFormat(Number(Props.products.price))}
          </Typography>
          <Typography
            color={"#888888"}
            lineHeight={1}
            sx={{
              textDecoration: "line-through",
            }}
          >
            {`${numberFormat(Number(Props.products.price_sale))} `}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

ProductItem.propTypes = {};

export default memo(ProductItem);
