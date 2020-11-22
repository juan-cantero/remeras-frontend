import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setIsAuthenticated(true);
      if (userInfo.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, [isAdmin, userInfo, isAuthenticated]);

  return [isAuthenticated, isAdmin];
};

export default useAuth;
