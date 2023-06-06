import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { BaseUrl } from "../../BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddCategory = () => {
  const initialData = {
    // login_ID: "fgfgfdghfdgh",
    category_id: "",
    category_image: "",
    category_name: "",
    is_active: true,
  };
  const [categoryData, setCategoryData] = useState(initialData);
  console.log("categoryData", categoryData);

  const handleFileInputChange = async (event) => {
    try {
      const selectedFile = event.target.files[0];

      const formData = new FormData();
      formData.append("category-image", selectedFile);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(`${BaseUrl}categoryimage`, formData, config)
        .then((response) => {
          setCategoryData({
            ...categoryData,
            category_image: response.data.image,
          });
        })
        .catch((error) => {
          console.log("error==>", error);
        });
    } catch (error) {
      console.log("error===>", error);
      // Handle the error
    }
  };
  const navigate = useNavigate();
  const sendCategoryToDB = () => {
    let flag = Object.values(categoryData);
    let flag1 = flag.some((e, i) => e == '');
    if (flag1) {
      alert('Required Fields Are Missing')
      return;
    }
    axios
      .post(`${BaseUrl}addCategory`, categoryData)
      .then(res => {
        console.log('res.data', res.data);
        alert('Category Submit Sucessfully')
        navigate('/Dashboard')
        setCategoryData(initialData)
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: 20,
      }}
    >
      <h1 style={{color:'grey'}}>Add Category</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <input
          className="form__input"
          type="email"
          value={categoryData.category_id}
          placeholder="category id"
          onChange={(e) =>
            setCategoryData({ ...categoryData, category_id: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <input
          className="form__input"
          type="email"
          value={categoryData.category_name}
          placeholder="category name"
          onChange={(e) =>
            setCategoryData({ ...categoryData, category_name: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <input
          className="form-control form__input"
          type="file"
          onChange={handleFileInputChange}
        />
      </Form.Group>
      <button
        className="button-sub px-4"
        type="submit"
        onClick={sendCategoryToDB}
      >
        Submit
      </button>
    </div>
  );
};

export default AddCategory;
