import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

export default function Cocktail({cocktail}){
  const [hoveredItem, setHoveredItem] = useState(false);

  return (
  <div style={{ marginTop: '30px', marginLeft: '100px', textAlign: 'center' }}>
    <Grid container spacing={2}>
      <Grid key={cocktail.idDrink} item style={{ textAlign: 'center' }}>
        <img
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          height={150}
          style={{
            marginBottom: '5px',
            filter: hoveredItem ? 'brightness(80%)' : 'brightness(100%)',
          }}
          onMouseEnter={() => setHoveredItem(true)}
          onMouseLeave={() => setHoveredItem(false)}
        />
        <Typography variant="subtitle1" component="div">
          <Link
            to={`/cocktails/${cocktail.idDrink}`}
            style={{
              textDecoration: 'none',
              color: hoveredItem ? 'yellow' : 'white',
            }}
            onMouseEnter={() => setHoveredItem(true)}
            onMouseLeave={() => setHoveredItem(false)}
          >
            {cocktail.strDrink}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  </div>
  );
}