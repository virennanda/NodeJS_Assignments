const { DB: db } = require("../dbPool");
const { makeExists } = require("./getData");

const addMake = async (makeName) => {

    let makeId = await makeExists(makeName);

    if (makeId !== 0) {
        return makeId;
    }

    let query = `INSERT INTO tbl_make (name)
    VALUES ('${makeName}') RETURNING ID`;

    let { rows } = await db.query(query);
    makeId = rows[0].id;

    if (typeof (makeId) === "undefined")
        throw new Error("ID not recieved from insert in car maker")

    return makeId;

}

module.exports = {
    addMake
}
