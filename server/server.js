require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const makeFullTextSearch = require('./makeFullTextSearch');
const makeFilterSearch = require('./makeFilterSearch');
const { query } = require('./db');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.get('/api/programs', async (req, res) => {
  try {
    console.log(req.query);
    if (req.query.kind === 'search') {
      mainInput = req.query.mainInput.split(' ').filter(x => x !== '');
      const { schools, cities, subjects } = req.query;

      let [queryStringFTS, queryValuesFTS] = makeFullTextSearch(mainInput);
      let [queryStringFilter, queryValuesFilter] = makeFilterSearch(schools, cities, mainInput.length + 1);
      console.log(queryStringFTS);
      let finalQueryString = `
        ${queryStringFTS}
        INTERSECT
        ${queryStringFilter}
      `;
      let finalQueryValues = [...queryValuesFTS, ...queryValuesFilter];

      console.log('finalStr', finalQueryString)
      console.log('finalV', finalQueryValues)

      const { rows } = await db.query(finalQueryString, finalQueryValues);

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