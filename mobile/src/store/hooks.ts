import { createDispatchHook } from "react-redux";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index"; // or from "@/src/store" if using alias

export const useAppDispatch = createDispatchHook<AppDispatch>();
export const useAppSelector = useSelector<RootState>;
