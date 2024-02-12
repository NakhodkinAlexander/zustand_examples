import { useEffect, useMemo } from "react";
import { create, StoreApi, UseBoundStore } from "zustand";

export const dynamicStoreId1 = "store-1";
export const dynamicStoreId2 = "store-2";
export const dynamicStoreId3 = "store-3";

/** Модель хранилища данных */
export interface IDynamicState extends ReturnType<typeof createStore> {}

/** Входные параметры для создания хранилища */
export interface ICreatePageStoreProps {
  id: string;
}

const DynamicModelMap = new Map<
  string,
  UseBoundStore<StoreApi<IDynamicState>>
>();

export function getDynamicStore(uniqueId: string): IDynamicState | undefined {
  debugger;
  return DynamicModelMap.get(uniqueId)?.getState() as IDynamicState;
}

export function useDynamicStore(uniqueId: string) {
  return DynamicModelMap.get(uniqueId);
}

export function isStoreExist(uniqueId: string) {
  return DynamicModelMap.has(uniqueId);
}

export function unCacheStore(uniqueId: string) {
  DynamicModelMap.delete(uniqueId);
}

export function unCacheAllStores() {
  DynamicModelMap.clear();
}

export function createPageStore({ id }: ICreatePageStoreProps) {
  const useStore = create<IDynamicState>((set, get) => {
    return { ...createStore(set, get) };
  });

  return useStore;
}

function createStore(
  set: (
    partial:
      | IDynamicState
      | Partial<IDynamicState>
      | ((state: IDynamicState) => IDynamicState | Partial<IDynamicState>),
    replace?: boolean | undefined
  ) => void,
  get: () => IDynamicState
) {
  return {
    isInitialized: false,
    counter: 0,
    actions: {
      initialize: () => {
        set((state) => {
          return {
            ...state,
            isInitialized: true,
          };
        });
      },
      incrementCounter: () => {
        set((state) => {
          debugger;
          return {
            ...state,
            counter: state.counter + 1,
          };
        });
      },
      decrementCounter: () => {
        set((state) => {
          return {
            ...state,
            counter: state.counter - 1,
          };
        });
      },
      incrementCounterAsync: () => {
        debugger;
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            get().actions.incrementCounter();
            resolve();
          }, 1000);
        });
      },
    },
  };
}

// Хук для создания хранилища
export function useCreateDynamicStore(props: ICreatePageStoreProps) {
  const useStore = useMemo(() => {
    let store = DynamicModelMap.get(props.id);
    if (store) {
      return store;
    }

    store = createPageStore({
      ...props,
    });
    store.getState().actions.initialize();

    return store;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.id]);

  useEffect(() => {
    DynamicModelMap.set(props.id, useStore);
    return () => {
      unCacheStore(props.id);
    };
    // разовая инициализация
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useStore]);

  return useStore;
}
