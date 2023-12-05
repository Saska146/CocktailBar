import Cocktail from "./Cocktail";

export default function CocktailList({cocktails, searchValue}) {

    return(
      searchValue === "" ? cocktails.map((cocktail) => (<Cocktail cocktail={cocktail}/>)) : cocktails.filter(cocktail => {
           
        return Object.values(cocktail).some(ingredient => ingredient && ingredient.toLowerCase().includes(searchValue.toLowerCase()));
     }).map((cocktail) => (<Cocktail cocktail={cocktail}/>))

    );

}