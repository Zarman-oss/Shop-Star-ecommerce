import { useState } from 'react';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Image from '../assets/images/star.png';
import { useSelector } from 'react-redux';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const logOutHandler = () => {
    console.log(logOutHandler);
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

        {/* Navbar-left side */}
        <div className="hidden md:flex ms-auto items-center gap-3">
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
            <div title={userInfo.name} id="username">
              <Link>
                <div to="/profile">Profiles</div>
              </Link>
              <div onClick={logOutHandler}>Logout</div>
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
          <li className="flex items-center space-x-3">
            <Link to="/login" className="flex items-center space-x-3">
              <FaUser className="text-xl hover:text-gray-300" />
              <span className="text-lg hover:text-gray-300">Sign-in</span>
            </Link>
          </li>
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
        </ul>
      </div>
    </header>
  );
};

export default Header;
