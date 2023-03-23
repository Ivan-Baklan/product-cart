var Product = /** @class */ (function () {
    function Product(productId, productName, productPrice, productDate) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDate = productDate;
    }
    return Product;
}());
var Cart = /** @class */ (function () {
    function Cart() {
        this.productList = [];
    }
    Cart.getInstance = function () {
        return Cart.instance;
    };
    Cart.createInstance = function () {
        if (!Cart.instance) {
            Cart.instance = new Cart();
            return Cart;
        }
        throw new Error("Cart is already created.");
    };
    Cart.prototype.addProduct = function (productName, productPrice, productDate) {
        this.productList.push(new Product(this.productList.length, productName, productPrice, productDate));
    };
    Cart.prototype.getList = function () {
        return this.productList;
    };
    Cart.prototype.removeProduct = function (id) {
        this.productList = this.productList.filter(function (elem) { return elem.productId !== id; });
    };
    return Cart;
}());
Cart.createInstance();
var cart = Cart.getInstance();
var submitButton = document.querySelector('.submit-input');
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', addNewProductItem);
function addNewProductItem(e) {
    var _a, _b, _c;
    e.preventDefault();
    cleanCartList();
    var productName = document.getElementById('product-name');
    var productPrice = document.getElementById('product-price');
    var productDate = document.getElementById('product-date');
    cart.addProduct((_a = productName === null || productName === void 0 ? void 0 : productName.value) !== null && _a !== void 0 ? _a : '', (_b = Number(productPrice === null || productPrice === void 0 ? void 0 : productPrice.value)) !== null && _b !== void 0 ? _b : 0, (_c = productDate === null || productDate === void 0 ? void 0 : productDate.value) !== null && _c !== void 0 ? _c : '');
    cart.getList().map(function (elem) { return renderItem(elem); });
}
function renderItem(elem) {
    var cartList = document.getElementById('cart-list');
    var newDivItem = document.createElement('div');
    newDivItem.classList.add('cart-item');
    var itemHeading = document.createElement('p');
    itemHeading.classList.add('heading');
    itemHeading.appendChild(document.createTextNode(elem.productName));
    newDivItem.append(itemHeading);
    var divItemDescr = document.createElement('div');
    divItemDescr.classList.add('item-desc');
    var priceParagraph = document.createElement('p');
    priceParagraph.classList.add('price');
    priceParagraph.appendChild(document.createTextNode("Price: ".concat(String(elem.productPrice), "$")));
    var dateParagraph = document.createElement('p');
    dateParagraph.classList.add('date');
    dateParagraph.appendChild(document.createTextNode("Date: ".concat(String(elem.productDate))));
    var deleteButton = document.createElement('button');
    deleteButton.setAttribute('value', String(elem.productId));
    deleteButton.append(document.createTextNode('Delete'));
    deleteButton.addEventListener('click', removeProduct);
    divItemDescr.append(priceParagraph, dateParagraph, deleteButton);
    newDivItem.append(divItemDescr);
    cartList === null || cartList === void 0 ? void 0 : cartList.append(newDivItem);
}
function removeProduct(e) {
    cleanCartList();
    var target = e.target;
    cart.removeProduct(Number(target.value));
    cart.getList().map(function (elem) { return renderItem(elem); });
}
function cleanCartList() {
    var productList = document.querySelectorAll('.cart-item');
    productList.forEach(function (elem) { return elem.remove(); });
}
