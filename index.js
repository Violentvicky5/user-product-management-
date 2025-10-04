let products = [
  {
    id: 1,
    name: "acer-laptop",
    price: 25000,
    category: "electronics",
    sub_category: "laptop",
    rating: 5,
    date: "2025-10-10",
  },
  {
    id: 2,
    name: "dell-laptop",
    price: 35000,
    category: "electronics",
    sub_category: "laptop",
    rating: 3,
    date: "2025-10-11",
  },
  {
    id: 3,
    name: "smart-tv",
    price: 55000,
    category: "electronics",
    sub_category: "television",
    rating: 4,
    date: "2024-10-12",
  },
  {
    id: 4,
    name: "smart-phone",
    price: 15000,
    category: "electronics",
    sub_category: "mobile",
    rating: 2,
    date: "2024-10-13",
  },
  {
    id: 5,
    name: "t-shirt",
    price: 500,
    category: "clothing",
    sub_category: "shirts",
    rating: 3,
    date: "2025-10-14",
  },
  {
    id: 6,
    name: "jeans-pant",
    price: 1200,
    category: "clothing",
    sub_category: "pants",
    rating: 5,
    date: "2025-10-15",
  },
  {
    id: 7,
    name: "ps5",
    price: 78500,
    category: "entertainment",
    sub_category: "gaming",
    rating: 5,
    date: "2025-10-16",
  },
  {
    id: 8,
    name: "ps4",
    price: 49999,
    category: "entertainment",
    sub_category: "gaming",
    rating: 5,
    date: "2025-10-17",
  },
  {
    id: 9,
    name: "pressure_cooker",
    price: 950,
    category: "kichen-utensils",
    sub_category: "utensils",
    rating: 4,
    date: "2025-10-18",
  },
  {
    id: 10,
    name: "bowl",
    price: 450,
    category: "kichen-utensils",
    sub_category: "utensils",
    rating: 3,
    date: "2025-10-19",
  },
  {
    id: 11,
    name: "tawa-pan",
    price: 450,
    category: "kichen-utensils",
    sub_category: "utensils",
    rating: 3,
    date: "2025-10-19",
  },
];

function search() {
  let inputSearch = document
    .getElementById("search")
    .value.toLowerCase()
    .trim();

  if (!inputSearch) {
    alert("please enter product details");
    return;
  }

  let result = products.filter(
    (product) =>
      product.name.toLowerCase().includes(inputSearch) ||
      product.category.toLowerCase().includes(inputSearch) ||
      product.sub_category.toLowerCase().includes(inputSearch) ||
      product.date.includes(inputSearch)
  );
  currentProducts = result;
  document.getElementById("dynamicTable").innerHTML = "";
  if (result.length > 0) {
    table(result);
    let showResult = result.map(
      (product) =>
        `id: ${product.id}, 
name: ${product.name},
price: ${product.price},
category: ${product.category},
sub_category: ${product.sub_category},
rating: ${product.rating}
date: ${product.date}`
    );
    document.getElementById("sample").value = showResult.join("\n\n");
  } else {
    document.getElementById("sample").value = "no products found";
    let tbl = document.getElementById("dynamicTable");
    tbl.innerHTML =
      "<tr><td colspan='7' style='text-align:center'>No products found</td></tr>";
  }
}

/* id: 6,
    name: "jeans-pant",
    price: 1200,
    category: "clothing",
    sub_category: "pants",
    rating: 5,
    date: "2025-10-15", */

function addProduct() {
  let name = document.getElementById("name").value.trim();
  let price = document.getElementById("price").value.trim();
  let category = document.getElementById("category").value.trim();
  let sub_category = document.getElementById("sub_category").value.trim();
  let rating = document.getElementById("rating").value.trim();
  let date = document.getElementById("date").value.trim();

  if (!name || !price || !category || !sub_category || !rating || !date) {
    document.getElementById("sample").value = "please fill all fields";
    return;
  }
  let newProduct = {
    id: products.length + 1,
    name: name,
    price: parseFloat(price),
    category: category,
    sub_category: sub_category,
    rating: parseInt(rating),
    date: date,
  };
  products.push(newProduct);
  alert(`product added successfully- product name: ${newProduct.name}`);
  let abc = JSON.stringify(newProduct);
  document.getElementById("sample").value = `${abc} added successfully`;
  table(products);
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("category").value = "";
  document.getElementById("sub_category").value = "";
  document.getElementById("rating").value = "";
  document.getElementById("date").value = "";

  console.log(products);
}

//removing product

//use index value of products to remove item from array
let removeProduct = null;
function deleteProduct() {
  let id = document.getElementById("remove_Id").value.trim();

  if (!id) {
    document.getElementById("sample").value = "please eneter valid product id";
    return;
  }

  removeProduct = products.find(
    (product) => parseInt(product.id) === parseInt(id)
  );

  if (!removeProduct) {
    document.getElementById("sample").value = "product not availabble";
    document.getElementById("removeButton").innerHTML = "";
    document.getElementById("remove_Id").value = "";
    return;
  }

  document.getElementById("sample").value = JSON.stringify(
    removeProduct,
    null,
    2
  );

  let dynamicRemoveButton = document.getElementById("removeButton");
  dynamicRemoveButton.innerText = "";
  let dynamicRemoveBtn = document.createElement("button");
  dynamicRemoveBtn.innerText = "remove";
  dynamicRemoveBtn.id = "dynamicRemoveBtn";
  dynamicRemoveBtn.onclick = delProduct;
  dynamicRemoveButton.appendChild(dynamicRemoveBtn);
}

function delProduct() {
  if (!removeProduct) return;
  let index = products.findIndex((product) => product.id === removeProduct.id);
  alert(`product removed successfull`);
  if (index !== -1) {
    products.splice(index, 1);
    document.getElementById("sample").value = "product removed successfully";
    table(products);
    document.getElementById("removeButton").value = "";
    removeProduct = null;
    document.getElementById("removeButton").innerHTML = "";
    document.getElementById("remove_Id").value = "";
    console.log(products);
  } else {
    document.getElementById("sample").value = "product not found";
  }
}

/* id: 6,
    name: "jeans-pant",
    price: 1200,
    category: "clothing",
    sub_category: "pants",
    rating: 5,
    date: "2025-10-15", */

let updatingProduct = null;

function updateProduct() {
  let productInput = document.getElementById("update_Product").value;

  updatingProduct = products.find(
    (product) => parseInt(product.id) === parseInt(productInput)
  );

  if (!updatingProduct) {
    document.getElementById("sample").value = "product not found";
    document.getElementById("update_Product").value = "";
    return;
  }

  document.getElementById("sample").value = JSON.stringify(
    updatingProduct,
    null,
    2
  );

  let dynamicButton = document.getElementById("updateButton");
  dynamicButton.innerText = "";

  let dynamicBtn = document.createElement("button");
  dynamicBtn.id = "dynamicBtn";
  dynamicBtn.innerText = "update";
  dynamicBtn.onclick = savechanges;
  dynamicButton.appendChild(dynamicBtn);
}

function savechanges() {
  if (!updatingProduct) {
    document.getElementById("sample").value = "no product selected for update";
    return;
  }
  let updatedData = null;
  try {
    updatedData = JSON.parse(document.getElementById("sample").value);
  } catch (error) {
    document.getElementById("sample").value = "invalid data format";
    return;
  }
  updatingProduct.name = updatedData.name;
  updatingProduct.price = updatedData.price;
  updatingProduct.category = updatedData.category;
  updatingProduct.sub_category = updatedData.sub_category;
  updatingProduct.rating = updatedData.rating;
  updatingProduct.date = updatedData.date;

  alert(
    `product with id: ${updatingProduct.id} and name: ${updatingProduct.name}updated successfully`
  );
  document.getElementById("sample").value = "product updated successfully";
  table(products);
  document.getElementById("dynamicBtn").remove();
  document.getElementById("update_Product").value = "";
  console.log(products);
}

//dynamic table for all products in reverse order

function table(products) {
  let tbl = document.getElementById("dynamicTable");
  tbl.innerHTML = "";
  let thead = document.createElement("thead");
  let headrow = document.createElement("tr");

  Object.keys(products[0]).forEach((key) => {
    let th = document.createElement("th");
    th.textContent = key;
    headrow.appendChild(th);
  });
  thead.appendChild(headrow);
  tbl.appendChild(thead);

  let tbody = document.createElement("tbody");

  for (let i = products.length - 1; i >= 0; i--) {
    let tablerow = document.createElement("tr");
    Object.values(products[i]).forEach((value) => {
      let td = document.createElement("td");
      td.textContent = value;
      tablerow.appendChild(td);
    });
    tbody.appendChild(tablerow);
  }

  tbl.appendChild(tbody);
}

table(products);

//sorting function
let currentProducts = [...products];
let sortAscOrder = true;

function sortByPrice() {
  currentProducts.sort((a, b) =>
    sortAscOrder ? a.price - b.price : b.price - a.price
  );
  document.getElementById("dynamicTable").innerHTML = "";
  let btn = document.getElementById("sortingByPrice");
  btn.value = sortAscOrder?"H-L":"L-H";
  table(currentProducts);
  sortAscOrder = !sortAscOrder;
}


//fILTER BY date

let dateFilterAsc = true;

function toggleDateFilter() {
  let arrToSort = currentProducts.length ? currentProducts : products;

  arrToSort.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateFilterAsc ? dateA - dateB : dateB - dateA;
  });

  let btn = document.getElementById("dateFilterBtn");
  btn.value = dateFilterAsc ? "P-T" : "T-P";

  document.getElementById("dynamicTable").innerHTML = "";
  table(arrToSort);

  currentProducts = arrToSort;

  dateFilterAsc = !dateFilterAsc;
}
