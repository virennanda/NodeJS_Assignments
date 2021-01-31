const { DB: db } = require("../../dbPool");
const { modelExists } = require("./getData")

const addModel = async (modelName) => {

    let modelId = await modelExists(modelName);

    if (modelId !== 0) {
        return modelId;
    }

    let query = `INSERT INTO tbl_model (name)
    VALUES ('${modelName}') RETURNING ID`;

    let { rows } = await db.query(query);
    modelId = rows[0].id;

    if (typeof (modelId) === "undefined")
        throw new Error("ID not recieved from insert in car model")

    return modelId;
}

module.exports = {
    addModel
}