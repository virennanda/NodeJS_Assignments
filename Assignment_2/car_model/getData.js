const { DB: db } = require("../dbPool");

const modelExists = async (modelName) => {

    let query = `
SELECT 
    m.id
FROM
    tbl_model m
WHERE
    m."name"=$1`;

    let modelId = await db.query(query, [modelName]).then(results => {
        return results.rowCount > 0 ? (results.rows[0].id) : 0;

    }).catch(err => console.error(err))

    return modelId;
}


module.exports = {
    modelExists
}