const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get the values
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    try {
        const res = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);
        console.log(data.errors);
    } catch (err) {
        console.log(err);
    };
});