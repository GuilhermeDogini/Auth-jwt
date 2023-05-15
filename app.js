/* Imports */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
moment.tz.setDefault("Etc/GMT+3");
const app = express();

// Config JSON responso
app.use(express.json());

// Models
const User = require("./models/User");

// Puclic Route
app.get("/", (req, res) => {
	res.status(200).json({ msg: "Bem vindo!" });
});
// Private Route
app.get("/user/:id", checkToken, async (req, res) => {

	const id = req.params.id;

	// Check if user exists
	const user = await User.findById(id, "-password");

	if (!user) {
		return res.status(404).json({ msg: "Usuário não encontrado!" });
	}

	res.status(200).json({ user });

});

function checkToken(req, res, next) {

	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ msg: "Acesso negado!" });
	}

	try {
		const secret = process.env.SECRET;
		jwt.verify(token, secret);
		next();
	} catch (err) {
		res.status(400).json({ msg: "Token inválido!" });
	}
}

// Register User
app.post("/auth/register", async (req, res) => {

	const { name, email, password, confirmpassword, telephones} = req.body;

	const {area_code, number} = telephones[0];

	// Validations
	if (!name) {
		return res.status(422).json({ msg: "Nome do Usuário não encontrado!" });
	}

	if (!email) {
		return res.status(422).json({ msg: "Email do Usuário não encontrado!" });
	}

	if (!password) {
		return res.status(422).json({ msg: "A Senha é obrigatória!" });
	}

	if (password !== confirmpassword) {
		return res.status(422).json({ msg: "As senhas não Conferem!" });
	}

	if (!area_code) {
		return res.status(422).json({ msg: "O DDD é obrigatório!" });
	}

	if (!number) {
		return res.status(422).json({ msg: "O numero é obrigatóro!" });
	}

	// Check if user exists
	const userExists = await User.findOne({ email: email });

	if (userExists) {
		return res.status(422).json({ msg: "Email já esta em uso, por favor utilize outro email!" });
	}

	// Create password
	const salt = await bcrypt.genSalt(12);
	const passwordHash = await bcrypt.hash(password, salt);

	// Create user
	const userData = {
		name,
		email,
		password: passwordHash,
		telephones: [
			{
				number,
				area_code
			}
		],
		created_at: Date.now(),
		modified_at: Date.now()
	};

	const user = new User(userData);

	try {
		const response = await user.save();
		res.status(201).json({
			id: response._id,
			created_at: response.created_at,
			modified_at: response.modified_at

		});

	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({
				msg: "Aconteceu um Erro interno, tente novamente mais tarde"
			});

	}
});

// Login User
app.post("/auth/login", async (req, res) => {

	const { email, password } = req.body;

	//validations
	if (!email) {
		if (!email) {
			return res.status(422).json({ msg: "Email do Usuário não encontrado!" });
		}

		if (!password) {
			return res.status(422).json({ msg: "A Senha é obrigatória!" });
		}
	}

	// Check if user exists
	const user = await User.findOne({ email: email });

	if (!user) {
		return res.status(404).json({ msg: "Usuário não encontrado!" });

	}

	// Check if password match 
	const checkPassword = await bcrypt.compare(password, user.password);

	if (!checkPassword) {
		return res.status(422).json({ msg: "Senha inválida" });
	}

	try {

		const secret = process.env.SECRET;

		const token = jwt.sign(
			{
				id: user._id,
			},
			secret,
		);

		res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });

	} catch (err) {
		console.log(err);

		res
			.status(500)
			.json({
				msg: "Aconteceu um Erro interno, tente novamente mais tarde"
			});
	}

});

// Credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const port = process.env.PORT || 3000;

mongoose
	.connect(
		`mongodb+srv://${dbUser}:${dbPassword}@cluster0.avi5ydh.mongodb.net/?retryWrites=true&w=majority`)
	.then(() => {
		app.listen(port);
		console.log("Conectou!");
	}).catch((err) => console.log(err));

