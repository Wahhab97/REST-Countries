interface ICountryObj {
  population: string;
  region: string;
  capital: string;
  tld: string[];
  borders?: string[];
  name: {
    common:string;
    nativeName:{
      [key:string]: {
        common: string;
      };
    };
  };
  flags: {
    png: string;
  };
  currencies: {
    [key:string]: {
      name: string;
    }
  };
  languages: {
    [key:string]: string;
  }
  cca3:string;
}

let lightMode = localStorage.getItem('lightMode');
const lightModeToggle = document.querySelector("header .container .theme");


lightModeToggle?.addEventListener("click", () => {
  lightMode = localStorage.getItem("lightMode");

  if(lightMode !== "enabled") {
    enableLightMode();
  } else {
    disableLightMode();
  }
})
let enableLightMode = () => {
  document.body.classList.add('light-mode');
  localStorage.setItem('lightMode', 'enabled');
  let i = lightModeToggle?.children[0];
  i?.classList.remove("fa-sun")
  i?.classList.add("fa-moon");
}
let disableLightMode = () => {
  document.body.classList.remove('light-mode');
  localStorage.setItem('lightMode', "disabled");
  let i = lightModeToggle?.children[0];
  i?.classList.remove("fa-moon")
  i?.classList.add("fa-sun");
}
if (lightMode === "enabled") {
  enableLightMode();
} else {
  disableLightMode();
}

let fetchAllCountries = async () => {
  let countries = await fetch("https://restcountries.com/v3.1/all");
  let response = await countries.json();
  try {
    if (response.message == "Page Not Found") {
      // throw console.error("this is an error");
    } else {
      mainObj = response;
      createCountries(response);
      console.log(response.length);
    }
  } 
  catch (error) {
    throw console.log("this is an error " + error)
  }
}
let createCountries = (obj:ICountryObj[]) => {
  // mainObj = obj;
  let section = document.getElementsByTagName("section")[0];
  for (let i = 0; i < obj.length ; i++) {
    let countryObject = obj[i];
    let sectionDiv = document.createElement("div");
    let countryName = countryObject.name.common;
    sectionDiv.addEventListener("click", () => countryDetails(countryObject));
    // Create flag
    let img = document.createElement("img");
    img.src = countryObject.flags.png;
    img.alt =  countryName + " flag";
    // Create info div
    let infoDiv = document.createElement("div");
    infoDiv.classList.add("info");
    let countryH3 = document.createElement("h3");
    let countryH3Text = document.createTextNode(countryName);
    countryH3.append(countryH3Text);
    infoDiv.append(countryH3);
    let pList: string[] = ["population", "region", "capital"];
    pList.forEach((element: string): void => {
      let p = document.createElement("p");
      let pSpan = document.createElement("span");
      let pSpanText = document.createTextNode(countryObject[element]);
      pSpan.append(pSpanText);
      let ptext = document.createTextNode(`${element.charAt(0).toUpperCase()+element.slice(1)}: `);
      p.append(ptext, pSpan);
      infoDiv.append(p);
    });
    // Appending to countries Section
    sectionDiv.append(img, infoDiv);
    section.append(sectionDiv);
  }
}

let countryDetails = (countryObject: ICountryObj) => {
  let body = document.getElementsByTagName("body")[0];
  body.style.overflow = "hidden";
  
  let cardDetails = document.getElementsByClassName("card-details")[0];
  let backgroundLayer =document.getElementsByClassName("background-layer")[0]
  cardDetails.classList.remove("hidden");  
  backgroundLayer.classList.remove("hidden");
  let y = window.scrollY;
  window.scrollTo(0,0);
  
  createInfo(countryObject, y);
}

let createInfo = (obj: ICountryObj, scroll: number) => {
  let cardDetails = document.querySelector(".card-details .container");
  let fullInfo = document.createElement("div");
  fullInfo.classList.add("full-info");
  let img = document.createElement("img");
  let countryName = obj.name.common;
  img.src = obj.flags.png;
  img.alt =  countryName + " flag";

  let detailsDiv = document.createElement("div");
  let detailsH3 = document.createElement("h3");
  let generalDiv = document.createElement("div");
  let detailsFooter = document.createElement("footer");
  let generalCol1 = document.createElement("div");
  let generalCol2 = document.createElement("div");
  let detailsH3Text = countryName;

  let nativeName = document.createElement("p");
  let nativeNameText = document.createTextNode("Native Name: ")
  let nativeNameSpan = document.createElement("span");
  let nativeNameObj = obj.name.nativeName;
  let nativeNameSpanText = nativeNameObj[Object.keys(nativeNameObj)[Object.keys(nativeNameObj).length - 1]];
  nativeNameSpan.append(nativeNameSpanText.common);
  nativeName.append(nativeNameText, nativeNameSpan);

  generalCol1.append(nativeName);
  let pList: string[] = ["population", "region", "subregion", "capital"];
  pList.forEach((element: string): void => {
    let p = document.createElement("p");
    let pSpan = document.createElement("span");
    let pSpanText = document.createTextNode(obj[element]);
    pSpan.append(pSpanText);
    let ptext = document.createTextNode(`${element.charAt(0).toUpperCase()+element.slice(1)}: `);
    p.append(ptext, pSpan);
    generalCol1.append(p);
  });

  let tld = document.createElement("p");
  let tldSpan = document.createElement("span");
  let tldSpanText = document.createTextNode(obj.tld[0]);
  let tldText = document.createTextNode("Top Level Domain: ");
  tldSpan.append(tldSpanText);
  tld.append(tldText, tldSpan);

  let currenciesObj = obj.currencies;
  let objLength = Object.keys(currenciesObj).length;
  let currenciesStr: string = "";
  for(let j = 0; j < objLength; j++) {
    let currency = currenciesObj[Object.keys(currenciesObj)[j]];
    if(j === objLength - 1) {
      currenciesStr += currency.name;
      break;
    }
    currenciesStr += currency.name + ", "
  }
  let currenciesP = document.createElement("p");
  let currenciesPSapn = document.createElement("span");
  let currenciesPText = document.createTextNode("Currencies: ");
  let currenciesPSapnText = document.createTextNode(currenciesStr);
  currenciesPSapn.append(currenciesPSapnText);
  currenciesP.append(currenciesPText, currenciesPSapn);

  let languagesObj = obj.languages;
  let languagesStr: string = "";
  let langLength = Object.keys(languagesObj).length;
  for (let j = 0; j < langLength; j++) {
    let language = languagesObj[Object.keys(languagesObj)[j]];
    if(j === langLength - 1) {
      languagesStr += language;
      break;
    }
    languagesStr += language + ", "
  }
  let languagesP = document.createElement("p");
  let languagesPSapn = document.createElement("span");
  let languagesPText = document.createTextNode("languages: ");
  let languagesPSapnText = document.createTextNode(languagesStr);
  languagesPSapn.append(languagesPSapnText);
  languagesP.append(languagesPText, languagesPSapn);

  let detailsFooterSpan = document.createElement("span");
  let detailsFooterSpanText = document.createTextNode("Border Countries:");
  detailsFooterSpan.append(detailsFooterSpanText);
  detailsFooter.append(detailsFooterSpan);
  if(obj.borders) {
    for (let j = 0; j < obj.borders.length; j++) {
      let neighbour = searchByCode(obj.borders[j]);
  
      let span = document.createElement("span");
      let spanText = document.createTextNode(neighbour[0].name.common);
      span.classList.add("border-country");
      span.append(spanText);
      detailsFooter.append(span);
      span.addEventListener("click", () => {
        clearInfo();
        createInfo(neighbour[0], scroll);
      })
    }
  }

  detailsDiv.classList.add("details");
  generalDiv.classList.add("general");
  generalCol1.classList.add("col1");
  generalCol2.classList.add("col2");

  // append
  detailsH3.append(detailsH3Text);
  generalCol2.append(tld, currenciesP, languagesP);
  generalDiv.append(generalCol1, generalCol2)
  detailsDiv.append(detailsH3, generalDiv, detailsFooter);
  fullInfo.append(img, detailsDiv);
  cardDetails?.append(fullInfo);

  let back = document.querySelector("main .card-details .back");
  back?.addEventListener("click", () => {
    clearInfo();
    let body = document.getElementsByTagName("body")[0];
    body.style.overflow = "auto";
    let cardDetails = document.getElementsByClassName("card-details")[0];
    let backgroundLayer =document.getElementsByClassName("background-layer")[0];
    cardDetails.classList.add("hidden");
    backgroundLayer.classList.add("hidden");
    window.scrollTo(0, scroll);
  })
}

let searchInput = (document.getElementById("search") as HTMLInputElement);
searchInput?.addEventListener("keyup", () => {
  let search = searchInput?.value;
  clearSection();
  if (search === "") {
    createCountries(mainObj);
  } else {
    let countries = searchByName(search);
    createCountries(countries);
  }
})

let continentFilter = document.getElementById("filter");
continentFilter?.addEventListener("click", () => {
  let options = document.getElementsByClassName("options")[0];
  options.classList.toggle("hidden");
  let lis = document.getElementsByTagName("li");
  let lisArray = Array.from(lis);
  lisArray.forEach((element) => {
    element.addEventListener("click", () => {
      let region: string = element.dataset.value!;
      clearSection();
      if (region === "all") {
        createCountries(mainObj);
      } else {
        let regionCountries = searchByRegion(region);
        createCountries(regionCountries);
      }
    })
  })
});

let searchByCode =  (code: string) => {
  return  mainObj.filter((country) => country.cca3 == code);
}

let searchByRegion = (region:string) => {
  return  mainObj.filter((country) => country.region == region);
}

let searchByName = (search:string) => {
  return mainObj.filter((country) => country.name.common.includes(search));
}

let clearSection = () => {
  let section = document.querySelector("main section");
  while(section?.lastChild) {
    section.lastChild.remove();
  }
}

let clearInfo = () => {
  let info = document.querySelector(".card-details .container .full-info");
  info?.remove();
}

let mainObj: ICountryObj[];
fetchAllCountries();