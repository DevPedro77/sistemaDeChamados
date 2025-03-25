import React, {useState, useEffect, createContext} from "react";
import { db, auth } from "../service/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(null);

  function signIn(email, password){
    //logar essa bomba
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
        setAuthLoading(false)
      })
    })

    .catch((error) => {
      toast.error('Ops, ocorreu algum error' + error)
      console.log(error, name)
      setAuthLoading(false)
    })
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
