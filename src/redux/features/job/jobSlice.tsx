import { BASE_URL } from '@/conf/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { useLocalStorage } from "@/context/LocalStorageContext";
import axios from 'axios';
// const { getItem, setItem } = useLocalStorage();

interface ApiState {
  activeTab: Object[];
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  activeTab: [
    {
      label: "Freelance(18)",
      value: "freelance"
    },
    {
      label: "Creative for Hire",
      value: "creative",
    },
    {
      label: "Saved Jobs",
      value: "saved",
    },
    {
      label: "My Project(Post Job) (1)",
      value: "jobs",
    }
  ],
  data: null,
  loading: false,
  error: null,
};

export const getJobs = createAsyncThunk(
  'job/getJobs',
  async () => {
    const response = await axios.get(`${BASE_URL}/v1/job/all`);
    console.log(response.data, "redux all jobs ");
    return response.data;
  }
);

// export const saveJob = createAsyncThunk(
//   'job/saveJob',
//   async (id: string) => {
  
//     const accessToken = localStorage.getItem('token'); 

//    // Retrieve the token from local storage
//     console.log(accessToken, "Token info inside store");

//     const response = await axios.post(`${BASE_URL}/v1/job/${id}`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`, // Include the token
//       },
//     });
//     console.log(response.data, "redux job deleted successfully");
//     return response.data;
//   }
// );
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

    return response.data;
  }
);


export const deleteJob = createAsyncThunk(
  'job/deletJob',
  async (id: string) => {
  
    const accessToken = localStorage.getItem('token'); 

   // Retrieve the token from local storage
    console.log(accessToken, "Token info inside store");
    const response = await axios.delete(`${BASE_URL}/v1/job/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the token
      },
    });
    console.log(response.data, "redux job deleted successfully");
    return response.data;
  }
);

const jobSlice = createSlice({
  name: 'jobSlice',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobs.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getJobs.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { setActiveTab } = jobSlice.actions;
export default jobSlice.reducer;
