var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var Movie = require("./models/movie");
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect("mongodb://localhost/movie");

app.set("views", "./views/pages");
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "bower_components")))
app.listen(port);

app.get("/",function(req, res) {
	Movie.fetch(function(err, movies) {
		if(err) {
			console.log(err);
		}
		res.render("index", {
			title : "首页",
			movies: movies
		});
	})
})

app.get("/movie/:id",function(req, res) {
	var movie_id = req.params.id;

	Movie.findById(movie_id, function(err, movie) {
		if(err) {
			console.log(err);
		}else {
			res.render("detail", {
				title : movie.title,
				movie: movie
			});
		}
	})
})

// admin page
app.get("/admin/movie",function(req, res) {
	res.render("admin", {
		title : "后台录入页",
		movie: {
			title: "",
			doctor: "",
			country: "",
			year: "",
			poster: "",
			flash: "",
			summary: "",
			language: ""
		}
	});
})

// admin post movie
app.post("/admin/movie/new", function(res, req) {
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;

	if( id !== "undefined" ) {
		Movie.findById(id, function(err, movie) {
			if(err) {
				conole.log(err);
			}else {
				_movie = _.extend(movie, movieObj);
				_movie.save(function(err, movie) {
					if(err) {
						console.log(err);
					}else {
						res.redirect("/movie/" + movie.id)
					}
				})
			}
		})
	}else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash,
		})

		_movie.save(function(err, movie) {
			if(err) {
				console.log(err);
			}else {
				res.redirect("/movie/" + movie.id)
			}
		})
	}

})

// list page
app.get("/admin/list",function(req, res) {
	res.render("list", {
		title : "列表页",
		movies: movie
	});
})

console.log("port:" + port);