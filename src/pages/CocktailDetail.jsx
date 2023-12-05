import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../style.css"

export default function CocktailDetail() {
  const { id } = useParams();
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('strInstructions');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  
  const handleAddToFavorites = (cocktailId) => {

    const favoriteCocktailIds = JSON.parse(localStorage.getItem('favoriteCocktailIds')) || [];
  
    if (!favoriteCocktailIds.includes(cocktailId)) {

      favoriteCocktailIds.push(cocktailId);

      localStorage.setItem('favoriteCocktailIds', JSON.stringify(favoriteCocktailIds));
      alert('Added to favorites!');
    } else {
      alert('This drink is already in favorites!');
    }
  }
  

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setCocktailDetails(response.data.drinks ? response.data.drinks[0] : null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCocktailDetails();
  }, [id]);

  if (!cocktailDetails) {
    return <div>There is no drink with that id.</div>;
  }

  return (
    <div className='cocktailDetails'>
    <div style={{display: 'flex'}}> 
  <div>
      <h2>{cocktailDetails.strDrink}</h2>
      <img src={cocktailDetails.strDrinkThumb} alt={cocktailDetails.strDrink} height={300} />
      <p>{cocktailDetails.strCategory}; {cocktailDetails.strAlcoholic}</p>
      <p><button onClick={() => handleAddToFavorites(cocktailDetails.idDrink)}>Add to favorites</button></p>
      </div>
      <div className='ingredientsInstructionsContainer'>
      <h3>Ingredients:</h3>
      <ul>
      {Array.from({ length: 15 }, (_, index) => {
        const ingredient = cocktailDetails[`strIngredient${index + 1}`];
        
        if (ingredient) {
          return (
            <li key={index}>
              {`${ingredient}`}
            </li>
          );
        } else {
          return null;
        }
      })}
    </ul>
    <h3>Instructions</h3>
      <p>{cocktailDetails[selectedLanguage]}</p>
      <label htmlFor="languageSelect">Language: </label>
      <select id="languageSelect" onChange={handleLanguageChange} value={selectedLanguage}>
        <option value="strInstructions">English</option>
        <option value="strInstructionsES">Spanish</option>
        <option value="strInstructionsDE">German</option>
        <option value="strInstructionsFR">French</option>
        <option value="strInstructionsIT">Italian</option>
      </select>
      <h3>Glass</h3>
      <p>{cocktailDetails.strGlass}</p>
      </div>
      </div>
      <div className='videoContainer'>
      {cocktailDetails && (
      <div className='videoInstructions'>
        <p>Video Instructions:</p>
        <iframe
          title="YouTube Video"
          width = '600'
          height = '300'
          src="https://www.youtube.com/embed/b0IuTL3Z-kk?si=VBKre9MNpJ824PgT"
          allowFullScreen
        ></iframe>
      </div>
    )}
      </div>
    </div>
  );
};

