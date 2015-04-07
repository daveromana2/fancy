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
		
	})
	res.render("detail", {
		title : "详情页",
		movie: {
			doctor: "马修·沃恩",
			country: "美国",
			title: "王牌特工",
			year: 2014,
			poster: "http://img31.mtime.cn/mt/2015/03/30/090049.46200846_140X210X4.jpg",
			language: "英语 / 阿拉伯语 / 瑞典语",
			flash: "http://static1.mtime.cn/20150129134726/flash/newvideoplayer.swf?vid=53273&mid=204906&title=%E7%8E%8B%E7%89%8C%E7%89%B9%E5%B7%A5%EF%BC%9A%E7%89%B9%E5%B7%A5%E5%AD%A6%E9%99%A2%20%E4%B8%AD%E6%96%87%E7%89%88%E7%BB%88%E6%9E%81%E9%A2%84%E5%91%8A%E7%89%87&refurl=http%3A%2F%2Fvideo.mtime.com%2F53273%2F%3Fmid%3D204906&autoplay=0",
			summary: "一个神秘的秘密特工组织金士曼招募新血，科林·费斯主演的老牌精英特工哈利推荐了一位意想不到的年轻男孩艾格西（塔伦·埃格顿饰）加入，这个原本是个街头混混的小子得到了一个麻雀变凤凰的机会，但他需要经过史上最危险的测试才能真正"
		}
	});
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