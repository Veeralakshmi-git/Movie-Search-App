import './App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom"

import Header from './components/header/Header'
import Trending from './pages/Trending/Trending'
import Search from './pages/Search/Search'

function App() {

  return (
    <BrowserRouter>    
        <Header />
        <div className="App">
            <Routes>
                <Route index path="/" element={<Trending/>}/>
                <Route path="/search" element={<Search/>}/>
            </Routes>
        </div>    
    </BrowserRouter>
  )
}

export default App
