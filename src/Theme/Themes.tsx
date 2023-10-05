// import { createTheme } from '@mui/material';
// import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
// import color from './Colors';

// declare module '@mui/material/Button' {
//     interface ButtonPropsVariantOverrides {
//         errorContained: true;
//         orangeContained: true;
//         errorOutlined: true;
//         cancel: true;
//         cancelSmall: true;
//         outlinedGreen: true;
//         cancelOutlined: true;
//     }
// }

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: color.primary,
//         },
//         secondary: {
//             main: color.secondary,
//         },
//         warning: {
//             main: color.warning,
//         },
//         success: {
//             main: color.success,
//         },
//         error: {
//             main: color.danger,
//         },
//     },
//     typography: {
//         htmlFontSize: 14,
//         fontSize: 14,
//         fontFamily: 'TT Firs Neue',
//         body1: {
//             fontSize: '0.875rem',
//             color: color.textPrimary,
//             fontWeight: 400,
//             // color: color.textPrimary,
//             // [breakpoints.down('xs')]: {
//             //     fontSize: pxToRem(12),
//             // },
//         },
//         body2: {
//             fontSize: '0.75rem',
//             color: color.textPrimary,
//             // [breakpoints.down('xs')]: {
//             //     fontSize: pxToRem(12),
//             // },
//         },
//         h6: {
//             fontSize: '0.875rem',
//             color: color.textPrimary,
//             fontWeight: 500,
//             // [breakpoints.down('xs')]: {
//             //     fontSize: pxToRem(12),
//             // },
//         },
//         h5: {
//             fontSize: '1rem',
//             fontWeight: 500,
//             color: color.textPrimary,
//             // [breakpoints.down('xs')]: {
//             //     fontSize: pxToRem(14),
//             // },
//         },
//         h4: {
//             fontSize: '1.25rem',
//             fontWeight: 500,
//             color: color.textPrimary,
//             // [breakpoints.down('xs')]: {
//             //     fontSize: '1rem',
//             // },
//         },
//         h3: {
//             fontSize: '1.5rem',
//             fontWeight: 500,
//             color: color.textPrimary,
//             // [breakpoints.down('xs')]: {
//             //     fontSize: '1,25rem',
//             // },
//         },
//         h2: {
//             fontSize: '2rem',
//             fontWeight: 500,
//             color: color.textPrimary,
//             // [breakpoints.down('xs')]: {
//             //     fontSize: '1.5rem',
//             // },
//         },
//         h1: {
//             fontSize: '2.5rem',
//             fontWeight: 500,
//             color: color.textPrimary,
//             // [breakpoints.down('xs')]: {
//             //     fontSize: '2rem',
//             // },
//         },
//         subtitle1: {
//             fontWeight: 500,
//             fontSize: '1.25rem',
//             color: '#333333',
//             // [breakpoints.down('xs')]: {
//             //     fontSize: '1.125rem',
//             // },
//         },
//     },
//     components: {
//         MuiButton: {
// styleOverrides: {
//                 root: {
//                     textTransform: 'none',
//                     padding: '0.75rem 1rem',
//                     fontSize: '0.875rem',
//                     lineHeight: '1rem',
//                     height: 'fit-content',
//                     // fontFamily: '',
//                     borderRadius: 5,
//                     fontWeight: 400,
//                     boxShadow: 'none',
//                     backgroundColor: color.white,
//                     '&:hover  .MuiSvgIcon-root': {
//                         padding: '0.125rem',
//                         fontSize: '2rem',
//                     },
//                     '&.Mui-disabled': {
//                         backgroundColor: color.grey300,
//                         borderColor: color.grey300,
//                         color: '#A6A6A6',
//                     },
//                 },
//                 contained: {
//                     padding: '0.6875rem 1rem',
//                     fontSize: '0.875rem',
//                     lineHeight: '1rem',
//                     boxShadow: 'none',
//                     backgroundColor: color.containedButtonBg,
//                     color: color.containedButtonString,
//                     borderWidth: 1,
//                     borderStyle: 'solid',
//                     borderColor: color.containedButtonBg,
//                     fontWeight: 400,
//                     '&:hover': {
//                         boxShadow: 'none',
//                         borderWidth: 1,
//                         borderStyle: 'solid',
//                         color: color.white,
//                         backgroundColor: color.darkPrimary,
//                         borderColor: color.darkPrimary,
//                     },
//                 },
//                 outlined: {
//                     fontWeight: 400,
//                     padding: '0.6875rem 1rem',
//                     backgroundColor: color.white,
//                     borderColor: color.outlinedButton,
//                     color: color.outlinedButton,
//                 },
//                 text: {
//                     backgroundColor: color.lightPrimary,
//                     borderWidth: 1,
//                     borderStyle: 'none',
//                     borderColor: color.lightPrimary,
//                     color: color.priText,
//                     '&:hover': {
//                         backgroundColor: color.lightPrimary,
//                         borderColor: color.lightPrimary,
//                     },
//                 },
//                 sizeSmall: {
//                     fontSize: '0.75rem',
//                     lineHeight: '1.25rem',
//                     fontWeight: 400,
//                     padding: '0.25rem 1rem',
//                 },
//             },
//             variants: [
//                 {
//                     props: { variant: 'errorContained' },
//                     style: {
//                         padding: '0.6875rem 1rem',
//                         backgroundColor: color.danger,
//                         color: color.white,
//                         borderWidth: 1,
// borderStyle: 'solid',
//                         '&:hover': {
//                             backgroundColor: color.darkDanger,
//                         },
//                     },
//                 },
//                 {
//                     props: { variant: 'errorOutlined' },
//                     style: {
//                         padding: '0.6875rem 1rem',
//                         backgroundColor: color.white,
//                         color: color.danger,
//                         borderWidth: 1,
//                         borderStyle: 'solid',
//                         '&:hover': {
//                             borderWidth: 1,
//                             borderStyle: 'solid',
//                             color: color.darkDanger,
//                             backgroundColor: color.white,
//                         },
//                     },
//                 },
//                 {
//                     props: { variant: 'cancel' },
//                     style: {
//                         padding: '0.6875rem 1rem',
//                         fontSize: '0.875rem',
//                         lineHeight: '1rem',
//                         backgroundColor: color.grey300,
//                         color: color.textPrimary,
//                         borderWidth: 1,
//                         borderStyle: 'solid',
//                         borderColor: color.grey300,
//                         '&:hover': {
//                             backgroundColor: color.grey400,
//                         },
//                         '&.Mui-disabled': {
//                             backgroundColor: '#F3F3F3',
//                             borderColor: '#F3F3F3',
//                             color: '#A6A6A6',
//                         },
//                     },
//                 },
//                 {
//                     props: { variant: 'cancelOutlined' },
//                     style: {
//                         padding: '0.6875rem 1rem',
//                         backgroundColor: color.white,
//                         color: color.grey600,
//                         borderWidth: 1,
//                         borderStyle: 'solid',
//                         '&:hover': {
//                             borderWidth: 1,
//                             borderStyle: 'solid',
//                             backgroundColor: color.white,
//                         },
//                     },
//                 },
//                 {
//                     props: { variant: 'orangeContained' },
//                     style: {
//                         padding: '0.6875rem 1rem',
//                         backgroundColor: color.gold600,
//                         color: color.textPrimary,
//                         borderWidth: 1,
//                         borderStyle: 'solid',
//                         borderColor: color.gold600,
//                         '&:hover': {
//                             borderWidth: 1,
//                             backgroundColor: color.gold700,
//                             borderStyle: 'solid',
//                             borderColor: color.gold700,
//                         },
// },
//                 },
//                 {
//                     props: { variant: 'cancelSmall' },
//                     style: {
//                         padding: '0.25rem 1rem',
//                         fontSize: '0.75rem',
//                         lineHeight: '1rem',
//                         backgroundColor: color.grey300,
//                         color: color.textPrimary,
//                         borderWidth: 1,
//                         borderStyle: 'solid',
//                         borderColor: color.grey300,
//                         fontWeight: 400,
//                         '&:hover': {
//                             backgroundColor: color.grey400,
//                         },
//                         '&.Mui-disabled': {
//                             backgroundColor: '#F3F3F3',
//                             borderColor: '#F3F3F3',
//                             color: '#A6A6A6',
//                         },
//                     },
//                 },
//                 {
//                     props: { variant: 'outlinedGreen' },
//                     style: {
//                         padding: '0.6875rem 1rem',
//                         backgroundColor: color.white,
//                         color: color.success,
//                         borderWidth: 1,
//                         borderStyle: 'solid',
//                         '&:hover': {
//                             borderWidth: 1,
//                             borderStyle: 'solid',
//                             color: color.success,
//                             backgroundColor: color.white,
//                         },
//                     },
//                 },
//             ],
//         },
//         MuiAppBar: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: color.textSecondary,
//                 },
//             },
//         },
//         MuiSelect: {
//             defaultProps: {
//                 MenuProps: {
//                     PaperProps: {
//                         sx: {
//                             boxShadow: 'none',
//                             border: 1,
//                             borderStyle: 'solid',
//                             borderColor: color.grey300,
//                             mt: '5px',
//                         },
//                     },
//                     MenuListProps: {
//                         sx: {
//                             padding: '5px',
//                             '& .MuiMenuItem-root': {
//                                 fontWeight: 400,
//                                 minHeight: 0,

//                                 borderRadius: '5px',
//                                 '&:hover': {
//                                     backgroundColor: color.grey100,
//                                 },
//                                 '&.Mui-selected': {
//                                     // fontWeight: 500,
//                                     // color: color.darkPrimary,
//                                     backgroundColor: color.lightPrimary,
//                                 },
// // [breakpoints.down('sm')]: {
//                                 //     padding:0
//                                 // },
//                             },
//                         },
//                     },
//                 },
//             },
//             styleOverrides: {
//                 select: {
//                     padding: '9.94px 5px 9.94px 15px',
//                 },
//             },
//         },

//         MuiPaginationItem: {
//             defaultProps: {
//                 components: {
//                     previous: AiFillCaretLeft,
//                     next: AiFillCaretRight,
//                 },
//             },
//             styleOverrides: {
//                 root: {
//                     '& svg': {
//                         width: '10px',
//                     },
//                     border: 'none',
//                     fontSize: '14px',
//                     lineHeight: '1.5rem',
//                     borderRadius: '7px',

//                     '&.Mui-selected': {
//                         backgroundColor: color.lightPrimary,
//                     },

//                     '&.MuiPaginationItem-previousNext': {
//                         backgroundColor: color.grey200,
//                     },
//                 },
//             },
//         },
//         MuiChip: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: '5px',
//                     fontSize: '0.75rem',
//                     lineHeight: '1rem',
//                     color: color.textPrimary,
//                 },
//                 avatar: {
//                     width: '10px',
//                 },
//             },
//         },
//         MuiTab: {
//             styleOverrides: {
//                 root: {
//                     background: color.grey200,
//                     borderTopLeftRadius: '8px',
//                     borderTopRightRadius: '8px',
//                     marginRight: '5px',
//                     minWidth: '200px',
//                     flexDirection: 'row',
//                     alignContent: 'center',
//                     gap: '8px',
//                     textTransform: 'capitalize',
//                     '& svg': {
//                         mb: '0 !important',
//                     },
//                     padding: 0,
//                     height: '32px',
//                     minHeight: 'auto',
//                     fontSize: '12px',
//                     '& .chart-icon': {
//                         fill: color.grey600,
//                     },
//                     '& .detail-icon': {
//                         stroke: color.grey600,
//                     },
//                 },
//             },
//         },
//         MuiDrawer: {
//             defaultProps: {},
//             styleOverrides: {
//                 root: {
//                     '&.MuiDrawer-paper': {
//                         overflowY: 'unset',
//                     },
//                     '& .MuiDrawer-paper': {
//                         zIndex: 9,
//                     },
//                     '&.MuiPaper-root': {
//                         border: 'none',
//                         background: color.grey100,
// pt: 12,
//                         zIndex: 9,
//                     },
//                 },
//             },
//         },
//         MuiTextField: {
//             defaultProps: {
//                 InputProps: {},
//                 InputLabelProps: {
//                     shrink: true,
//                 },
//             },
//             styleOverrides: {
//                 root: {
//                     backgroundColor: color.white,
//                     '& .MuiOutlinedInput-input': {
//                         padding: '9.95px 14px',
//                         fontWeight: 400,
//                         color: color.textPrimary,
//                         fontSize: '14px',
//                     },

//                     '& .MuiFormLabel-asterisk': {
//                         color: 'red',
//                     },
//                 },
//             },
//         },
//         MuiFormGroup: {
//             styleOverrides: {
//                 root: {
//                     // position: 'relative',
//                 },
//             },
//         },

//         MuiFormHelperText: {
//             defaultProps: {
//                 sx: {
//                     fontSize: 12,
//                 },
//             },
//             styleOverrides: {
//                 // root: {
//                 //     position: 'absolute',
//                 //     top: 35,
//                 //     left: -12,
//                 // },
//             },
//         },
//         // MuiOutlinedInput: {
//         //     defaultProps: {},
//         //     styleOverrides: {
//         //         root: {
//         //             '& .MuiOutlinedInput-input': {
//         //                 // padding: '10px 14px',
//         //                 fontWeight: 400,
//         //                 color: color.textPrimary,
//         //             },
//         //             '&.MuiFormLabel-root': {
//         //                 top: '-5',
//         //             },
//         //         },
//         //     },
//         // },
//         MuiAutocomplete: {
//             defaultProps: {
//                 sx: {
//                     '& .MuiPaper-root': {
//                         padding: '5px',
//                     },
//                 },
//             },
//             styleOverrides: {
//                 root: {
//                     '& .MuiSvgIcon-root': {
//                         width: '20px',
//                         height: '20px',
//                     },
//                     '& .MuiAutocomplete-tag': {
//                         margin: 0,
//                     },
//                     '& .MuiButtonBase-root': {
//                         marginRight: '2px !important',
//                         height: 'max-content',
//                         padding: '2px',
//                     },
//                     '& .MuiOutlinedInput-root': {
//                         padding: '7.45px 55px 7.45px 10px !important',
//                     },
//                     '& svg': {
//                         // width: "12px !important",
//                         // height: "12px !important"
//                     },
//                     '& #checkboxes-tags-demo': {
//                         padding: '6px 4px',
// },

//                     '& .MuiAutocomplete-endAdornment': {
//                         top: 'calc(50% - 12px)',
//                     },
//                 },
//             },
//         },
//         // MuiListItemButton: {
//         //     styleOverrides: {
//         //         root: {
//         //             fontFamily: "Lato",
//         //         },
//         //     },
//         // },
//         MuiTableHead: {
//             styleOverrides: {
//                 root: {
//                     '& th': {
//                         fontSize: '14px',
//                         padding: '8px 16px',
//                         // fontFamily: "Lato",
//                     },
//                 },
//             },
//         },
//         MuiTableBody: {
//             styleOverrides: {
//                 root: {
//                     '& th,td': {
//                         fontSize: '14px',
//                         padding: '8px 16px',
//                         height: '45px',
//                     },
//                     '& .MuiTableCell-root': {
//                         borderBottom: `1px solid ${color.grey300}`,
//                     },
//                 },
//             },
//         },
//         MuiRadio: {
//             defaultProps: {
//                 sx: {
//                     '&.MuiButtonBase-root': {
//                         padding: '5px',
//                     },
//                 },
//             },
//             styleOverrides: {
//                 root: {
//                     '& .MuiSvgIcon-root': {
//                         fontSize: 16,
//                     },
//                     color: color.grey600,
//                     '&.Mui-checked': {
//                         color: color.success,
//                     },
//                     '&.Mui-disabled': {
//                         color: color.grey600,
//                     },
//                 },
//             },
//         },
//     },
// });

// export default theme;
