var gulp = require("gulp");
var replace = require("gulp-replace");

var date = new Date().getTime();

gulp.task("build", function() {
    gulp.src("./src/page/*.html")
        .pipe(replace("@@version", "version=" + date))
        .pipe(gulp.dest("D:/Tomcat 7.0/webapps/kmwxweb/page/"));
        
    gulp.src("./src/js/**/*.js")
        .pipe(gulp.dest("D:/Tomcat 7.0/webapps/kmwxweb/js/"));

    gulp.src("./src/style/**/*.css")
        .pipe(gulp.dest("D:/Tomcat 7.0/webapps/kmwxweb/style/"));
        
    gulp.src("./src/images/**/*")
        .pipe(gulp.dest("D:/Tomcat 7.0/webapps/kmwxweb/images/"));
	});
gulp.task("run", ["build"], function () {
    gulp.watch("./src/**", ["build"]);
});
