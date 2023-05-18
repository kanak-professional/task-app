export function getTrendingData(rawData:any[], value:string) {
    let trendingValue = rawData[0];
    if (value === 'HighestCost') {
        rawData.forEach((element) => {
            const maxValue = Math.max(Number(element.Cost), Number(trendingValue.Cost));
            if (Number(element.Cost) === maxValue) {
                trendingValue = element;
            }
        });
        return trendingValue.Cost
    }
    if (value === 'MaximumConsumedQuantity') {
        rawData.forEach((element) => {
            const maxValue = Math.max(Number(element.ConsumedQuantity), Number(trendingValue.ConsumedQuantity));
            if (Number(element.ConsumedQuantity) === maxValue) {
                trendingValue = element;
            }
        });
        return trendingValue.ConsumedQuantity
    }

    if (value === 'MinimumCost') {
        rawData.forEach((element) => {
            const minValue = Math.min(Number(element.Cost), Number(trendingValue.Cost));
            if (Number(element.Cost) === minValue) {
                trendingValue = element;
            }
        });
        return trendingValue.Cost
    }

    if (value === 'MinimumConsumedQuantity') {
        rawData.forEach((element) => {
            const minValue = Math.min(Number(element.ConsumedQuantity), Number(trendingValue.ConsumedQuantity));
            if (Number(element.ConsumedQuantity) === minValue) {
                trendingValue = element;
            }
        });
        return trendingValue.ConsumedQuantity
    }

}