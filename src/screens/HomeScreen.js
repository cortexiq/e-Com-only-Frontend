import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import AllProducts from "../components/AllProducts";
import HomeScreenProducts from "../components/HomeScreenProducts";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import ProductCarousel from "../components/ProductCarousel";
import products from "../data/products";

const HomeScreen = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;
  const [loading, setLoading] = useState(true);
  const error = false;
  const pages = 1;
  const page = 1;

  setTimeout(function () {
    setLoading(false);
  }, 1000);

  // const dispatch = useDispatch();

  // const productList = useSelector((state) => state.productList);
  // const { loading, error, products, pages, page } = productList;

  console.log(products);

  const slicedProducts = products?.slice(0, 4);

  // useEffect(() => {
  //   dispatch(listProducts(keyword, pageNumber));
  // }, [dispatch, keyword, pageNumber]);

  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/products");
  };

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <ProductCarousel />
          <h1>Latest Products</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Row>
                {slicedProducts.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
              <div className="d-grid gap-2">
                <Button variant="dark" size="sm" onClick={handleRoute}>
                  Find out more
                </Button>
              </div>

              <div>
                {" "}
                <p> </p>
                <h1> </h1>
              </div>

              <HomeScreenProducts />
            </>
          )}
        </>
      ) : (
        <>
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>

          <Row>
            {slicedProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
