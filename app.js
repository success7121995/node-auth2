require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

// init app
const app = express();

// middlewwares
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: 'sid',
    secret
}))
