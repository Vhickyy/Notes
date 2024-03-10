import Home from "./Pages/Home";
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from "react-router-dom";
import Layout from "./components/Home/Layout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import VerifyCode from "./Pages/VerifyCode";
import Dashboard from "./Pages/Protected/Dashboard";
import AllNotes from "./Pages/Protected/AllNotes";
import DeletedNotes from "./Pages/Protected/DeletedNotes";
import Profile from "./Pages/Protected/Profile";
import Protected from "./components/Dashboard/ProtectedLayout";
import AddNote from "./Pages/Protected/AddNote";
import Project from "./Pages/Protected/Project";
import EditNote from "./Pages/Protected/EditNote";
import ReadProject from "./Pages/Protected/ReadProject";
import Memorycheck from "./Pages/Protected/Memorycheck";
import NotFound from "./Pages/NotFound";
import { AuthContextProvider } from "./context/AuthContext";
import CheckMember from "./Pages/Protected/CheckMember";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetCode from "./Pages/ResetCode";
import ResetPassword from "./Pages/ResetPassword";
import EmailVerifiedSuccess from "./Pages/EmailVerifiedSuccess";
// import { ErrorBoundary } from "react-error-boundary";
// import Fallback from "./components/Fallback";

function App() {
  // fetch("/api/test-user").then(data=>data.json()).then(data=>console.log(data)).catch(err=>console.log(err))
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" >
      <Route element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="email-verified" element={<EmailVerifiedSuccess/>}/>
        <Route path="forget-password" element={<ForgotPassword/>}/>
        <Route path="reset-code" element={<ResetCode/>}/>
        <Route path="reset-password" element={<ResetPassword/>}/>
        <Route path="verifycode" element={<VerifyCode/>}/>
      </Route>
      <Route path="dashboard" element={<Protected/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="allnotes" element={<AllNotes/>}/>
        <Route path="deletednotes" element={<DeletedNotes/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="addnote" element={<AddNote/>}/>
        <Route path="editnote/:id" element={<EditNote/>}/>
        <Route path="project" element={<Project/>}/>
        <Route path="project/:id" element={<CheckMember/>}>
          <Route index element={<ReadProject/>}/>
        </Route>
        <Route path="memorycheck" element={<Memorycheck/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Route>
  ))

  // const errorHandler = (error: any,errorInfo: any) => {
  //   console.log(error,errorInfo)
  // }
{/* <Route path="project/:id" element={<CheckMember/>}>
          <Route index element={<ReadProject/>}/>
        </Route> */}
  return (
    // <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>
    // </ErrorBoundary>
  )
}

export default App;

// add users to note
// have message once user are added to note
// allow real time update when two users are involvec
// notification
