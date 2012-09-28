var t0=Date.now();
setInterval(function () {
    var x = (Date.now() - t0) / 1000 / 60;
    var m = Math.floor(x);
    var s = Math.floor((x - m) * 60);
    var mm = (m < 10 ? '0' : '') + m;
    var ss = (s < 10 ? '0' : '') + s;
    process.stdout.write(mm + ':' + ss + '\r');
}, 1000);
