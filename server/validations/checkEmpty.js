exports.checkEmpty = (inputValue) => {
    if (inputValue === null || inputValue === 'null' || inputValue === undefined || inputValue === "undefined") {
        return false;
    }
    else {
        return true;
    }
}