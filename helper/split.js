
function simplifyDebts(transactions){
    var splits = new Array()
    var transaction_map = new Map(Object.entries(transactions)); //converting JSON to map object 

    function settleSimilarFigures(){
        let vis = new Map();
        for(let tr1 of transaction_map.keys()){
            vis.set(tr1, 1);
            for(let tr2 of transaction_map.keys()){
                if(!vis.has(tr2) && tr1 != tr2){
                    if(transaction_map.get(tr2) == -transaction_map.get(tr1)){
                        if(transaction_map.get(tr2) > transaction_map.get(tr1)){
                            splits.push([tr1, tr2, transaction_map.get(tr2)])
                        }else{
                            splits.push([tr2, tr1, transaction_map.get(tr1)])
                        }
                        transaction_map.set(tr2, 0)
                        transaction_map.set(tr1, 0)
                    }
                }
            }
        }
    }

    function getMaxMinCredit(){
        let max_ob, min_ob, max = Number.MIN_VALUE, min = Number.MAX_VALUE
        for(let tr of transaction_map.keys()){
            if(transaction_map.get(tr) < min){
                min = transaction_map.get(tr)
                min_ob = tr
            }
            if(transaction_map.get(tr) > max){
                max = transaction_map.get(tr)
                max_ob = tr
            }
        }
        return [min_ob, max_ob];
    }
    
    function helper(){
        let minMax = getMaxMinCredit();
        if( minMax[0] == undefined || minMax[1] == undefined) return;
        let min_value = Math.min(-transaction_map.get(minMax[0]), transaction_map.get(minMax[1]));
        transaction_map.set(minMax[0], transaction_map.get(minMax[0]) + min_value);
        transaction_map.set(minMax[1], transaction_map.get(minMax[1]) - min_value);
        min_value =  Math.round((min_value  + Number.EPSILON) * 100) / 100;
        let res = [minMax[0], minMax[1], min_value];
        splits.push(res);
        helper();    
    }

    settleSimilarFigures();
    helper();

    return splits;
}

module.exports = simplifyDebts;