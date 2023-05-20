

export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1; //decrease sort
    });
    return sortedCategories;
  }
  static savedCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    // check category saved or exist
    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
    if (existedItem) {
      // edit existed item
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      // create new item
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    // default newest
    return savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } //decrease sort
      else {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      } //increase sort
    });
  }
  static savedProduct(productToSave) {
    const savedProducts = Storage.getAllProducts();
    // check category saved or exist
    const existedItem = savedProducts.find((c) => c.id === productToSave.id);
    if (existedItem) {
      // edit existed item
      existedItem.title = productToSave.title;
      existedItem.category = productToSave.category;
      existedItem.quantity = productToSave.quantity;
    } else {
      // create new item
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(id));
    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
  static editProduct(product) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(product.id));
    filteredProducts.push(product)
    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
}

