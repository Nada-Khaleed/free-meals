import React, { useEffect, useState } from 'react';
import styles from './MealDetails.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MealDetails() {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState([]);

  const getMealDetails = async (id) => {
    try {
      const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setMealDetails(data.meals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMealDetails(id);
  }, [id]);

  return (
    <div className={styles.container}>
      {mealDetails.map((meal) => (
        <div key={meal.idMeal} className={styles.mealContainer}>
          <h1 className={`${styles.title}`}>{meal.strMeal}</h1>
          <div className={styles.content}>

            <div className={styles.column}>
              <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.image} />
              <div className={styles.buttons}>
                {meal.strYoutube && (
                  <Link to={meal.strYoutube} className={`${styles.button} bg-[#dc2626]`}>
                    <i className="fa-brands fa-youtube pe-1"></i>YouTube
                  </Link>
                )}
                {meal.strSource && (
                  <Link to={meal.strSource} className={`${styles.button} bg-[#21ba75]`}>
                    <i className="fa-solid fa-globe pe-1"></i>Source
                  </Link>
                )}
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.instructions}>
                <p>{meal.strInstructions}</p>
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.ingredientsCard}>
                <h3 className={styles.ingredientsTitle}>Ingredients</h3>
                {Array.from({ length: 20 }, (_, index) => {
                  const ingredient = meal[`strIngredient${index + 1}`];
                  const measure = meal[`strMeasure${index + 1}`];
                  if (ingredient) {
                    return (
                      <div key={index} className={styles.ingredientItem}>
                        <span>{ingredient}:</span>
                        <span>{measure}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
