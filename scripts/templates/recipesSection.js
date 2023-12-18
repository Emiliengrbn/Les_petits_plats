import { context } from "../pages/home.js";

export class RecipesManager {
  constructor(recipes) {
    this.recipes = recipes;
    this.originRecipes = recipes;
  }

  displayRecipes(recipes = this.originRecipes) {
    const gridDOMElements = [];
    const recipesNumber = document.querySelector(".recipes_number");
    recipesNumber.innerHTML = `${recipes.length} recettes`;

    // recipes.forEach((item) => {
    //const element = item;
    for (const recipe of recipes) {
      const picture = `/assets/dishes/${recipe.image}`;

      // Récupérer ingredients, quantité et unité
      const ingredients = [];
      for (const x in recipe.ingredients) {
        const ingre = recipe.ingredients[x].ingredient;
        const quant =
          recipe.ingredients[x].quantity === undefined
            ? " "
            : " " + recipe.ingredients[x].quantity;
        const uni =
          recipe.ingredients[x].unit === undefined
            ? " "
            : recipe.ingredients[x].unit;
        ingredients.push(
          `<li class="ingredients text">${ingre} <span class="quantity">${quant} ${uni}</span></li> `
        );
      }
      gridDOMElements.push(`
          <div class="recipe_card">
          <div class="recipe_duration_container">
              <p class="recipe_duration">${recipe.time}min</p>
          </div>
          <img src=${picture} alt=${recipe.name} class="recipe_photo">
          <div class="recipe_description">
              <h3 class="recipe_title">${recipe.name}</h3>
              <div class="recipe_text_container">
                  <p class="recipe_text_title title">RECETTE</p>
                  <p class="recipe_text text">${recipe.description}</p>
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
    }
    //});
    return gridDOMElements.join("");
  }

  searchInput() {
    const searchBar = document.querySelector(".search_bar");

    searchBar.addEventListener("input", () => {
      if (searchBar.value.length > 2) {
        context.text = searchBar.value.toLowerCase().replace(/\s/g, "");
      } else {
        context.text = "";
      }

      // Message d'erreur
      if (this.filterData(context.text).length === 0) {
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
      this.dispatchSearchEvent();
    });
  }

  filterData(query) {
    const filteredRecipes = [];

    for (let i = 0; i < this.recipes.length; i++) {
      if (
        this.recipes[i].name.toLowerCase().includes(query.toLowerCase()) ||
        this.recipes[i].description
          .toLowerCase()
          .includes(
            query.toLowerCase() ||
              `${this.recipes[i].description + this.recipes[i].name}`
                .toLowerCase()
                .replace(/\s/g, "")
                .includes(query)
          )
      ) {
        // Ajouter la recette au tableau filtré
        filteredRecipes.push(this.recipes[i]);
      } else {
        // Sinon, vérifier les ingrédients
        for (const ingredient of this.recipes[i].ingredientsList) {
          if (
            ingredient.toLowerCase().includes(query.toLowerCase()) ||
            `${this.recipes[i].ingredientsList}`
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(query)
          ) {
            // Ajouter la recette au tableau filtré
            filteredRecipes.push(this.recipes[i]);
            break; // Sortir de la boucle dès qu'un ingrédient est trouvé
          }
        }
      }
    }
    return filteredRecipes;
  }

  dispatchSearchEvent() {
    const event = new CustomEvent("SearchRecipes");
    document.dispatchEvent(event);
  }
}
