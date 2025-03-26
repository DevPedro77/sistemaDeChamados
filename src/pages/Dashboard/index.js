import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.app"
import Header from "../../components/Header";

export default function Dashboard(){
  const {logout} = useContext(AuthContext)

  async function handleLogout() {
    logout();
    console.log(logout)
  }
  return(
    <div className="">
      <Header/>
      <button onClick={handleLogout}>Sair da conta</button>
    </div>
  )
}