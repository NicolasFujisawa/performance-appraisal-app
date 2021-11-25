import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from '@reduxjs/toolkit'
import { persistReducer } from 'reduxjs-toolkit-persist'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/es/stateReconciler/autoMergeLevel1'
import persistStore from 'reduxjs-toolkit-persist/lib/persistStore'
import storage from 'reduxjs-toolkit-persist/lib/storage'
import userSlice from './slices/userSlice'

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1,
}

const reducers: Reducer<any, AnyAction> = combineReducers({
  user: userSlice,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
