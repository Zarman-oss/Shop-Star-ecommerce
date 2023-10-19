// import { Link, useParams } from 'react-router-dom';
// import Message from '../components/Message';
// import Loader from '../components/Loader';
// import { useGetOrdersDetailsQuery } from '../slices/ordersApiSlice';
// import { FaDollarSign, FaPaypal } from 'react-icons/fa';

// const OrderScreen = () => {
//   const { id: orderId } = useParams('');
//   const {
//     data: order,
//     refetch,
//     isLoading,
//     error,
//   } = useGetOrdersDetailsQuery(orderId);
//   console.log(order);

//   return isLoading ? (
//     <Loader />
//   ) : error ? (
//     <Message type="error" />
//   ) : (
//     <>
//       <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 text-center">
//         Order Page
//       </h1>
//       <div className="mt-3">
//         <Link
//           to="/"
//           className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center space-x-2 mb-4"
//         >
//           <button className="text-sm sm:text-base md:text-lg lg:text-xl px-2  m py-1 sm:py-2 sm:px-2 md:px-3 md:py-2 lg:px-4 lg:py-2">
//             Go Back
//           </button>
//         </Link>
//       </div>
//       {/* H1 */}
//       <>
//         <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
//           Order {order._id}
//         </h1>
//       </>
//       {/* First Column */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="md:col-span-8">
//           <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
//             Shipping
//           </h2>
//           <p className="text-xl md:text-2xl lg:text-3xl mb-2">
//             <strong>Name: </strong> {order.user.name}
//           </p>
//           <p className="text-xl md:text-2xl lg:text-3xl mb-2">
//             <strong>Email: </strong> {order.user.email}
//           </p>
//           <p className="text-xl md:text-2xl lg:text-3xl mb-2">
//             <strong>Address: </strong> {order.shippingAddress.address},{' '}
//             {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
//             {order.shippingAddress.country}
//           </p>
//           {order.isDelivered ? (
//             <Message type="success" message="Delivered" className="mt-4">
//               Delivered on {order.deliveredAt}
//             </Message>
//           ) : (
//             <Message type="error" message="Not Delivered" className="mt-4" />
//           )}
//         </div>

//         {/* Payment Method */}
//         <div className="md:col-span-8">
//           <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
//             Payment Method
//           </h2>
//           <p className="flex items-center">
//             <h1 className="text-lg md:text-lg lg:text-xl font-semibold mr-1">
//               Method:
//             </h1>
//             <FaPaypal className="text-xl md:text-2xl lg:text-3xl mr-2 text-blue-500" />
//             <span className="text-sm md:text-md lg:text-lg">
//               {order.paymentMethod}
//             </span>
//           </p>
//           {/* <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
//             <strong>Method: </strong> {order.paymentMethod}
//           </p> */}
//           {order.isPaid ? (
//             <Message type="success" message="Delivered">
//               Paid on {order.paidAt}
//             </Message>
//           ) : (
//             <Message type="error" message="Not Paid"></Message>
//           )}
//         </div>
//         {/* Order Items */}
//         <div className="md:col-span-8">
//           <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
//             Order Items
//           </h2>
//           {order.orderItems.map((item, index) => (
//             <div key={index}>
//               <div className="flex items-center">
//                 <div className="w-16">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full rounded"
//                   />
//                 </div>
//                 <div className="flex-1 pl-4 text-xl md:text-2xl lg:text-3xl ">
//                   <Link
//                     to={`/product/${item.product}`}
//                     className="text-blue-500 hover:underline"
//                   >
//                     {item.name}
//                   </Link>
//                 </div>
//                 {/* Price with dollar sign  */}
//                 <li className="flex items-center justify-between text-xl md:text-2xl lg:text-3xl ">
//                   <span className="flex items-center">
//                     <span className="mr-1">{item.qty} x</span>
//                     <span>
//                       {item.price}
//                       <FaDollarSign className="inline-block text-green-500 " />
//                       {' = '}
//                       {item.qty * item.price}
//                       <FaDollarSign className="inline-block text-green-500 " />
//                     </span>
//                   </span>
//                 </li>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary Card */}
//         <div className="md:col-span-1 lg:col-span-1 md:order-last lg:order-last">
//           <div className="bg-white rounded-md p-4 shadow-md">
//             <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
//               Order Summary
//             </h2>
//             <ul className="list-none p-0">
//               {/* Items */}
//               <li className="flex items-center justify-between">
//                 <span className="text-lg md:text-lg sm:text-sm">Items:</span>
//                 <span>
//                   <FaDollarSign className="inline-block text-green-500 md:mr-1" />
//                   {order.itemsPrice}
//                 </span>
//               </li>
//               {/* Shipping*/}
//               <li className="flex items-center justify-between">
//                 <span className="text-lg md:text-lg sm:text-sm">Shipping:</span>
//                 <span>
//                   <FaDollarSign className="inline-block text-green-500 md:mr-1" />
//                   {order.shippingPrice}
//                 </span>
//               </li>
//               {/* Tax Price */}
//               <li className="flex items-center justify-between">
//                 <span className="text-lg md:text-lg sm:text-sm">Tax:</span>
//                 <span>
//                   <FaDollarSign className="inline-block text-green-500 md:mr-1" />
//                   {order.taxPrice}
//                 </span>
//               </li>
//               {/* Total Price  */}
//               <li className="flex items-center justify-between">
//                 <span className="text-lg md:text-lg sm:text-sm">
//                   Total Price:
//                 </span>
//                 <span>
//                   <FaDollarSign className="inline-block text-green-500 md:mr-1" />
//                   {order.totalPrice}
//                 </span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderScreen;

import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrdersDetailsQuery } from '../slices/ordersApiSlice';
import { FaDollarSign, FaPaypal } from 'react-icons/fa';

const OrderScreen = () => {
  const { id: orderId } = useParams('');
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrdersDetailsQuery(orderId);
  console.log(order);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message type="error" />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-1">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 text-center">
          Order Page
        </h1>
        <div className="mt-3">
          <Link
            to="/"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center space-x-2 mb-4"
          >
            <button className="text-sm sm:text-base md:text-lg lg:text-xl px-2 m py-1 sm:py-2 sm:px-2 md:px-3 md:py-2 lg:px-4 lg:py-2">
              Go Back
            </button>
          </Link>
        </div>

        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Order {order._id}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              Shipping
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl mb-2">
              <strong>Name: </strong> {order.user.name}
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl mb-2">
              <strong>Email: </strong> {order.user.email}
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl mb-2">
              <strong>Address: </strong> {order.shippingAddress.address},{' '}
              {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message type="success" message="Delivered" className="mt-4">
                Delivered on {order.deliveredAt}{' '}
              </Message>
            ) : (
              <Message type="error" message="Not Delivered" className="mt-4" />
            )}
          </div>

          {/* Payment Method */}
          <div className="md:col-span-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              Payment Method
            </h2>
            <p className="flex items-center">
              <h1 className="text-lg md:text-lg lg:text-xl font-semibold mr-1">
                Method:
              </h1>
              <FaPaypal className="text-xl md:text-2xl lg:text-3xl mr-2 text-blue-500" />
              <span className="text-sm md:text-md lg:text-lg">
                {order.paymentMethod}
              </span>
            </p>
            {order.isPaid ? (
              <Message type="success" message="Delivered">
                Paid on {order.paidAt}
              </Message>
            ) : (
              <Message type="error" message="Not Paid"></Message>
            )}
          </div>

          {/* Order Items */}
          <div className="md:col-span-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Order Items
            </h2>
            {order.orderItems.map((item, index) => (
              <div key={index}>
                <div className="flex items-center">
                  <div className="w-16">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full rounded"
                    />
                  </div>
                  <div className="flex-1 pl-4 text-xl md:text-2xl lg:text-3xl ">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </div>
                  {/* Price with dollar sign  */}
                  <li className="flex items-center justify-between text-xl md:text-2xl lg:text-3xl ">
                    <span className="flex items-center">
                      <span className="mr-1">{item.qty} x</span>
                      <span>
                        {item.price}
                        <FaDollarSign className="inline-block text-green-500 " />
                        {' = '}
                        {item.qty * item.price}
                        <FaDollarSign className="inline-block text-green-500 " />
                      </span>
                    </span>
                  </li>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Card summary  */}
      <div className="md:col-span-1">
        <div className="bg-white rounded-md p-4 shadow-md">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
            Order Summary
          </h2>
          <ul className="list-none p-0">
            {/* Items */}
            <li className="flex items-center justify-between">
              <span className="text-lg md:text-lg sm:text-sm">Items:</span>
              <span>
                <FaDollarSign className="inline-block text-green-500 md:mr-1" />
                {order.itemsPrice}
              </span>
            </li>
            {/* Shipping */}
            <li className="flex items-center justify-between">
              <span className="text-lg md:text-lg sm:text-sm">Shipping:</span>
              <span>
                <FaDollarSign className="inline-block text-green-500 md:mr-1" />
                {order.shippingPrice}
              </span>
            </li>
            {/* Tax Price */}
            <li className="flex items-center justify-between">
              <span className="text-lg md:text-lg sm:text-sm">Tax:</span>
              <span>
                <FaDollarSign className="inline-block text-green-500 md:mr-1" />
                {order.taxPrice}
              </span>
            </li>
            {/* Total Price  */}
            <li className="flex items-center justify-between">
              <span className="text-lg md:text-lg sm:text-sm">
                Total Price:
              </span>
              <span>
                <FaDollarSign className="inline-block text-green-500 md:mr-1" />
                {order.totalPrice}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
