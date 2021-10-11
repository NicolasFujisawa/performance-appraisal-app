import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import logoImg from '../images/logo.png'
import '../styles/pages/landing-page.css'

export function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <Link to="" className="enter-landing">
          <img src={logoImg} alt="Fatec365" />
        </Link>

        <main>
          <h1>Um feedback para sua equipe</h1>
          <p>Obtenha insights valiosos para o crescimento da turma.</p>
        </main>

        <Link to="/evaluation/new" className="enter-app">
          <FiArrowRight
            className="font-left"
            size={26}
            color="rgba(0, 0, 0, 0.6)"
          />
        </Link>
      </div>
    </div>
  )
}
