import './style.css'
import Trash from '../../assets/deletar.svg'
import Api from '../../services/api'
import { useEffect, useState, useRef } from 'react';
function Home() {

  
  const [users, setUsers] = useState([]);
  
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios');

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await Api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
   
  }

  async function deleteUsers(id) {
    console.log("Entrou aquiiiiiiii")
    await Api.delete(`/usuarios/${id}`)
  }

  useEffect(() => {
    getUsers();
  }, []);
  
  
  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de usuários</h1>
        <input type="text" name='nome' placeholder='nome' ref={inputName}/>
        <input type="number" name="idade" placeholder='idade' ref={inputAge}/>
        <input type="email"  name='email' placeholder='e-mail' ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div className="card" key={user.id} >
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span></p>
          <p>Email: <span>{user.email}</span></p>
        </div>
        <button onClick={() => deleteUsers(user.id)}>
          <img src={Trash} alt="" />
        </button>
      </div>
      ))}
      
    </div>
  )
}

export default Home
