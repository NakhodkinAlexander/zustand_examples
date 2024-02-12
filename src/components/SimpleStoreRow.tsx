import { useBasicStore } from "./basicStore";

export const SimpleStoreRow = () => {
  const { count, decrease, increase } = useBasicStore();
  return (
    <li className="page-row">
      <button className="page-row__button" onClick={decrease}>
        -
      </button>
      <span className="page-row__counter">{count}</span>
      <button className="page-row__button" onClick={increase}>
        +
      </button>
    </li>
  );
};
