import { FiChevronLeft, FiList, FiPlus, FiDatabase } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import logoFatec365 from '../../images/logo.png'
import { BASE_URL } from '../../services/api'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/selectors'
import '../../styles/components/sidebar.css'

export default function SideBar() {
  const { goBack } = useHistory()
  const { role, userId } = useAppSelector(selectUser)

  return (
    <aside className="app-sidebar">
      <div className="sidebar-content">
        <Link to="" className="enter-landing">
          <img src={logoFatec365} alt="Fatec365" />
        </Link>

        {role === 'teacher' && (
          <>
            <Link to="/evaluation/new" className="link-app">
              <FiPlus size={24} color="rgba(0, 0, 0, 0.6)" />
              <p>Criar Avaliação</p>
            </Link>

            <Link to="/method/new" className="link-app">
              <FiPlus size={24} color="rgba(0, 0, 0, 0.6)" />
              <p>Criar Método</p>
            </Link>

            <Link to="/criteria/new" className="link-app">
              <FiPlus size={24} color="rgba(0, 0, 0, 0.6)" />
              <p>Criar Critério</p>
            </Link>
          </>
        )}

        <Link to="/teams" className="link-app">
          <FiList size={24} color="rgba(0, 0, 0, 0.6)" />
          <p>Listar Equipes</p>
        </Link>

        {role !== 'teacher' && (
          <a
            href={`${BASE_URL}lgpd/data?userId=${userId}`}
            className="link-app"
            target="_blank"
            rel="noreferrer"
          >
            <FiDatabase size={24} color="rgba(0, 0, 0, 0.6)" />
            <p>Recuperar Dados</p>
          </a>
        )}
      </div>
      <footer>
        <button onClick={goBack} className="link-app">
          <FiChevronLeft size={24} color="rgba(0, 0, 0, 0.6)" />
        </button>
      </footer>
    </aside>
  )
}
