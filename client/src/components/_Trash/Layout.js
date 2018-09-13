import React from 'react';
import Aux from '../../hoc/Aux';
import ResponsiveDrawer from '../../components/Navigation/ResponsiveDrawer/ResponsiveDrawer';
import classes from './Layout.css';
import Footer from '../../components/Navigation/Footer/Footer';
import LayoutBg from '../../assets/bg_l.png';


const Layout = (props) => (
  <Aux>
    <ResponsiveDrawer login={props.login} logout={props.logout}/>
    <main className={classes.Layout} style={{backgroundImage: `url(${LayoutBg})`}}>{props.children}</main>
    <Footer />
  </Aux>
);

export default Layout;
