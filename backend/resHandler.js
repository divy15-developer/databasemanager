 function resHandler (res , keyCount , ...arg) {
    if(keyCount === 0){
       return  res.send({success : true});
    };

    let responseData = {};

    for(let i = 0 ; i < keyCount ; i++){
        let key = arg[i*2];
        let value = arg[i*2+1];
        responseData[key]=value;
    }

    console.log( "🍝" , responseData);

    return res.send({success : true , data : responseData});
};

module.exports = resHandler;