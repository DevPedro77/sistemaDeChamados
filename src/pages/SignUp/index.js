import React, {useState, useContext} from "react";
import '../SignIn/signIn.css';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth.app";



export default function SignUp(){ 
  const [name, setName] =useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signUp, authLoading} = useContext(AuthContext);

async function handleSignUp(e){
    e.preventDefault()

    if(name !== '' && email !== '' && password !== '') {
      signUp(email, password, name)
    }


  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema"/>
        </div>

        <form onSubmit={handleSignUp}>
          <h1>Cadastre uma nova conta</h1>
          <input
            type="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) =>setName(e.target.value)}
          />
          <input 
            type="text"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            placeholder="Digite seu email"
            />

            <input
              type="password"
              value={password}
              onChange={(e) =>setPassword(e.target.value)}
              placeholder="*************"
            />

            <button type="submit">
              {authLoading ? 'Carregando...' : "Cadastrar"}
            </button>
        </form>

        <Link to='/'>Já possui uma conta? Faça o login!</Link>
      </div>
    </div>
  )
}