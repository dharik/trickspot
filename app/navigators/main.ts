import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import Home from "../screens/home";
import TrickspotMap from "../screens/browse_map";
import TrickspotList from "../screens/browse_list";
import ViewTrickSpot from "../screens/view_spot";
import About from "../screens/about";
import AddWhere from "../screens/add_where";
import AddWhen from "../screens/add_when";
import AddDetails from "../screens/add_details";

export default createStackNavigator({
  home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  browse_map: {
    screen: TrickspotMap
  },
  browse_list: {
    screen: TrickspotList
  },
  view_spot: {
    screen: ViewTrickSpot
  },
  about: {
    screen: About
  },
  add: {
    screen: createBottomTabNavigator({
      where: AddWhere,
      when: AddWhen,
      details: AddDetails 
    }),
    navigationOptions: {
      header: null
    }
  }
})