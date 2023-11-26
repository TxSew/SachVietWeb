import { Box, Checkbox, FormControlLabel, FormGroup, OutlinedInput, Slider, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { color } from '../../../../Theme/color';
import { httpCategory } from '../../../../submodules/controllers/http/axiosController';
import { NavLink } from 'react-router-dom';
import './style.scss';
function valuetext(value: number) {
    return `${value}°C`;
}

function Tabbar() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const [category, setCategory] = useState<any>([]);
    useEffect(() => {
        httpCategory.getCategory({}).then((res) => {
            setCategory(res);
        });
    }, []);
    const [value, setValue] = React.useState<any[]>([3, 6]);
    const [min, setMin] = useState<number>(1);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        const [a, b] = newValue as number[];
    };
    return (
        <Box
            sx={{
                p: '10px',
            }}
        >
            <Box borderBottom={'1px solid #eee'}>
                <Typography variant="body1" fontWeight={'bold'} textTransform={'uppercase'}>
                    Danh mục sản phẩm
                </Typography>
                <Box>
                    {category.map((e: any) => {
                        return (
                            <Box color={'gray'} pl={1}>
                                <NavLink className={'active'} to={`/category?category=${e.slug}`}>
                                    <Typography
                                        sx={{
                                            transition: 'linear 0.2s',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: color.sale,
                                                fontWeight: 'bold',
                                            },
                                        }}
                                        color={'#666'}
                                    >
                                        {e.name}
                                    </Typography>
                                </NavLink>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
            <Box sx={{ width: 300 }}></Box>
            <Box pt={2} pb={2} borderBottom={'1px solid #eee'}>
                <Typography variant="h3" fontWeight={'bold'} fontSize={'17px'}>
                    Giá
                </Typography>
                <FormGroup color={color.text_color} sx={{}}>
                    <FormControlLabel control={<Checkbox />} label="0đ - 150.000đ" />
                    <FormControlLabel control={<Checkbox />} label="150.000đ - 300.000đ" />
                    <FormControlLabel control={<Checkbox />} label="150.000đ - 300.000đ" />
                    <FormControlLabel control={<Checkbox />} label="300.000đ - 500.000đ" />
                </FormGroup>
                <Typography variant="h3" fontSize={'17px'} mt={2}>
                    Hoặc chọn mức giá phù hợp
                </Typography>
                <Stack direction={'row'} spacing={3} mt={1}>
                    <OutlinedInput
                        disabled
                        value={value[0]}
                        type="text"
                        sx={{
                            mt: 1,
                            width: '100px',
                            textAlign: 'center',
                            fontSize: '11px',
                            '& > input': {
                                p: '7px',
                            },
                        }}
                        fullWidth
                    />
                    <OutlinedInput
                        disabled
                        type="text"
                        value={value[1]}
                        sx={{
                            mt: 1,
                            width: '100px',
                            fontSize: '11px',
                            textAlign: 'center',

                            '& > input': {},
                        }}
                        fullWidth
                    />
                </Stack>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    value={value}
                    onChange={handleChange}
                    max={1000000}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                />
            </Box>
            <Box pt={2} pb={2} borderBottom={'1px solid #eee'}>
                <Typography variant="h3" fontWeight={'bold'} fontSize={'17px'}>
                    Nhà cung cấp
                </Typography>
                <FormGroup color={color.text_color} sx={{}}>
                    <FormControlLabel control={<Checkbox />} label="NXB Trẻ" />
                    <FormControlLabel control={<Checkbox />} label="Bách việt" />
                    <FormControlLabel control={<Checkbox />} label="Phụ nữ" />
                    <FormControlLabel control={<Checkbox />} label="Nhã Nam" />
                </FormGroup>
            </Box>
        </Box>
    );
}

export default Tabbar;
