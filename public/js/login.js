const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // get values
    const email = form.email.value;
    const password = form.password.value;

    // err messages
    const emailErr = document.querySelector('.email.error');
    const passwordErr = document.querySelector('.password.error');

    // reset
    emailErr.textContent = '';
    passwordErr.textContent = '';

    try {
        const res = await fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: { 'Content-Type': 'application/json'}
        });
        const data = await res.json();
        if (data.errors) {
            emailErr.textContent = data.errors.email;
            passwordErr.textContent = data.errors.password;
        };
        if (data.user) {
            location.assign('/');
        };
    } catch (err) {
        console.log(err);
    };
});