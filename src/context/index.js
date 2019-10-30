import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeContext = React.createContext()

const apiKey = `7cdab426afc366070dab735500555521`

const RecipeProvider = (props) => {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const fetchRecipes = async () =>{
        try {
            setLoading(true)
            const recipeData = await axios.get(`https://api.myjson.com/bins/t7szj`)
            const { data: {recipes} } = recipeData;
            setRecipes(recipes)
            setLoading(false)
        } catch (error) {
            console.log('FetchRecipes error at App: ', error);
        }
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            let url = `https://www.food2fork.com/api/search?key=${apiKey}`
            const searchUrl = `${url}&q=${search}`
            const searchRecipeData = await axios.get(searchUrl)
            console.log(searchRecipeData);
            setLoading(false)
        } catch (error) {
            console.log('HandleSubmit error at App: ', error);
        }
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    return (
        <RecipeContext.Provider value={{
            recipes,
            loading,
            search,
            fetchRecipes,
            handleSearchChange,
            handleSubmit
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}

const RecipeConsumer = RecipeContext.Consumer
export { RecipeContext, RecipeProvider, RecipeConsumer }