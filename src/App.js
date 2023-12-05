import Home  from './components/Home.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import CocktailDetail from './components/CoctailDetail.jsx';
import Categories from './components/Categories.jsx';
import AvailableGlasses from './components/AvailableGlasses.jsx';
import Ingredients from './components/Ingredients.jsx';
import BasicFiltering from './components/BasicFiltering.jsx';
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
