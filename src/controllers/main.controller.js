const main = (req, res) => {
	const num = Math.floor(Math.random() * 10) + 1;
	res.render('home.ejs', { num });
};

module.exports = main;
