import * as history from 'history';
import { BrowserRouter } from 'react-router-dom';
import Layouts from './layout/layouts';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Transaksi from './pages/transaksi';
import AddTransaksi from './pages/add-transksi';
import Keranjang from './pages/keranjang';

function App() {
  const browserHistory = history.createBrowserHistory();

  return (
    <BrowserRouter history={browserHistory}>
      <Routes>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='home' element={<Home />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='transaksi' element={<Transaksi />} />
        <Route path='tambah-transaksi' element={<AddTransaksi />} />
        <Route path='keranjang' element={<Keranjang />} />
        {/* <Layouts>
        </Layouts> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
