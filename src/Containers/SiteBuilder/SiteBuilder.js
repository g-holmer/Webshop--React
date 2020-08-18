import React, { Component } from "react";
import classes from "./SiteBuilder.module.css";
import axios from "axios";
import Products from "../../Components/Products/Products";
import Layout from "../../Components/Layout/Layout";
import Cart from "../../Components/Cart/Cart";
import Checkout from "../../Components/Checkout/Checkout";
import Order from "../../Components/OrderConfirmation/OrderConfirmation";

class SiteBuilder extends Component {
  state = { 
    products: [],
    showCart: false,
    cart: [],
    checkout: [],
    filterProds: [],
    currency: "kr",
    alreadyExist: false,
    checkedOut: false,
    order: false,
  };
  componentDidMount() {
    this.getProducts();
    const fromClick = false;
    this.renderCartHandler(fromClick);
  }
  getProducts = () => {
    this.setState({ loading: true }, () => {
      const url = "./products.json";

      axios
        .get(url)
        .then((response) => {
          this.setState({
            products: response.data,
            filterProds: response.data,
            loading: false,
          });
        })
        .catch((error) => console.log(error));
    });
  };

  toggleCartHandler = (event) => {
    if (
      this.state.showCart &&
      event.target.id !== "Overlay" &&
      event.target.id !== "closeBtn"
    )
      return;

    this.setState({
      showCart: !this.state.showCart,
    });
  };
  renderCartHandler = (fromClick) => {
    const getArray = JSON.parse(localStorage.getItem("myCart"));
    if (getArray === null) return;
    if (fromClick) {
      if (!getArray) return;
      for (let index = 0; index < getArray.length; index++) {
        const element = getArray[index];
        this.setState({ cart: [...this.state.cart, element] });
      }
    } else {
      this.setState({ cart: [...getArray] });
    }
  };
  updateProductStyle = (event, add) => {
    if (add) {
      event.target.innerHTML = "Go to cart";
      event.target.style.background = "green";
    } else {
      event.innerHTML = "Add to cart";
      event.style.background =
        "linear-gradient(to bottom, #7892c2 5%, #1e3045 100%)";
      event.style.backgroundColor = "#7892c2";
    }
  };
  addToCartHandler = (event) => {
    const productIndex = event.target.id;
    const name = this.state.products[productIndex].name;
    const img = this.state.products[productIndex].image;
    const price = this.state.products[productIndex].price;
    const qty = event.target.parentElement.firstChild.firstChild.value;
    const add = true;
    this.updateProductStyle(event, add);

    const myObj = {
      name,
      img,
      price,
      qty,
    };

    let getArray;
    if (localStorage.getItem("myCart") === null) {
      let prodArray = [];
      prodArray.push(myObj);
      localStorage.setItem("myCart", JSON.stringify(prodArray));
    } else {
      getArray = JSON.parse(localStorage.getItem("myCart"));
      for (let i = 0; i < getArray.length; i++) {
        if (getArray[i].name === name) {
          this.setState({ alreadyExist: true });
          return;
        }
      }

      getArray.push(myObj);
      localStorage.setItem("myCart", JSON.stringify(getArray));
    }

    let fromClick = true;
    this.renderCartHandler(fromClick);
  };
  deleteFromCartHandler = (index, itemName) => {
    let getArray = JSON.parse(localStorage.getItem("myCart"));
    getArray.splice(index, 1);
    localStorage.setItem("myCart", JSON.stringify(getArray));
    const name = this.state.cart[index].name;

    // this.renderCartHandler(fromButton);

    const isName = (element) => element.name === name;
    const productIndex = document.getElementById(
      this.state.products.findIndex(isName)
    );

    const newItems = [...this.state.cart].filter((item) => {
      return item.name !== itemName;
    });

    this.setState({ cart: newItems });

    const add = false;
    this.updateProductStyle(productIndex, add);
  };
  getSumHandler = () => {
    const cart = this.state.cart;
    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
      var str = cart[i].price;
      var res = str.replace(/\D/g, "");
      sum += +res * cart[i].qty;
    }
    return sum;
  };
  addQtyHandler = (index) => {
    let getArray = JSON.parse(localStorage.getItem("myCart"));
    getArray[index].qty -= 1; //???
    getArray[index].qty += 2;
    localStorage.setItem("myCart", JSON.stringify(getArray));
    let fromButton = false;
    this.renderCartHandler(fromButton);
  };
  removeQtyHandler = (index) => {
    let getArray = JSON.parse(localStorage.getItem("myCart"));
    if (getArray[index].qty <= 1) return;
    getArray[index].qty -= 1;
    localStorage.setItem("myCart", JSON.stringify(getArray));
    let fromButton = false;
    this.renderCartHandler(fromButton);
  };
  countQtyHandler = () => {
    let sum = 0;
    for (let i = 0; i < this.state.cart.length; i++) {
      sum += +this.state.cart[i].qty;
    }

    return sum;
  };
  checkoutHandler = () => {
    this.setState({
      checkout: this.state.cart,
      showCart: false,
    });

    this.setState({ checkedOut: true });
  };
  searchHandler = (event) => {
    const searchFor = event.target.value.toLowerCase();
    const filtered = this.state.filterProds.filter((item) => {
      return item.name.toLowerCase().includes(searchFor);
    });
    this.setState({ products: filtered });
  };
  orderConfirmationHandler = () => {
    this.setState({ order: false });
    localStorage.clear();
    this.setState({ cart: [], products: [] });
    this.getProducts();
  };
  render() {
    if (this.state.alreadyExist) {
      this.setState({ alreadyExist: false });
      this.setState({ showCart: true });
    }
    let cartWindow = null;
    if (this.state.showCart) {
      cartWindow = (
        <Cart
          cart={this.state.cart}
          currency={this.state.currency}
          sumTotal={this.getSumHandler()}
          delete={this.deleteFromCartHandler}
          addQty={this.addQtyHandler}
          removeQty={this.removeQtyHandler}
          clicked={this.toggleCartHandler}
          checkout={this.checkoutHandler}
        />
      );
    }
    let checkout = null;
    if (this.state.checkedOut) {
      checkout = (
        <Checkout
          checkout={this.state.checkout}
          currency={this.state.currency}
          sumTotal={this.getSumHandler()}
          placeOrder={() => this.setState({ order: true, checkedOut: false })}
          addQty={this.addQtyHandler}
          continueShop={() =>
            this.setState({ checkedOut: false, showCart: false })
          }
        />
      );
    }
    let order = null;
    if (this.state.order) {
      order = <Order clicked={this.orderConfirmationHandler} />;
    }
    return (
      <Layout
        changed={this.searchHandler}
        clicked={this.toggleCartHandler}
        cartCounter={
          this.state.cart.length ? (
            <div className={classes.Bg}>{this.countQtyHandler()}</div>
          ) : (
            ""
          )
        }
      >
        {cartWindow}
        <div className={classes.SiteBuilder}>
          <h1>TITLE</h1>
          {checkout}
          {order}
          <Products
            products={this.state.products}
            addToCart={this.addToCartHandler}
            currency={this.state.currency}
            loading={this.state.loading}
          />
        </div>
      </Layout>
    );
  }
}
export default SiteBuilder;
