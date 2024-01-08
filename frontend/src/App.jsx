import React, { useState } from 'react';
import ReaderLogin from './pages/ReaderLogin';
import AuthorLogin from './pages/AuthorLogin';
import ReaderForm from './pages/ReaderForm';
import AuthorForm from './pages/AuthorForm'
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn?(
        <div className='flex justify-evenly w-screen'>
          <ReaderLogin onLogin={handleLogin}/>
          <AuthorLogin onLogin={handleLogin} />
        </div>
      ):currentUser.type=='reader'?(<ReaderForm logout={setIsLoggedIn}/>):(<AuthorForm logout={setIsLoggedIn}/>)}
    </div>
  );
}

export default App;
