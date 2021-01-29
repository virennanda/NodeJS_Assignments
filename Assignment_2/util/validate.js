const isValid = (param) => {

    if (typeof (param) === "undefined")
        return false;

    if (param.trim() === '')
        return false;

    return true;

}


const isCarValid = (carName, modelName, makeName) => {

    return (isValid(carName) && isValid(modelName) && isValid(makeName));
}

module.exports = {
    isCarValid
}