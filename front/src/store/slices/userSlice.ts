import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../interfaces/user'

const userSlice = createSlice({
  name: 'user',
  initialState: {} as User,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => {
      const { userId, role } = action.payload
      state.userId = userId
      state.role = role
    },
    logOut: (state) => {
      state = {} as User
    },
  },
})

export default userSlice.reducer
export const { logIn, logOut } = userSlice.actions
