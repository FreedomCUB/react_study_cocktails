import React, { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { RecipesContext } from "../context/RecipesContext";

const Form = () => {
  const [search, setSearch] = useState({
    ingredient: "",
    category: ""
  });
  const { categories } = useContext(CategoryContext);
  const { setFind, setConsult} = useContext(RecipesContext);

  // read form
  const dataForm = e => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form
      className="col-12"
      onSubmit={e => {
        e.preventDefault();
        setFind(search);
        setConsult(true);
      }}
    >
      <fieldset className="text-center">
        <legend>Search cocktails by Category, Ingredient or both of them</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4 mt-4">

          <input
            name="ingredient"
            className="form-control"
            type="text"
            placeholder="Search by Ingredient"
            onChange={dataForm}
          />
        </div>
        <div className="col-md-4 mt-4">
          <select className="form-control" name="category" onChange={dataForm}>
            <option value="">--Select Category--</option>
            {categories.map(category => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mt-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Search Cocktails"
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
