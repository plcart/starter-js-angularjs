var express = require('express'),
    path = require('path'),
    app = express();


app.use(/\/(bower_components)\/[\s\S]+?\.(css|js|jpg|jpeg|png|map|otf|svg|ttf|woff|woff2|eot)[\S]*$/, (req, res) => res.sendFile(path.join(__dirname, req.originalUrl)));
app.use(/\/[\s\S]+?\.(css|js|jpg|jpeg|png|map|otf|svg|ttf|woff|woff2|eot)$/, (req, res) => res.sendFile(path.join(__dirname, app.get('env') === 'development' ? 'src' : 'dist', req.originalUrl)));

app.use(/\/views\/[\s\S]+?\.html$/, (req, res) => res.sendFile(path.join(__dirname, app.get('env') === 'development' ? 'src' : 'dist', req.originalUrl)));
app.get(/(\/{1}.*)?$/, (req, res) => res.sendFile(path.join(__dirname, app.get('env') === 'development' ? 'src' : 'dist', 'index.html')));

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    });
});

app.listen(3001, function () {
    console.log(`Server listening on port ${3001}`);
});