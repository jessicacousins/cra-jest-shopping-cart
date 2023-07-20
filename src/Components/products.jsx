import React from "react";
import ReactBootstrap from "react-bootstrap";
import axios from "axios";
import {
  Card,
  Accordion,
  Button,
  Container,
  Row,
  Col,
  Image,
  Input,
} from "react-bootstrap";

const products = [
  { name: "apples", country: "italy", cost: 3, instock: 10 },
  { name: "oranges", country: "spain", cost: 4, instock: 3 },
  { name: "beans", country: "usa", cost: 2, instock: 5 },
  { name: "cabbage", country: "usa", cost: 1, instock: 8 },
];

// ! =========Cart=============
const Cart = (props) => {
  let list = null;
  let data = props.location.data ? props.location.data : products;
  console.log(`data:${JSON.stringify(data)}`);

  return <Accordion defaultActiveKey="0">{list}</Accordion>;
};

const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  console.log(`useDataApi called`);

  useEffect(() => {
    console.log("useEffect Called");
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        console.log("FETCH FROM URl");
        if (!didCancel) {
          const attributes = result.data.data.map((item) => item.attributes);
          dispatch({ type: "FETCH_SUCCESS", payload: attributes });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

// ! =========Products=============
const Products = (props) => {
  const [items, setItems] = React.useState(products);
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const { Fragment, useState, useEffect, useReducer } = React;
  const [query, setQuery] = useState("http://localhost:1337/api/products");
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "http://localhost:1337/api/products",
    {
      data: [],
    }
  );
  console.log(`Rendering Products ${JSON.stringify(data)}`);

  const addToCart = (e) => {
    let name = e.target.name;
    let itemIndex = items.findIndex((item) => item.name === name);
    if (itemIndex === -1) return;

    let updatedItems = [...items];
    let item = { ...updatedItems[itemIndex] };
    if (item.instock > 0) {
      item.instock -= 1;
      updatedItems[itemIndex] = item;
      setItems(updatedItems);
      setCart([...cart, item]);
    }
  };

  const deleteCartItem = (delIndex) => {
    let newCart = cart.filter((item, i) => delIndex !== i);
    let target = cart.filter((item, index) => delIndex === index);
    let newItems = items.map((item, index) => {
      if (item.name === target[0].name) item.instock = item.instock + 1;
      return item;
    });
    setCart(newCart);
    setItems(newItems);
  };

  let list = items.map((item, index) => {
    let n = index + 1049;
    let uhit = "https://picsum.photos/id/" + n + "/50/50";
    return (
      <li key={index}>
        <Image src={uhit} width={70} roundedCircle />
        <Card variant="primary" className="product-card">
          {item.name}:${item.cost}-Stock={item.instock}
        </Card>
        <Button
          className="addToCartInput"
          name={item.name}
          type="submit"
          onClick={addToCart}
        >
          + {item.name}
        </Button>
      </li>
    );
  });

  let cartList = cart.map((item, index) => {
    return (
      <Accordion.Item key={1 + index} eventKey={1 + index}>
        <Accordion.Header>{item.name}</Accordion.Header>
        <Accordion.Body
          onClick={() => deleteCartItem(index)}
          eventKey={1 + index}
        >
          $ {item.cost} from {item.country}
        </Accordion.Body>
      </Accordion.Item>
    );
  });

  let finalList = () => {
    let total = checkOut();
    let final = cart.map((item, index) => {
      return (
        <div key={index} index={index}>
          {item.name}
        </div>
      );
    });
    return { final, total };
  };

  const checkOut = () => {
    let costs = cart.map((item) => item.cost);
    const reducer = (accum, current) => accum + current;
    let newTotal = costs.reduce(reducer, 0);
    console.log(`total updated to ${newTotal}`);
    return newTotal;
  };

  // ! original restock working function
  // const restockProducts = () => {
  //   const url = "http://localhost:1337/api/products";
  //   doFetch(url);
  //   let newItems = data.map((item) => {
  //     return {
  //       name: item.name,
  //       country: item.country,
  //       cost: item.cost,
  //       instock: item.instock,
  //     };
  //   });
  //   setItems(newItems);
  // };

  // * new restock function
  const restockProducts = () => {
    const url = "http://localhost:1337/api/products";
    doFetch(url);
    let newItems =
      data.length > 0
        ? data.map((item) => ({
            name: item.name,
            country: item.country,
            cost: item.cost,
            instock: item.instock,
          }))
        : [];
    setItems(newItems);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="header">Product List</h1>
          <ul style={{ listStyleType: "none" }}>{list}</ul>
        </Col>
        <Col>
          <h1 className="header">Cart Contents</h1>
          <Accordion defaultActiveKey="0">{cartList}</Accordion>
        </Col>
        <Col>
          <h1 className="header">CheckOut</h1>
          <Button onClick={checkOut}>CheckOut $ {finalList().total}</Button>
          <div> {finalList().total > 0 && finalList().final} </div>
        </Col>
      </Row>
      <Row>
        <form
          onSubmit={(event) => {
            restockProducts(`http://localhost:1337/api/${query}`);
            console.log(`Restock called on ${query}`);
            console.log(`Restock called on http://localhost:1337/api/${query}`);
            event.preventDefault();
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">ReStock Products</button>
        </form>
      </Row>
    </Container>
  );
};

export default Products;
