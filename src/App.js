import React,{ useState} from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import SinglePost from './components/SinglePost';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { userContext } from './context/userContext';
import { authContext } from './context/authContext';
import { userNameContext } from './context/userNameContext';
import './App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [authToken, setAuthToken] = useState()
  const [userName, setUserName] = useState()


  // useEffect(() => {

  //   const accessToken = localStorage.getItem('accessToken')
  //   if (accessToken) {
  //       const response = axios.get("http://localhost:5001/login/success", {
  //         headers: {
  //           'Authorization': `Bearer ${accessToken}`
  //         }
  //       }).then (response => {
  //         if (response.data) {
  //           setLoggedIn(true)
  //           setAuthToken(accessToken)
  //           setUserName(response.data.name)
  //         }

  //       }).catch (error => {
  //           console.log(error.message)
  //           localStorage.removeItem('accessToken')
  //       }) 
       



      

  //   }
  // }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     const accessToken = localStorage.getItem('accessToken');
    
//     if (accessToken) {
//       try {
//         const response = await axios.get("http://localhost:5001/login/success", {
//           headers: {
//             'Authorization': `Bearer ${accessToken}`
//           }
//         });

//         // Check if response.data exists
//         if (response.data) {
//           console.log(response.data); // Log entire response to inspect structure
//           console.log(response.data.name); // Log the name
          
//           // Update state variables
//           setLoggedIn(true);
//           setAuthToken(accessToken);
//           setUserName(response.data.name);
//         }

//       } catch (error) {
//         console.log(error.message); // Log error
//         localStorage.removeItem('accessToken'); // Remove token if invalid
//       }
//     }
//   };

//   fetchData(); // Call the async function
// }, []);
  

  return (
    <userContext.Provider value={{isLoggedIn,setLoggedIn}}>
    <authContext.Provider value={{authToken,setAuthToken}}>
    <userNameContext.Provider value={{userName, setUserName}}>
    <Router>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts/:id' element={<SinglePost />}/>
      </Routes> 
    </Router>
    </userNameContext.Provider>
    </authContext.Provider> 
    </userContext.Provider> 
         
  );
}

export default App;
