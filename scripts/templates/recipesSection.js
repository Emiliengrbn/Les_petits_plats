export class RecipesManager {
  constructor(recipes) {
    this.recipes = recipes;
  }

  displayRecipes() {
    const gridDOMElements = [];

    this.recipes.forEach((item) => {
      const element = item;
      const picture = `/assets/dishes/${element.image}`;

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
                  <li></li>
                  </ul>
              </div>
          </div>
      </div>
      `);
    });
    return gridDOMElements.join("");
  }

  getLists() {
    this.ingredientsList = [];
    for (const recipe of this.recipes) {
      for (const ingredient of recipe.ingredients) {
        if (this.ingredientsList.indexOf(ingredient.ingredient) === -1) {
          this.ingredientsList.push(ingredient.ingredient);
        }
      }
    }

    this.appliancesList = [];
    for (const recipe of this.recipes) {
      if (this.appliancesList.indexOf(recipe.appliance) === -1) {
        this.appliancesList.push(recipe.appliance);
      }
    }

    this.ustensilsList = [];
    for (const recipe of this.recipes) {
      for (const ustensil of recipe.ustensils) {
        if (this.ustensilsList.indexOf(ustensil) === -1) {
          this.ustensilsList.push(ustensil);
        }
      }
    }
  }

  displayIngredientsList() {
    const ingredientsArray = [];
    for (let i of this.ingredientsList) {
      ingredientsArray.push(`<li class="list_dropdown">${i}</li>`);
    }
    return ingredientsArray.join("");
  }

  displayAppliancesList() {
    const appliancesArray = [];
    for (let i of this.appliancesList) {
      appliancesArray.push(`<li class="list_dropdown">${i}</li>`);
    }
    return appliancesArray.join("");
  }

  displayUstensilsList() {
    const ustensilsArray = [];
    for (let i of this.ustensilsList) {
      ustensilsArray.push(`<li class="list_dropdown">${i}</li>`);
    }
    return ustensilsArray.join("");
  }
}
