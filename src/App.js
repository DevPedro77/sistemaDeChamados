import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/app.routes";
import AuthProvider from '../src/contexts/auth.app'
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer/>
        <RoutesApp/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
