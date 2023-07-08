import { RootState } from "app/store";

export const isLoadingSelector = (state: RootState) => state.app.isLoading;
export const errorSelector = (state: RootState) => state.app.error;
export const isAppInitializedSelector = (state: RootState) =>
  state.app.isAppInitialized;
export const unhandleActionsSelector = (state: RootState) =>
  state.app.unhandleActions;
