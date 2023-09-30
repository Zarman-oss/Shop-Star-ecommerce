import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="py-4 flex-1">
          <div className="container mx-auto px-4 text-3xl">
            <Outlet />
          </div>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
