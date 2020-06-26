import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
const Products = (props) => {

    let products = props.products
    let cartItems = props.cartItems
    let itemPrice = props.itemPrice
    let ls = props.ls;

    return (
        <div className="clearfix"> <br />
            {ls.length <= 0 ?
                <div className="center-page">
                    <strong><a className="ecart-link" href="/ecart/login">Please Login</a></strong>
                </div>:
                <div className="col-lg-11 mx-auto">
                    <div className="row">
                        <div className="col-md-8">
                            <ul className="list-unstyled row">
                                {products.map((items, index) => {
                                    return (
                                        <li className="col-6 col-sm-6 col-md-4" key={index}>
                                            <div className="items_list">
                                                <div className="Item_list_header"><strong>{items.name}</strong></div>
                                                <div className="items_list_body">
                                                    <img alt="" src={items.imgUrl} />
                                                </div>
                                                <div className="Item_list_footer">
                                                    <span>₹  {items.price}</span>
                                                    <button type="button"
                                                        onClick={() => props.addTocart(items)}
                                                    >Add To Cart</button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="col-md-4">

                            <div className="cart_product_panel">
                                <div className="cart_total">Total Price:&nbsp;₹&nbsp;{cartItems.length === 0 ? 0 : <span>{itemPrice}</span>}
                                </div>
                                <div className="cart_product_panel_in">
                                    {cartItems.length !== 0 ? cartItems.map((items, index) => {
                                        return (
                                            <div className="cart_product" key={index}>
                                                <div className="cart_body">
                                                    <div className="cart_img"><img alt="" src={items.imgUrl} /></div>
                                                    <div className="cart_item"><span>{items.name}</span></div>
                                                    <div className="cart_price"><span>₹ {items.price}</span></div>
                                                    <div className="cart_remove">
                                                        <Router>
                                                            <Link to="" title="Delete Item"
                                                                onClick={() => props.deleteCartProduct(items)}>
                                                                <i className="fa fa-times"></i>
                                                            </Link>
                                                        </Router>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : <div className="cart_product">
                                            <div className="cart_body">
                                                <div className="cart_item"><span className="fw300">{cartItems.length} Items in your cart</span></div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>}
        </div>
    )
}
export default Products;