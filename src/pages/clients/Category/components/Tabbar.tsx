import { Box, Checkbox, FormControlLabel, FormGroup, OutlinedInput, Slider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { color } from '../../../../Theme/color';
import { httpCategory, httpProducer } from '../../../../submodules/controllers/http/axiosController';
import { Producer } from '../../../../submodules/models/producerModel/producer';
import './style.scss';
function valuetext(value: number) {
    return `${value}°C`;
}

export interface Props {
    handleChange: (vent: Event, newValue: number | number[]) => void;
    valueSlider: number[];
    handlePrice?: (value: any) => void;
    handleProducer?: (value: any) => void;
}

function Tabbar(props: Props) {
    const [category, setCategory] = useState<any>([]);
    const [producer, setProducer] = useState<any>({});

    useEffect(() => {
        httpProducer.getAll({}).then((res) => {
            if (res) {
                setProducer(res);
            }
        });
        httpCategory.getCategory({}).then((res) => {
            setCategory(res);
        });
    }, []);
    const [selectedValue, setSelectedValue] = useState('');

    const handleCheckboxChange = (event: any) => {
        const value = event.target.value;
        console.log('🚀 ~ file: Tabbar.tsx:37 ~ handleCheckboxChange ~ value:', value);

        if (selectedValue !== value) {
            setSelectedValue(value);
        } else {
            setSelectedValue('');
        }
    };
    return (
        <Box
            sx={{
                p: '10px',
            }}
        >
            <Box borderBottom={'1px solid #eee'}>
                <Typography variant="h1" fontWeight={'bold'} textTransform={'uppercase'}>
                    Danh mục sản phẩm
                </Typography>
                <Box>
                    {category.map((e: any) => {
                        return (
                            <Box color={'gray'} pl={1}>
                                <NavLink to={`/category?category=${e.slug}`}>
                                    <Typography
                                        sx={{
                                            transition: 'linear 0.2s',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: color.sale,
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
                <FormGroup color={color.text_color} onChange={props.handlePrice}>
                    <FormGroup onChange={props.handlePrice}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedValue === 'max150'}
                                    onChange={handleCheckboxChange}
                                    value={'max150'}
                                    color="primary"
                                />
                            }
                            label="0đ - 150.000đ"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedValue === 'max300'}
                                    onChange={handleCheckboxChange}
                                    value={'max300'}
                                    color="primary"
                                />
                            }
                            label="150.000đ - 300.000đ"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedValue === 'max500'}
                                    onChange={handleCheckboxChange}
                                    value={'max500'}
                                    color="primary"
                                />
                            }
                            label="300.000đ - 500.000đ"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedValue === 'max700'}
                                    onChange={handleCheckboxChange}
                                    value={'max700'}
                                    color="primary"
                                />
                            }
                            label="300.000đ - 500.000đ"
                        />
                    </FormGroup>
                </FormGroup>
                <Typography variant="h3" fontSize={'17px'} mt={2}>
                    Hoặc chọn mức giá phù hợp
                </Typography>
                <Stack direction={'row'} spacing={3} mt={1}>
                    <OutlinedInput
                        disabled
                        value={props.valueSlider[0]}
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
                        value={props.valueSlider[1]}
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
                    step={1}
                    sx={{
                        width: '250px',
                        color: '#198c89',
                    }}
                    getAriaLabel={() => 'Minimum distance'}
                    value={props.valueSlider}
                    onChange={props.handleChange}
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
                <FormGroup color={color.text_color} sx={{}} onChange={props.handleProducer}>
                    {producer?.producers?.map((producer: Producer) => {
                        return (
                            <FormControlLabel
                                value={producer.id}
                                onChange={handleCheckboxChange}
                                control={<Checkbox checked={selectedValue == String(producer.id)} />}
                                label={producer.name}
                            />
                        );
                    })}
                </FormGroup>
            </Box>
        </Box>
    );
}

export default Tabbar;
