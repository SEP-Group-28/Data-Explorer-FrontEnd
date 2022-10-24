import { removeDuplicates } from "../../utils/functions";

export const getMAChart = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(data=>{
        if (!data.hasOwnProperty('error')){
            let tempLines = []
            for(let i in data){
                if(data.hasOwnProperty(i)){
                    let object = {
                      time: i / 1000,
                      value: data[key],
                    }
                    tempLines.push(object)
                }
            }
        }
        let tempLineData = removeDuplicates(tempLines)
        return tempLineData;
    }).catch()
    
};
