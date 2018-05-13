import { createStackNavigator } from "react-navigation";
import Home from "../screens/home";
import TrickspotMap from "../screens/browse_map";
import TrickspotList from "../screens/browse_list";
import ViewTrickSpot from "../screens/view_spot";

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
  }
})