const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get values
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const password1 = form.password1.value;

    // err messages
    const usernameErr = document.querySelector('.username.error');
    const emailErr = document.querySelector('.email.error');
    const passwordErr = document.querySelector('.password.error');
    const password1Err = document.querySelector('.password1.error');

    // reset message
    usernameErr.textContent = '';
    emailErr.textContent = '';
    passwordErr.textContent = '';
    password1Err.textContent = '';

    if (password !== password1) {
        password1Err.textContent = 'Password is not match.';
    } else {
        const res = await fetch('/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json'}
        });
    
        const data = await res.json();
        if(data.errors) {
            usernameErr.textContent = data.errors.username;
            emailErr.textContent = data.errors.email;
            passwordErr.textContent = data.errors.password;
        }
        if (data.user) {
            location.assign('/');
        };
    };
});