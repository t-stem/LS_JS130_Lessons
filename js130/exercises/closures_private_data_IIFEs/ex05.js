/*
Mini Inventory Management System
In this exercise, you'll build a simple inventory management system. 
The system is composed of an item creator, an items manager, and a reports manager. 
- The item creator makes sure that all necessary information are present and valid. 
- The item manager is responsible for creating items, updating information about items, deleting items, and querying information about the items. 
- Finally, the report manager generates reports for a specific item or ALL items. 
  * Reports for specific items are generated from report objects created from the report manager. 
  * The report manager is responsible for reports for all items.

Component Specifications
Here's all the required information for an item:
- SKU code: This is the unique identifier for a product. 
  * It consists of the first 3 letters of the item and the first 2 letters of the category. 
  * If the item name consists of two words and the first word consists of two letters only, 
    the next letter is taken from the next word.
- Item name: This is the name of the item. It must consist of a minimum of 5 characters. 
  Spaces are not counted as characters.
- Category: This is the category that the item belongs to. 
  It must consist of a minimum of 5 characters and be only one word.
- Quantity: This is the quantity in stock of an item. 
  * This must not be blank. 
  * You may assume that a valid number will be provided.

The following are the methods that the items manager can perform:
- create: This method creates a new item. Returns false if creation is not successful.
- update: This method accepts an SKU Code and an object as an argument and updates any of the information on an item. 
  You may assume valid values will be provided.
- delete: This method accepts an SKU Code and deletes the item from the list. 
  You may assume a valid SKU code is provided.
- items: This property contains a list of all the items.
- inStock: This method returns a list of all the items that have a quantity greater than 0.
- itemsInCategory: This method returns a list of all the items for a given category

The following are the methods on the reports managers:
- init: This method accepts the ItemManager object as an argument and assigns it to the items property.
- createReporter: This method accepts an SKU code as an argument and returns an object.
  * The returned object has one method, itemInfo. It logs to the console all the properties of an object as "key:value" pairs (one pair per line). There are no other properties or methods on the returned object (except for properties/methods inherited from Object.prototype).
- reportInStock: Logs to the console the item names of all the items that are in stock as a comma separated values.

Notes:

- There's no need to add the ability to validate the uniqueness of the SKU code. 
  Given the current description, it's possible that a duplicate will exist.
- Each required piece of information for an item corresponds to one property.
- If any of the require information provided is not valid, the item creator returns an object with a notValid property with a value of true.
- The created item objects should not have any methods/properties on them other than the required information above 
  and those inherited from Object.prototype.
- You may add methods to the item manager as you deem necessary.
*/

function genSKU(cleanName, category) {
  return cleanName.slice(0, 3) + category.slice(0, 2);
}

function createItem(name, category, quantity) {
  if (name === undefined || category === undefined || quantity === undefined) return false;

  let cleanName = name.trim().split(' ').join('');

  if (cleanName.length < 5) return false;

  if (category.includes(" ")) return false;

  if (category.length < 5) return false;

  return (function(name, category, quantity) {
    return {
      name: name,
      category: category,
      SKU: genSKU(cleanName, category),
      quantity: quantity
    }
  })(name, category, quantity) 
}

let item = createItem('sweater', 'clothing', 1)
console.log(item)

let itemManager = {
  create() {
    // STUB
  },

  update() {
    // STUB
  },

  delete() {
    // STUB
  },

  items() {
    // STUB
  },

  inStock() {
    // STUB
  },

  itemsInCategory() {
    // STUB
  }
}

let reportsManager = {
  init() {
    
  },

  createReporter() {

  },

  reportInStock() {

  }
}