const validator = {
    checkEmpty,
    checkEmail,
    checkPhoneNo,
    checkPassword
};

function checkEmpty(value) {
    if (value === '') return true;
    return false;
}

function checkEmail(value) {
    //check if email is valid
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
}

function checkPhoneNo(value) {
    return /^[0-9]{10}$/.test(value);
}

function checkPassword(value) {
    //password must be at least 8 characters long and contain at least one number and one letter
    return /^(?=.*\d)(?=.*[a-zA-Z]).{8,50}$/.test(value);

}

export default validator;