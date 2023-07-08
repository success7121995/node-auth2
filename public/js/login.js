
// get cookie value
const getCookie = (cookie) => {
    if (!cookie) {
        return '/';
    } else {
        return cookie
            .split('; ')
            .find(cookie => {
                return cookie.indexOf('directUrl') !== -1;
            })
            .split('=')
            .pop()
    };
};
console.log(getCookie(document.cookie));

// submit the form to server
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get value
    const email = form.email.value;
    const password = form.password.value;

    // error messages
    const emailErr = document.querySelector('.email.error');
    const passwordErr = document.querySelector('.password.error');

    // reset
    emailErr.textContent = '';
    passwordErr.textContent = '';

    // send data to server
    const res = await fetch('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json'}
    });

    // send data
    const data = await res.json();
    if (data.errors) {
        emailErr.textContent = data.errors.email;
        passwordErr.textContent = data.errors.password;
    };
    if (data.user) {
        console.log(document.cookie.split('='));
    }
});