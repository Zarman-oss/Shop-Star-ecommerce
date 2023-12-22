import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row gap-8">
          {/* Logo and About section */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="text-2xl font-bold mb-4">
              Shop Star
            </Link>
            <p className="text-sm text-center md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="flex justify-center md:justify-start space-x-3 mt-4">
              <Link to="#">
                <FaFacebook className="text-xl hover:text-gray-300" />
              </Link>
              <Link to="#">
                <FaTwitter className="text-xl hover:text-gray-300" />
              </Link>
              <Link to="#">
                <FaInstagram className="text-xl hover:text-gray-300" />
              </Link>
            </div>
          </div>

          {/* Back to Top Button */}

          {/* Back to Top Button */}
          {showScrollButton && (
            <div className="fixed bottom-4 right-4">
              <button
                onClick={scrollToTop}
                className="bg-gray-900 text-white px-2 py-2 rounded-xl hover:bg-gray-400 focus:outline-none"
              >
                <FaArrowUp className="text-lg" />
              </button>
            </div>
          )}
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="text-sm">
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/">Shop</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          {/* <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-sm text-center md:text-left">
              123 Street Name, City, Country
            </p>
            <p className="text-sm text-center md:text-left">
              info@shopstar.com
            </p>
          </div> */}

          {/* Newsletter */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4 text-center md:text-left">
              Subscribe to our newsletter for updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white py-2 px-3 rounded-l-md focus:outline-none"
              />
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-r-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-800 py-2">
        <div className="container mx-auto text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Shop Star. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
