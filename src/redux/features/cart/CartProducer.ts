import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CartItem {
    id: number;
    cartQuantity: number;
    price_sale: number;
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
    cartTotalQuantity: number;
    cartTotalAmount: number;
}

const initialState: CartState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: localStorage.getItem('cartTotal') ? JSON.parse(localStorage.getItem('cartTotal')!) : 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state: any, action: PayloadAction<any>) => {
            const { products, quantity } = action.payload;
            const existingItemIndex = state.cartItems.findIndex((item: any) => item.id === products.id);

            if (existingItemIndex >= 0) {
                state.cartItems[existingItemIndex] = {
                    ...state.cartItems[existingItemIndex],
                    cartQuantity: state.cartItems[existingItemIndex].cartQuantity + quantity,
                };
            } else {
                state.cartItems.push({ ...products, cartQuantity: quantity });
                toast.success('Sản phẩm thêm vào giỏ hàng thành công', {
                    position: 'top-right',
                });

                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },

        // addToCart(state, action: PayloadAction<CartItem>) {
        //     const { quantity } = action.payload;
        //     const existingIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        //     console.log(existingIndex);
        //     if (existingIndex >= 0) {
        //         state.cartItems[existingIndex] = {
        //             ...state.cartItems[existingIndex],
        //             cartQuantity: state.cartItems[existingIndex].cartQuantity + quantity,
        //         };
        //     } else {
        //         let tempProductItem = { ...action.payload, cartQuantity: 1 };
        //         state.cartItems.push(tempProductItem);
        //         toast.success('Sản phẩm thêm vào giỏ hàng thành công', {
        //             position: 'top-right',
        //         });
        //     }

        //     localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        // },

        decreaseCart(state, action: any) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload);
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
                state.cartItems = nextCartItems;
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        removeFromCart(state, action: any) {
            const remove = state.cartItems.filter((item) => item.id !== action.payload);
            state.cartItems = remove;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            toast.error('Sản phẩm đã bị xóa khỏi giỏ hàng', {
                position: 'top-right',
            });
        },

        getTotals(state) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price_sale, cartQuantity } = cartItem;
                    const itemTotal = price_sale * cartQuantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;
                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
            localStorage.setItem('cartTotal', JSON.stringify(state.cartTotalAmount));
        },

        clearCart(state) {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
