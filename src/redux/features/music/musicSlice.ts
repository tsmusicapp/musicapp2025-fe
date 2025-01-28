import { BASE_URL } from '@/conf/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { useLocalStorage } from "@/context/LocalStorageContext";
import axios from 'axios';
// const { getItem, setItem } = useLocalStorage();

interface ApiState {
    data: any;
    loading: boolean;
    error: string | null;
    selectedMusic: string[];
}

const initialState: ApiState = {
    selectedMusic: [],
    data: null,
    loading: false,
    error: null,
};

export const getMyMusic = createAsyncThunk(
    'job/getMyMusic',
    async () => {
        const accessToken = localStorage.getItem('token');

        const response = await axios.get(`${BASE_URL}/v1/music/get-music`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log(response.data, "redux musics ");
        return response.data;
    }
);


const musicSlice = createSlice({
    name: 'musicSlice',
    initialState,
    reducers: {
        // selectedMusic: (state, action: PayloadAction<string[]>) => {
        //     const ids = action.payload;
        //     // Filter the full music data based on selected IDs
        //     var musics = state.data.filter((music: any) => 
        //         ids.includes(music.id)
        //     );
        //     state.selectedMusic = musics
        // }
        selectedMusic: (state, action: PayloadAction<string>) => {
            const id = action.payload;

            // Check if the item already exists in selectedMusic
            const existingIndex = state.selectedMusic.findIndex((music: any) => music.id === id);

            if (existingIndex !== -1) {
                // If it exists, remove it
                state.selectedMusic.splice(existingIndex, 1);
            } else {
                // If it doesn't exist, find the music in state.data and add it
                const musicToAdd = state.data.find((music: any) => music.id === id);
                if (musicToAdd) {
                    state.selectedMusic.push(musicToAdd);
                }
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyMusic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyMusic.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getMyMusic.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { selectedMusic } = musicSlice.actions;
export default musicSlice.reducer;
