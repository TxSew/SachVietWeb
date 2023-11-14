import { Box, CardMedia, Rating, Stack } from "@mui/material";
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
const ProductItemNew = (Props: ProductItem) => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: "1px solid #eee",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {Props.products.sale ? (
        <Box
          sx={{
            position: "absolute",
            top: "3%",
            right: "2%",
            width: "35px",
            height: "35px",
            color: "white",
            borderRadius: "50%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            justifyContent: "center",
            backgroundColor: color.sale,
          }}
        >
          <Typography
            variant="body1"
            fontWeight={"bold"}
            fontSize={"13px"}
          >{`${Props.products.sale}%`}</Typography>
        </Box>
      ) : (
        ""
      )}
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
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            flexShrink: 0,
          }}
        >
          {Props.products.title}
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={Props.products.sale ? "space-between" : "center"}
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
            {`${numberFormat(Number(Props.products.price_sale))} `}
          </Typography>
          <Typography
            color={"#888888"}
            lineHeight={1}
            sx={{
              textDecoration: "line-through",
            }}
          >
            {Props.products.sale
              ? numberFormat(Number(Props.products.price))
              : ""}
          </Typography>
        </Stack>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            marginTop: "10px",
            height: "20px",
            borderRadius: "10px",
            color: color.white,
            backgroundColor: color.linePay,
          }}
        >
          đã bán 0
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(ProductItemNew);
