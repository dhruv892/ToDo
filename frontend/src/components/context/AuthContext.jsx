// import PropTypes from 'prop-types';

import { createContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState('token');

//   const setAuthToken = (newToken) => {
//     setToken(newToken);
//   };

//   return (
//     <AuthContext.Provider value={{ token, setAuthToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export const useAuth = () => useContext(AuthContext);



export const AuthContext = createContext({
    token: '',
    setAuthToken: () => {},
});
    

