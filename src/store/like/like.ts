import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface LikesDto {
    id: number;
    idUser: number;
    idPost: number;
}


export interface PLike {
    idUser: number;
    idPost: number;
}

interface LikeData {
    isLoading: boolean;
    likes: LikesDto[];
}

const initialState: LikeData = {
    isLoading: false,
    likes: [],
};

export const fetchLikes = createAsyncThunk(
    'like/fetchUsers', // просто айдишнки, тоесть пишем любое название, но семантичное
    async () => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await axios.get(`http://localhost:3001/likes`);
        return response.data;
    }
);

export const addLike = createAsyncThunk(
    'like/addLike',
    async (value: PLike) => {
        const response = await axios.post(`http://localhost:3001/likes`, value);
        return response.data;
    }
);

export const removeLike = createAsyncThunk(
    'like/removeLike',
    async (idLike?: number) => {
        const response = await axios.delete(`http://localhost:3001/likes/${idLike}`);
        return response.data;
    }
);

export const LikeSlice: any = createSlice({
    name: 'like',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
        .addCase(fetchLikes.fulfilled, (state, action) => {
            const newObj: LikesDto[] = (Array.isArray(action.payload) ? action.payload : [action.payload]) as LikesDto[];
            state.likes = newObj;
            state.isLoading = false;
        })
    },
});

export const {  } = LikeSlice.actions;

export default LikeSlice.reducer;
