module.exports = (req, res) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=计算', true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
   
    const { name = 'World' } = req.query;
    res.send(`Hello ${name}!`);
};
