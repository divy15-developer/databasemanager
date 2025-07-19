

function errorHandler(res ,keyCount, ...arg){
    if(keyCount === 0){
       return res.send({success : false});
    };

    let error = {};

    for(let i = 0 ; i <= keyCount ; i++){
        let key = arg[i*2];
        let value = arg[i*2+1];
        error[key]=value;
    }

    return res.send({success : false , error})
};

module.exports = errorHandler;