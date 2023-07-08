import { createAction } from "@reduxjs/toolkit";

const unHandleAction = createAction<void>("common/unHandleAction");

export const commonActions = { unHandleAction };
