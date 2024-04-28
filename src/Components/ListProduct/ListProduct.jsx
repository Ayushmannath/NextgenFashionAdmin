import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../Assets/cross_icon.png'

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = () => { 
    fetch('http://3.111.70.48:4000/allproducts') 
            .then((res) => res.json()) 
            .then((data) => setAllProducts(data))
    }
    useEffect(() => {

      fetchInfo();
    }, [])

    const removeProduct = async (id) => {
      await fetch('http://3.111.70.48:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({id:id}),
    })

    fetch('http://65.2.189.56:4000/allproducts') 
    .then((res) => res.json()) 
    .then((data) => setAllProducts(data))
    }

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
  <hr />
  {allproducts.map((e) => {
    // Replace "http://localhost:4000" with "http://65.2.189.56:4000" in the image URL
    const imageUrl = e.image.replace('http://localhost:4000', 'http://3.111.70.48:4000');

    return (
      <div key={e.id}>
        <div className="listproduct-format-main listproduct-format">
          <img className="listproduct-product-icon" src={imageUrl} alt="" />
          <p cartitems-product-title>{e.name}</p>
          <p>${e.old_price}</p>
          <p>${e.new_price}</p>
          <p>{e.category}</p>
          <img className="listproduct-remove-icon" onClick={() => { removeProduct(e.id) }} src={cross_icon} alt="" />
        </div>
        <hr />
      </div>
    );
  })}
</div>

    </div>
  );
};

export default ListProduct;
