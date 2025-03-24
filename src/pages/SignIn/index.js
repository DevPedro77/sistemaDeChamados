import React, {useState} from "react";
import './signIn.css';
import logo from '../../assets/logo.png';

import { Link } from "react-router-dom";

export default function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema"/>
        </div>

        <form>
          <h1>Portal do Suporte</h1>
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

            <button type="submit">Acessar</button>
        </form>

        <Link to='/register'>Cadastre sua conta</Link>
      </div>
    </div>
  )
}