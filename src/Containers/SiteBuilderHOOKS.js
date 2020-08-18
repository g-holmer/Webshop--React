import classes from "./SiteBuilder.module.css";
import axios from "axios";
import Products from "../../Components/Products/Products";
import Layout from "../../Components/Layout/Layout";
import Cart from "../../Components/Cart/Cart";
import Checkout from "../../Components/Checkout/Checkout";
import Order from "../../Components/OrderConfirmation/OrderConfirmation";
import React, { useState, useEffect } from "react";

const SiteBuilder = () => {
  const [items, setItems] = (useState = [
    {
      products: [],
      showCart: false,
      cart: [],
      checkout: [],
      filterProds: [],
      currency: "kr",
      alreadyExist: false,
      checkedOut: false,
      order: false,
    },
  ]);

  useEffect(() => {
    this.getProducts();
    const fromClick = false;
    this.renderCartHandler(fromClick);
  });

  const getProducts = () => {
    axios
      .get("./products.json")
      .then((response) => {
        this.setState({
          products: response.data,
          filterProds: response.data,
        });
      })
      .catch((error) => console.log(error));
  };

  const toggleCartHandler = (event) => {
    if (
      event.target.className !== "Cart_Overlay__2qSdP" &&
      event.target.className !== "Layout_Cart__1v0ah" &&
      event.target.className !== "SiteBuilder_Bg__puDk5" &&
      event.target.className !== "Cart_Cart__Close__2VRsb" &&
      event.target.className !== "Cart_CloseSpan2__2mTuU" &&
      event.target.className !== "Cart_CloseSpan1__VW2sY"
    ) {
      return;
    }

    this.setState({
      showCart: !this.state.showCart,
    });
  };
  const renderCartHandler = (fromClick) => {
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
  const updateProductStyle = (event, add) => {
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
  const addToCartHandler = (event) => {
    const productIndex = event.target.id;
    const name = items.products[productIndex].name;
    const img = items.products[productIndex].image;
    const price = items.products[productIndex].price;
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
  const deleteFromCartHandler = (index, itemName) => {
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
  const getSumHandler = () => {
    const cart = this.state.cart;
    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
      var str = cart[i].price;
      var res = str.replace(/\D/g, "");
      sum += +res * cart[i].qty;
    }
    return sum;
  };
  const addQtyHandler = (index) => {
    let getArray = JSON.parse(localStorage.getItem("myCart"));
    getArray[index].qty -= 1; //???
    getArray[index].qty += 2;
    localStorage.setItem("myCart", JSON.stringify(getArray));
    let fromButton = false;
    this.renderCartHandler(fromButton);
  };
  const removeQtyHandler = (index) => {
    let getArray = JSON.parse(localStorage.getItem("myCart"));
    if (getArray[index].qty <= 1) return;
    getArray[index].qty -= 1;
    localStorage.setItem("myCart", JSON.stringify(getArray));
    let fromButton = false;
    this.renderCartHandler(fromButton);
  };
  const countQtyHandler = () => {
    let sum = 0;
    for (let i = 0; i < this.state.cart.length; i++) {
      sum += +this.state.cart[i].qty;
    }

    return sum;
  };
  const checkoutHandler = () => {
    this.setState({
      checkout: this.state.cart,
      showCart: false,
    });

    this.setState({ checkedOut: true });
  };
  const searchHandler = (event) => {
    const searchFor = event.target.value.toLowerCase();
    const filtered = this.state.filterProds.filter((item) => {
      return item.name.toLowerCase().includes(searchFor);
    });
    this.setState({ products: filtered });
  };
  const orderConfirmationHandler = () => {
    this.setState({ order: false });
    localStorage.clear();
    this.setState({ cart: [], products: [] });
    this.getProducts();
  };

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
        />
      </div>
    </Layout>
  );
};

export default SiteBuilder;
