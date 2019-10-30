import React, { useContext } from 'react';
import './App.css';
import RecipeList from './RecipeList';
import { RecipeContext } from './context/index'

function App() {
  const context = useContext(RecipeContext)
  const { loading } = context
  return (
    <div className="App">
          {loading ? <h1>...Loading</h1>: <RecipeList />}
    </div>
  );
}


export default App;
