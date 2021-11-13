const xlsx = require('xlsx');
const path = require('path');
const target = path.join(__dirname, 'alla_program.xlsx');
const wb = xlsx.readFile(target);
const ws = wb.Sheets['Combined Data'];
let data = xlsx.utils.sheet_to_json(ws)
console.log(data);
data.forEach(async (obj) => {
  try {
    let res = await db.query(
      'INSERT INTO programs (name, school, school_short, city, anm_kod) VALUES ($1, $2, $3, $4, $5);',
      [obj.name, obj.school, obj.school_short, obj.city, obj.anm_kod]
    );
  } catch (err) { console.log(err); }
});
