
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get values
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const password1 = form.password1.value;

    // error messages
    const usernameError = document.querySelector('.username.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const password1Error = document.querySelector('.password1.error');

    // reset messages
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    password1Error.textContent = '';

    // confirm password
    if ((password !== password1)) {
        password1Error.textContent = 'Passwords must match';
    } else {        
        try {
            const res = await fetch('/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json'}
            });
            const data = await res.json;
            console.log(data.user);
        } catch (err) {
            console.log(err)
        }
    };
});