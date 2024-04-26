import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './Components/Layout/Main';
import Home from './Components/Home/Home/Home';
import ErrorElement from './Components/ErrorElement/ErrorElement';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { Toaster } from "react-hot-toast";
import Profile from './Components/Profile/Profile';
import AddBooks from './Components/AddBooks/AddBooks';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute';
import WishList from './Components/WishList/WishList';
import Cart from './Components/Cart/Cart';
import SpecificCategory from './Components/SpecificCategory/SpecificCategory';
import BookDetails from './Components/BookDetails/BookDetails';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorElement></ErrorElement>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register></Register>
        },
        {
          path: "/profile",
          element: <Profile></Profile>
        },
        {
          path: "/add-books",
          element: <PrivateRoute><AddBooks></AddBooks></PrivateRoute>
        },
        {
          path: "/wishlist",
          element: <PrivateRoute><WishList></WishList></PrivateRoute>
        },
        {
          path: "/cart",
          element: <PrivateRoute><Cart></Cart></PrivateRoute>
        },
        {
          path: "/specific-category",
          element: <SpecificCategory></SpecificCategory>
        },
        {
          path: "/book-details",
          element: <BookDetails></BookDetails>
        }
      ]
    }
  ])
  return (
    <div className='shadow shadow-lg marginAuto'>
      <RouterProvider router={router}>

      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
