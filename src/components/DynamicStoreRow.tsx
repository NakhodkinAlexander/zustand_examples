import { getDynamicStore, useCreateDynamicStore } from "./dynamicStore";

export interface IDynamicStoreRowProps extends React.HTMLProps<HTMLLIElement> {
  storeId: string;
}

export const DynamicStoreRow = ({ storeId }: IDynamicStoreRowProps) => {
  const store = useCreateDynamicStore({ id: storeId });
  const counter = store((x) => x.counter);
  const { incrementCounterAsync, decrementCounter } = store((x) => x.actions);

  return (
    <li className="page-row">
      <button className="page-row__button" onClick={decrementCounter}>
        -
      </button>
      <span className="page-row__counter">{counter}</span>
      <button className="page-row__button" onClick={incrementCounterAsync}>
        +
      </button>
    </li>
  );
};
