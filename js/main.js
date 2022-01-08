import { getApiData } from "./Service.js";

const fetchAllData = async (url) => {
  const response = await getApiData(url);
  const data= await response.json();
  return data;
};

const filterDataAndAddNodes = (searchText, data, targetId) => {
  const searchedData = data.filter(country => country?.altSpellings?.map(country=>country.toUpperCase()).some(d=>d.includes(searchText.toUpperCase())));
  const fragment = new DocumentFragment();
  searchedData?.map(country =>{
    const option = document.createElement("option");
    option.textContent = country?.name?.common || "";
    option.id = country?.name?.common || "";
    fragment.append(option);
  });
  const targetElement = document.getElementById(targetId);
  targetElement?.appendChild(fragment);
  console.log(searchedData)
};

const debouncedSearch = function (func, delay) {
    let timer;
    return function () {
    const context = this;
    const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    }
};

const createSearchableInput = async (id, targetId,  url="https://restcountries.com/v3.1/all") => {
  const data = await fetchAllData(url);
  const inputElement =  document.querySelector(id);
  const improvedFilterFunc = debouncedSearch((e)=>filterDataAndAddNodes(e.target.value, data, targetId), 1000);
  inputElement.addEventListener("keyup", improvedFilterFunc);
};

window.onload = ()=>{
   createSearchableInput("#auto-select", "suggestions");
};

