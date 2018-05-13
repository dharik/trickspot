import { db } from "./firebase";

export function get_all_gatherings() {
  return db
    .ref("gatherings")
    .once("value")
    .then(gatherings => {
      return Object.values(gatherings.val());
    });
}

export function get_gatherings_by_user(uid:string) {
  return db
    .ref("gatherings")
    .orderByChild("uid")
    .equalTo(uid)
    .once("value")
    .then(snapshot => {
      return Object.values(snapshot.val());
    });
}
