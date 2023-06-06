
import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

const Products = () => {
  const [product, setProduct] = useState([]);

  const getCategories = () => {
    axios
      .get(`${BaseUrl}getproduct`)
      .then((response) => {
        const categoriesData = response.data.data;
        setProduct(categoriesData);
      })
      .catch((error) => {
        console.log("error==>", error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Container>
      <Table style={{ marginTop: 20 }} striped bordered hover>
        <thead>
          <tr>
            <th>S.no</th>
            <th>product ID</th>
            <th>product Image</th>
            <th>product Name</th>
            <th>product price</th>
            <th>product category</th>
            <th>product description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.map((product, index) => (
            <tr key={product.product_id}>
              <td>{index + 1}</td>
              <td>{product.product_id}</td>
              <td>
                <img
                  src={`http://localhost:3000/${product.product_image}`}
                  alt="product Image"
                  style={{ height: "50px", width: "50px" }}
                />
              </td>
              <td>{product.product_name}</td>

              <td>{product.product_price}</td>
              <td>{product.product_category}</td>
              <td>{product.product_description}</td>
             

              <td>
                <Button variant="danger">
                  <AiFillDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Products;
