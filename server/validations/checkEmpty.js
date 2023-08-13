exports.checkEmpty = (inputValue) => {
    if (inputValue === null || inputValue === 'null' || inputValue === undefined || inputValue === "undefined" || inputValue==="") {
        return false;
    }
    else {
        return true;
    }
}