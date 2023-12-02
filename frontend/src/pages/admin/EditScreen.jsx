import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useUpdateProductMutation,
  useGetProductsDetailsQuery,
  useUploadProductImageMutation,
} from '../../slices/productApiSlice';
import Message from '../../components/Message';

const EditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductsDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.success('product updated successfully');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Link
        to="/admin/productlist"
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center space-x-2 mb-2"
      >
        <button className="text-sm sm:text-base md:text-lg lg:text-xl px-2   py-1 sm:py-2 sm:px-2 md:px-3 md:py-2 lg:px-4 lg:py-2">
          Go Back
        </button>
      </Link>
      <FormContainer>
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-semibold mb-6 text-center">
          Edit Product
        </h1>

        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message type="warning">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            {/* name  */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <h2 className="text-2xl">Name</h2>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
            </div>
            {/* Price */}{' '}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <h2 className="text-2xl">Price</h2>
              </label>
              <input
                id="name"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
            </div>
            {/* Image Upload*/}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                <h2 className="text-2xl">Upload Image </h2>
              </label>
              <input
                id="image"
                type="text"
                placeholder="Enter Image Url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
              <input
                id="nameInput"
                type="file"
                onChange={uploadFileHandler}
                className=" py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
              {loadingUpload && <Loader />}
            </div>
            {/* brand */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <h2 className="text-2xl">Brand</h2>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
            </div>
            {/* countInStock */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <h2 className="text-2xl">Count In Stock</h2>
              </label>
              <input
                id="name"
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
            </div>
            {/* category */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <h2 className="text-2xl">Category</h2>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
            </div>
            {/* description */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <h2 className="text-2xl">Description</h2>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter category"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
            </div>
            {/* Update Button */}
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs"
            >
              Update
            </button>
            {isLoading && <Loader />}
          </form>
        )}
      </FormContainer>
    </div>
  );
};

export default EditScreen;
