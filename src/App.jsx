import { useDispatch } from 'react-redux';
import { Header } from 'components/index.js';
import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { fetchCurrency } from 'reduxState/operetions.js';
import { setDefaultCurrency } from 'reduxState/currencySlice.js';

const Home = lazy(() => import('./pages/Home.jsx'));
const Rates = lazy(() => import('./pages/Rates.jsx'));
export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    async function success(pos) {
      const crd = pos.coords;

      dispatch(
        fetchCurrency({
          latitude: crd.latitude,
          longitude: crd.longitude,
        }),
      );
    }

    function error(err) {
      dispatch(setDefaultCurrency('USD'));
      console.log(err);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="rates" element={<Rates />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};
