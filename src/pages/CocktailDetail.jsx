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
      <h2>{cocktailDetails.strDrink}</h2>
      <p>{cocktailDetails.strAlcoholic}</p>
      <p>Category: {cocktailDetails.strCategory}</p>
      <p>Instructions: {cocktailDetails[selectedLanguage]}</p>
      <label htmlFor="languageSelect">Language: </label>
      <select id="languageSelect" onChange={handleLanguageChange} value={selectedLanguage}>
        <option value="strInstructions">English</option>
        <option value="strInstructionsES">Spanish</option>
        <option value="strInstructionsDE">German</option>
        <option value="strInstructionsFR">French</option>
        <option value="strInstructionsIT">Italian</option>
      </select>
      <p>Glass: {cocktailDetails.strGlass}</p>
      <img src={cocktailDetails.strDrinkThumb} alt={cocktailDetails.strDrink} height={150} />
      <p><button onClick={() => handleAddToFavorites(cocktailDetails.idDrink)}>Add to favorites</button></p>
      <p>Ingredients:</p>
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
    {cocktailDetails && (
      <div className="youtubeContainer">
        <p>Video Instructions:</p>
        <iframe
          title="YouTube Video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/b0IuTL3Z-kk?si=VBKre9MNpJ824PgT"
          allowFullScreen
        ></iframe>
      </div>
    )}
    </div>
  );
};

