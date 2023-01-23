import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import Product from "./Product";
import { allProducts } from "../actions/productActions";
import Loader from "./Loader";
import products from "../data/products";

const HomeScreenProducts = () => {
  const [loading, setLoading] = React.useState(true);
  setTimeout(function () {
    setLoading(false);
  }, 1000);

  //const dispatch = useDispatch();
  // const productListAll = useSelector((state) => state.productListAll);
  // const { loading, products } = productListAll;

  const slicedProducts = products.slice(0, 4);

  // useEffect(() => {
  //   dispatch(allProducts());
  // }, [dispatch]);

  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/products");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main>
          <section className="menu section">
            <div className="title">
              <h2> All Products</h2>
            </div>
            <Row>
              {slicedProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </section>

          <div className="d-grid gap-2">
            <Button variant="dark" size="sm" onClick={handleRoute}>
              See all
            </Button>
          </div>
        </main>
      )}
    </>
  );
};

export default HomeScreenProducts;
