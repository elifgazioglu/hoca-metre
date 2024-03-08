import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNav from "../src/components/navbar/TopNav"
import Footer from "../src/components/footer/Footer"
import Home from "../src/pages/home/Home"
import Login from "../src/pages/login/Login"
import Register from "../src/pages/register/Register"
import Profile from "../src/pages/profile/Profile"
import Teachers from "../src/pages/teachers/Teachers"
import AddTeacher from "../src/pages/addTeacher/AddTeacher"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <TopNav></TopNav>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/teachers",
          element: <Teachers />,
        },
        {
          path: "/add-teacher",
          element: <AddTeacher />,
        },
        // {
        //   path: "/egitmen-profili",
        //   element: (
        //     <PrivateRoute>
        //       <TutorProfile></TutorProfile>
        //     </PrivateRoute>
        //   ),
        // },
        // {
        //   path: "/egitmenler",
        //   element: (
        //     <PrivateRoute>
        //       <Tutors></Tutors>
        //     </PrivateRoute>
        //   ),
        // },
        // {
        //   path: "/basvuru",
        //   element: (
        //     <PrivateRoute>
        //       <TutorApplication></TutorApplication>
        //     </PrivateRoute>
        //   ),
        // },
        // {
        //   path: "/egitmenler/:slug",
        //   element: (
        //     <PrivateRoute>
        //       <TutorsDetails></TutorsDetails>
        //     </PrivateRoute>
        //   ),
        // },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
