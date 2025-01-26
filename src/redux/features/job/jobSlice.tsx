import { BASE_URL } from '@/conf/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { useLocalStorage } from "@/context/LocalStorageContext";
import axios from 'axios';
// const { getItem, setItem } = useLocalStorage();

interface ApiState {
  fireGetJob: boolean;
  data: any;
  myJobs:any;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  fireGetJob: false,
  myJobs:null,
  data: null,
  loading: false,
  error: null,
};

export const getJobs = createAsyncThunk(
  'job/getJobs',
  async () => {
    const accessToken = localStorage.getItem('token');

    const response = await axios.get(`${BASE_URL}/v1/job/all`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
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


export const getMyJobs = createAsyncThunk(
  'job/getMyJobs',
  async () => {
    const accessToken = localStorage.getItem('token');
    const userid = JSON.parse(localStorage.getItem('user') || '{}').id;
    console.log(userid, "user id here ");


    const response = await axios.get(
      `${BASE_URL}/v1/job/my-jobs`,
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
    fireGetJobRequest: (state, action) => {
      state.fireGetJob = action.payload
    }
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
      .addCase(getMyJobs.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.myJobs = action.payload;
      })
  },
});

export const { fireGetJobRequest } = jobSlice.actions;
export default jobSlice.reducer;
