import { useState } from "react";

import "./NewProduct.css";
import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFiles] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file).then(url => {
      console.log(url);
      addNewProduct(product, url);
    })
    // 제품의 사진을 Cloudinary에 업로드하고 URL을 획득합니다.
  };

  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFiles(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  return (
    <div className="upload-form">
      <form onSubmit={handleSubmit}>
        <ul className="form-content">
          <li>
            <div className="title">Upload</div>
          </li>
          <li><span>Title</span></li>
          <li>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Product-Name"
              value={product.title ?? ""}
            />
          </li>
          <li><span>Price</span></li>
          <li>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              placeholder="Price"
              value={product.price ?? ""}
            />
          </li>
          <li><span>Description</span></li>
          <li>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={product.description ?? ""}
              placeholder="Description"
            />
          </li>
          <li><span>Image</span></li>
          <li>
            <input
              type="file"
              onChange={handleChange}
              accept="image/*"
              name="file"
              required
            />
          </li>
          <li>
            <div className="submit-btn">
              <button
                type="submit"
                className="bg-blue-600 p-2 rounded-xl hover:text-white transition duration-300 hover:bg-blue-950"
              >
                UpLoad
              </button>
            </div>
          </li>
        </ul>
        <div className="imgs-show">
         
          {file && <img src={URL.createObjectURL(file)} alt="local file" />}
        </div>
      </form>
    </div>
  );
}
