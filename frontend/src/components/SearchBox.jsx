import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword('');
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="md:flex items-center">
      <form onSubmit={submitHandler} className="flex w-full">
        <div className="flex items-center w-full bg-gray-800 rounded-md overflow-hidden">
          <input
            placeholder="Search products"
            name="q"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full py-2 px-4 text-white bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gray-600 text-white hover:bg-gray-700 focus:outline-none px-3 py-2"
          >
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
