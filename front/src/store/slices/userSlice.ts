import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../interfaces/user'

const userSlice = createSlice({
  name: 'user',
  initialState: {} as User,
  reducers: {
    logIn: (state: User, action: PayloadAction<User>) => {
      const { userId, role } = action.payload
      state.userId = userId
      state.role = role
    },
    logOut: (state: User) => {
      delete state.userId
      delete state.role
    },
  },
})

export default userSlice.reducer
export const { logIn, logOut } = userSlice.actions
