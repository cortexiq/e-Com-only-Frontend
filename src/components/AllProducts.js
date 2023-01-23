import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Categories from "./Categories";
import Product from "./Product";
import { allProducts } from "../actions/productActions";
import Loader from "./Loader";

const AllProducts = () => {
  const dispatch = useDispatch();

  const productListAll = useSelector((state) => state.productListAll);
  const { loading, products } = productListAll;

  console.log(products);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const [menuItems, setMenuItems] = useState(products);

  const filterItems = (category) => {
    if (category === "All") {
      setMenuItems(products);
      return;
    }
    const newProducts = products.filter(
      (product) => product.category === category
    );
    setMenuItems(newProducts);
  };

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main>
          <section className='menu section'>
            <div className='title'>
              <h2>Categories</h2>
              <div className='underline'></div>
            </div>
            <Categories categories={categories} filterItems={filterItems} />
            <Row>
              {menuItems.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </section>
        </main>
      )}
    </>
  );
};

export default AllProducts;
