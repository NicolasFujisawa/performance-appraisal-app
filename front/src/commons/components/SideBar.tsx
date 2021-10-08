import { FiChevronLeft, FiList, FiPlus } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import '../../styles/components/sidebar.css'

export default function SideBar() {
  const { goBack } = useHistory()

  return (
    <aside className="app-sidebar">
      <div className="sidebar-content">
        <Link to="/evaluation/new" className="link-app">
          <FiPlus size={24} color="rgba(0, 0, 0, 0.6)" />
          <p>Criar Avaliação</p>
        </Link>

        <Link to="/evaluation/" className="link-app">
          <FiList size={24} color="rgba(0, 0, 0, 0.6)" />
          <p>Listar Avaliações</p>
        </Link>
      </div>
      <footer>
        <button onClick={goBack} className="link-app">
          <FiChevronLeft size={24} color="rgba(0, 0, 0, 0.6)" />
        </button>
      </footer>
    </aside>
  )
}
