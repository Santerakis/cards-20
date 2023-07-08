import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { appReducer } from "app/app.slice";
import { authReducer } from "features/auth/auth.slice";
import { packsReducer } from "features/packs/packs.slice";
import { cardsApi } from 'features/cards/service/cards.api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
		[cardsApi.reducerPath]: cardsApi.reducer,
  },
	// Добавляем middleware для использования дополнительных функций rtk-query, таких как кэширование, инвалидация и pooling.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(cardsApi.middleware),
});

// Метод setupListeners, подключает слушатели событий фокуса (refetchOnFocus) и повторного подключения (refetchOnReconnect ), чтобы автоматически перезагружать данные при возвращении на страницу или восстановлении подключения
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
