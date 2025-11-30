import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    lista: [],
  },
  reducers: {
    setUsuarios: (state, action) => {
      state.lista = action.payload;
    },
    agregarUsuario: (state, action) => {
      state.lista.unshift(action.payload);
    },
  },
});

export const { setUsuarios, agregarUsuario } = userSlice.actions;
export default userSlice.reducer;
