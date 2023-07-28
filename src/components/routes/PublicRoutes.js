import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export const PrivateRoutes = ({ component }) => {
  // деструктуризацией достаем из объекта свойство isAuth
  const { isAuth } = useSelector((store) => store.profile);

  if (isAuth) {
    // return <Navigate to="/signin" />
  }

  // вернём проброшенный пропсами компонент, или данные, кот. он в себя принимает
  return component ? component : <Outlet />;
};
