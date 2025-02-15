
import { BASE_URL } from '@/conf/api';
import { Order } from '@/types/Order';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { useLocalStorage } from "@/context/LocalStorageContext";
import axios from 'axios';
// const { getItem, setItem } = useLocalStorage();

interface ApiState {
    order: [Order];
    data: any;
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
        startTime: ""
    }],
    data: null,
    loading: false,
    error: null,
};

export const getJobs = createAsyncThunk(
    'job/getJobs',
    async () => {
        const accessToken = localStorage.getItem('token');

        const response = await axios.get(`${BASE_URL}/v1/job/`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    }
);

export const saveJob = createAsyncThunk(
    'job/saveJob',
    async (id: string) => {
        const accessToken = localStorage.getItem('token');

        const response = await axios.put(
            `${BASE_URL}/v1/job/${id}`,
            {}, // Empty object as request body since you don't need to send data
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.status === 200) {
            console.log("Job saved successfully");
        } else {
            console.error("Failed to save job");
        }

        return response.data;
    }
);

export const updateJobStatus = createAsyncThunk(
    'job/updateJob',
    async ({ id, status }: { id: string, status: string }) => {
        const accessToken = localStorage.getItem('token');

        const response = await axios.put(
            `${BASE_URL}/v1/job/update-job-status/${id}`,
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


// export const getMyJobs = createAsyncThunk(
//     'job/getMyJobs',
//     async () => {
//         const accessToken = localStorage.getItem('token');
//         // const userid = JSON.parse(localStorage.getItem('user') || '{}').id;
//         // console.log(userid, "user id here ");


//         const response = await axios.get(
//             `${BASE_URL}/v1/job/my-jobs`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );

//         if (response.status === 200) {
//             console.log("Job saved successfully");
//         } else {
//             console.error("Failed to get my jobs");
//         }

//         return response.data;
//     }
// );


// export const deleteJob = createAsyncThunk(
//     'job/deletJob',
//     async (id: string) => {

//         const accessToken = localStorage.getItem('token');

//         // Retrieve the token from local storage
//         console.log(accessToken, "Token info inside store");
//         const response = await axios.delete(`${BASE_URL}/v1/job/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`, // Include the token
//             },
//         });
//         console.log(response.data, "redux job deleted successfully");
//         return response.data;
//     }
// );

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


// export const getAppliedJobs = createAsyncThunk(
//     'job/updateJob',
//     async () => {
//         const accessToken = localStorage.getItem('token');

//         const response = await axios.get(
//             `${BASE_URL}/v1/job/get/applied`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         if (response.status === 200) {

//             console.log("Get Applied Jobs successfully");
//         } else {
//             console.error("Failed to get applied on jobs");
//         }

//         console.log(response.data, "get applied jobs");
//         return response.data;
//     }
// );


const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        fetchedOrders: (state, action) => {
            state.order = action.payload
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

export const { fetchedOrders } = orderSlice.actions;
export default orderSlice.reducer;
