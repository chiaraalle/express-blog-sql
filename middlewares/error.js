function error(req, res, next){
    res.status(500).send('Ops! Qualcosa è andato storto! Error 500');
}
module.exports = error;