let db = {
    SimpleTable: []
}

export const listItemFromTable = (params, cb) =>{
    console.log('params.Table: ', params.Table);
    var table = db[params.Table];
    var results = table.slice(-2) 
    cb(null, results);
}

export const putItemFromTable = (params, cb) => {
    var table = db[params.Table];
    table.push(params.Item);
    return cb(null, {});
}

export const deleteItemFromTable = (params, cb) => {
    var table = db[params.Table];
    var found_index = table.findIndex((el, index)=>{
        return (el[params.Key] === params.value)
    });
    table.splice(found_index, 1);
    return cb(null, {});
}