import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import {Home} from './pages/Home.jsx'
import AddUser from './pages/AddUser.jsx'
import EditUser from './pages/EditUser.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit" element={<EditUser />} />
      </Routes>
    </Router>
  )
}

export default App
