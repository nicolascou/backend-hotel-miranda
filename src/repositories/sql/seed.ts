import { db } from "../db";

function generateRooms() {
  for (let i = 0; i < 15; i++) {
    db.query(
      '',
      function(err, results) {
        console.log(results);
        console.error(err);
      }
    );
  }
}
