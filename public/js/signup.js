const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get values
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const password1 = form.password1.value;

    // error messages
    const usernameErr = document.querySelector('.username.error');
    const emailErr = document.querySelector('.email.error');
    const passwordErr = document.querySelector('.password.error');
    const password1Err = document.querySelector('.password1.error');

    // reset
    usernameErr.textContent = '';
    emailErr.textContent = '';
    passwordErr.textContent = '';
    password1Err.textContent = '';

    // compare passwords, if matched, send data to server
    if (password !== password1) {
        try {
            
        } catch (err) {
            console.log(err);
        };
    };
});