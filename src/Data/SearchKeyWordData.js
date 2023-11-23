export const SearchKeyWordData = [
    { id: 1, name: 'Home', description: 'Home Page', press:'Home' },
    { id: 2, name: 'Search1', description: 'Search Page', press:'Search' },
];


export const addSearchKeyword = (data, newItem) => {
    return [...data, newItem];
  };
  
  export const deleteSearchKeyword = (data, itemId) => {
    return data.filter(item => item.id !== itemId);
  };