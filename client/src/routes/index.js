import { v4 as uuidv4 } from "uuid";

import routesConfig from "./config/routes";
// Layouts
// import { HeaderOnly } from "./layouts";

// Pages
import Home from "./pages/Home";
import Following from "./pages/Following";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import Search from "./pages/Search";

// Public routes
const publicRoutes = [
  { path: routesConfig.home, component: Home, key: uuidv4() },
  { path: routesConfig.following, component: Following, key: uuidv4() },
  { path: routesConfig.profile, component: Profile, key: uuidv4() },
  {
    path: routesConfig.upload,
    component: Upload,
    layout: HeaderOnly,
    key: uuidv4(),
  },
  { path: routesConfig.search, component: Search, layout: null, key: uuidv4() },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
