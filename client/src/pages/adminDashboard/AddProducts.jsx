import React from "react";
import FormRow from "../../componenets/FormRow";
import FormRowSelect from "../../componenets/FormRowSelect";
import Alert from "../../componenets/Alert";
import FormRowFile from "../../componenets/FormRowFile";
import FormTextArea from "../../componenets/FormTextArea";
import { useAppContext } from "../../context/appContext";


const AddProducts = () => {
  const {
    name,
    price,
    description,
    flavour,
    image,
    typeOptions,
    type,
    category,
    categoryOptions,
    freeDelivery,
    freeDeliveryOptions,
    inventory,
    handleInputChange,
    uploadImage,
    showAlert,
    isEdit,
    displayAlert,
    createProduct,
    updateProduct
  } = useAppContext();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleInputChange({ name, value });
  };
  const handleFileChange = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    uploadImage(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description || !image || !flavour) {
      displayAlert();
    }
    const product = {
      name,
      price,
      description,
      flavour,
      image,
      type,
      category,
      freeDelivery,
      inventory,
    };
    if (isEdit) {
      updateProduct(product);
    } else {
      createProduct(product);
    }
  };
  return (
    <main>
      <h1 className="text-center text-3xl font-bold text-thulian-pink  uppercase">
        {isEdit ? "Edit Product" : "Add Product"}
      </h1>
      <form
        className="max-w-7xl mx-auto w-full bg-thulian-pink-md rounded-lg shadow px-8 py-8 mt-8 mb-6"
        onSubmit={handleSubmit}
      >
        {showAlert && <Alert />}
        <FormRowFile
          type="file"
          name="image"
          labelText="Product Image"
          handleChange={handleFileChange}
        />
        <FormRow
          type="text"
          name="name"
          labelText="Product Name"
          placeholder="Black Forest"
          value={name}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="price"
          labelText="Product Price"
          placeholder="999"
          value={price}
          handleChange={handleChange}
        />
        <FormTextArea
          name="description"
          labelText="Product Description"
          placeholder="Write about the product here"
          value={description}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="flavour"
          labelText="Flavour"
          placeholder="vanilla"
          value={flavour}
          handleChange={handleChange}
        />
        <div className="lg:flex gap-x-16">
          <FormRowSelect
            name="type"
            value={type}
            labelText="Product Type"
            list={typeOptions}
            handleChange={handleChange}
          />
          <FormRowSelect
            name="category"
            value={category}
            labelText="Product Category"
            list={categoryOptions}
            handleChange={handleChange}
          />
          <FormRowSelect
            name="freeDelivery"
            value={freeDelivery}
            labelText="Free Delivery"
            list={freeDeliveryOptions}
            handleChange={handleChange}
          />
        </div>
        <FormRow
          type="text"
          value={inventory}
          name="inventory"
          labelText="Products In Inventory"
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="bg-white text-thulian-pink py-2 px-6 rounded-3xl text-lg font-semibold capitalize mt-4  hover:bg-thulian-pink-very-light"
        >
          {isEdit ? "Save Changes" : "Create Product"}
        </button>
      </form>
    </main>
  );
};

export default AddProducts;
