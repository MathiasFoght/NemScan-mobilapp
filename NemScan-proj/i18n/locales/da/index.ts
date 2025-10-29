import common from './common.json'
import tabs from './navbar/tabs.json'
import dashboard from './screens/dashboard.json'
import login from './screens/login.json'
import myProfile from './screens/myProfile.json'
import productNotFound from './screens/productNotFound.json'
import scanner from './screens/scanner.json'
import settings from './screens/settings.json'
import start from './screens/start.json'
import statistics from './screens/statistics.json'
import product from './screens/product.json'

export default {
    common,
    navbar: {
        tabs
    },
    screens: {
        start,
        login,
        scanner,
        settings,
        myProfile,
        statistics,
        productNotFound,
        dashboard,
        product
    },
};