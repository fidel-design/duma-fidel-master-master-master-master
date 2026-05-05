import React from 'react';
import { useNavigate } from 'react-router-dom';
import shoec1 from '../assets/shoec1.jpg';
import shoec2 from '../assets/shoec2.jpg';

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <section className="container mt-4">
      <h2 className="text-center mb-4">Featured Products</h2>

      <div className="row">

        {/* Product 1 */}
        <div className="col-md-4 mb-3">
          <div
            className="card shadow"
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate('/makepayment', {
                state: {
                  product: {
                    id: 1,
                    product_name: "New Sneakers",
                    product_cost: 2500,
                    product_photo: shoec1
                  }
                }
              })
            }
          >
            <img src={shoec1} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
            <div className="card-body">
              <h5>New Sneakers</h5>
              <p>Best trending shoes this season</p>
            </div>
          </div>
        </div>

        {/* Product 2 */}
        <div className="col-md-4 mb-3">
          <div
            className="card shadow"
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate('/makepayment', {
                state: {
                  product: {
                    id: 2,
                    product_name: "Running Shoes",
                    product_cost: 3000,
                    product_photo: shoec2
                  }
                }
              })
            }
          >
            <img src={shoec2} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
            <div className="card-body">
              <h5>Running Shoes</h5>
              <p>Comfort + performance combined</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;