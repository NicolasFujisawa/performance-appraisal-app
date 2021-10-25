import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'

/**
 * Hook to change state with an action
 * Usage:
 * const dispatch = useAppDispatch()
 * ...
 * dispatch(LogOut())
 * @returns dispatch
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * Hook to select a state
 * Usage:
 * const { userId, role } = useAppSelector(selectUser)
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
