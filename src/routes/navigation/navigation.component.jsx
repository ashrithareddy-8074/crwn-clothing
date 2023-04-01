import { Fragment, useContext } from 'react';
import {Outlet, Link} from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import {NavigationContainer, NavLink, NavLinks, LogoContainer} from './navigation.styles.jsx';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer className='logo-container' to='/'>
          <CrwnLogo className='logo'/>
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>
              SHOP
            </NavLink>
            {
              currentUser ? 
              (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>):
              ( <Link className='nav-link' to='/auth'>
              SIGN-IN
            </Link>)
            }
           <CartIcon/>
          </NavLinks>
          {isCartOpen && <CartDropdown/> }
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

 export default Navigation;