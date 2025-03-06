import { configureStore } from '@reduxjs/toolkit';
import login from './Login';
import search from './Search';
export const store = configureStore({
    reducer: {
        login,
        search
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch