import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InfoType = "success" | "info" | "error";

interface InfoState {
    visible: boolean;
    type: InfoType;
    message?: string;
}

const initialState: InfoState = {
    visible: false,
    type: "info",
    message: undefined,
};

interface ShowPayload {
    type?: InfoType;       // default = "info"
    message: string;
}

const infoOverlaySlice = createSlice({
    name: "infoOverlay",
    initialState,
    reducers: {
        showInfo: (state, action: PayloadAction<ShowPayload>) => {
            state.visible = true;
            state.type = action.payload.type || "info";
            state.message = action.payload.message;
        },
        hideInfo: (state) => {
            state.visible = false;
            state.message = undefined;
        },
    },
});

export const { showInfo, hideInfo } = infoOverlaySlice.actions;
export default infoOverlaySlice.reducer;
