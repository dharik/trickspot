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

export function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      },
      {
        timeout: 5000
      }
    );
  });
}
