import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { PageLayout } from './components/PageLayout/PageLayout';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from './constants/constants';
import { UserContextWrapper } from './contexts/UserContextWrapper';
import { Expenses } from './pages/Expenses/Expenses';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

function App() {

useEffect(()=> {
  const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
  if(token) {

  }
}, []);

  return (
    <UserContextWrapper>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Expenses />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>Page not found</div>}/>
      </Routes>
        
    </UserContextWrapper>
  );
}

export default App;