
// Helper function to get the comparator for sorting
const getComparator = (order, sortBy) => {
    return order === 'desc'
      ? (a, b) => (a[sortBy] < b[sortBy] ? -1 : 1)
      : (a, b) => (a[sortBy] > b[sortBy] ? -1 : 1);
  };

  const inferCommonTrends = (data) => {
    if (!data) return [];
  
    const highestCost = data.reduce((max, item) => Math.max(max, item.Cost), 0);
    const minimumCost = data.reduce((min, item) => Math.min(min, item.Cost), Infinity);
    const maximumConsumedQuantity = data.reduce((max, item) =>
      Math.max(max, item.ConsumedQuantity), 0);
    const minimumConsumedQuantity = data.reduce((min, item) =>
      Math.min(min, item.ConsumedQuantity), Infinity);
  
    const trends = [];
    if (highestCost > 0) trends.push(`Highest cost: $${highestCost}`);
    if (minimumCost < Infinity) trends.push(`Minimum cost: $${minimumCost}`);
    if (maximumConsumedQuantity > 0) trends.push(`Maximum consumed quantity: ${maximumConsumedQuantity}`);
    if (minimumConsumedQuantity < Infinity) trends.push(`Minimum consumed quantity: ${minimumConsumedQuantity}`);
  
    return trends;
  };
  
  
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
  
  
  
  
  
  
export const sortArray = (array, sortBy, sortDirection) => {
    const comparator = getComparator(sortBy, sortDirection);
    const sortedArray = [...array];
  
    sortedArray.sort(comparator);
  
    return sortedArray;
  };
  
  // Applies pagination to an array based on the current page and page size
  export const paginateArray = (array, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
    return array.slice(startIndex, endIndex);
  };
  
  // Enum for sort order
  export const Order = {
    ASCENDING: 'asc',
    DESCENDING: 'desc',
  };