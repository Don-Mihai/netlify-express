import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LikesDto } from '../like/like';
import { ImgDto } from '../post/postSlice';

export const enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}
export interface UserDto {
    id: number;
    name: string;
    login: string;
    password: string;
    day: string;
    month: string;
    year: string;
    tel: string;
    email: string;
    role?: Role;
    imgUrl?: string;
    backgroundUrl?: string;
}

export interface UserProc extends UserDto {
    lickedPosts?: LikesDto[];
}
export interface UserData {
    isLoading: boolean;
    user: UserProc;
    users: UserProc[];
    userInRegister: UserProc;
}

export interface authData {
    login: string;
    password: string;
}

const initialState: UserData = {
    isLoading: false,
    user: {} as UserProc,
    users: [],
    userInRegister: {} as UserProc,
};

// запрос для авторизации
// http://localhost:3001/users?login=admin&?password=admin

export const fetch = createAsyncThunk(
    'user/fetchUser', // просто айдишнки, тоесть пишем любое название, но семантичное
    async (id: number) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const responseUser = await axios.get(`http://localhost:3001/users?id=${id}`);
        const responseLikes = await axios.get(`http://localhost:3001/likes?idUser=${id}`)

        responseUser.data[0].lickedPosts = responseLikes.data

        return responseUser.data;
    }
);

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers', // просто айдишнки, тоесть пишем любое название, но семантичное
    async () => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await axios.get(`http://localhost:3001/users`);
        return response.data;
    }
);

export const addUser = createAsyncThunk(
    'user/addUser',
    async (value: UserDto) => {
        const response = await axios.post(`http://localhost:3001/users`, value);
        return response.data;
    }
);

export const auth = createAsyncThunk(
    'user/authUser',
    async (value: authData) => {
        const response = await axios.get(`http://localhost:3001/users?login=${value.login}&password=${value.password}`);
        return response.data;
    }
);

export const remove = createAsyncThunk(
    'user/removeUser', // просто айдишнки, тоесть пишем любое название, но семантичное
    async (id: number) => {
    
        await axios.delete(`http://localhost:3001/users/${id}`);
    }
);

export const update = createAsyncThunk(
    'user/updateUser', // просто айдишнки, тоесть пишем любое название, но семантичное
    async (value: UserDto) => {
    
        const response = await axios.put(`http://localhost:3001/users/${value.id}`, value);
        return response.data;
    }
);

export const uploadImg = createAsyncThunk('user/uploadImg', async (file: Blob | null): Promise<ImgDto> => {
    const formData = new FormData();

    if (file) {
        formData.append('file', file);

        const data = await axios.post('http://localhost:5000/upload-img', formData);
        return data.data as ImgDto
    } else {
        return {} as ImgDto
    }
});

export const UserSlice: any = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addValuesInRegisterUser: (state, action) => {
            state.userInRegister = {...state.userInRegister, ...action.payload}
          },
        clearData: (state, _) => {
            state.user = {} as UserProc
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetch.fulfilled, (state, action) => {
                const newObj: UserDto[] = (Array.isArray(action.payload) ? action.payload : [action.payload]) as UserDto[];
                state.user = newObj[0];
            })
            .addCase(fetch.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetch.rejected, (_state, action) => {
                console.log('Не удалось получить данные.', action.payload);
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                const newObj: UserDto[] = (Array.isArray(action.payload) ? action.payload : [action.payload]) as UserDto[];
                state.users = newObj;
                state.isLoading = false;
            })
            .addCase(fetchUsers.pending, state => {
                state.isLoading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(addUser.rejected, (_state, action) => {
                console.log('Не удалось получить данные.', action.payload);
            })
            .addCase(auth.fulfilled, (state, action) => {
                const newObj: UserDto[] = (Array.isArray(action.payload) ? action.payload : [action.payload]) as UserDto[];
                state.user = newObj[0];
            })
            .addCase(update.fulfilled, (state, action) => {
                const newObj: UserDto[] = (Array.isArray(action.payload) ? action.payload : [action.payload]) as UserDto[];
                state.user = newObj[0];
            })

    },
});

export const { addValuesInRegisterUser, clearData } = UserSlice.actions;

export default UserSlice.reducer;
