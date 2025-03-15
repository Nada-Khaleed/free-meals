import React, { useEffect, useState } from 'react';
import styles from './Meals.module.scss';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';
import { Link } from 'react-router-dom';


const Meals = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [meals, setMeals] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setCategories(data.meals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getMealsByCategory(selectedCategory);
  }, [selectedCategory]);

  const getMealsByCategory = async (selectedCategory) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        selectedCategory === 'All'
          ? 'https://themealdb.com/api/json/v1/1/search.php?s='
          : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      );
      setMeals(data.meals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFirstTwoWords = (str) => {
    return str.split(' ').slice(0, 2).join(' ');
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] p-10">
      <h1 className={`${styles.pacificoRegular} text-amber-600 text-4xl font-bold mb-5`}>Learn, Cook, Eat Your Food</h1>

      <div className="md:hidden relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-md"
        >
          {selectedCategory}
          <span className={`ml-2 transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
            &#x25BC; 
          </span>
        </button>
        {isDropdownOpen && (
          <ul className="absolute bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full mt-1">
            <li
              onClick={() => {
                setSelectedCategory("All");
                setIsDropdownOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === "All" ? "bg-black text-white" : "text-[#6b7280] hover:bg-gray-100"
              }`}
            >
              All
            </li>
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedCategory(category.strCategory);
                  setIsDropdownOpen(false);
                }}
                className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category.strCategory ? "bg-black text-white" : "text-[#6b7280] hover:bg-gray-100"
                }`}
              >
                {category.strCategory}
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className="hidden md:flex flex-wrap gap-3 border-b-1 border-gray-200">
        <li
          onClick={() => setSelectedCategory("All")}
          className={`cursor-pointer px-4 py-2 rounded-full border transition-all duration-300 ${
            selectedCategory === "All"
              ? "bg-black text-white"
              : "border-[#6b7280] hover:bg-white hover:border-gray-600 shadow-md hover:shadow-xl text-[#6b7280]"
          }`}
        >
          All
        </li>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => setSelectedCategory(category.strCategory)}
            className={`cursor-pointer px-4 py-2 rounded-full border transition-all duration-300 ${
              selectedCategory === category.strCategory
                ? "bg-black text-white"
                : "border-[#6b7280] hover:bg-white hover:border-gray-600 shadow-md hover:shadow-xl text-[#6b7280]"
            }`}
          >
            {category.strCategory}
          </li>
        ))}
      </ul>

      {loading ? (
        <BounceLoader className="mx-auto mt-10" />
      ) : (
        <div className="flex flex-wrap justify-center mt-10">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="w-full sm:w-[300px] md:w-[280px] text-center p-3 mt-10">
              <div className="group relative p-4 bg-white rounded-xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <img
                  src={meal.strMealThumb}
                  className="w-full rounded-full mx-auto -mt-13 transition-transform duration-700 group-hover:rotate-[360deg] group-hover:-translate-y-2"
                  alt={meal.strMeal}
                />
                <h2 className="text-lg font-bold text-center mt-4 flex items-center justify-center gap-2">
                  {getFirstTwoWords(meal.strMeal)}
                </h2>
                {meal.strArea && (
                  <h3 className="text-center text-[#059669] font-semibold">
                     <i className="fa-solid fa-earth-americas text-[#059669] pe-2"></i>
                    {meal.strArea}
                  </h3>
                )}
                <Link
                  to={`/mealdetails/${meal.idMeal}`}
                  className="bg-[#21ba75] text-white px-5 py-2 mt-4 rounded-full inline-block transition-all duration-500 hover:scale-110 hover:bg-[#059669]"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meals;