import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../context/CartContext";

const Getproduct = () => {

  const { search, sort, addToCart, setProducts, products } = useContext(CartContext);

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const img_url = "http://dumafidel.alwaysdata.net/static/images/";
  const navigate = useNavigate();

  // FETCH PRODUCTS
  const getproducts = async () => {
    setLoading("Please wait as we retrieve products...");
    try {
      const response = await axios.get(
        "http://dumafidel.alwaysdata.net/api/get_product_details"
      );

      setLoading("");
      setProducts(response.data);

    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  useEffect(() => {
    getproducts();
  }, []);

  // HANDLE CHATBOT / HASH SCROLL
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

          // highlight effect
          element.style.border = "2px solid orange";
          setTimeout(() => {
            element.style.border = "none";
          }, 1500);
        }
      }, 300);
    }
  }, [products]);

  // FILTER + SORT PRODUCTS (SAFE VERSION)
  const filteredProducts = products
    .filter(product => {
      const query = search.toLowerCase().trim();

      const name = product?.product_name?.toLowerCase() || "";
      const description = product?.product_description?.toLowerCase() || "";
      const cost = String(product?.product_cost || "");

      return (
        name.includes(query) ||
        description.includes(query) ||
        cost.includes(query)
      );
    })
    .sort((a, b) => {
      if (sort === "low") return a.product_cost - b.product_cost;
      if (sort === "high") return b.product_cost - a.product_cost;
      return 0;
    });

  return (
    <div className='container mt-3'>

      <h2 className="text-center mb-3">Available Products</h2>

      {loading}
      {error}

      {filteredProducts.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No products found 😔</h4>
          <p>Try a different search term</p>
        </div>
      ) : (
        <div className="row">

          {filteredProducts.map(product => (
            <div
              className="col-md-3 mb-4"
              id={`product-${product.product_id}`}
              key={product.product_id}
            >

              <div className='card shadow p-2'>

                <img
                  src={img_url + product.product_photo}
                  alt=""
                  className='products_img'
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5>{product.product_name}</h5>
                  <p>{product.product_description}</p>
                  <p><strong>Ksh {product.product_cost}</strong></p>

                  <button
                    className='btn btn-success mt-2 w-100'
                    onClick={() =>
                      navigate('/makepayment', { state: { product } })
                    }
                  >
                    Buy Now
                  </button>

                  <button
                    className='btn btn-dark mt-2 w-100'
                    onClick={() => {
                      addToCart({
                        id: Number(product.product_id),
                        product_name: product.product_name,
                        product_cost: Number(product.product_cost),
                        product_photo: product.product_photo
                      });
                    }}
                  >
                    Add to Cart 🛒
                  </button>

                </div>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Getproduct;