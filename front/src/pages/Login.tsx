import '../styles/pages/login.css'
import loginImage from '../images/login.png'

export function Login() {
  return (
    <div className="login-page">
      <div>
        <img src={loginImage} className="image-login" />
      </div>
      <form id="form-login">
        <div className="input-block">
          <input type="text" placeholder="Login"></input>
        </div>
        <div className="input-block">
          <input type="password" placeholder="Senha"></input>
        </div>
        <button type="submit" className="button-login">
          Entrar
        </button>
      </form>
    </div>
  )
}
