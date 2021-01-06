module.exports = (req, res) => {
    xmlhttp.open('GET', 'http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=计算', false);
    xmlhttp.send();
    console.log(xmlhttp.responseText)
    const { name = 'World' } = req.query;
    res.send(`Hello ${name}!`);
};
