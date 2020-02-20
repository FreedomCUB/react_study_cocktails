import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import PropTypes from 'prop-types';

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";


const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width:450,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Recipe = ({ recipe }) => {
 
  const [open, setOpen] = useState(false);

  const cssClass = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // values of the context
  const { inf, setIdRecipe, setInf } = useContext(ModalContext);

  const { strDrink, strDrinkThumb, idDrink } = recipe;

  // ingredients and measures

  const showIng = inf => {
    let ingredients = [];

    for (let i = 1; i < 16; i++) {
      if (inf[`strIngredient${i}`])
        ingredients.push(
          <li>
            {inf[`strIngredient${i}`]} {inf[`strMeasure${i}`]}
          </li>
        );
    }
    return ingredients;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{strDrink}</h2>
        <img className="card-img-top" src={strDrinkThumb} alt={strDrink} />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              setIdRecipe(idDrink);
              handleOpen();
            }}
          >
            See Recipe
          </button>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={cssClass.modal}
            open={open}
            onClose={() => {
              handleClose();
              setInf({});
              setIdRecipe(null);
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 700
            }}
          >
            <Fade in={open}>
              <div className={cssClass.paper}>
                <h2>{inf.strDrink}</h2>
                <h3 className="mt-4">Instructions</h3>
                <p>{inf.strInstructions}</p>
                <img
                  className="img-fluid my-4"
                  src={inf.strDrinkThumb}
                  alt={inf.strDrink}
                />
                <h3>Igredients & Measures</h3>
                <ul>{showIng(inf)}</ul>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
};
Recipe.propType = {
  recipe : PropTypes.object.isRequired
}
export default Recipe;
