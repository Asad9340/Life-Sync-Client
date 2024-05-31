import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import NabBar from '../Pages/Shared/NavBar/NabBar';

function Root() {
  return (
    <div>
      <NabBar/>
      <div className="max-w-6xl mx-auto">
        <div className="mx-2 lg:mx-0">
          <Outlet />
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default Root;
