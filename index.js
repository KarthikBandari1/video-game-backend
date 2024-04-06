const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const databasePath = path.join(__dirname, 'soldier.db')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


let database = null
const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
    app.listen(3005, () =>
      console.log('Server Running at http://localhost:3005/'),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}
initializeDbAndServer()

app.get("/", async (request, response) => {
    try {
        const getProfileDetailsQuery = `SELECT * from profile;`;
        const profileDetails = await database.get(getProfileDetailsQuery);

        const getHistoryQuery=`SELECT * from history;`
        const historyDetails=await database.get(getHistoryQuery)

        response.send({ profileDetails,historyDetails });
    } catch (error) {
        console.error("Error occurred:", error);
        response.status(500).send("Internal Server Error");
    }
});

app.get("/stats", async (request, response) => {
    try {
        const getStatsQuery = `SELECT * from stats;`;
        const statsDetails = await database.all(getStatsQuery);

        response.send(statsDetails);
    } catch (error) {
        console.error("Error occurred:", error);
        response.status(500).send("Internal Server Error");
    }
});


app.get("/weapons", async (request, response) => {
    try {
        const getWeaponsQuery=`SELECT * from weapons;`
        const weaponsDetails=await database.all(getWeaponsQuery)

        response.send(weaponsDetails);
    } catch (error) {
        console.error("Error occurred:", error);
        response.status(500).send("Internal Server Error");
    }
});