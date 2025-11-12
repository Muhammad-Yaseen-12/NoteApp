import AuthContext from './AuthContext';
import { useState, useEffect } from 'react';

function AuthContextProvider({ children }) {
  const [isUser, setIsUser] = useState(null);

  // Run only once on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsUser(true);
    } else {
      setIsUser(false); 
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isUser, setIsUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
