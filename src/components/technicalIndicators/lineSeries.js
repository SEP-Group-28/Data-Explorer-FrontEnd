import { removeDuplicates } from "../../utils/functions";

export const getLineChart = (url,lineSeries) => {
    let tempLineData = [];
    fetch(url)
    .then(res => res.json())
    .then(data=>{
        console.log("data issss, ",data)
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
            // console.log(tempLines)
            let tempLineData = removeDuplicates(tempLines);
            
            lineSeries.setData(tempLineData)
            
        }
        
    }).catch()
    return tempLineData;
};
