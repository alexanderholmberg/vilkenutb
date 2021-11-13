require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const queryMaker = require('./queryMaker');
const { query } = require('./db');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/api/programs', async (req, res) => {
  try {
    console.log('yo: ', req.query.homeSearch)
    if (req.query.homeSearch === '') {

      console.log('im here')
      const { rows } = await db.query(
        `SELECT * FROM programs LIMIT 10`
      )

      res.status(200).json({
        status: "success",
        results: rows.length,
        data: {
          programs: rows,
        }
      })
    } else if (!req.query.homeSearch) {
      const { rows } = await db.query(
        `SELECT * FROM programs
        WHERE (name = $1 OR $1 = '') AND
        (school = $2 OR $2 = '') AND (city = $3 OR $3 = '')`,
        [req.query.program, req.query.school, req.query.city]
      );
      res.status(200).json({
        status: "success",
        results: rows.length,
        data: {
          programs: rows,
        }
      })
    } else {
      console.log('im here')
      arr = req.query.homeSearch.split(' ').filter(x => x !== '');
      console.log(arr)
      let [queryString, queryValues] = queryMaker(arr);
      const { rows } = await db.query(queryString.concat(' LIMIT 10'), queryValues);
      res.status(200).json({
        status: "success",
        results: rows.length,
        data: {
          programs: rows,
        }
      })
    }
  } catch (err) { console.log(err); }
})

app.get('/api/programs/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM programs WHERE id = $1;', [req.params.id]);
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        programs: rows,
      }
    })
  } catch (err) { console.log(err); }
})

app.get('/api/subjects', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM subjects;');
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        programs: rows,
      }
    })
  } catch (err) { console.log(err); }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});