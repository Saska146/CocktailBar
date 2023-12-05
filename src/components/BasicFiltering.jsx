import { useState, useEffect } from "react";
import axios from "axios";
import CocktailList from "./CoctailList";
import SearchBar from "./SearchBar";
import { useSearchParams } from "react-router-dom";
import { Grid } from "@mui/material";
import '../style.css'


export default function BasicFiltering(){
    const [cocktails, setCocktails] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let category = searchParams.get("c");
        let glass = searchParams.get("g");
        let alcohol = searchParams.get("a");
        
        let filter = category || glass || alcohol;
        let searchParam = category ? 'c' : glass ? 'g' : alcohol ? 'a' : ''
        console.log(filter);

        const fetchCocktails = async () => {
          try {
            const response = !filter ? await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
            : await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${searchParam + '=' + filter}`);
            setCocktails(response.data.drinks || []);
          } catch (error) {
            console.error('Error fetching cocktails:', error);
          }
        };
    
        fetchCocktails();
      }, []);

      const getByFilter = async (filter) => {
        try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${filter}`);
            setCocktails(response.data.drinks || []);
            setSearchParams(filter);
        } catch (error) {
            console.error('Error fetching cocktails:', error);
          }
      }

      
      return(
        <div style={{display: 'flex'}}>
     
        <div className="basicFiltering" >
            <p>Category</p>
            <button onClick={() => getByFilter('c=Ordinary_Drink')}>Ordinary drink</button>
            <button onClick={() => getByFilter('c=Cocktail')}>Cocktail</button>
            <p>Glass</p>
            <button onClick={() => getByFilter('g=Cocktail_glass')}>Cocktail glass</button>
            <button onClick={() => getByFilter('g=Champagne_flute')}>Chapagne flute</button>
            <p>Alcohol</p>
            <button onClick={() => getByFilter('a=Alcoholic')}>Alcoholic</button>
            <button onClick={() => getByFilter('a=Non_Alcoholic')}>Non Alcoholic</button>
            <p>Ingredient</p>
            <SearchBar value={searchValue} changeInput={setSearchValue}/>
            
        </div>

        <Grid  container spacing={2} justifyContent="center" item xs={20} sm={10}>
          <CocktailList cocktails={cocktails} searchValue={searchValue} />
        </Grid>

   
        </div>


      );
    
}