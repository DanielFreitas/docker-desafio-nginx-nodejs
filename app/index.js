const express = require("express");
const app = express();
const mysql = require("mysql2");
const { uniqueNamesGenerator, Config, starWars } = require("unique-names-generator");

const mysqlConfig = {
  host: "mysql_server",
  user: "root",
  password: "root",
  database: "db_people",
};

app.get("/connect", function (req, res) {
  let con = mysql.createConnection(mysqlConfig);
  con.connect(function (err) {
    con.end();
    if (err) throw err;
    res.send("Mysql connected!");
  });
});

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.get("/people", function (req, res) {
  const randomName = String(uniqueNamesGenerator({ dictionaries: [starWars] }));
  const values = [[randomName]];

  let con = mysql.createConnection(mysqlConfig);
  con.connect(function (err) {
    if (err) throw err;

    con.query(`INSERT INTO people (name) VALUES ?`, [values], function (err, result) {
      if (err) {
        console.error(err);
        con.end();
        return;
      }
      console.error(result);
    });

    con.query(`SELECT * FROM people`, function (err, result, fields) {
      if (err) {
        console.error(err);
        con.end();
        return;
      }
      con.end();

      let data = '<h1>Full Cycle Rocks!</h1>';

      result.forEach(function (key, index) {
        data += key.name + '<br />';
      });

      res.send(data);
    });
  });

});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
