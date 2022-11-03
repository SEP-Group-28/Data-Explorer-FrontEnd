export const getBbandsChart = (url, upperSeries, middleSeries, lowerSeries) => {
  fetch(url)
    .then((res) => res.json())
    .then(data =>{
        if(!data.hasOwnProperty('error')){
            const upper = []
            const middle = []
            const lower = []
            
            let upperBandObject = data['upperband'] 
            let lowerBandObject = data["lowerband"]; 
            let middleBandObject = data["middleband"]; 

            for (let key in upperBandObject){
                if(upperBandObject.hasOwnProperty(key)){
                    let object = {
                      time: Number(key),
                      value: upperBandObject[key],
                    };
                    upper.push(object);
                }
                if(lowerBandObject.hasOwnProperty(key)){
                    let object = {
                      time: Number(key),
                      value: lowerBandObject[key],
                    };
                    lower.push(object)
                }
                if (middleBandObject.hasOwnProperty(key)) {
                    let object = {
                      time: Number(key),
                      value: middleBandObject[key],
                    };
                    middle.push(object);
                }
            }
            upperSeries.setData(upper)
            middleSeries.setData(middle)
            lowerSeries.setData(lower)
        }
    })
};
