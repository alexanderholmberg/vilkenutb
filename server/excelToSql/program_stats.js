const xlsx = require('xlsx');
const path = require('path');
const target = path.join(__dirname, 'allt_HT2020_upd.xlsx');
const wb = xlsx.readFile(target);
const ws = wb.Sheets['Updated Data'];
let data = xlsx.utils.sheet_to_json(ws)

data.forEach(async (obj) => {
  try {
    await db.query(
      `INSERT INTO program_stats
        (anm_kod, termin, bi_urval1, bi_urval2, 
        bii_urval1, bii_urval2, hp_urval1, hp_urval2, antal_sokande, antal_sokande_1a_hand) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
      [obj.anm_kod, obj.termin, obj.bi_u1, obj.bi_u2, obj.bii_u1,
      obj.bii_u2, obj.hp_u1, obj.hp_u2, obj.totaltAntalSokande, obj.forstaHandsSokande]
    );
  } catch (err) { console.log(err); }
});
