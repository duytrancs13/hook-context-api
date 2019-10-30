import React, {useState} from 'react';
import axios from 'axios';

const Recipe = (props) => {
    const { image_url, title, recipe_id } = props.recipe
    const [showInfo, setShowInfo] = useState(false)
    const [recipeDetails, setRecipeDetails] = useState([])
    const { ingredients, social_rank } = recipeDetails
    const handleShowInfo = async () => {
        if(!showInfo && recipeDetails.length <= 0) {
            try {
                const response = await axios.get(`https://www.food2fork.com/api/get?key=7cdab426afc366070dab735500555521&rId=${recipe_id}`)
                const { data: {recipe} } = response 
                console.log(recipe);
                setRecipeDetails(recipe)
            } catch (error) {
                console.log('Error at Recipe: ', error);
            }
        }
        setShowInfo(!showInfo)
    }
    return (
        <div>
            <div>
                <img src={image_url} style={{height: '14rem'}} />
                <h6>{title}</h6>
            </div>
            <div>
                <button type="button" onClick={handleShowInfo}>More Info</button>
                {showInfo ? <button key={recipe_id} type="button">{social_rank}</button> : null}
                {showInfo ? ingredients.length>0 && ingredients.map((i, index) => {
                        return <ul key={index}>
                            <li>{i}</li>
                        </ul>
                    }) : ''}
                
            </div>
            <br />
        </div>
    );
}

export default Recipe;