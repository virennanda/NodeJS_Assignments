const isValid = (param) => {



    if (typeof (param) === "undefined")
        return false;

    if (typeof (param) === "bigint" || typeof (param) == "number")
        return true;

    if (param.trim() === '')
        return false;

    return true;

}


const isCarValid = (carName, modelName, makeName) => {

    return (isValid(carName) && isValid(modelName) && isValid(makeName));
}

module.exports = {
    isCarValid,
    isValid
}