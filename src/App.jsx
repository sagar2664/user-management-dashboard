import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import AddUser from './pages/AddUser.jsx'
import EditUser from './pages/EditUser.jsx'
import UserList from './components/UserList.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  )
}

export default App
