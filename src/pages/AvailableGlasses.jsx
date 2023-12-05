import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function AvailableGlasses(){
    const [glasses, setGlasses] = useState([]);

  useEffect(() => {
    const fetchAvailableGlasses = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list');
        setGlasses(response.data.drinks || []);
      } catch (error) {
        console.error('Error fetching available glasses:', error);
        setGlasses([]);
      }
    };

    fetchAvailableGlasses();
  }, []);

    return( 
    <div>
      <h1 style={{color: 'white'}}>Available Glasses</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: 'bold'}}>ID</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {glasses.map((glass, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{glass.strGlass}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
}