const makeFullTextSearch = arr => {
  console.log('LÄNGD: ', arr.length);

  switch (arr.length) {
    case 0:
      return [
        `SELECT * FROM programs
        JOIN program_stats ON program_stats.anm_kod = programs.anm_kod`, []
      ];
    case 1: {
      let str =
        `SELECT * FROM programs AS p
        JOIN program_stats AS ps ON ps.anm_kod = p.anm_kod
        WHERE to_tsvector(p.school || ' ' || p.school_short || ' ' || p.name || ' ' || p.city || ' ' || p.anm_kod)
        @@ to_tsquery($1)`
      let values = [`${arr[0]}:*`];
      return [str, values];
    }
    case 2: {
      let str =
        `SELECT * FROM programs AS p
        JOIN program_stats AS ps ON ps.anm_kod = p.anm_kod
        WHERE to_tsvector(p.school || ' ' || p.school_short || ' ' || p.name || ' ' || p.city || ' ' || p.anm_kod)
        @@ to_tsquery($1 || ' & ' || $2)`
      let values = [`${arr[0]}:*`, `${arr[1]}:*`];
      return [str, values];
    }
    case 3: {
      let str =
        `SELECT * FROM programs AS p
        JOIN program_stats AS ps ON ps.anm_kod = p.anm_kod
        WHERE to_tsvector(p.school || ' ' || p.school_short || ' ' || p.name || ' ' || p.city || ' ' || p.anm_kod)
        @@ to_tsquery($1 || ' & ' || $2 || ' & ' || $3)`
      let values = [`${arr[0]}:*`, `${arr[1]}:*`, `${arr[2]}:*`];
      return [str, values];
    }
    case 4: {
      let str =
        `SELECT * FROM programs AS p
        JOIN program_stats AS ps ON ps.anm_kod = p.anm_kod
        WHERE to_tsvector(p.school || ' ' || p.school_short || ' ' || p.name || ' ' || p.city || ' ' || p.anm_kod)
        @@ to_tsquery($1 || ' & ' || $2 || ' & ' || $3 || ' & ' || $4)`
      let values = [`${arr[0]}:*`, `${arr[1]}:*`, `${arr[2]}:*`, `${arr[3]}:*`];
      return [str, values]
    }
    case 5: {
      let str =
        `SELECT * FROM programs AS p
        JOIN program_stats AS ps ON ps.anm_kod = p.anm_kod
        WHERE to_tsvector(p.school || ' ' || p.school_short || ' ' || p.name || ' ' || p.city || ' ' || p.anm_kod)
        @@ to_tsquery($1 || ' & ' || $2 || ' & ' || $3 || ' & ' || $4 || ' & ' || $5)`
      let values = [`${arr[0]}:*`, `${arr[1]}:*`, `${arr[2]}:*`, `${arr[3]}:*`, `${arr[4]}:*`];
      return [str, values];
    }
    case 6: {
      let str =
        `SELECT * FROM programs AS p
        JOIN program_stats AS ps ON ps.anm_kod = p.anm_kod
        WHERE to_tsvector(p.school || ' ' || p.school_short || ' ' || p.name || ' ' || p.city || ' ' || p.anm_kod)
        @@ to_tsquery($1 || ' & ' || $2 || ' & ' || $3 || ' & ' || $4 || ' & ' || $5 || ' & ' || $6)`
      let values = [`${arr[0]}:*`, `${arr[1]}:*`, `${arr[2]}:*`, `${arr[3]}:*`, `${arr[4]}:*`, `${arr[5]}:*`];
      return [str, values];
    }
    default:
      let str = `
        SELECT * FROM programs WHERE name = $1
      `
      return [str, ['adsfsdfgsgdfgfdgdfg']];
  }
}

module.exports = makeFullTextSearch;