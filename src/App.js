import React from 'react';
import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import allusers from './assets/dir/users_data';
import allproducts from './assets/dir/products_data';
import Home from './components/home';
import Login from './components/login';
import Profile from './components/profile';
import Products from './components/products';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: allusers,
      user: { email: "", password: "" },
      products: allproducts,
      CartUser: [JSON.parse(localStorage.getItem("eCartUser"))],
      cartItems: [],
      itemPrice: 0,
      message: { success: '', error: '' }
    }

    this.inputChange = event => {
      let { user } = this.state;
      user[event.target.name] = event.target.value;
      this.setState({ user });
    }
    this.loginSubmit = event => {
      event.preventDefault();
      let user = this.state.user;
      let allusers = this.state.users;
      if (allusers[user.email]) {
        if (allusers[user.email].password !== window.btoa(user.password)) {
          this.setState({ message: { error: "Password error..." } })
        } else {
          let date = new Date();
          date.setTime(date.getTime() + (1 * 60 * 1000));
          localStorage.setItem("eCartUser", JSON.stringify(allusers[user.email]), { expires: date }, { signed: true });
          document.location.href = "/ecart/products";
        }
      } else {
        this.setState({ message: { error: "User not found..." } })
      }
    }
    this.userLogout = e => {
      localStorage.removeItem("eCartUser");
      localStorage.clear();
      document.location.reload();
    }

    this.countPrice = (array) => {
      return array.map(item => item.price).reduce((a, b) => a + b);
    }

    this.addTocart = items => {
      const { cartItems } = this.state;
      cartItems.push(items);
      this.setState({ cartItems: cartItems });
      this.setState({ itemPrice: this.countPrice(cartItems) });
    }
    this.deleteCartProduct = (item) => {
      console.log(item);
      const { cartItems } = this.state;
      this.setState({ cartItems: cartItems.filter(e => e.id !== item.id) })
      this.setState({ itemPrice: this.countPrice(cartItems) - item.price });
    }

  }
  componentDidMount() {
    console.warn = () => { }
    setInterval(() => {
      this.setState({ message: { error: "" } })
    }, 2500)
  }

  render() {
    let newuser = this.state.user;
    let products = this.state.products;
    let CartUser = this.state.CartUser;
    let ls = localStorage;
    let cartItems = this.state.cartItems;
    let itemPrice = this.state.itemPrice
    let message = this.state.message;
    return (
      <div className="App">
        <div className="App_in">
          <Router>
            <Navbar className="ecartNav">
              <section className="container">
                <Navbar.Brand href="ecart/">eCart</Navbar.Brand>
                <Nav className="ml-auto">
                  {ls.length <= 0 ?
                    <React.Fragment>
                      <Link className="nav-link" to="/ecart/"><i className="fad fa-home"></i></Link>
                      <Link className="nav-link" to="/ecart/login"><i className="fad fa-sign-in"></i></Link>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <Link className="nav-link" to="/ecart/"><i className="fad fa-home"></i></Link>
                      <Link className="nav-link" to="/ecart/products">Products</Link>
                      <NavDropdown alignRight title={<span className="fad fa-user"></span>} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/ecart/profile"><i className="fad fa-user"></i>&nbsp;Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={this.userLogout}><i className="fad fa-sign-out"></i>&nbsp;Logout</NavDropdown.Item>
                      </NavDropdown>
                      <Link className="nav-link" to="/ecart/products" title={`${cartItems.length} Items in cart`}>
                        <i className="fad fa-shopping-cart"></i>&nbsp;
                            <span className="badge badge-light">{cartItems.length > 99 ? '99+' : cartItems.length}</span>
                      </Link>
                    </React.Fragment>
                  }
                </Nav>
              </section>
            </Navbar>
            <Route exact path="/ecart/"><Home /></Route>
            <Route exact path="/ecart/login">
              <Login {...newuser} inputChange={this.inputChange} loginSubmit={this.loginSubmit} message={message} />
            </Route>
            <Route path="/ecart/products">
              <Products addTocart={this.addTocart} deleteCartProduct={this.deleteCartProduct} ls={ls} products={products} cartItems={cartItems} itemPrice={itemPrice} />
            </Route>
            <Route path="/ecart/profile">
              <Profile user={CartUser} ls={ls} userLogout={this.userLogout} />
            </Route>
          </Router>
        </div>

        <footer>
          <div className="container">
            <div className="ecart-footer">
              <a href="https://www.viomjeet.net/" target="_blank">&copy; viomjeet {(new Date().getFullYear())}</a>
              <span>Made with <i className="text-danger fad fa-heart"></i> in india</span>
            </div>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;
