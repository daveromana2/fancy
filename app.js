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
				
			}
		})
	}

})

// list page
app.get("/admin/list",function(req, res) {
	res.render("list", {
		title : "列表页",
		movies: [{
			title: "王牌特工",
			_id: 1,
			doctor: "马修·沃恩",
			country: "美国",
			year: 2014,
			language: "英文",
			flash: "http://static1.mtime.cn/20150129134726/flash/newvideoplayer.swf?vid=53273&mid=204906&title=%E7%8E%8B%E7%89%8C%E7%89%B9%E5%B7%A5%EF%BC%9A%E7%89%B9%E5%B7%A5%E5%AD%A6%E9%99%A2%20%E4%B8%AD%E6%96%87%E7%89%88%E7%BB%88%E6%9E%81%E9%A2%84%E5%91%8A%E7%89%87&refurl=http%3A%2F%2Fvideo.mtime.com%2F53273%2F%3Fmid%3D204906&autoplay=0"
		}]
	});
})

console.log("port:" + port);