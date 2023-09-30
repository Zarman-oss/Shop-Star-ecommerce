import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { FaDollarSign, FaTrash } from 'react-icons/fa';

function ProductCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-semibold">Shopping Cart</h1>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <Message type="error" message="Your cart is empty">
          <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <div className="container mx-auto px-2 md:px-4 lg:px-6 xl:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-2 md:p-4 rounded-lg shadow-md flex flex-row"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-auto max-h-32 md:max-h-48 object-contain"
                />
                <div className="ml-4 flex-grow">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-blue-500 hover:underline text-sm md:text-base"
                  >
                    {item.name}
                  </Link>
                  <div className="text-green-700 font-semibold mt-2 text-sm md:text-base">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="mt-2">
                    <select
                      className="border rounded-md px-2 py-1 text-sm md:text-base"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Trash Button */}
                <div className="flex items-center ml-4">
                  <button
                    className="hover:text-red-600 hover:scale-105 transform transition-transform"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout Card */}
          <div className="flex mt-4 justify-between">
            <div>
              <h2 className="text-xl">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
                items)
              </h2>
              {/* total price with sign */}
              <p className="text-lg">
                <span className="text-green-700">
                  <FaDollarSign className="inline-block mr-1 mb-2" />
                  <span className="font-semibold text-2xl">
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </span>
              </p>
            </div>
            <div>
              {/* Checkout Button */}
              <button
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
                className={`bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded text-sm ${
                  cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCart;
