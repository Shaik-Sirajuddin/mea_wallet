import { createDispatchHook } from "react-redux";
import type { AppDispatch } from "./index"; // or from "@/src/store" if using alias

export const useAppDispatch = createDispatchHook<AppDispatch>();
