import { db } from "./firebase";

export function get_all_gatherings() {
  return db
    .ref("gatherings")
    .once("value")
    .then(snapshotToArrayWithKeys);
}

export function get_gatherings_by_user(uid: string) {
  return db
    .ref("gatherings")
    .orderByChild("uid")
    .equalTo(uid)
    .once("value")
    .then(snapshotToArrayWithKeys);
}

function snapshotToArrayWithKeys(snapshot:any) {
  let g = [];
  snapshot.forEach(item => {
    g.push({
      ...item.val(),
      id: item.key
    });
  });
  return g;
}
