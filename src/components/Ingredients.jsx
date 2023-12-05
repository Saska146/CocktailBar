import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Ingredients() {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
      const fetchIngredients = async () => {
        try {
          const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
          setIngredients(response.data.drinks || []);
        } catch (error) {
          console.error('Error fetching ingredients:', error);
          setIngredients([]);
        }
      };
  
      fetchIngredients();
    }, []);

    return(
   <div>
      <h1 style={{color: 'white'}}>Available Ingredients</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: 'bold'}}>ID</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{ingredient.strIngredient1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
}