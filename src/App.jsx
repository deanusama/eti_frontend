import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard'
import ShortCourses from './pages/dashboard/ShortCourses'
import SharedLayout from './layout/SharedLayout'
import AddStudent from './pages/dashboard/AddStudent'
import Students from './pages/dashboard/Students'
import AddCourse from './pages/dashboard/AddCourse'
import ProtectedRoutes from './pages/ProtectedRoutes'
import UpdateCourse from './pages/dashboard/UpdateCourse'
import CIPSStudents from './pages/dashboard/CIPSStudents'
import AddCipsStudent from './pages/dashboard/AddCipsStudent'
import { useDispatch } from 'react-redux'
import { allStudent, getStudentsInvoices } from './redux/slice/student'
import { useEffect } from 'react'
import { allCourse } from './redux/slice/course'
import { allCipsStudent } from './redux/slice/cips'
import ShortCourseDetail from './pages/dashboard/ShortCourseDetail'
import CipsCourseDetail from './pages/dashboard/CipsCourseDetail'
import Invoices from './pages/dashboard/Invoices'
import EditInvoice from './pages/dashboard/EditInvoice'
import ErrorPage from './pages/ErrorPage'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allStudent())
    dispatch(allCourse())
    dispatch(allCipsStudent())
    dispatch(getStudentsInvoices())

  }, [])

  return (

    <BrowserRouter>
      <Routes>

        {/* Home Routes */}
        <Route path='/' element={

          <ProtectedRoutes>
            <SharedLayout />
          </ProtectedRoutes>
        } >

          <Route index element={<Dashboard />} />


          {/* Courses */}
          <Route path='/short-courses' element={<ShortCourses />} />
          <Route path='/short-courses/:id' element={<ShortCourseDetail />} />
          <Route path='/add-course/:id?' element={<AddCourse />} />
          {/* <Route path='/short-course/:id' element={<UpdateCourse />} /> */}

          {/* Students */}
          <Route path='/add-student/:id?' element={<AddStudent />} />
          <Route path='/students/:id' element={<Students />} />

          {/* CIPS Students */}
          <Route path='/add-cips-student/:id?' element={<AddCipsStudent />} />
          <Route path='/cips-students' element={<CIPSStudents />} />
          <Route path='/cips-students/:id' element={<CipsCourseDetail />} />

          <Route path='/edit-invoice/:id' element={<EditInvoice />} />
          <Route path='/invoices' element={<Invoices />} />

        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />


        <Route path='*' element={<ErrorPage />} />
      </Routes>


    </BrowserRouter>

  )
}

export default App
