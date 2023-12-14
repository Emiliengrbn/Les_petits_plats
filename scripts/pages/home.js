import { recipes } from "/data/recipes.js";
import { RecipesManager } from "../templates/recipesSection.js";
import { DropdownsManager } from "../utils/dropdowns.js";

export const context = {
  text: "",
  ingredients: [],
  ustensils: [],
  appliances: [],
};

function displayData(recipe) {
  const gridContainer = document.getElementById("recipes");

  const recipesManager = new RecipesManager(recipe);
  const dropdownsManager = new DropdownsManager(recipe);

  const recipesGrid = recipesManager.displayRecipes();
  gridContainer.innerHTML = recipesGrid;

  function displayLists(result = recipe) {
    dropdownsManager.getLists(result);
    ingredientsContainer.innerHTML = dropdownsManager.displayIngredientsList();
    appliancesContainer.innerHTML = dropdownsManager.displayAppliancesList();
    ustensilsContainer.innerHTML = dropdownsManager.displayUstensilsList();
  }
  const ingredientsContainer = document.getElementById("ingredients_dropdown");
  const appliancesContainer = document.getElementById("appliances_dropdown");
  const ustensilsContainer = document.getElementById("ustensils_dropdown");

  displayLists();

  recipesManager.searchInput();

  dropdownsManager.displayDropdown();
  dropdownsManager.filterIngredients();
  dropdownsManager.filterAppliances();
  dropdownsManager.filterUstensils();

  document.addEventListener("SearchRecipes", () => {
    const searchBar = document.querySelector(".search_bar");
    // if (
    //   searchBar.value.length > 2 ||
    //   context.ingredients.length > 0 ||
    //   context.ustensils.length > 0 ||
    //   context.appliances.length > 0
    // ) {
    // if (
    //   searchBar.value.length < 3 &&
    //   context.ingredients.length === 0 &&
    //   context.ustensils.length === 0 &&
    //   context.appliances.length === 0
    // ) {
    //   gridContainer.innerHTML = recipesManager.displayRecipes();
    // } else {
    const resultsFromTextSearch = recipesManager.filterData(context.text);
    gridContainer.innerHTML = recipesManager.displayRecipes(
      resultsFromTextSearch
    );

    displayLists(resultsFromTextSearch);

    const resultFromIngredientSearch = dropdownsManager.filteredByTags(
      resultsFromTextSearch
    );
    gridContainer.innerHTML = recipesManager.displayRecipes(
      resultFromIngredientSearch
    );
    displayLists(resultFromIngredientSearch);
    // }
    // } else
    // if (
    //   searchBar.value.length < 3 &&
    //   context.ingredients.length === 0 &&
    //   context.ustensils.length === 0 &&
    //   context.appliances.length === 0
    // ) {
    //   gridContainer.innerHTML = recipesManager.displayRecipes();
    // }
  });

  document.addEventListener("filterIngredient", (e) => {
    if (e.detail) {
      ingredientsContainer.innerHTML = e.detail;
    }
  });
  document.addEventListener("filterAppliance", (e) => {
    if (e.detail) {
      appliancesContainer.innerHTML = e.detail;
    }
  });
  document.addEventListener("filterUstensil", (e) => {
    if (e.detail) {
      ustensilsContainer.innerHTML = e.detail;
    }
  });
}

function init() {
  // Récupère les recettes
  const recipe = recipes.map((recipe) => {
    return {
      ...recipe,
      ingredientsList: recipe.ingredients.map((ingredient) =>
        ingredient.ingredient.toLowerCase()
      ),
    };
  });
  displayData(recipe);
}

init();
