// EXERCISE 2
interface IProduct {
    productName: string;
    productId: number;
    productPrice: number;
    productDate: string;
    
   
  }
  
  class Product implements IProduct {
    constructor(
      public productId: number,
      public productName: string,
      public productPrice: number,
      public productDate: string
     
    ) {}

   
    
  }
  
  class Cart {
    private static instance: Cart 
    
    private productList:Product[] = [];
    
    private constructor(){
      
    }
  
    public static getInstance():Cart{
      return Cart.instance;
    }

    
    public static createInstance() {
      if (!Cart.instance) {
        Cart.instance = new Cart();
        return Cart;
      }
  
      throw new Error("Cart is already created.");
    }
  
    public  addProduct (productName:string,productPrice:number,productDate:string):void{
      this.productList.push(new Product(this.productList.length,productName,productPrice,productDate));
    }

    public getList ():Product[]{
      return this.productList;
    }

    public removeProduct(id:number):void{
      this.productList = this.productList.filter((elem)=>elem.productId !== id);
    }
  }


Cart.createInstance();
let cart = Cart.getInstance();

const submitButton = document.querySelector('.submit-input');

submitButton?.addEventListener('click',addNewProductItem);

function addNewProductItem(e:Event):void{
e.preventDefault();
cleanCartList();
const productName = document.getElementById('product-name') as HTMLInputElement;
const productPrice= document.getElementById('product-price') as HTMLInputElement;
const productDate = document.getElementById('product-date') as HTMLInputElement;
cart.addProduct(productName?.value ?? '',Number(productPrice?.value)??0,productDate?.value??'');

cart.getList().map(elem=>renderItem(elem))


}


function renderItem (elem:Product):void{
  
  const cartList = document.getElementById('cart-list');
  const newDivItem = document.createElement('div');
  newDivItem.classList.add('cart-item');
  const itemHeading = document.createElement('p');
  itemHeading.classList.add('heading');
  itemHeading.appendChild(document.createTextNode(elem.productName));
  newDivItem.append(itemHeading);
  const divItemDescr = document.createElement('div');
  divItemDescr.classList.add('item-desc');
  const priceParagraph = document.createElement('p');
  priceParagraph.classList.add('price');
  priceParagraph.appendChild(document.createTextNode(`Price: ${String(elem.productPrice)}$`))
  const dateParagraph = document.createElement('p');
  dateParagraph.classList.add('date');
  dateParagraph.appendChild(document.createTextNode(`Date: ${String(elem.productDate)}`));
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('value',String(elem.productId));
  deleteButton.append(document.createTextNode('Delete'));
  deleteButton.addEventListener('click',removeProduct);
  divItemDescr.append(priceParagraph,dateParagraph,deleteButton);
  newDivItem.append(divItemDescr);
  cartList?.append(newDivItem);
}


function removeProduct(e:Event){
 cleanCartList();
  
  const target = e.target as HTMLButtonElement;
  cart.removeProduct(Number(target.value));
  cart.getList().map(elem=>renderItem(elem));
  
}

function cleanCartList():void{
  const productList = document.querySelectorAll('.cart-item');
  productList.forEach(elem=>elem.remove());
}