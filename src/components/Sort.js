import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { setGridView, setListView, updateSort } from "../actions/filterAction";
import styled from "styled-components";
const Sort = () => {
  const [match, setMatch] = useState("");

  const dispatch = useDispatch();

  const productView = useSelector((state) => state.productView);
  const { grid_view, filtered_products: products } = productView;

  useEffect(() => {
    dispatch(updateSort(match));
  }, [dispatch, match]);

  const gridHandler = () => {
    dispatch(setGridView());
  };

  const listHandler = () => {
    dispatch(setListView());
  };

  return (
    <Wrapper>
      <div className='btn-container'>
        <button
          type='button'
          className={`${grid_view ? "active" : null}`}
          onClick={gridHandler}
        >
          <BsFillGridFill />
        </button>
        <button
          type='button'
          className={`${!grid_view ? "active" : null}`}
          onClick={listHandler}
        >
          <BsList />
        </button>
      </div>
      <p>{products.length} products found</p>
      <hr />
      <form>
        <label htmlFor='sort'>sort by </label>
        <select
          name='sort'
          id='sort'
          className='sort-input'
          onChange={(e) => setMatch(e.target.value)}
        >
          <option value='price-lowest' name='price-lowest'>
            price (lowest)
          </option>
          <option value='price-highest'>price (highest)</option>
          <option value='name-a'>a-z</option>
          <option value='name-z'>z-a</option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 2rem;
      border-radius: var(--radius);
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 2rem;
      }
    }
    .active {
      background: black;
      color: white;
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default Sort;
