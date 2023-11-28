import { context } from "../pages/home.js";

export class DropdownsManager {
  constructor(recipes) {
    this.recipes = recipes;
    this.tags = [];
    document.addEventListener("click", this.addTag.bind(this));
  }

  getLists(recipes = this.recipes) {
    this.ingredientsList = [];
    this.ustensilsList = [];
    this.appliancesList = [];
    for (const recipe of recipes) {
      for (const ingredient of recipe.ingredientsList) {
        if (this.ingredientsList.indexOf(ingredient) === -1) {
          this.ingredientsList.push(ingredient);
        }
      }
      if (this.appliancesList.indexOf(recipe.appliance) === -1) {
        this.appliancesList.push(recipe.appliance);
      }
      for (const ustensil of recipe.ustensils) {
        if (this.ustensilsList.indexOf(ustensil) === -1) {
          this.ustensilsList.push(ustensil);
        }
      }
    }
  }

  displayIngredientsList(ingr = this.ingredientsList) {
    const ingredientsArray = [];
    for (let i of ingr) {
      ingredientsArray.push(`<li class="list_dropdown ingredient">${i}</li>`);
    }
    return ingredientsArray.join("");
  }

  displayAppliancesList(app = this.appliancesList) {
    const appliancesArray = [];
    for (let i of app) {
      appliancesArray.push(`<li class="list_dropdown appliance">${i}</li>`);
    }
    return appliancesArray.join("");
  }

  displayUstensilsList(ust = this.ustensilsList) {
    const ustensilsArray = [];
    for (let i of ust) {
      ustensilsArray.push(`<li class="list_dropdown ustensil">${i}</li>`);
    }
    return ustensilsArray.join("");
  }

  displayDropdown() {
    const ingredientBtn = document.querySelector(".dropdown_ingredient");
    const applianceBtn = document.querySelector(".dropdown_appliance");
    const ustensilBtn = document.querySelector(".dropdown_ustensil");
    const ingredientMenu = document.querySelector(".ingredient_menu");
    const applianceMenu = document.querySelector(".appliance_menu");
    const ustensilMenu = document.querySelector(".ustensil_menu");

    ingredientBtn.addEventListener("click", () => {
      ingredientMenu.classList.toggle("hide_ingredient");
    });
    applianceBtn.addEventListener("click", () => {
      applianceMenu.classList.toggle("hide_appliance");
    });
    ustensilBtn.addEventListener("click", () => {
      ustensilMenu.classList.toggle("hide_ustensil");
    });
  }

  addTag(e) {
    if (e.target.classList.contains("list_dropdown")) {
      const tag = e.target.innerText;
      if (this.tags.includes(tag)) {
        return;
      }
      this.tags.push(tag);

      const tagItem = document.createElement("div");
      tagItem.classList.add("item");

      const deleteBtn = document.createElement("span");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => this.deleteTag(deleteBtn, tag));

      const tagText = document.createElement("span");
      tagText.textContent = tag;

      tagItem.appendChild(tagText);
      tagItem.appendChild(deleteBtn);
      document.querySelector(".tags_section").appendChild(tagItem);

      //ENVOI DU TAG DANS LE CONTEXT
      if (e.target.classList.contains("ingredient")) {
        context.ingredients.push(e.target.innerText);
      } else if (e.target.classList.contains("appliance")) {
        context.appliances.push(e.target.innerText);
      } else if (e.target.classList.contains("ustensil")) {
        context.ustensils.push(e.target.innerText);
      }
    }

    // this.filterData();
    // const filterEvent = new CustomEvent("filterRecipes", {
    //   detail: this.filterData(),
    // });
    // document.dispatchEvent(filterEvent);
  }

  deleteTag(ref, tag) {
    const parent = ref.parentNode.parentNode;
    parent.removeChild(ref.parentNode);
    const index = this.tags.indexOf(tag);
    this.tags.splice(index);

    //SUPPRIMER LE TAG DE MON CONTEXT
    this.deleteContext(context.ingredients, tag);
    this.deleteContext(context.appliances, tag);
    this.deleteContext(context.ustensils, tag);
  }

  deleteContext(category, tag) {
    const ingredientIndex = category.indexOf(tag);
    if (ingredientIndex !== -1) {
      category.splice(ingredientIndex, 1);
    }
  }

  filterIngredients() {
    const ingredientSearchBar = document.querySelector(".ingredient_input");
    ingredientSearchBar.addEventListener("input", () => {
      const searchedString = ingredientSearchBar.value
        .toLowerCase()
        .replace(/\s/g, "");
      const newIngredientList = this.ingredientsList.filter((el) =>
        el.toLowerCase().replace(/\s/g, "").includes(searchedString)
      );

      if (newIngredientList.length === 0) {
        const list = document.querySelector("#ingredients_dropdown");
        list.style.display = "none";

        const error = document.querySelector(".error_ingredient");
        error.style.display = "flex";
        error.innerHTML = `
        <h1 >Aucun resultat pour "${ingredientSearchBar.value}"</h1>
      `;
      } else {
        const list = document.querySelector("#ingredients_dropdown");
        list.style.display = "block";

        const error = document.querySelector(".error_ingredient");
        error.style.display = "none";
      }

      const filterIngredient = new CustomEvent("filterIngredient", {
        detail: this.displayIngredientsList(newIngredientList),
      });
      document.dispatchEvent(filterIngredient);
      return this.displayIngredientsList(newIngredientList);
    });
  }

  filterAppliances() {
    const applianceSearchBar = document.querySelector(".appliance_input");
    applianceSearchBar.addEventListener("input", () => {
      const searchedString = applianceSearchBar.value
        .toLowerCase()
        .replace(/\s/g, "");
      const newApplianceList = this.appliancesList.filter((el) =>
        el.toLowerCase().replace(/\s/g, "").includes(searchedString)
      );

      if (newApplianceList.length === 0) {
        const list = document.querySelector("#appliances_dropdown");
        list.style.display = "none";

        const error = document.querySelector(".error_appliance");
        error.style.display = "flex";
        error.innerHTML = `
        <h1 >Aucun resultat pour "${applianceSearchBar.value}"</h1>
      `;
      } else {
        const list = document.querySelector("#appliances_dropdown");
        list.style.display = "block";

        const error = document.querySelector(".error_appliance");
        error.style.display = "none";
      }

      const filterAppliance = new CustomEvent("filterAppliance", {
        detail: this.displayAppliancesList(newApplianceList),
      });
      document.dispatchEvent(filterAppliance);
      return this.displayAppliancesList(newApplianceList);
    });
  }

  filterUstensils() {
    const ustensilSearchBar = document.querySelector(".ustensil_input");
    ustensilSearchBar.addEventListener("input", () => {
      const searchedString = ustensilSearchBar.value
        .toLowerCase()
        .replace(/\s/g, "");
      const newUstensilList = this.ustensilsList.filter((el) =>
        el.toLowerCase().replace(/\s/g, "").includes(searchedString)
      );

      if (newUstensilList.length === 0) {
        const list = document.querySelector("#ustensils_dropdown");
        list.style.display = "none";

        const error = document.querySelector(".error_ustensil");
        error.style.display = "flex";
        error.innerHTML = `
        <h1 >Aucun resultat pour "${ustensilSearchBar.value}"</h1>
      `;
      } else {
        const list = document.querySelector("#ustensils_dropdown");
        list.style.display = "block";

        const error = document.querySelector(".error_ustensil");
        error.style.display = "none";
      }

      const filterUstensil = new CustomEvent("filterUstensil", {
        detail: this.displayUstensilsList(newUstensilList),
      });
      document.dispatchEvent(filterUstensil);
      return this.displayUstensilsList(newUstensilList);
    });
  }
}
