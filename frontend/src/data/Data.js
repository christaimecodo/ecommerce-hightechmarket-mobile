// ============================================================
// Data.js — Liste des produits du catalogue (données locales)
// ============================================================
// Ce fichier contient les produits affichés dans le catalogue.
// Il n'y a pas de base de données ici : les produits sont codés
// directement dans l'application (on appelle cela des "données statiques").
//
// Chaque produit est un objet avec 4 propriétés :
//   - id    : identifiant unique (texte, ex: '1', '2'...)
//   - name  : nom du produit
//   - prix  : prix avec le symbole € (ex: '449.99€')
//   - image : URL internet de l'image du produit
//
// Pour modifier les produits, il suffit de modifier ce tableau.
// ============================================================

// Liste des produits affichés dans le catalogue local (sans base de données)
export const produits = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy A55',
    prix: '449.99€',
    image: 'https://picsum.photos/seed/phone1/200/200',
  },
  {
    id: '2',
    name: 'Laptop Lenovo IdeaPad 15 pouces',
    prix: '699.99€',
    image: 'https://picsum.photos/seed/laptop1/200/200',
  },
  {
    id: '3',
    name: 'Ecouteurs Sony WH-1000XM5',
    prix: '279.99€',
    image: 'https://picsum.photos/seed/headphones1/200/200',
  },
  {
    id: '4',
    name: 'Tablette iPad 10eme generation',
    prix: '529.99€',
    image: 'https://picsum.photos/seed/tablet1/200/200',
  },
  {
    id: '5',
    name: 'Montre Apple Watch SE',
    prix: '299.99€',
    image: 'https://picsum.photos/seed/watch1/200/200',
  },
  {
    id: '6',
    name: 'Clavier Logitech MX Keys',
    prix: '119.99€',
    image: 'https://picsum.photos/seed/keyboard1/200/200',
  },
  {
    id: '7',
    name: 'Souris Logitech MX Master 3',
    prix: '99.99€',
    image: 'https://picsum.photos/seed/mouse1/200/200',
  },
  {
    id: '8',
    name: 'SSD externe Samsung T7 1To',
    prix: '89.99€',
    image: 'https://picsum.photos/seed/ssd1/200/200',
  },
];
