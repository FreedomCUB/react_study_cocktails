import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ModalContext = createContext();

const ModalProvider = (props) => {
  const [idRecipe, setIdRecipe] = useState(null);
  const [inf, setInf] = useState({})

  useEffect(() => {
    const findRecipe = async () => {
      if (!idRecipe) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
      const result = await axios.get(url);

      setInf(result.data.drinks[0]);
    };
    findRecipe();
  }, [idRecipe]);

  return (
    <ModalContext.Provider
      value={{
        inf,
        setIdRecipe,
        setInf
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
