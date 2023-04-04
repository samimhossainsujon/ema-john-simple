import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))

    }, []);

    useEffect(() => {
        // console.log('products',products)
        const storedCart = getShoppingCart();
        const savedCart = [];
        // 1.step get id
        for (const id in storedCart) {

            // step 2. get the product by using id
            const addedProduct = products.find(product => product.id === id);

            // step 3: get quanti of the product 
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
            console.log(addedProduct);
        }
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // cart.push(product);
        // const newCart = [...cart, product];
        // setCart(newCart);
        // addToDb(product.id)
        let newCart =[];

        const exists = cart.find(pd =>pd.id === product.id);
        if(!exists){
            product.quantity =1;
            newCart= [...cart,product];
        }else{
            exists.quantity = exists.quantity+1;
            const remaining = cart.filter (pd => pd.id !== product.id);
            newCart =[...remaining, exists];
        }
        setCart(newCart);
        addToDb(product.id);
    }

    const handleClearCart= ()=>{
        setCart([]);
        deleteShoppingCart();
    }


    return (
        <div className='shop-container'>

            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id} product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart 
                cart={cart}
                handleClearCart={handleClearCart}
                >

                    <Link className='proceed-link' to={'/orders'}>
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;