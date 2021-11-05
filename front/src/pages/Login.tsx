import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import loginImage from '../images/login.png'
import { authLogin } from '../services/api'
import { useAppDispatch } from '../store/hooks'
import { logIn } from '../store/slices/userSlice'
import '../styles/pages/login.css'

export function Login() {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const [userIdentifier, setUserIdentifier] = useState<string>('')
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)

  const userIdentifierOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserIdentifier(event.target.value)

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    const payload = { identifier: userIdentifier }

    try {
      const {
        data: { data },
      } = await authLogin(payload)
      dispatch(logIn(data))
      history.push('/teams')
    } catch (error) {
      setInvalidCredentials(true)
    }
  }

  return (
    <div className="login-page">
      <div>
        <img src={loginImage} className="image-login" />
      </div>
      <form id="form-login" onSubmit={handleLogin}>
        <div className="input-block">
          {invalidCredentials ? (
            <div id="invalid-credentials">
              <p>Esse login é inválido.</p>
            </div>
          ) : (
            ''
          )}
          <input
            type="text"
            placeholder="Login"
            value={userIdentifier}
            onChange={userIdentifierOnChange}
          ></input>
        </div>
        <button type="submit" className="button-login">
          Entrar
        </button>
      </form>
    </div>
  )
}