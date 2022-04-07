import validator from "./validator";

const findFormErrors = (form) => {

    const { name, email, password } = form;

    const newErrors = {}

    // name errors
    if (checkNotUndefined(name) && validator.checkEmpty(name)) newErrors.name = 'Name cannot be blank!'
    // email errors
    if (checkNotUndefined(email) && validator.checkEmpty(email)) newErrors.email = 'Email cannot be blank!'
    else if (checkNotUndefined(email) && !validator.checkEmail(email)) newErrors.email = 'Email is not valid!'
    // password errors
    if (checkNotUndefined(password) && validator.checkEmpty(password)) newErrors.password = 'Password cannot be blank!'
    else if (checkNotUndefined(password) && !validator.checkPassword(password)) newErrors.password = 'Password is not valid!'
    return newErrors;

}

const checkNotUndefined = (value) => {
    if (typeof value === "undefined") return false;
    return true;
}

export default findFormErrors;