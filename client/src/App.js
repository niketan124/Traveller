import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './component/header/Header';
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react';
import { setUser } from './redux/feature/authSlice';
import AddEditTour from './pages/AddEditTour';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './component/PrivateROute.js/PrivateRoute';
import PageNotFound from './pages/PageNotFound';
import TagTours from './pages/TagTours';

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  useEffect(() => {
    dispatch(setUser(user))
    // eslint-disable-next-line
  }, [])
  return (
    <BrowserRouter>
      <div className="App container-fluid">
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours/search" element={<Home />} />
          <Route path="/tours/tag/:tag" element={<TagTours />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addTour"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route
            path="/editTour/:id"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route path="/tour/:id" element={<SingleTour />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
