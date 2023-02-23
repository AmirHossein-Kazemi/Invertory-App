import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("add-new-product");
const productTitle = document.getElementById("product-title");
const productQuantity = document.getElementById("product-quantity");
const productCategory = document.getElementById("product-category");
const searchInput = document.getElementById("search-input");
const selectedSort = document.getElementById("sort-products");
const editProductTitle = document.getElementById("edited-product-title");
const editProductQuantity = document.getElementById("edited-product-quantity");
const editProductCategory = document.getElementById("edit-product-category");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (event) =>
      this.addNewProduct(event)
    );
    searchInput.addEventListener("input", (c) => this.searchProducts(c));
    selectedSort.addEventListener("change", (k) => this.sortProducts(k));
    this.products = [];
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  addNewProduct(event) {
    event.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !quantity || !category) return;
    Storage.savedProduct({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
  createProductsList(products) {
    let result = "";
    const productsDom = document.getElementById("products-list");
    products.forEach((e) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id === parseInt(e.category)
      );
      result += `
      <div class="flex items-center justify-between mb-8 product-list-item">
      <span class="text-slate-400">${e.title}</span>
      <div class="flex items-center gap-x-3">
        <span class="text-slate-400">${new Date().toLocaleDateString(
          "fa-IR"
        )}</span>
        <span
          class="block px-3 py-.5 border border-slate-400 rounded-2xl text-slate-400 text-slate-sm"
          >${selectedCategory.title}</span
        >
        <span
          class="flex items-center justify-center w-7 h-7 rounded-full bg-state-500 text-slate-300 border-2 border-state-200"
          >${e.quantity}</span
        >
        <button
        class="edit-product border px-2 py-.5 rounded-2xl border-slate-400 text-slate-400"
        data-id=${e.id}
      >
        edit
      </button>
        <button
          class="delete-product border px-2 py-.5 rounded-2xl border-red-400 text-red-400"
          data-id=${e.id}
        >
          delete
        </button>
      </div>
    </div>
          `;
      productsDom.innerHTML = result;
    });
    const deleteBtns = [...document.querySelectorAll(".delete-product")];
    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProduct(e));
    });
    const editBtns = [...document.querySelectorAll(".edit-product")];
    editBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.selectIdEditProduct(e));
    });
  }
  searchProducts(c) {
    const value = c.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) => {
      return p.title.toLowerCase().includes(value);
    });
    this.createProductsList(filteredProducts);
  }
  sortProducts(k) {
    const value = k.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }
  deleteProduct(e) {
    e.preventDefault();
    const selectedId = e.target.dataset.id;
    Storage.deleteProduct(selectedId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
  selectIdEditProduct(event) {
    event.preventDefault();
    const selectedId = event.target.dataset.id;
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.find(
      (p) => p.id === parseInt(selectedId)
    );
  //  selected product fully get ^
    const editProductBtn = document.getElementById("confirm-edit-product");
    editProductBtn.addEventListener("click", () =>
      this.finalEdit(filteredProducts)
    );
  }
  finalEdit(filteredProducts) {
    const title = editProductTitle.value;
    const quantity = editProductQuantity.value;
    const category = editProductCategory.value;
    if (!title || !quantity || !category) return;
    filteredProducts.title = title;
    filteredProducts.quantity = quantity;
    filteredProducts.category = category;
    filteredProducts.createdAt = new Date().toISOString();
    Storage.editProduct(filteredProducts)
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    // product to edit get and succsesfully send to storage
  }
  createEditProductList() {
    const editBtns = document.querySelectorAll(".edit-product");

    // editBtns.forEach((e) => console.log(e.dataset.id));
    editBtns.forEach((e) => this.addEditProductList(e));
  }
  addEditProductList(e) {
    const productForm = document.querySelector(".product-form");
    const editProductForm = document.querySelector(".edit-product-form");
    e.addEventListener("click", () => {
      productForm.classList.add("hidden");
      editProductForm.classList.remove("hidden");
    });
  }
}

export default new ProductView();
