import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

// cretae context
export const CategoryContext = createContext();

//provider 

const CategoryProvider = (props) => {

    // state context
    const [categories, setCategories] = useState([]);


    // consulting API 
    useEffect(() => {
        
        const getCategory = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'  
            const result = await  axios.get(url);      
            setCategories(result.data.drinks);
        };
        getCategory();
    }, [])

    return (
        <CategoryContext.Provider 
           value={{
               categories
           }}
        >
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;