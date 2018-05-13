import { PermissionsAndroid } from "react-native";
export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location",
        message: "To find nearby tricking spots or gatherings"
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;

  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getLocation() {
  if(await requestLocationPermission()) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
    }, error => {
      console.error(error)
    }, {
      timeout: 5000
    })
  } else {
    console.error('no permission');
  }
}
