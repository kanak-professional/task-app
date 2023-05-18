export function getTrendingData(rawData, value) {
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