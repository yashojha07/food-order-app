// import React,{ useState , useCallback , useEffect} from "react";
import Card from "../UI/Card/Card";
import classes from './AvailableMeals.module.css';
import MealItem from "./MealItem/MealItem";

const meals = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 400,
  },
  {
    id: 'm2',
    name: 'Chicken tikka masala',
    description: 'A Popular Indian Cuisine!',
    price: 220,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'Famous American Burger',
    price: 40,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];



const AvailableMeals = () =>{

    const mealsList = meals.map( (meal) => 
            < MealItem id={meal.id} key={meal.id} name={meal.name} price={meal.price} description={meal.description} />
         );

    return(
        <section className={classes.meals}>
            <Card>
        <ul>
            {mealsList}
        </ul>
        </Card>
        </section>
    );
};

export default AvailableMeals;