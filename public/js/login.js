
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
        if (data.directUrl) {
            location.assign(data.directUrl);
        } else {
            location.assign('/');
        };
    };
});