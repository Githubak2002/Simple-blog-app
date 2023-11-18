
import { Route,Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Blogs from './pages/Blogs.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Footer from "./components/Footer.jsx"
import UsersBlog from "./pages/UsersBlog.jsx"
import CreateBlog from "./pages/CreateBlog.jsx"
import BlogDetail from "./pages/BlogDetail.jsx"
import PageNotFound from "./pages/PageNotFound.jsx"
import ReadMore from "./pages/ReadMore.jsx"
// import HeroSection from "./components/HeroSection.jsx"
// import Loader from "./components/Loader.jsx"

function App() {
  return (
   <main className="min-h-[98vh] mx-auto max-w-[1440px]">
      <Nav />
      {/* <Loader /> */}
      <Routes>
  
        {/* <Route path="/" element={<HeroSection />} /> */}
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/users-blogs" element={<UsersBlog />} />
        <Route path="/read/:id" element={<ReadMore />} />

        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blog-detail/:id" element={<BlogDetail />} />  
        {/* blog-detail || update */}

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<PageNotFound />} />

      </Routes>
      <Footer />
   </main>
  )
}

export default App
