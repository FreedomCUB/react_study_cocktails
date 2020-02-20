import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecipesContext = createContext();

const RecipesProvider = props => {
  const [recipes, setRecipes] = useState([]);
  const [find, setFind] = useState({
    ingredient: "",
    category: ""
  });
  const [consult, setConsult] = useState(false);

  const { ingredient, category } = find;

  useEffect(() => {
    if (consult) {
      const findRecipes = async () => {
        const url1 = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
        const url2 = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
        const [cat, ing] = await Promise.all([
          axios.get(url1),
          axios.get(url2)
        ]);
        const arrayCat = cat.data.drinks;
        const arrayIng = ing.data.drinks;

        if (ingredient !== "" && category === "") {
          setRecipes(arrayIng);
        } else if (category !== "" && ingredient === "") {
          setRecipes(arrayCat);
        } else if (category !== "" && ingredient !== "") {
          const cocktailMatch = () => {
            let arrayMatch = [];
            for (let i = 0; i < arrayCat.length; i++) {
              for (let j = 0; j < arrayIng.length; j++) {
                if (arrayCat[i]["idDrink"] === arrayIng[j]["idDrink"])
                  arrayMatch = [...arrayMatch, arrayIng[j]];
              }
            }
            setRecipes(arrayMatch);
          };

          cocktailMatch();
        }
        return;
        
      };
      findRecipes();
    }
  }, [find, category, consult, ingredient]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        setFind,
        setConsult
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
