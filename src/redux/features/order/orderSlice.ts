
import { BASE_URL } from '@/conf/api';
import { Order } from '@/types/Order';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { useLocalStorage } from "@/context/LocalStorageContext";
import axios from 'axios';
// const { getItem, setItem } = useLocalStorage();

interface ApiState {
    order: [Order];
    myOrder: [Order];
    data: any;
    currentOrderId: String;
    fireGetMyOrder: boolean;
    sales: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: ApiState = {
    order: [{
        createdBy: " ",
        chat_id: "",
        title: " ",
        description: " ",
        delivery_time: 0,
        price: 0,
        status: "",
        startTime: "",
        id: "",
        rating: 0,
        review: "",
        tip: 0
    }],
    myOrder: [{
        createdBy: " ",
        chat_id: "",
        title: " ",
        description: " ",
        delivery_time: 0,
        price: 0,
        status: "",
        startTime: "",
        id: "",
        rating: 0,
        review: "",
        tip: 0
    }],
    sales: null,
    fireGetMyOrder: false,
    currentOrderId: "",
    data: null,
    loading: false,
    error: null,
};

export const updateOrderStatus = createAsyncThunk(
    'order/updateOrderStatus',
    async ({ id, status }: { id: String, status: String }) => {
        const accessToken = localStorage.getItem('token');

        const response = await axios.put(
            `${BASE_URL}/v1/order/${id}/status`,
            { status }, // Empty object as request body since you don't need to send data
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.status === 200) {
            console.log("Job Status Changed successfully");
        } else {
            console.error("Failed to change the status of job");
        }

        return response.data;
    }
);

export const changeOrderStatus = createAsyncThunk(
    'order/changeOrderStatus',
    async ({ id, status, message }: { id: String, status: String, message: String }) => {
        const accessToken = localStorage.getItem('token');

        const response = await axios.put(
            `${BASE_URL}/v1/order/${id}/status`,
            { status, message }, // Empty object as request body since you don't need to send data
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.status === 200) {
            console.log("Job Status Changed successfully");
        } else {
            console.error("Failed to change the status of job");
        }

        return response.data;
    }
);

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (order: Order) => {

        const accessToken = localStorage.getItem('token');
        console.log(order, "data for order")
        const response = await axios.post(
            `${BASE_URL}/v1/order/create`,
            { order }, // Empty object as request body since you don't need to send data
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.status === 200) {
            console.log("Order sent successfully");
        } else {
            console.error("Failed to create order");
        }

        return response.data;
    }
);

export const addReviewAndRating = createAsyncThunk(
    'order/addReviewAndRating',
    async ({ id, rating, review, tip }: { id: String, rating: number, tip: number, review: String }, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem('token');
            const response = await axios.post(
                `${BASE_URL}/v1/order/${id}/review`,
                { rating, review, tip },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getMyOrders = createAsyncThunk(
    'order/getMyOrders',
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/v1/order/my/orders`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                return response.data; // Return the fetched orders
            } else {
                return rejectWithValue(response.data); // Handle non-200 responses
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // Handle errors
        }
    }
);

export const getCompletedOrders = createAsyncThunk(
    'order/getCompletedOrders',
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/v1/order/sales`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                return response.data; // Return the fetched orders
            } else {
                return rejectWithValue(response.data); // Handle non-200 responses
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // Handle errors
        }
    }
);


const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        fetchedOrders: (state, action) => {
            state.order = action.payload
        },
        setOrderId: (state, action) => {
            state.currentOrderId = action.payload
        },
        setFireGetMyOrder: (state, action) => {
            state.fireGetMyOrder = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.order.push(action.payload);
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.order = [action.payload];
            })
            .addCase(addReviewAndRating.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addReviewAndRating.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.order = [action.payload];
            })
            .addCase(getMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyOrders.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.myOrder = action.payload;
            })
            .addCase(changeOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeOrderStatus.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.myOrder.push(action.payload);
            })
            .addCase(getCompletedOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCompletedOrders.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.sales = action.payload
            })
        //   .addCase(getJobs.rejected, (state, action: PayloadAction<any>) => {
        //     state.loading = false;
        //     state.error = action.payload;
        //   })
        //   .addCase(getMyJobs.fulfilled, (state, action: PayloadAction<any>) => {
        //     state.loading = false;
        //     state.myJobs = action.payload;
        //   })
        //   .addCase(getAppliedJobs.fulfilled, (state, action: PayloadAction<any>) => {
        //     state.loading = false;
        //     state.appliedJobs = action.payload.map((job: any) => ({
        //       ...job,
        //       isApplied: true,
        //     }));
        //   })
        // .addCase(getMyJobs.fulfilled, (state, action: PayloadAction<any>) => {
        //   state.loading = false;
        //   state.myJobs = action.payload;
        // })
    },
});

export const { fetchedOrders, setOrderId, setFireGetMyOrder } = orderSlice.actions;
export default orderSlice.reducer;
