import Routes from './routes'
import { useAppDispatch } from './store/hooks'
import { logIn } from './store/slices/userSlice'
import './styles/global.css'

function App() {
  useAppDispatch()(logIn({ userId: 1, role: 'teacher' }))
  return <Routes />
}

export default App
