//creates array of three random unique numbers

module.exports = function () {
    let n1 = Math.floor(Math.random() * 194);
    let n2 = Math.floor(Math.random() * 194);
    let n3 = Math.floor(Math.random() * 194);

    if (n1 != n2 && n1 != n3 && n2 != n3) {
        let array = [n1, n2, n3];
        return array
    } else {
        return random()
    }
}