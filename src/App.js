import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
// import { css } from "@emotion/react";
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import { BrowserRouter,Routes, Route} from "react-router-dom";
// import { render } from "react-dom";
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './component/private/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 return (
    <>
    <AuthProvider>
      <BrowserRouter>
    <Routes>
    <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        
    </Routes>
  </BrowserRouter>,

  </AuthProvider>
    </>
  );
}

export default App;
