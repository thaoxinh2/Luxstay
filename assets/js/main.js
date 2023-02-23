const REGEX_NAME = /^[A-Za-z]+$/;
const REGEX_PHONE_NUMBER = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
const REGEX_EMAIL =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
const REGEX_PASS = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

function start() {
    var inputEmail = document.querySelector(".account__email-input");
    inputEmail.onblur = handlerSpaceEmail;
    var inputPhone = document.getElementById("account__phone");
    inputPhone.onblur = handlerSpacePhone;
    var inputName = document.getElementById("account__name");
    inputName.onblur = handlerSpaceName;
    var inputSubName = document.getElementById("account__sub-name");
    inputSubName.onblur = handlerSpaceSubName;
    var inputPassword = document.getElementById("account__password");
    inputPassword.onblur = handlerSpacePass;
    var inputPasswordAgain = document.getElementById("account__password-again");
    inputPasswordAgain.onblur = handlerSpacePassAgain;

    handlerOnClickRegister();
}

start();

//function

function testSpace(selector, selectorError) {
    var inputText = document.querySelector(selector);
    var inputError = document.querySelector(selectorError);
    if (inputText.value === '') {
        inputError.innerHTML = inputText.name + ' không được để trống!';
        inputError.style.display = 'block';
        return false;
    }
    else {
        inputError.innerHTML = '';
        inputError.style.display = 'none';
        return true;
    }
}

function testRegex(regex, inputSelector, errorSelector) {
    var input = document.querySelector(inputSelector);
    var error = document.querySelector(errorSelector);
    if (regex.test(input.value)) {
        error.innerHTML = '';
        error.style.display = 'none';
        return true;
    }
    else {
        error.innerHTML = 'Dữ liệu không hợp lệ';
        error.style.display = 'block';
        return false;
    }
}

function handlerSpaceEmail() {
    return testSpace(".account__email-input", '.error-email');
}

function handlerSpacePhone() {
    return testSpace("#account__phone", '.error-phone');
}

function handlerSpaceName() {
    return testSpace("#account__name", '.error-name');
}

function handlerSpaceSubName() {
    return testSpace("#account__sub-name", '.error-subname');
}

function handlerSpacePass() {
    return testSpace("#account__password", '.error-pass');
}

function handlerSpacePassAgain() {
    return testSpace("#account__password-again", '.error-pass-again');
}

function testEmail() {
    return testRegex(REGEX_EMAIL, ".account__email-input", '.error-email');
}

function testName() {
    return testRegex(REGEX_NAME, '#account__name', '.error-name');
}

function testSubName() {
    return testRegex(REGEX_NAME, '#account__sub-name', '.error-subname');
}

function testPhoneNumber() {
    return testRegex(REGEX_PHONE_NUMBER, ".account__input", ".error-phone");
}

function testPassword() {
    return testRegex(REGEX_PASS, "#account__password", ".error-pass");
}

function testPasswordAgain() {
    var inputPassAgain = document.querySelector('#account__password-again');
    var inputPass = document.querySelector('#account__password')

    var error = document.querySelector(".error-pass-again");

    if(inputPassAgain.value === inputPass.value) {
        error.innerHTML = '';
        error.style.display = 'none';
        return true;
    }
    else {
        error.innerHTML = 'Dữ liệu không hợp lệ';
        error.style.display = 'block';
        return false;
    }
}

function handlerOnClickRegister() {
    var btn = document.querySelector('.account__btn');

    btn.onclick = function () {
        // kiểm tra khoảng trống
        handlerSpaceEmail();
        handlerSpacePhone();
        handlerSpaceName();
        handlerSpaceSubName();
        handlerSpacePass();
        handlerSpacePassAgain();

        // kiểm tra tên
        var flag1 = testEmail() && testName() &&  testSubName() && testPhoneNumber() && testPassword() &&  testPasswordAgain();
        var flag = handlerSpaceEmail() && handlerSpacePhone() && handlerSpaceName() && handlerSpaceSubName() && handlerSpacePass() && handlerSpacePassAgain();
        if (flag) {
            if (!flag1) {
                testEmail();
                testName();
                testSubName();
                testPhoneNumber();
                testPassword();
                testPasswordAgain();
                return false;
            }
        } else {
            return false;
        }
        window.location.reload();
    }
}