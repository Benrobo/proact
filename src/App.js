import react from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Route, Routes } from "react-router"
import Layout from "./layout/layout"
import Home from "./pages/home/Home"
import "./global.css"
import Main from "./pages/main/Main"
import sendReminders from "./helpers/sendReminders"
import { DataContextProvider } from "./context/DataContext"

// run reminder concurrently
sendReminders()

export default function App() {
  return (
    <DataContextProvider>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Main />} />
          </Routes>
        </Router>
      </Layout>
    </DataContextProvider>
  )
}
