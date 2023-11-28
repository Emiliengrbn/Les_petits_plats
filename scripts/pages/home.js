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

  // recipesManager.searchEvent();
  recipesManager.filterData();

  dropdownsManager.getLists();

  // DROPDOWN INGREDIENT
  const ingredientsContainer = document.getElementById("ingredients_dropdown");
  const ingredientsList = dropdownsManager.displayIngredientsList();
  ingredientsContainer.innerHTML = ingredientsList;

  // DROPDOWN APPAREIL
  const appliancesContainer = document.getElementById("appliances_dropdown");
  const appliancesList = dropdownsManager.displayAppliancesList();
  appliancesContainer.innerHTML = appliancesList;

  // DROPDOWN USTENSILE
  const ustensilsContainer = document.getElementById("ustensils_dropdown");
  const ustensilsList = dropdownsManager.displayUstensilsList();
  ustensilsContainer.innerHTML = ustensilsList;

  dropdownsManager.displayDropdown();
  dropdownsManager.filterIngredients();
  dropdownsManager.filterAppliances();
  dropdownsManager.filterUstensils();

  document.addEventListener("filterRecipes", (e) => {
    if (e.detail) {
      gridContainer.innerHTML = recipesManager.displayRecipes(e.detail);
      dropdownsManager.getLists(e.detail);
      ingredientsContainer.innerHTML =
        dropdownsManager.displayIngredientsList();
      appliancesContainer.innerHTML = dropdownsManager.displayAppliancesList();
      ustensilsContainer.innerHTML = dropdownsManager.displayUstensilsList();

      // const aze = [];
      // for (const recipe of e.detail) {
      //   for (const wxc of recipe.ingredientsList) {
      //     if (aze.indexOf(wxc) === -1) {
      //       aze.push(wxc);
      //     }
      //     const ingredientsList = dropdownsManager.displayIngredientsList(aze);
      //     ingredientsContainer.innerHTML = ingredientsList;
      //   }
      // }

      // gridContainer.innerHTML = e.detail;
    }
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
