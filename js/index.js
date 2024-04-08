//cruds
// Add ,Delete , Update ,search

var ProductName = document.getElementById("ProductNameInput"); //                //-->
var ProductPrice = document.getElementById("ProductPriceInput"); //              //-->
var ProductCategory = document.getElementById("ProductCategoryInput"); //        //-->    take value from user then store it in variable
var ProductDescription = document.getElementById("ProductDescriptionInput"); //  //-->
var addbtn = document.getElementById("addbtn"); //                               //-->
var updatebtn = document.getElementById("updatebtn"); //                          //-->
var TableBody = document.getElementById("tbody"); //                             //-->                                            //-->
var ProductContainer; //           //--> store value of product here
//                   when user open the store
//              --> check if any product store in local storage or not
if (localStorage.getItem("MyProduct")) {
  ProductContainer = JSON.parse(localStorage.getItem("MyProduct"));
  DisplayProducts(ProductContainer); //                              dispay the value from localstorage
} else {
  ProductContainer = []; //                                   -->the array of value is empity
}

var UpdateIndex = 0;
//                        when user click addProduct
function AddProduct() {
  //                     crate an object of product with [name ,price ,category ,description]
  if (ValidationName() == true) {
    var Product = {
      ProductName: ProductName.value,
      ProductPrice: ProductPrice.value,
      ProductCategory: ProductCategory.value,
      ProductDescription: ProductDescription.value,
    };
    //                        add product object to my array called " ProductContainer"
    ProductContainer.push(Product);
    //                        give all value to localStorage
    localStorage.setItem("MyProduct", JSON.stringify(ProductContainer));
    ClearForm();
    //                         Display all product
    DisplayProducts(ProductContainer);
  }
}
//                           function to clear all date from input
function ClearForm() {
  ProductName.value = "";
  ProductPrice.value = "";
  ProductCategory.value = "";
  ProductDescription.value = "";
  ProductName.classList.remove("is-invalid");
  ProductPrice.classList.remove("is-invalid");
  ProductCategory.classList.remove("is-invalid");
  ProductDescription.classList.remove("is-invalid");
  ProductName.classList.remove("is-valid");
  ProductPrice.classList.remove("is-valid");
  ProductCategory.classList.remove("is-valid");
  ProductDescription.classList.remove("is-valid");
}
//                           function of display product
function DisplayProducts(arr) {
  var container = ``; //cartoona
  for (var i = 0; i < arr.length; i++) {
    var index = i + 1;
    if (i % 2 == 0) {
      container += `
              <tr>
                <td class="bg-danger-subtle ">${index}</td>
                <td class="bg-danger-subtle ">${arr[i].ProductName}</td>
                <td class="bg-danger-subtle ">${arr[i].ProductPrice}</td>
                <td class="bg-danger-subtle ">${arr[i].ProductCategory}</td>
                <td class="bg-danger-subtle ">${arr[i].ProductDescription}</td>
                <td class="bg-danger-subtle "><button class="btn btn-info btn-sm" onclick="SetValuesForUpdate(${i})">Update</button></td>
                <td class="bg-danger-subtle "><button class="btn btn-danger btn-sm" onclick="DeleteProduct(${i})">Delete</button></td>
              </tr>`;
    } else {
      container += `
              <tr>
                <td>${index}</td>
                <td>${arr[i].ProductName}</td>
                <td>${arr[i].ProductPrice}</td>
                <td>${arr[i].ProductCategory}</td>
                <td>${arr[i].ProductDescription}</td>
                <td><button class="btn btn-info btn-sm"  onclick="SetValuesForUpdate(${i})">Update</button></td>
                <td><button class="btn btn-danger btn-sm" onclick="DeleteProduct(${i})">Delete</button></td>
              </tr>`;
    }
  }
  TableBody.innerHTML = container;
}
function SearchProduct(searhTerm) {
  SearchResult = [];
  for (let i = 0; i < ProductContainer.length; i++) {
    if (
      ProductContainer[i].ProductName.toLowerCase().includes(
        searhTerm.toLowerCase()
      )
    ) {
      SearchResult.push(ProductContainer[i]);
    }
  }
  DisplayProducts(SearchResult);
}
//"samsung".toLowerCase().includes("s".toLowerCase());
function DeleteProduct(deleteindex) {
  ProductContainer.splice(deleteindex, 1);
  localStorage.setItem("MyProduct", JSON.stringify(ProductContainer));
  DisplayProducts(ProductContainer);
}
function SetValuesForUpdate(UpdateIndexValue) {
  UpdateIndex = UpdateIndexValue;
  ProductName.value = ProductContainer[UpdateIndexValue].ProductName;
  ProductPrice.value = ProductContainer[UpdateIndexValue].ProductPrice;
  ProductCategory.value = ProductContainer[UpdateIndexValue].ProductCategory;
  ProductDescription.value =
    ProductContainer[UpdateIndexValue].ProductDescription;
  addbtn.classList.replace("d-block", "d-none");
  updatebtn.classList.replace("d-none", "d-block");
}
function UpdateProduct() {
  // var Product = {
  //   ProductName: ProductName.value,
  //   ProductPrice: ProductPrice.value,
  //   ProductCategory: ProductCategory.value,
  //   ProductDescription: ProductDescription.value,
  // };
  ProductContainer[UpdateIndex].ProductName=ProductName.value;
  // ProductContainer.splice(UpdateIndex, 1, Product);
  localStorage.setItem("MyProduct", JSON.stringify(ProductContainer));
  DisplayProducts(ProductContainer);
  ClearForm();
  updatebtn.classList.replace("d-block", "d-none");
  addbtn.classList.replace("d-none", "d-block");
}
function ValidationName() {
  var InValidName = document.getElementById("InVaidName");
  var name = ProductName.value;
  var regxName = /^[A-Z]{1}[a-z]{2,8}$/;
  if (name == "") {
    ProductName.classList.remove("is-invalid");
    ProductName.classList.remove("is-valid");
    InValidName.classList.replace("d-block", "d-none");
    return false;
  } else if (regxName.test(name)) {
    ProductName.classList.add("is-valid");
    ProductName.classList.remove("is-invalid");
    InValidName.classList.replace("d-block", "d-none");
    return true;
  } else {
    ProductName.classList.add("is-invalid");
    ProductName.classList.remove("is-valid");
    InValidName.classList.replace("d-none", "d-block");
    return false;
  }
}
function ValidationPrice() {
  var price = ProductPrice.value;
  var regxprice = /[0-9]{4}$/;
  if (price == "") {
    ProductPrice.classList.remove("is-invalid");
    ProductPrice.classList.remove("is-valid");
  } else if (regxprice.test(price)) {
    ProductPrice.classList.replace("is-invalid", "is-valid");
  } else {
    ProductPrice.classList.add("is-invalid");
    ProductPrice.classList.replace("is-valid", "is-invalid");
  }
}
function ValidationCategory() {
  var Category = ProductCategory.value;
  var regxCategory = /(Mobile|TV|Car|Computer|Laptop|Electronics|Ather)$/i;
  if (Category == "") {
    ProductCategory.classList.remove("is-invalid");
    ProductCategory.classList.remove("is-valid");
  } else if (regxCategory.test(Category)) {
    ProductCategory.classList.replace("is-invalid", "is-valid");
  } else {
    ProductCategory.classList.add("is-invalid");
    ProductCategory.classList.replace("is-valid", "is-invalid");
  }
}
