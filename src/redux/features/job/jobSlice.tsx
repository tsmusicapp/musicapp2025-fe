import { BASE_URL } from '@/conf/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { useLocalStorage } from "@/context/LocalStorageContext";
import axios from 'axios';
// const { getItem, setItem } = useLocalStorage();

interface ApplyJob {
  musicIds: string[];
  message: string;
  jobId: string;
}
interface ApiState {
  fireGetJob: boolean;
  appliedJobs: any;
  applyJob: ApplyJob;
  appliedJobIds: any;
  data: any;
  myJobs: any;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  fireGetJob: false,
  myJobs: null,
  appliedJobIds: null,
  appliedJobs: null,
  applyJob: {
    musicIds: [],
    message: "",
    jobId: ""
  },
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
      console.error("FailedupdateJobStatus to save job");
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

export const applyJob = createAsyncThunk(
  'job/updateJob',
  async (applyJob: ApplyJob) => {
    const accessToken = localStorage.getItem('token');

    const response = await axios.post(
      `${BASE_URL}/v1/job/apply/${applyJob.jobId}`,
      { applyJob }, // Empty object as request body since you don't need to send data
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Applied to this job successfully");
    } else {
      console.error("Failed to apply on job");
    }

    return response.data;
  }
);


export const getAppliedJobs = createAsyncThunk(
  'job/updateJob',
  async () => {
    const accessToken = localStorage.getItem('token');

    const response = await axios.get(
      `${BASE_URL}/v1/job/get/applied`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {

      console.log("Get Applied Jobs successfully");
    } else {
      console.error("Failed to get applied on jobs");
    }

    console.log(response.data, "get applied jobs");
    return response.data;
  }
);


const jobSlice = createSlice({
  name: 'jobSlice',
  initialState,
  reducers: {
    fireGetJobRequest: (state, action) => {
      state.fireGetJob = action.payload
    },
    updateMusicIds: (state, action: PayloadAction<string>) => {
      const musicId = action.payload;
      const index = state.applyJob.musicIds.indexOf(musicId);

      if (index > -1) {
        // Remove the ID if it exists in the array
        state.applyJob.musicIds.splice(index, 1);
      } else {
        // Add the ID if it doesn't exist
        state.applyJob.musicIds.push(musicId);
      }
    },
    updateMessage: (state, action: PayloadAction<string>) => {
      state.applyJob.message = action.payload;
    },
    updateJobId: (state, action: PayloadAction<string>) => {
      state.applyJob.jobId = action.payload;
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
      .addCase(getAppliedJobs.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appliedJobs = action.payload.map((job: any) => ({
          ...job,
          isApplied: true,
        }));
      })
    // .addCase(getMyJobs.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.loading = false;
    //   state.myJobs = action.payload;
    // })
  },
});

export const { fireGetJobRequest, updateMusicIds, updateMessage, updateJobId } = jobSlice.actions;
export default jobSlice.reducer;
