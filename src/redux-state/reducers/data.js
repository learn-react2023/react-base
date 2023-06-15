import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
}

export const dataReducer = createSlice({
  name: "dataReducer",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data.push(action.payload)
    },
  }
})

export const { setData } = dataReducer.actions
export default dataReducer.reducer