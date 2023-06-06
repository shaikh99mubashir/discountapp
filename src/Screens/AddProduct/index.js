import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../BaseUrl";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const initialData = {
    // login_ID: "fgfgfdghfdgh",
        product_image:"",
        product_name:"",
        product_id:"",
        product_price:"",
        product_category:"",
        product_description:"",
        product_Availability:true,
  };
  const [productData, setProductData] = useState(initialData);
  console.log('productData==>0',productData);
  const getCategories = () => {
    axios
      .get(`${BaseUrl}getcategories`)
      .then((response) => {
        const categoriesData = response.data.data;
        console.log(categories);
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.log("error==>", error);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleFileInputChange = async (event) => {
    try {
      const selectedFile = event.target.files[0];

      const formData = new FormData();
      formData.append("product-image", selectedFile);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(`${BaseUrl}productimage`, formData, config)
        .then((response) => {
            setProductData({
            ...productData,
            product_image: response.data.image,
          });
        })
        .catch((error) => {
          console.log("error==>", error);
        });
    } catch (error) {
      console.log("error===>", error);
    }
  };

  const navigate = useNavigate();
  const sendProductToDB = () => {
    let flag = Object.values(productData);
    let flag1 = flag.some((e, i) => e == '');
    if (flag1) {
      alert('Required Fields Are Missing')
      return;
    }
    axios
      .post(`${BaseUrl}addProduct`, productData)
      .then(res => {
        console.log('res.data', res.data);
        alert('productData Submit Sucessfully')
        navigate('/Dashboard')
        setProductData(initialData)
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
      <h1 style={{color:'grey'}}>Add Product</h1>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <select
        className="form__input"
        value={productData.product_category}
        onChange={(e) =>
            setProductData({ ...productData, product_category: e.target.value })
        }
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <input
          className="form__input"
          type="email"
          value={productData.product_id}
          placeholder="product_id"
          onChange={(e) =>
            setProductData({ ...productData, product_id: e.target.value })
          }
        />
      </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <input
          className="form__input"
          type="email"
          value={productData.product_name}
          placeholder="product_name"
          onChange={(e) =>
            setProductData({ ...productData, product_name: e.target.value })
          }
        />
      </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <input
          className="form__input"
          type="email"
          value={productData.product_price}
          placeholder="product_price"
          onChange={(e) =>
            setProductData({ ...productData, product_price: e.target.value })
          }
        />
      </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <input
          className="form__input"
          type="email"
          value={productData.product_description}
          placeholder="product_description"
          onChange={(e) =>
            setProductData({ ...productData, product_description: e.target.value })
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
        onClick={sendProductToDB}
      >
        Submit
      </button>
    </div>
  );
};

export default AddProduct;
