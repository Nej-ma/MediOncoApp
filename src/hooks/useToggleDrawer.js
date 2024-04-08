import { DrawerActions } from '@react-navigation/native';
import { useAuthContext } from '../../../context/authContext';
const useToggleDrawer = (navigation) => {
  const { isLoggedIn } = useAuthContext();

  const toggleDrawer = () => {
    if (isLoggedIn) {
      navigation.dispatch(DrawerActions.toggleDrawer());
    }
  };

  return toggleDrawer;
};

export default useToggleDrawer;
