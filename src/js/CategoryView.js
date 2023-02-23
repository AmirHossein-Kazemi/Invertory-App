const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const categoryWrapper = document.getElementById("category-wrapper");
const toggleAddCategoryBtn = document.getElementById("toggle-add-category");
const cancelAddCategoryBtn = document.getElementById("cancel-category");

import Storage from "./Storage.js";

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", () =>
      this.toggleAddCategory()
    );
    cancelAddCategoryBtn.addEventListener("click", () =>
      this.cancelAddCategory()
    );
    const categories = [];
  }
  addNewCategory(e) {
    e.preventDefault(); //stop refreshing the page
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.savedCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    categoryDescription.value = "";
    categoryTitle.value = "";
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    let result = `
    <option class="bg-slate-500 text-slate-300" value="">select a category</option>
    `;
    this.categories.forEach((element) => {
      result += ` 
    <option class="bg-slate-500 text-slate-300" value="${element.id}">${element.title}</option>
    `;
    });
    const categoryDom = document.querySelector("#product-category");
    categoryDom.innerHTML = result;
    const editCategoryDom = document.querySelector("#edit-product-category");
    editCategoryDom.innerHTML = result;
  }
  toggleAddCategory() {
    categoryWrapper.classList.remove("hidden");
    toggleAddCategoryBtn.classList.add("hidden");
  }
  cancelAddCategory() {
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }
}

export default new CategoryView();
