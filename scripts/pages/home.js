import { recipes } from "/data/recipes.js";
import { RecipesManager } from "../templates/recipesSection.js";

function displayData(recipe) {
  const gridContainer = document.getElementById("recipes");

  const recipesManager = new RecipesManager(recipe);

  const recipesGrid = recipesManager.displayRecipes();
  gridContainer.innerHTML = recipesGrid;

  recipesManager.getLists();

  const ingredientsContainer = document.getElementById("ingredients_dropdown");
  const ingredientsList = recipesManager.displayIngredientsList();
  ingredientsContainer.innerHTML = ingredientsList;

  const appliancesContainer = document.getElementById("appliances_dropdown");
  const appliancesList = recipesManager.displayAppliancesList();
  appliancesContainer.innerHTML = appliancesList;

  const ustensilsContainer = document.getElementById("ustensils_dropdown");
  const ustensilsList = recipesManager.displayUstensilsList();
  ustensilsContainer.innerHTML = ustensilsList;
}

function init() {
  // Récupère les recettes
  const recipe = recipes;
  displayData(recipe);
}

init();
