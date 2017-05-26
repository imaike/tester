onmessage = function (X) {
    console.log(X.data);
    var data = X.data;
    importScripts('/lib/numeric-1.2.6.min.js');
    var m, sigma, svd;
    m = data.length;
    sigma = numeric.div(numeric.dot(numeric.transpose(data), data), m);
    svd = numeric.svd(sigma).U;
    console.log(JSON.stringify(svd));
    postMessage(svd);
};