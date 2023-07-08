import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const packsSelector = (state: RootState) => state.packs.cardPacks;

// Сложные селекторы
export const _filteredByNamePacksSelector = (state: RootState) => {
  const newPacks = state.packs.cardPacks.filter((p) => {
    return p.name.includes("w");
  });
  return newPacks;
};

export const filterPacksByNameSelector = createSelector(
  [packsSelector],
  (packs) => {
    const newPacks = packs.filter((p) => {
      return p.name.includes("f");
    });
    return newPacks;
  }
);
