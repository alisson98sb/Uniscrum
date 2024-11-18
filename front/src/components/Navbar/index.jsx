import './style.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/cadastroUser">Cadastrar Usuario</Link>
  
    </nav>
  )
}

export default Navbar
