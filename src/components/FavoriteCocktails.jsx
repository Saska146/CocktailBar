import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid } from '@mui/material';
import '../style.css';
import Cocktail from './Cocktail.jsx';

export default function FavoriteCocktails(){
  const [cocktailsData, setCocktailsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const storedCocktailIds = JSON.parse(localStorage.getItem('favoriteCocktailIds')) || [];

        if (storedCocktailIds.length > 0) {
          const promises = storedCocktailIds.map(id =>
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
          );

          const responses = await Promise.all(promises);
          const cocktails = responses.map(response => response.data.drinks[0]);
          setCocktailsData(cocktails);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='favoriteCocktails'>
      <Typography variant="h4" component="h2">
        Omiljeni kokteli
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        {cocktailsData.map(cocktail => (
           <Grid item key={cocktail.idDrink}>
           <Cocktail cocktail={cocktail} />
         </Grid>
        ))}
      </Grid>
    </div>
  );
};

