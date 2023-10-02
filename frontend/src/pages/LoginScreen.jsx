import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      console.log('User info:', userInfo); // Add this line
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // Submit Button
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      toast.error('Please enter both email and password.');
      return;
    }
    try {
      console.log('Logging in with email:', email); // Add this line
      const res = await login({ email, password }).unwrap();
      console.log('Login response:', res); // Add this line
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      console.error('Login error:', err); // Add this line
      const errorMessage =
        err?.data?.message || err.error || 'An error occurred.';
      toast.error(errorMessage);
    }
  };

  console.log('Rendering LoginScreen'); // Add this line

  return (
    <FormContainer>
      <h1 className="text-4xl font-semibold mb-6 text-center">Sign In</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            <h2 className="text-2xl">Email Address</h2>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            <h2 className="text-2xl"> Password </h2>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs"
          disabled={isLoading}
        >
          Sign In
        </button>

        {isLoading && <Loader />}
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">
          New Customer?{' '}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className="text-blue-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
