import * as history from 'history';
import { BrowserRouter } from 'react-router-dom';
import Layouts from './layout/layouts';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  const browserHistory = history.createBrowserHistory();

  return (
    <BrowserRouter history={browserHistory}>
      <Routes>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
        <Layouts>
        <Route path='dashboard' element={<div>Dashboard</div>} />
        </Layouts>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
