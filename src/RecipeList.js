import React, { useContext } from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './context/index';
const RecipeList = (props) => {
    const context = useContext(RecipeContext)
    // const { showHomeButton, recipes, handleReturnHome } = context
    const { recipes, search, handleSearchChange, fetchRecipes, handleSubmit } = context
    const onChangeInput = (e) => {
        handleSearchChange(e)
        if(e.target.value === '') {
            fetchRecipes()
        }
    }
    const submitForm = (e) => {
        e.preventDefault()
        if(search.length > 0) {
            handleSubmit()
        }
    }
    return (
        <div>
            <br />
            <form onSubmit={submitForm}>
                <label>Search: </label>
                <input type="text" value={search} onChange={onChangeInput} />
                <button type="submit">Search</button>
            </form>
            <br />
            {recipes.map(recipe => {
                return (
                    <Recipe key={recipe.recipe_id} recipe={recipe} />
                )
            })}
        </div>
    );
}

export default RecipeList;