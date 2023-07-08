import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "app/store";

/**
 * Обертка над асинхронными thunk-функциями с обработкой исключений.
 * @param {BaseThunkAPI<RootState, any, AppDispatch, unknown>} thunkAPI - Объект thunkAPI, содержащий методы для работы с Redux.
 * @param {Function} logic - Асинхронная функция, которую необходимо выполнить.
 * @param {boolean} [showGlobalError=true] - Флаг, указывающий, нужно ли отображать глобальную ошибку.
 * @returns {Promise<any>} - Промис, который резолвится с результатом выполнения асинхронной функции или реджектится с объектом ошибки.
 */
export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  logic: Function,
  showGlobalError: boolean = true
) => {
  const { rejectWithValue } = thunkAPI;
  try {
    return await logic();
  } catch (e) {
    return rejectWithValue({ e, showGlobalError });
  }
};
