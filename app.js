var express = require("express");
var path = require("path");
var port = process.env.PORT || 3000;
var app = express();

app.set("views", "./views/pages");
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "bower_components")))
app.listen(port);

app.get("/",function(req, res) {
	res.render("index", {
		title : "首页"
	});
})

app.get("/movie/:id",function(req, res) {
	res.render("detail", {
		title : "详情页"
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
		title : "列表页"
	});
})

console.log("port:" + port);