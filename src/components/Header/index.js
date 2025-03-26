import React from "react"
import { AuthContext } from "../../contexts/auth.app";
import { useContext } from "react";
import './header.css';
import avatarImg from '../../assets/avatar.png';
import { Link } from "react-router-dom";
import {FiHome, FiUser, FiSettings} from 'react-icons/fi'

export default function Header(){
  const {user} = useContext(AuthContext)
  return(
    <div className="sidebar">
      <div className="">
        <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="foto de perfil do usuario" />
      </div>

      <Link to='/dashboard'>
        <FiHome color="#ccc" size={24}/>
        Chamados
      </Link>

      <Link to='/customers'>
        <FiUser color="#ccc" size={24}/>
          Clientes
      </Link>

      <Link to='/settings'>
        <FiSettings color="#ccc" size={24}/>
          Configurações
      </Link>
    </div>
  )
}