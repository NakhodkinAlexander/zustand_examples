import { create } from "zustand";
import {
  dynamicStoreId1,
  dynamicStoreId2,
  dynamicStoreId3,
  getDynamicStore,
} from "./dynamicStore";

export const useBasicStore = create<{
  count: number;
  increase: () => void;
  decrease: () => void;
  getStoresSummary: () => number;
}>((set, get) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  getStoresSummary: () => {
    return (
      get().count +
      (getDynamicStore(dynamicStoreId1)?.counter ?? 0) +
      (getDynamicStore(dynamicStoreId2)?.counter ?? 0) +
      (getDynamicStore(dynamicStoreId3)?.counter ?? 0)
    );
  },
}));
