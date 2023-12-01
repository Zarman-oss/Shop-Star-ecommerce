import { useState } from 'react';
import { FaUser, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import Image from '../assets/images/Logo-new.png';
import { useSelector, useDispatch } from 'react-redux';
import SearchBox from './SearchBox';
// import { reset } from 'nodemon';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logOutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white py-2 px-3 relative">
      <div className="container mx-auto flex justify-between items-center py-2">
        <Link to="/" className="text-2xl">
          <img
            src={Image}
            alt="Shop Star"
            className="w-auto h-12 md:h-16 lg:h-20"
          />
        </Link>

        {/* Navbar-right side */}
        <div className="hidden md:flex ms-auto items-center gap-3">
          <div className="flex ">
            <SearchBox />
          </div>

          <Link
            to="/cart"
            className="flex items-center space-x-1 text-xl hover:text-gray-300"
          >
            <FaShoppingCart />
            <span className="text-lg hover:text-gray-300">Cart</span>
            {cartItems.length > 0 && (
              <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center ml-1">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </div>
            )}
          </Link>
          {userInfo ? (
            <div className="relative group">
              <div
                className="text-xl hover:text-gray-300 focus:outline-none flex items-center space-x-1 cursor-pointer"
                onClick={toggleMenu}
              >
                <FaUser />
                <span className="text-lg hover:text-gray-300">
                  {userInfo.name}
                </span>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform  ${
                      isMenuOpen ? 'rotate-180' : 'rotate-0'
                    } absolute top-1/2 mt-2 left-5 origin-center`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {isMenuOpen && (
                <div className="">
                  <ul className="absolute left-0 mt-2 bg-gray-900 text-white py-2 px-4 space-y-2 rounded-md">
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <button
                        onClick={logOutHandler}
                        className="w-full text-left focus:outline-none"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xl hover:text-gray-300 flex items-center space-x-1"
            >
              <FaUser />
              <span className="text-lg hover:text-gray-300">Sign-in</span>
            </Link>
          )}
          {/* Admin version of nav-bar */}
          {userInfo && userInfo.isAdmin && (
            <div className="relative group">
              <div
                className="text-xl hover:text-gray-300 focus:outline-none flex items-center space-x-1 cursor-pointer"
                onClick={toggleMenu}
              >
                <FaUserCircle />
                <span className="text-lg hover:text-gray-300">Admin</span>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform  ${
                      isMenuOpen ? 'rotate-180' : 'rotate-0'
                    } absolute top-1/2 mt-2 left-5 origin-center`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {/* Dropdown admin version */}
              {isMenuOpen && (
                <div className="">
                  <ul className="absolute left-0 mt-2 bg-gray-900 text-white py-2 px-4 space-y-2 rounded-md">
                    <li>
                      <Link to="/admin/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/admin/userlist">Users</Link>
                    </li>
                    <li>
                      <Link to="/admin/productlist">Products</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* hamburger button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="lg:hidden ml-auto text-2xl leading-none focus:outline-none"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            &#9776;
          </button>
        </div>
      </div>

      {/* hamburger menu with animation */}
      <div
        className={`md:hidden top-14 left-0 right-0 bg-gray-900 ${
          isMenuOpen ? 'menu-open' : 'opacity-0 transform scale-y-0'
        } origin-top transition-transform ease-in-out duration-300 absolute`}
      >
        <ul className="text-white p-4 space-y-2">
          {/* User Info, Profile, and Logout links */}
          {userInfo && isMenuOpen && (
            <div className="text-white text-xl py-2 px-4">
              <div className="mb-2">{userInfo.name}</div>

              <Link to="/profile" className="text-lg hover:text-gray-300">
                Profile
              </Link>
              <div className=" flex  ">
                <SearchBox />
              </div>
              <button
                onClick={logOutHandler}
                className="w-full text-left focus:outline-none text-lg hover:text-gray-300"
              >
                Logout
              </button>
            </div>
          )}

          {/* Admin version of nav-bar */}
          {userInfo && userInfo.isAdmin && (
            <div className="text-white text-xl py-2 px-4">
              {/* <div className=" flex  ">
                <SearchBox />
              </div> */}
              {/* <div className="mb-2">Admin</div> */}
              <Link
                to="/admin/orderlist"
                className="text-lg hover:text-gray-300"
              >
                Orders
              </Link>
            </div>
          )}
          {/* Cart and Sign-in links */}
          <li className="flex items-center space-x-3">
            <Link to="/cart" className="flex items-center space-x-3">
              <FaShoppingCart className="text-xl hover:text-gray-300" />
              <span className="text-lg hover:text-gray-300">Cart</span>
              {cartItems.length > 0 && (
                <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center ml-1">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </Link>
          </li>
          {/* Sign-in link */}
          {!userInfo && isMenuOpen && (
            <li className="flex items-center space-x-3">
              <Link to="/login" className="flex items-center space-x-3">
                <FaUser className="text-xl hover:text-gray-300" />
                <span className="text-lg hover:text-gray-300">Sign-in</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
