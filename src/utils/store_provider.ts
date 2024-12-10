import StoreContext from "@/store/StoreContext";
import { useContext } from "react";

const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("Provider is missing");
  }
  return store;
};

export default useStore;
