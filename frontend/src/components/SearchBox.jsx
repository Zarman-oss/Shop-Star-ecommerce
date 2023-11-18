import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
    <div>
      <form onSubmit={submitHandler} className="md:flex items-center">
        <div className=" flex">
          <input
            placeholder="Search products"
            name="q"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded-md py-1 px-2 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm text-black w-full"
          />
          {/* Button */}
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-2 px-4 ml-2 rounded transition duration-300 ease-in-out text-xs"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
