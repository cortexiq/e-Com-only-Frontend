import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getUniqueValues } from "../helpers";
import { FaCheck } from "react-icons/fa";
import { updateFilters, clearFilters } from "../actions/filterAction";

const Filters = () => {
  const { pageNumber } = useParams() || 1;

  const [match, setMatch] = useState("");
  const [type, setType] = useState();

  const dispatch = useDispatch();

  const productView = useSelector((state) => state.productView);
  const {
    filters: {
      text,
      brand,
      category,
      color,
      min_price,
      max_price,
      price,
      shipping,
    },
    all_products,
  } = productView;

  useEffect(() => {
    dispatch(updateFilters(match, type));
  }, [dispatch, match, type]);

  const categories = getUniqueValues(all_products, "category");
  const brands = getUniqueValues(all_products, "brand");
  const colors = getUniqueValues(all_products, "colors");

  const clearFiltersHandler = () => {
    dispatch(clearFilters());
    dispatch(updateFilters());
  };

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          {/* <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='search'
              style={{ background: "#F0F0F0" }}
              className='search-input'
              value={text}
              onChange={(e) => {
                setMatch(e.target.value);
                setType(e.target.name);
              }}
            />
          </div> */}
          {/* end search input */}
          {/* categories */}
          <div className='form-control'>
            <h5>category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      setType(e.target.name);
                      setMatch(e.target.textContent);
                    }}
                    type='button'
                    name='category'
                    className={`${category === c ? "active" : null}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of categories */}
          {/* brands */}
          <div className='form-control'>
            <h5>brands</h5>
            <select
              name='brand'
              value={brand}
              onChange={(e) => {
                setMatch(e.target.value);
                setType(e.target.name);
              }}
              style={{ background: "#F0F0F0" }}
              className='brand'
            >
              {brands.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of brands */}
          {/* colors */}
          <div className='form-control'>
            <h5>colors</h5>
            <div className='colors'>
              {colors.map((c, index) => {
                if (c === "All") {
                  return (
                    <button
                      key={index}
                      name='color'
                      onClick={(e) => {
                        setType(e.target.name);
                        setMatch(e.target.dataset.color);
                      }}
                      data-color='All'
                      className={`${
                        color === "All" ? "all-btn active" : "all-btn"
                      }`}
                    >
                      All
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name='color'
                    style={{ background: c }}
                    className={`${
                      color === c ? "color-btn active" : "color-btn"
                    }`}
                    data-color={c}
                    onClick={(e) => {
                      setType(e.target.name);
                      setMatch(e.target.dataset.color);
                    }}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
          {/* price */}
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>&#2547; {Number(price)}</p>
            <input
              type='range'
              name='price'
              min={Number(min_price)}
              max={Number(max_price + 1)}
              onChange={(e) => {
                setType(e.target.name);
                setMatch(e.target.value);
              }}
              value={Number(price)}
            />
          </div>
          {/* end of price */}
          {/* shipping */}

          <div className='form-control'>
            <label htmlFor='shipping'>Free Shipping </label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              onChange={(e) => {
                setType(e.target.name);
                setMatch(e.target.checked);
              }}
              checked={shipping}
            />
          </div>
          {/* end of shipping */}
        </form>
        <div className='form-control'>
          <button
            type='button'
            className='clear-btn'
            onClick={clearFiltersHandler}
          >
            {" "}
            clear filter
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    background: transparent;
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: grey;
  }
  .brand {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 1rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: darkred;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }

  .button1 {
    color: palevioletred;
    border: 2px solid palevioletred;
    background: white;

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
  }
`;

export default Filters;
