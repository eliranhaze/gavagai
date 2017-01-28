
// const

var APP_KEY = '10217acd-6a42-413f-a9ca-7975ae89c32d';

// elements
var btnTrans = $('#trans');
var inpTrans = $('#inpts');
var pDef = $('#def');

// state
var started = false;

// TODO: store stuff with localStorage
$(document).ready(function() {
    btnTrans.on('click', trans);
    btnTrans.on('click', function() {
        btnTrans.blur();
    });
});

function trans() {
    translate(inpTrans.val());
}

function translate(word) {
    var url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + word + '?key=' + APP_KEY;
    $.get(url);
    //var xhr = new XMLHttpRequest();
    //xhr.open("GET", url, true); // async=true
    //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    //xhr.onreadystatechange = function() {
    //    if (xhr.readyState == 4) { // ready
    //        handleResponse(xhr.responseText);
    //    }
   // }
   // xhr.send();
}

function handleResponse(text) {
    pDef.val(text);
}

function observer(text, ms) {
    pTime.text(text);
    pMs.text(ms);
}
var sw = new Stopwatch(observer);

function start() {
    if (!started) {
        sw.start();
        btnTrans.text('pause'); 
        btnTrans.one('click', pause);
        updPct();
        details.html(timeStr(date()));
        started = true;
    }
}

function pause() {
    sw.pause();
    btnTrans.text('resume'); 
    btnTrans.one('click', resume);
    updPct();
    details.html(details.html() + '-' + timeStr(date()));
}

function resume() {
    sw.resume();
    btnTrans.text('pause'); 
    btnTrans.one('click', pause);
    updPct();
    details.html(details.html() + '<br>' + timeStr(date()));
}

function clear() {
    if (started) {
        sw.stop();
        btnTrans.text('start'); 
        btnTrans.one('click', start);
        btnTrans.off('click', pause);
        btnTrans.off('click', resume);
        details.text('');
        sum.text('');
        started = false;
    }
}

function updPct() {
    var abs = now() - sw.absStart;
    var total = sw.total();
    var pct = round(100 * (total / abs), 1);
    if (total == 0) {
        var pct = 100;
    }
    sum.text(pct + '%');
}

