import { context } from "../pages/home.js";

export class RecipesManager {
  constructor(recipes) {
    this.recipes = recipes;
    this.originRecipes = recipes;
  }

  displayRecipes(recipes = this.originRecipes) {
    console.log(this.originRecipes);
    const gridDOMElements = [];

    const recipesNumber = document.querySelector(".recipes_number");
    recipesNumber.innerHTML = `${recipes.length} recettes`;

    recipes.forEach((item) => {
      const element = item;
      const picture = `/assets/dishes/${element.image}`;

      const ingredients = [];
      for (const x in element.ingredients) {
        const ingre = element.ingredients[x].ingredient;
        const quant =
          element.ingredients[x].quantity === undefined
            ? " "
            : " " + element.ingredients[x].quantity;
        const uni =
          element.ingredients[x].unit === undefined
            ? " "
            : element.ingredients[x].unit;
        ingredients.push(
          `<li class="ingredients text">${ingre} <span class="quantity">${quant} ${uni}</span></li> `
        );
      }
      gridDOMElements.push(`
          <div class="recipe_card">
          <div class="recipe_duration_container">
              <p class="recipe_duration">${element.time}min</p>
          </div>
          <img src=${picture} alt=${element.name} class="recipe_photo">
          <div class="recipe_description">
              <h3 class="recipe_title">${element.name}</h3>
              <div class="recipe_text_container">
                  <p class="recipe_text_title title">RECETTE</p>
                  <p class="recipe_text text">${element.description}</p>
              </div>
              <div class="ingredients_container">
                  <p class="ingredients_title title">Ingrédients</p>
                  <ul class="ingredients_list">
                  ${ingredients.join("")}
                  </ul>
              </div>
          </div>
      </div>
      `);
    });
    return gridDOMElements.join("");
  }

  filterData() {
    const searchBar = document.querySelector(".search_bar");

    searchBar.addEventListener("input", () => {
      context.text = searchBar.value;
      const searchedString = context.text.toLowerCase().replace(/\s/g, "");

      this.recipes = this.originRecipes.filter(
        (el) =>
          el.name.toLowerCase().includes(searchedString) ||
          el.description.toLowerCase().includes(searchedString) ||
          el.ingredientsList.some((element) => {
            return element.toLowerCase().includes(searchedString);
          }) ||
          `${el.description + el.name + el.ingredientsList}`
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(searchedString) ||
          `${el.name + el.description + el.ingredientsList}`
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(searchedString)
      );

      if (this.recipes.length === 0) {
        const recipeGrid = document.querySelector(".recipe_section");
        recipeGrid.style.display = "none";

        const errorSection = document.querySelector(".error");
        errorSection.style.display = "flex";
        errorSection.innerHTML = `
        <h1 class="msg">Aucune recette ne contient "${context.text}"</h1>
      `;
      } else {
        const recipeGrid = document.querySelector(".recipe_section");
        recipeGrid.style.display = "grid";
        const errorSection = document.querySelector(".error");
        errorSection.style.display = "none";
      }
      const filterEvent = new CustomEvent("filterRecipes", {
        detail: this.recipes,
      });
      document.dispatchEvent(filterEvent);
      return this.displayRecipes(this.recipes);
    });
  }
}
