const { DB: db } = require("../dbPool");

const getCars = (req, res) => {
    let query = `
select
    c.id,
    c."name" "carName",
    m."name" "modelName",
    tm."name" "makeName" 
FROM 
    tbl_car c
        inner join  tbl_make tm 
            on tm.id =c.make_id 
        inner join tbl_model m
            on m.id =c.model_id 
    `;

    db.query(query, (error, results) => {
        if (error)
            throw error

        res.status(200).json(results.rows)
    });

}

const getCarsById = (req, res) => {
    const id = parseInt(req.params.id)
    let query = `
select
    c.id,
    c."name" "carName",
    m."name" "modelName",
    tm."name" "makeName" 
FROM 
    tbl_car c
        inner join  tbl_make tm 
            on tm.id =c.make_id 
        inner join tbl_model m
            on m.id =c.model_id 
where
    c.id=$1
    `;

    db.query(query, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const carExists = async (carName) => {
    let query = `
SELECT 
    c.id
FROM
    tbl_car c
WHERE
    c."name"=$1

`
    let answer = await db.query(query, [carName]).then(results => {
        return results.rowCount > 0 ? true : false;

    })
        .catch(err => console.error(err))

    return answer;
}


module.exports = {
    getCars,
    getCarsById,
    carExists
}
