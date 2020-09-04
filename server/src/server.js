const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://usuario537:usuario537@abandb-lcdfp.mongodb.net/meu-comercio537?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
app.use(express.json());
app.use(routes);


app.listen(3333);

