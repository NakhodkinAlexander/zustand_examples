import { useCallback } from "react";
import logo from "../logo.svg";
import { DynamicStoreRow } from "./DynamicStoreRow";
import { SimpleStoreRow } from "./SimpleStoreRow";
import {
  dynamicStoreId1,
  dynamicStoreId2,
  dynamicStoreId3,
} from "./dynamicStore";
import { useBasicStore } from "./basicStore";

export const Page = () => {
  const showSummary = useCallback(() => {
    alert(useBasicStore.getState().getStoresSummary());
  }, []);

  return (
    <div className="page">
      <div className="page__text">Нажми на лого что бы увидеть сумму</div>
      <div onClick={showSummary} className="page__logo-wrapper">
        <img src={logo} className="page__logo App-logo" alt="logo" />
      </div>
      <div className="page__text">Счетчики:</div>
      <ul className="page__content">
        <SimpleStoreRow key="simple-row" />
        <DynamicStoreRow storeId={dynamicStoreId1} />
        <DynamicStoreRow storeId={dynamicStoreId2} />
        <DynamicStoreRow storeId={dynamicStoreId3} />
      </ul>
    </div>
  );
};
