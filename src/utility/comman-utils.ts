export function findTrendingValue(rawData: any[], value: string) {
    let trendingValue = rawData[0];
    
    const getValue = (element: any, property: string) => {
      return Number(element[property]);
    };
  
    if (value === 'HighestCost' || value === 'MinimumCost') {
      const property = (value === 'HighestCost') ? 'Cost' : 'ConsumedQuantity';
      let extremeValue = getValue(trendingValue, property);
  
      rawData.forEach((element) => {
        const currentValue = getValue(element, property);
        if (value === 'HighestCost') {
          if (currentValue > extremeValue) {
            trendingValue = element;
            extremeValue = currentValue;
          }
        } else {
          if (currentValue < extremeValue) {
            trendingValue = element;
            extremeValue = currentValue;
          }
        }
      });
  
      return (value === 'HighestCost') ? trendingValue.Cost : trendingValue.ConsumedQuantity;
    }
  
    if (value === 'MaximumConsumedQuantity' || value === 'MinimumConsumedQuantity') {
      const property = (value === 'MaximumConsumedQuantity') ? 'ConsumedQuantity' : 'Cost';
      let extremeValue = getValue(trendingValue, property);
  
      rawData.forEach((element) => {
        const currentValue = getValue(element, property);
        if (value === 'MaximumConsumedQuantity') {
          if (currentValue > extremeValue) {
            trendingValue = element;
            extremeValue = currentValue;
          }
        } else {
          if (currentValue < extremeValue) {
            trendingValue = element;
            extremeValue = currentValue;
          }
        }
      });
  
      return (value === 'MaximumConsumedQuantity') ? trendingValue.ConsumedQuantity : trendingValue.Cost;
    }
  }
  