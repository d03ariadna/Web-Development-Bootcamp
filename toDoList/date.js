
module.exports.getDate = getDate;

function getDate() {

    let options = { day: 'numeric', month: 'long', year: 'numeric' };

    return (new Date().toLocaleString('en-us', options));

}

exports.getDay = function () {

    return (new Date().toLocaleDateString('en-us', { weekday: 'long' }));

}
