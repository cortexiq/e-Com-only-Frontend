import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

const ProductEditScreen = (location) => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [shipping, setShipping] = useState();
  const [colors, setColors] = useState([]);
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const navigate = useNavigate();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(listProductDetails(id));

      //  navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setShipping(product.shipping);
        setColors(product.colors);
        setColor1(product.colors[0]);
        setColor2(product.colors[1]);
        setColor3(product.colors[2]);
      }
    }
  }, [product, dispatch, id, navigate, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const options = [
    "#000000",
    "#0000FF",
    "#FF0000",
    "#FFFF00",
    "#008000",
    "#800080",
    "#FFA500",
  ];

  console.log(color1, color2, color3);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        shipping,
        colors: [color1, color2, color3],
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              {/* <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadImageFileHandler}
              ></Form.File> */}
              <Form.Group controlId='formFile' className='mb-3'>
                <Form.Control type='file' onChange={uploadFileHandler} />
              </Form.Group>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='shipping'>
              <Form.Label>Free Shipping?</Form.Label>
              <div className='form-control'>
                <label htmlFor='shipping'>Free Shipping </label>
                <input
                  type='checkbox'
                  name='shipping'
                  id='shipping'
                  onChange={(e) => {
                    setShipping(e.target.checked);
                  }}
                  checked={shipping}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Choose colors</Form.Label>

              <div className='form-control'>
                <Wrapper>
                  {/* color1 */}
                  <div className='colors'>
                    {options.map((c, index) => {
                      return (
                        <button
                          key={index}
                          name='color'
                          style={{ background: c }}
                          className={`${
                            color1 === c ? "color-btn active" : "color-btn"
                          }`}
                          data-color={c}
                          onClick={(e) => {
                            setColor1(e.target.dataset.color);
                          }}
                        >
                          {color1 === c ? <FaCheck /> : null}
                        </button>
                      );
                    })}
                  </div>
                  {/* color2 */}
                  <div className='colors'>
                    {options.map((c, index) => {
                      return (
                        <button
                          key={index}
                          name='color'
                          style={{ background: c }}
                          className={`${
                            color2 === c ? "color-btn active" : "color-btn"
                          }`}
                          data-color={c}
                          onClick={(e) => {
                            setColor2(e.target.dataset.color);
                          }}
                        >
                          {color2 === c ? <FaCheck /> : null}
                        </button>
                      );
                    })}
                  </div>
                  {/* color3 */}
                  <div className='colors'>
                    {options.map((c, index) => {
                      return (
                        <button
                          key={index}
                          name='color'
                          style={{ background: c }}
                          className={`${
                            color3 === c ? "color-btn active" : "color-btn"
                          }`}
                          data-color={c}
                          onClick={(e) => {
                            setColor3(e.target.dataset.color);
                          }}
                        >
                          {color3 === c ? <FaCheck /> : null}
                        </button>
                      );
                    })}
                  </div>
                </Wrapper>
              </div>
            </Form.Group>
            <Form.Group controlId='colors'>
              <Form.Label> </Form.Label>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
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

export default ProductEditScreen;
