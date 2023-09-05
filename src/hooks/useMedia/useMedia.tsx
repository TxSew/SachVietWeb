import { useMediaQuery, useTheme } from "@mui/material";

export default function useMedia() {
  const theme = useTheme();
  const isExtraSmallXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileSM = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileSM_UP = useMediaQuery(theme.breakpoints.up("sm"));
  const isMediumMD = useMediaQuery(theme.breakpoints.down("md"));
  const isXSOnly = useMediaQuery(theme.breakpoints.only("xs"));
  const isSMOnly = useMediaQuery(theme.breakpoints.only("sm"));
  const isMDOnly = useMediaQuery(theme.breakpoints.only("md"));
  const isLargeLG = useMediaQuery(theme.breakpoints.down("lg"));
  const isExtraLargeXL = useMediaQuery(theme.breakpoints.down("xl"));
  return {
    isExtraSmallXs,
    isMobileSM,
    isMediumMD,
    isLargeLG,
    isExtraLargeXL,
    isMobileSM_UP,
    isSMOnly,
    isMDOnly,
    isXSOnly,
  };
}
