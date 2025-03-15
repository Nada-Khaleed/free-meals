import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import LayOut from './components/LayOut/LayOut'
import Meals from './components/Meals/Meals'
import Ingredients from './components/Ingredients/Ingredients'
import Area from './components/Area/Area'
import MealDetails from './components/MealDetails/MealDetails'
import  NotFound from './components/NotFound/NotFound'
import '@fortawesome/fontawesome-free/css/all.min.css'


function App() {
  const routes = createBrowserRouter([
    {path:'' , element:<LayOut/> , children:[
      {
        index:true , element:<Meals/>},
        {path:"ingredients", element:<Ingredients/>},
        {path:"area", element:<Area/>},
        {path:"mealDetails/:id", element:<MealDetails/>},
        {path:"*", element:<NotFound/>}
    ]
  }
])
  return (
    <>
      <RouterProvider router={routes}>

      </RouterProvider>
    </>
  )
}

export default App
