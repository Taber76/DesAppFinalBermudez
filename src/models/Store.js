class Store {
  constructor(name, categorie, description, photoUri, id) {
    this.name = name;
    this.categorie = categorie;
    this.description = description;
    this.image = photoUri;
    this.price = 0;
    this.id = id;
  }
}

export default Store;
