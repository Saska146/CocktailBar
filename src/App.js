import Home  from './pages/Home.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import CocktailDetail from './pages/CocktailDetail.jsx';
import Categories from './pages/Categories.jsx';
import AvailableGlasses from './pages/AvailableGlasses.jsx';
import Ingredients from './pages/Ingredients.jsx';
import BasicFiltering from './pages/BasicFiltering.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {

  return (
<div className='app'>
<Header/>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/cocktails/:id" element={<CocktailDetail/>} />
<Route path="/categories" element={<Categories/>} />
<Route path="/glasses" element={<AvailableGlasses/>} />
<Route path="/ingredients" element={<Ingredients/>} />
<Route path="/bartender-beginner" element={<BasicFiltering/>} />
</Routes>
<Footer/>
</div>
    );
}

export default App;
