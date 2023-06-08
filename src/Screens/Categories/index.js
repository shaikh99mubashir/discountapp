import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios
      .get(`${BaseUrl}getcategories`)
      .then((response) => {
        const categoriesData = response.data.data;
        setCategories(categoriesData);
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
            <th>Category ID</th>
            <th>Category Image</th>
            <th>Category Name</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.category_id}>
              <td>{index + 1}</td>
              <td>{category.category_id}</td>
              <td>
                <img
                  src={require('../../Images/biryani.jpg')}
                  alt="Category Image"
                  style={{ height: "50px", width: "50px" }}
                />
              </td>
              <td>{category.category_name}</td>

              <td>
                {category.is_active ? (
                  <label>
                    <input
                      type="checkbox"
                      checked
                    />
                  </label>
                ) : (
                  <label >
                    <input
                      type="checkbox"
                    />
                  </label>
                )}
              </td>

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

export default Categories;
