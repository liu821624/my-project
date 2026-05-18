import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AITools from './pages/AITools'
import ListingOptimizer from './pages/ListingOptimizer'
import KeywordResearch from './pages/KeywordResearch'
import ReviewAnalyzer from './pages/ReviewAnalyzer'
import LearningCenter from './pages/LearningCenter'
import Profile from './pages/Profile'
import Login from './pages/Login'
import { ToastContainer } from './components/ToastContainer' // 假设我们稍后创建一个容器来管理多个 Toast

// 临时移除路由保护以方便验收 UI
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
//   return isAuthenticated ? children : <Navigate to="/login" replace />
// }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            // <ProtectedRoute>
              <div className="flex min-h-screen bg-[#0f172a] text-white">
                <Navbar />
                <main className="flex-1 p-8 overflow-y-auto h-screen custom-scrollbar">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tools" element={<AITools />} />
                    <Route path="/tools/listing-optimizer" element={<ListingOptimizer />} />
                    <Route path="/tools/keyword-research" element={<KeywordResearch />} />
                    <Route path="/tools/review-analyzer" element={<ReviewAnalyzer />} />
                    <Route path="/learning" element={<LearningCenter />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
              </div>
            // </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
