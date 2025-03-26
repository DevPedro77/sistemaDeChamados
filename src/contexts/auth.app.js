import React, { useState, useEffect, createContext } from "react";
import { db, auth } from "../service/firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@tickets");

      if(storageUser) {
        setUser(JSON.parse(storageUser));
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function signIn(email, password) {
    setAuthLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          toast.error("Usuário não encontrado no banco de dados!");
          setAuthLoading(false);
          return;
        }

        let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl || null,
        };

        setUser(data);
        storageUser(data);
        setAuthLoading(false);
        toast.success(`Bem-vindo de volta ${data.nome} !`);
        navigate("/dashboard");
      })
      .catch((error) => {
        setAuthLoading(false);
        toast.error("Erro ao fazer login: " + error.message);
      });
  }

  async function signUp(email, password, name) {
    setAuthLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          nome: name,
          avatarUrl: null,
        });

        toast.success("Conta criada com sucesso!");

        let data = {
          uid: uid,
          nome: name,
          email: value.user.email,
          avatarUrl: null,
        };

        setUser(data);
        storageUser(data);
        setAuthLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(`Erro ao criar conta: ${error.message}`);
        setAuthLoading(false);
      });
  }

  function storageUser(data) {
    localStorage.setItem("@tickets", JSON.stringify(data));
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("@tickets");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logout,
        authLoading,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
