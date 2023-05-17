import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [currenPage, setCurrentPage] = useState();
    const [itemPerPage, setItemPerPage] = useState(10);
    const { totalProducts } = useLoaderData();

    const totalPages = Math.ceil(totalProducts / itemPerPage);

    // const pageNumbers =[];
    // for (let i = 0; i < totalPages; i++) {
    //     pageNumbers.push(i);
    // }

    //========= OR ============

    const pageNumbers = [...Array(totalPages).keys()];



    // console.log(totalProducts);

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))

    // }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currenPage}&limit=${itemPerPage}`);
            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, [currenPage, itemPerPage]);




    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch(`http://localhost:5000/productsByIds`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids),
        })

            .then(response => response.json())
            .then(cardProducts => {
                const savedCart = [];
                // 1.step get id
                for (const id in storedCart) {

                    // step 2. get the product by using id
                    const addedProduct = cardProducts.find(product => product._id === id);

                    // step 3: get quanti of the product 
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                    // console.log(addedProduct);
                }
                setCart(savedCart);
            })

    }, [])

    const handleAddToCart = (product) => {
        // cart.push(product);
        // const newCart = [...cart, product];
        // setCart(newCart);
        // addToDb(product._id)
        let newCart = [];

        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product._id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const options = [5, 10, 15, 20];
    function handleSelectChange(event) {
        setItemPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }


    return (
        <>
            <div className='shop-container'>

                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id} product={product}
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



            <div className='pagination'>
                <p>currenPage: {currenPage}</p>
                {pageNumbers.map(number => <button
                    key={number}
                    className={currenPage === number ? 'selected' : ''}
                    onClick={() => setCurrentPage(number)}
                >{number}
                </button>)
                }

                <select value={itemPerPage} onChange={handleSelectChange}>
                    {options.map(option => <option
                        key={option}
                        value={option}
                    >{option}</option>)}
                </select>



            </div>



        </>
    );
};

export default Shop;