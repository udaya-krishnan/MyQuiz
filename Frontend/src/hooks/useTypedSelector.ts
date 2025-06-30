
import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../app/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
