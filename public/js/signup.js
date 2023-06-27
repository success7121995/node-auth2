const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get the value
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const password1 = form.password1.value;

    try {
        const res = await fetch('/users/signup', {
            method: "POST",
            body: JSON.stringify({
                username,
                email,
                password,
                password1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res)
    } catch (err) {
        console.log(err);
    }
})