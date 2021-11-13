const makeFilterSearch = (schools, cities, startingCount) => {
  if (!schools) {
    schools = [''];
  }
  if (!cities) {
    cities = [''];
  }
  let [schoolQueryString, schoolQueryValues] = makeQuery(schools, 'schools', startingCount);
  let [citiesQueryString, citiesQueryValues] = makeQuery(cities, 'cities', startingCount + schools.length);
  let finalStr = `
    ${schoolQueryString}
    INTERSECT
    ${citiesQueryString}
  `;
  let finalValues = [...schoolQueryValues, ...citiesQueryValues];

  return [finalStr, finalValues];
}


const makeQuery = (argument, key, count) => {
  let accessor = '';
  if (key === 'schools') {
    accessor = 'school_short';
  } else if (key === 'cities') {
    accessor = 'city'
  }

  switch (argument.length) {
    case 1: {
      let str = `
        SELECT * FROM programs
        JOIN program_stats ON program_stats.anm_kod = programs.anm_kod
        WHERE (${accessor} = $${count} OR $${count} = '')
      `;
      return [str, [argument[0]]]
    }
    case 2: {
      let str = `
        SELECT * FROM programs
        JOIN program_stats ON program_stats.anm_kod = programs.anm_kod
        WHERE (${accessor} = $${count} OR $${count} = '') OR (${accessor} = $${count + 1} OR $${count + 1} = '')
      `;
      return [str, [argument[0], argument[1]]]
    }
    case 3: {
      let str = `
        SELECT * FROM programs
        JOIN program_stats ON program_stats.anm_kod = programs.anm_kod
        WHERE (${accessor} = $${count} OR $${count} = '') OR (${accessor} = $${count + 1} OR $${count + 1} = '') OR
        (${accessor} = $${count + 2} OR $${count + 2} = '')
      `;
      return [str, [argument[0], argument[1], argument[2]]]
    }
    case 4: {
      let str = `
        SELECT * FROM programs
        JOIN program_stats ON program_stats.anm_kod = programs.anm_kod
        WHERE (${accessor} = $${count} OR $${count} = '') OR (${accessor} = $${count + 1} OR $${count + 1} = '')
        OR (${accessor} = $${count + 2} OR $${count + 2} = '') OR (${accessor} = $${count + 3} OR $${count + 3} = '')
      `;
      return [str, [argument[0], argument[1], argument[2], argument[3]]]
    }
    case 5: {
      let str = `
        SELECT * FROM programs
        JOIN program_stats ON program_stats.anm_kod = programs.anm_kod
        WHERE (${accessor} = $${count} OR $${count} = '') OR (${accessor} = $${count + 1} OR $${count + 1} = '')
        OR (${accessor} = $${count + 2} OR $${count + 2} = '') OR (${accessor} = $${count + 3} OR $${count + 3} = '')
        OR (${accessor} = $${count + 4} OR $${count + 4} = '')
      `;
      return [str, [argument[0], argument[1], argument[2], argument[3], argument[4]]]
    }
    case 6: {
      let str = `
        SELECT * FROM programs
        JOIN program_stats ON program_stats.anm_kod = programs.anm_kod
        WHERE (${accessor} = $${count} OR $${count} = '') OR (${accessor} = $${count + 1} OR $${count + 1} = '') OR
        (${accessor} = $${count + 2} OR $${count + 2} = '') OR (${accessor} = $${count + 3} OR $${count + 3} = '') OR
        (${accessor} = $${count + 4} OR $${count + 4} = '') OR (${accessor} = $${count + 5} OR $${count + 5} = '')
      `;
      return [str, [argument[0], argument[1], argument[2], argument[3], argument[4], argument[5]]]
    }
    default: {
      let str = `
        SELECT * FROM programs
        JOIN program_stats ON program_stats.anm_kod = programs.anm_kod
      `
      return [str, []];
    }
  }
}



module.exports = makeFilterSearch;


// SELECT name, school_short, city
// FROM programs
// WHERE city = 'Stockholm'
// INTERSECT
// SELECT name, school_short, city
// FROM programs
// WHERE school_short = 'KTH' OR school_short = 'SU'