// index.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return Promise.resolve("Invalid email format.");
    }

    const domain = email.split('@')[1];

    return fetch(`https://dns.google/resolve?name=${domain}&type=MX`)
        .then(response => response.json())
        .then(data => {
            if (data.Status === 0 && data.Answer && data.Answer.length > 0) {
                return "Email domain is valid. Further checks required for status.";
            } else {
                return "Email domain does not exist.";
            }
        })
        .catch(() => {
            return "Error checking email domain.";
        });
}

app.get('/', (req, res) => {
    res.render('emailview', { result: null });
});

app.post('/validate', async (req, res) => {
    const email = req.body.email;
    const result = await validateEmail(email);
    res.render('emailview', { result });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
