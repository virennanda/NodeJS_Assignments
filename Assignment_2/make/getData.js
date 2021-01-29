const { DB: db } = require("../dbPool");

const makeExists = async (makeName) => {
    let query = `
SELECT 
    m.id
FROM
    tbl_make m
WHERE
    m."name"=$1

`
    let makeId = await db.query(query, [makeName]).then(results => {

        return results.rowCount > 0 ? (results.rows[0].id) : 0;

    })
        .catch(err => console.error(err))

    return makeId;
}

module.exports = {
    makeExists
}