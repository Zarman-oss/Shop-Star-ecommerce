import { FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-4  w-full px-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center">
          <p className="text-sm">
            Shop Star &copy; {currentYear} All rights reserved.
          </p>
          <a
            href="https://twitter.com/your_twitter_handle"
            className="text-blue-400 ml-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-xl hover:text-blue-600" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
