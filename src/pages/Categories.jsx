import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchDrinkCategories = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        setCategories(response.data.drinks || []);
      } catch (error) {
        console.error('Error fetching drink categories:', error);
        setCategories([]);
      }
    };

    fetchDrinkCategories();
  }, []);

  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{fontWeight: 'bold'}}>ID</TableCell>
          <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.map((category, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            { <TableCell>{category.strCategory}</TableCell> }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

