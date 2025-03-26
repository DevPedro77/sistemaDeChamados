import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.app"

export default function Dashboard(){
  const {logout} = useContext(AuthContext)

  async function handleLogout() {
    logout();
    console.log(logout)
  }
  return(
    <div className="">
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Sair da conta</button>
    </div>
  )
}