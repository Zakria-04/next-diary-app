import React from "react";
import { StoreContextType } from "./types";
const StoreContext = React.createContext<StoreContextType | undefined>(
  undefined
);

export default StoreContext;
