import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const obtenerUsuarios = createAsyncThunk(
  "post/obtenerUsuarios",
  async () => {
    const res = await fetch("https://reqres.in/api/users?page=1");
    const data = await res.json();
    return data.data;
  }
);

export const crearUsuario = createAsyncThunk(
  "post/crearUsuario",
  async ({ nombre, job }) => {
    const res = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nombre, job }),
    });

    await res.json();

    return {
      id: Date.now(),
      first_name: nombre,
      job,
      email: "Sin email",
    };
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    usuarios: [],
    loading: false,
    success: false,
    error: false,
  },
  reducers: {
    resetEstado: (state) => {
      state.success = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtenerUsuarios.fulfilled, (state, action) => {
        state.usuarios = action.payload;
      })
      .addCase(crearUsuario.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(crearUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.usuarios.unshift(action.payload);
      })
      .addCase(crearUsuario.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetEstado } = postSlice.actions;
export default postSlice.reducer;

