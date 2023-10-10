import { CardMedia, Rating, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { Link } from "react-router-dom";
import { color } from "../../Theme/color";
import { Product } from "../../submodules/models/ProductModel/Product";
import {
  NumberFormattingComponent,
  formatByPrice,
} from "../../helpers/formatvalidate";
interface ProductItem {
  products: Product;
}
const ProductItem = (Props: ProductItem) => {
  console.log(Props.products);

  return (
    <Card
      variant="outlined"
      sx={{
        border: "1px solid #eee",
      }}
    >
      <Link  to={`/products/${Props.products.slug}`}>
        <CardMedia
          component="img"
          height={"190px"}
          sx={{
            p: 1,
            objectFit: "cover",
          }}
          title=""
          image={Props.products.image}
        />
      </Link>

      <CardContent>
        <Typography
          variant="body1"
          color={color.text_color}
          fontSize={16}
          textTransform={"capitalize"}
        >
          {Props.products.title}
        </Typography>
        <Stack direction={"row"} spacing={3} mt={2}>
          <Typography
            className="price"
            color={color.error}
            fontSize={18}
            fontWeight={"bold"}
          >
           {`${NumberFormattingComponent(Props.products.price)}`}
          </Typography>
          <Typography
            variant="caption"
            bgcolor={color.error}
            color={color.white}
            p={"3px 10px"}
            borderRadius={"3px"}
            fontWeight={"bold"}
          >
            {`-${Props.products.sale}%`}
          </Typography>
        </Stack>
        <Typography
          color={color.text_color}
          sx={{
            textDecoration: "line-through",
          }}
        >
          {`${NumberFormattingComponent(Props.products.price_sale)} `}
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
