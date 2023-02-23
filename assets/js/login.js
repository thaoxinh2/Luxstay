const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_PASS = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

function start() {
    var inputEmail = document.querySelector('.account__email-input');
    inputEmail.onblur = handlerSpaceEmail;
    var inputPass = document.querySelector('.account__password-input');
    inputPass.onblur = handlerSpacePass;
    handlerOnClickLogin();
}

start();

//Function

function testSpace(selector, errorSelector) {
    var input = document.querySelector(selector);
    var error = document.querySelector(errorSelector);

    if(input.value === '') {
        error.innerHTML = input.name + ' không được bỏ trống!';
        error.style.display = 'block';
        return false;
    }
    else {
        error.innerHTML = '';
        error.style.display = 'none';
        return true;
    }
}

function testRegex(regex, selector, errorSelector) {
    var input = document.querySelector(selector);
    var error = document.querySelector(errorSelector);

    if(regex.test(input.value)) {
        error.innerHTML = '';
        error.style.display = 'none';
        return true;
    } else {
        error.innerHTML = 'Dữ liệu không hợp lệ!';
        error.style.display = 'block';
        return false;
    }
}   

function handlerSpaceEmail() {
    return testSpace('.account__email-input', '.error-email');
}

function handlerSpacePass() {
    return testSpace('.account__password-input', '.error-pass');
}

function testRegexEmail() {
    return testRegex(REGEX_EMAIL, '.account__email-input', '.error-email');
}

function testRegexPass() {
    return testRegex(REGEX_PASS, '.account__password-input', '.error-pass');
}

function handlerOnClickLogin() {
    var btn = document.querySelector('.account__btn');
    btn.onclick = function () {
        //kiểm tra khoảng trống
        handlerSpaceEmail();
        handlerSpacePass();

        //kiểm tra ký tự
        var flag = handlerSpaceEmail() && handlerSpacePass();
        if(flag) {
            if(!(testRegexEmail() && testRegexPass())) {
                testRegexEmail();
                testRegexPass();
                return false;
            }
        } else {
            return false;
        }

        window.location.reload();
    }
}
