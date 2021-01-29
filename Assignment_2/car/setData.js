const { DB: db } = require("../dbPool");
const { modelExists } = require("../car_model/getData");
const { makeExists } = require("../make/getData");
const { carExists } = require("./GetData")
const { isCarValid } = require("../util/validate");
const { addMake } = require("../make/setData");
const { addModel } = require("../car_model/setData");

const addCar = async (req, res) => {
    const { carName, modelName, makeName } = req.body;

    if (!isCarValid(carName, modelName, makeName)) {
        return res.status(400).json({ error: "Please provide all 3 parameters" })
    }

    try {

        let isCarAvalilable = await carExists(carName);

        if (isCarAvalilable) {
            return res.status(200).json({ "message": `Car ${carName} is already present` })
        }


        let modelId = await addModel(modelName);
        let makeId = await addMake(makeName);

        let query = `INSERT INTO tbl_car(name,make_id,model_id)
    VALUES ($1,$2,$3) RETURNING id`;

        let carResult = await db.query(query, [carName, makeId, modelId])
        console.log(carResult.rows);
        res.json(
            {
                "success": carResult.rows,
                makeId,
                modelId,
                isCarAvalilable,
                modelAvailable: modelId,
                makeAvailable: makeId
            })
    } catch (err) {
        console.error(err)
    }

}



module.exports = {
    addCar
}