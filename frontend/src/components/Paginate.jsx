import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Paginate = ({ pages, page, isAdmin }) =>
  pages > 1 && (
    <div className="flex justify-center my-4">
      <ul className="flex list-none rounded border border-gray-300">
        {[...Array(pages).keys()].map((x) => (
          <li
            key={x + 1}
            className={`${
              x + 1 === page ? 'bg-gray-700' : 'bg-gray-200'
            } border-round border-gray-300`}
          >
            <Link
              key={x + 1}
              to={
                !isAdmin
                  ? `/products/page/${x + 1}`
                  : `/admin/products/page/${x + 1}`
              }
              className={`block py-1 px-2 text-sm text-white hover:text-white hover:bg-gray-500 ${
                x + 1 === page ? 'active' : ''
              }`}
            >
              {x + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

Paginate.propTypes = {
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default Paginate;
