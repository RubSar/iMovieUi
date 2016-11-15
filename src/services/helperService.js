/**
 * Created by Toshiba on 11/15/2016.
 */
function arrayUnique(array, predictor) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i][predictor] === a[j][predictor])
                a.splice(j--, 1);
        }
    }

    return a;
}

module.exports={
  arrayUnique:arrayUnique
};
