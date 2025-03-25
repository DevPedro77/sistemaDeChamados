import React, {useState, useEffect, createContext} from "react";
import { db, auth } from "../service/firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(null);
  const navigate = useNavigate();

async function signIn(email, password){
    setAuthLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
    .then( async(value)=>{
      let uid = value.user.uid;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      let data = {
        uid: uid,
        nome: docSnap.data().nome,
        email: value.user.email,
        avatarUrl: docSnap.data().avatarUrl
      }

      setUser(data)
      storageUser(data)
      setAuthLoading(false)
      toast.success(`Bem-vindo de volta ${data.nome} !`)
      navigate("/dashboard")
    })
    .catch((error) =>{
      setAuthLoading(false)
      toast.error("Por favor, verifique seus dados!")
    })
  }

  async function signUp(email, password, name){
    setAuthLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (value) =>{
      let uid = value.user.uid;

      await setDoc(doc(db, "users", uid), {
        nome: name,
        avatarUrl: null
      })

      .then(() =>{
        toast.success('Conta criada com sucesso!')
        // dados do user
        let data = {
          uid: uid,
          nome: name,
          email: value.user.email,
          avatarUrl: null
        };

        setUser(data)
        storageUser(data); //guardando o data no localstorage
        setAuthLoading(false)
        navigate('/dashbord')
      })
    })

    .catch((error) => {
      toast.error('Ops, ocorreu algum error' + error)
      console.log(error, name)
      setAuthLoading(false)
    })
  }

  function storageUser(data){
    localStorage.setItem('@tickets',JSON.stringify(data))
  }


  
  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        authLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
  }

  



export default AuthProvider;
