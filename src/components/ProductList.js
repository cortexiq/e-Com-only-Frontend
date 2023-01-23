import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allProducts } from "../actions/filterAction";
import PaginateProducts from "./PaginateProducts";

import GridView from "./GridView";
import ListView from "./ListView";
import products from "../data/products";

const ProductList = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;
  const [loading, setLoading] = React.useState(true);
  const error = false;
  const pages = 1;
  const page = 1;

  setTimeout(function () {
    setLoading(false);
  }, 500);

  const dispatch = useDispatch();
  const grid_view = true;

  // const productView = useSelector((state) => state.productView);
  // const { grid_view, filtered_products: products, pages, page } = productView;

  // useEffect(() => {
  //   dispatch(allProducts(keyword, pageNumber));
  // }, [dispatch, keyword, pageNumber]);

  if (grid_view === false) {
    return <ListView products={products} />;
  } else {
    return (
      <>
        <GridView products={products} />
        <PaginateProducts
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ""}
        />
      </>
    );
  }
};

export default ProductList;
