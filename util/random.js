//creates array of three random unique numbers between 0 and the length of 
//the array of images minus 1

module.exports = function random(array) {

    if (array.length > 3) {
        //creates three random numbers
        let n1 = Math.floor(Math.random() * array.length - 1);
        let n2 = Math.floor(Math.random() * array.length - 1);
        let n3 = Math.floor(Math.random() * array.length - 1);

        //makes sure theyre all different
        if (n1 != n2 && n1 != n3 && n2 != n3) {
            //creates an array of the random values from the input array
            let arr = [n1, n2, n3];
            //returns the array
            return arr
        } else {
            //if the numbers aren't different then the fucntion is recursive
            return random(array)
        }
    }
    else if (array.length > 0) {
        return [0, 0, 0];
    }
    else {
        return null;
    }
}