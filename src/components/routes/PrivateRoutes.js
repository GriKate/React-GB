import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = ({ component }) => {
  // деструктуризацией достаем из объекта свойство isAuth
  const user = useSelector((store) => store.profilesReducer[0]); //[{}]
  // console.log(user);
  const isAuth = user.isAuth;
  // console.log(isAuth);

  if (!isAuth) {
    return <Navigate to="/signin" />;
  }

  // вернём проброшенный пропсами компонент, или данные, кот. он в себя принимает
  return component ? component : <Outlet />;
};
