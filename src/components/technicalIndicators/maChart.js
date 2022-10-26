import { removeDuplicates } from "../../utils/functions";

export const getMAChart = (url,lineSeries) => {
    let tempLineData = [];
    fetch(url)
    .then(res => res.json())
    .then(data=>{
        if (!data.hasOwnProperty('error')){
            let tempLines = []
            for(let i in data){
                if(data.hasOwnProperty(i)){
                    let object = {
                      time: Number(i),
                      value: data[i],
                    }
                    tempLines.push(object)
                    
                }
            }
            let tempLineData = removeDuplicates(tempLines);
            
            lineSeries.current.setData(tempLineData)
            
        }
        
    }).catch()
    return tempLineData;
};
