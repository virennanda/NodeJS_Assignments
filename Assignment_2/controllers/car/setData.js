const { DB: db } = require("../../dbPool");
const { modelExists } = require("../car_model/getData");
const { makeExists } = require("../make/getData");
const { carExists } = require("./GetData")
const { isCarValid, isValid } = require("../../util/validate");
const { addMake } = require("../make/setData");
const { addModel } = require("../car_model/setData");


const addCarImage = async (req, res, next) => {
    let { id } = req.params;
    let { file } = req
    console.log(file);
    let isCarAvailable = await carExists('', id);
    if (isCarAvailable) {
        let query = `INSERT INTO public.car_image
        (car_id, img_path)
        VALUES($1,$2);
        `
        let result = await db.query(query, [id, file.path]);
        return result.rowCount > 0
            ? res.json({ 'path': req.url + file.path })
            : res.send({ 'error': 'image not uploaded' });
    }
    return res.status(400).json({ 'error': 'invalid car ID' });

}

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
        res.json({
            "success": "Car added Successfully"
        })
    } catch (err) {
        console.error(err)
    }

}

const updateCar = async (req, res) => {
    let { id, carName, modelName, makeName } = req.body

    if (!(isCarValid(carName, modelName, makeName) && isValid(id))) {
        return res.json({ "error": "parameters are invalid" })
    }
    try {
        let isCarAvailable = await carExists(carName);

        if (!isCarAvailable) {

            let makeId = await addMake(makeName);
            let modelId = await addModel(modelName);

            let query = `UPDATE tbl_car
        SET "name"=$1, make_id=$2, model_id=$3
        WHERE id=$4
        `;
            let results = await db.query(query, [carName, makeId, modelId, id]);

            return res.json({ "message ": " Update Success" });
        }

        return res.json({ "message": "car Name Already Exists" });

    }
    catch (err) {
        console.error(err);
    }
}

const deleteCar = async (req, res) => {
    const { id } = req.params;
    if (!isValid(id))
        return res.status(400).json({ "error": "Please Provide ID" });

    let query = `DELETE FROM tbl_car
    WHERE id=$1;
    `
    try {
        let { rowCount } = await db.query(query, [id]);

        return rowCount > 0 ? res.json({ "message": "Record Deleted " }) : res.json({ "message": "Record was not found or either not deleted" });
    } catch (err) {
        res.status(500).json({ "error": "Something went wrong" });
        console.error(err);
    }
}

module.exports = {
    addCar,
    updateCar,
    deleteCar,
    addCarImage
}