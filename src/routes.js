import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdVerifiedUser,
  MdOutlineVerifiedUser,
  MdSpatialTracking,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import Register from "views/auth/register/register";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
    visible: true,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  {
    name: "Users",
    layout: "/admin",
    icon: (
      <Icon
        as={MdOutlineVerifiedUser}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    path: "/data-tables",
    component: DataTables,
    visible: true,
  },
  {
    name: "Requests",
    layout: "/admin",
    icon: (
      <Icon as={MdSpatialTracking} width="20px" height="20px" color="inherit" />
    ),
    path: "/data-tables",
    component: DataTables,
    visible: true,
  },
  {
    name: "Vendors",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: NFTMarketplace,
    secondary: true,
    visible: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/data-tables",
    component: DataTables,
    visible: true,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
    visible: true,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    visible: false,
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  {
    name: "Sign up",
    layout: "/auth",
    path: "/sign-up",
    visible: false,
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: Register,
  },
];

export default routes;
