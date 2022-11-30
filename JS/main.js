"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let lightMode = localStorage.getItem('lightMode');
const lightModeToggle = document.querySelector("header .container .theme");
lightModeToggle === null || lightModeToggle === void 0 ? void 0 : lightModeToggle.addEventListener("click", () => {
    lightMode = localStorage.getItem("lightMode");
    if (lightMode !== "enabled") {
        enableLightMode();
    }
    else {
        disableLightMode();
    }
});
let enableLightMode = () => {
    document.body.classList.add('light-mode');
    localStorage.setItem('lightMode', 'enabled');
    let i = lightModeToggle === null || lightModeToggle === void 0 ? void 0 : lightModeToggle.children[0];
    i === null || i === void 0 ? void 0 : i.classList.remove("fa-sun");
    i === null || i === void 0 ? void 0 : i.classList.add("fa-moon");
};
let disableLightMode = () => {
    document.body.classList.remove('light-mode');
    localStorage.setItem('lightMode', "disabled");
    let i = lightModeToggle === null || lightModeToggle === void 0 ? void 0 : lightModeToggle.children[0];
    i === null || i === void 0 ? void 0 : i.classList.remove("fa-moon");
    i === null || i === void 0 ? void 0 : i.classList.add("fa-sun");
};
if (lightMode === "enabled") {
    enableLightMode();
}
else {
    disableLightMode();
}
let fetchAllCountries = () => __awaiter(void 0, void 0, void 0, function* () {
    let countries = yield fetch("https://restcountries.com/v3.1/all");
    let response = yield countries.json();
    try {
        if (response.message == "Page Not Found") {
            // throw console.error("this is an error");
        }
        else {
            mainObj = response;
            createCountries(response);
            console.log(response.length);
        }
    }
    catch (error) {
        throw console.log("this is an error " + error);
    }
});
let createCountries = (obj) => {
    // mainObj = obj;
    let section = document.getElementsByTagName("section")[0];
    for (let i = 0; i < obj.length; i++) {
        let countryObject = obj[i];
        let sectionDiv = document.createElement("div");
        let countryName = countryObject.name.common;
        sectionDiv.addEventListener("click", () => countryDetails(countryObject));
        // Create flag
        let img = document.createElement("img");
        img.src = countryObject.flags.png;
        img.alt = countryName + " flag";
        // Create info div
        let infoDiv = document.createElement("div");
        infoDiv.classList.add("info");
        let countryH3 = document.createElement("h3");
        let countryH3Text = document.createTextNode(countryName);
        countryH3.append(countryH3Text);
        infoDiv.append(countryH3);
        let pList = ["population", "region", "capital"];
        pList.forEach((element) => {
            var _a;
            let p = document.createElement("p");
            let pSpan = document.createElement("span");
            let pSpanText = document.createTextNode((_a = Object.assign({}, countryObject)[element]) !== null && _a !== void 0 ? _a : "");
            pSpan.append(pSpanText);
            let ptext = document.createTextNode(`${element.charAt(0).toUpperCase() + element.slice(1)}: `);
            p.append(ptext, pSpan);
            infoDiv.append(p);
        });
        // Appending to countries Section
        sectionDiv.append(img, infoDiv);
        section.append(sectionDiv);
    }
};
let countryDetails = (countryObject) => {
    let body = document.getElementsByTagName("body")[0];
    body.style.overflow = "hidden";
    let cardDetails = document.getElementsByClassName("card-details")[0];
    let backgroundLayer = document.getElementsByClassName("background-layer")[0];
    cardDetails.classList.remove("hidden");
    backgroundLayer.classList.remove("hidden");
    let y = window.scrollY;
    window.scrollTo(0, 0);
    createInfo(countryObject, y);
};
let createInfo = (obj, scroll) => {
    let cardDetails = document.querySelector(".card-details .container");
    let fullInfo = document.createElement("div");
    fullInfo.classList.add("full-info");
    let img = document.createElement("img");
    let countryName = obj.name.common;
    img.src = obj.flags.png;
    img.alt = countryName + " flag";
    let detailsDiv = document.createElement("div");
    let detailsH3 = document.createElement("h3");
    let generalDiv = document.createElement("div");
    let detailsFooter = document.createElement("footer");
    let generalCol1 = document.createElement("div");
    let generalCol2 = document.createElement("div");
    let detailsH3Text = countryName;
    let nativeName = document.createElement("p");
    let nativeNameText = document.createTextNode("Native Name: ");
    let nativeNameSpan = document.createElement("span");
    let nativeNameObj = obj.name.nativeName;
    let nativeNameSpanText = nativeNameObj[Object.keys(nativeNameObj)[Object.keys(nativeNameObj).length - 1]];
    nativeNameSpan.append(nativeNameSpanText.common);
    nativeName.append(nativeNameText, nativeNameSpan);
    generalCol1.append(nativeName);
    let pList = ["population", "region", "subregion", "capital"];
    pList.forEach((element) => {
        let p = document.createElement("p");
        let pSpan = document.createElement("span");
        let pSpanText = document.createTextNode(obj[element]);
        pSpan.append(pSpanText);
        let ptext = document.createTextNode(`${element.charAt(0).toUpperCase() + element.slice(1)}: `);
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
    let currenciesStr = "";
    for (let j = 0; j < objLength; j++) {
        let currency = currenciesObj[Object.keys(currenciesObj)[j]];
        if (j === objLength - 1) {
            currenciesStr += currency.name;
            break;
        }
        currenciesStr += currency.name + ", ";
    }
    let currenciesP = document.createElement("p");
    let currenciesPSapn = document.createElement("span");
    let currenciesPText = document.createTextNode("Currencies: ");
    let currenciesPSapnText = document.createTextNode(currenciesStr);
    currenciesPSapn.append(currenciesPSapnText);
    currenciesP.append(currenciesPText, currenciesPSapn);
    let languagesObj = obj.languages;
    let languagesStr = "";
    let langLength = Object.keys(languagesObj).length;
    for (let j = 0; j < langLength; j++) {
        let language = languagesObj[Object.keys(languagesObj)[j]];
        if (j === langLength - 1) {
            languagesStr += language;
            break;
        }
        languagesStr += language + ", ";
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
    if (obj.borders) {
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
            });
        }
    }
    detailsDiv.classList.add("details");
    generalDiv.classList.add("general");
    generalCol1.classList.add("col1");
    generalCol2.classList.add("col2");
    // append
    detailsH3.append(detailsH3Text);
    generalCol2.append(tld, currenciesP, languagesP);
    generalDiv.append(generalCol1, generalCol2);
    detailsDiv.append(detailsH3, generalDiv, detailsFooter);
    fullInfo.append(img, detailsDiv);
    cardDetails === null || cardDetails === void 0 ? void 0 : cardDetails.append(fullInfo);
    let back = document.querySelector("main .card-details .back");
    back === null || back === void 0 ? void 0 : back.addEventListener("click", () => {
        clearInfo();
        let body = document.getElementsByTagName("body")[0];
        body.style.overflow = "auto";
        let cardDetails = document.getElementsByClassName("card-details")[0];
        let backgroundLayer = document.getElementsByClassName("background-layer")[0];
        cardDetails.classList.add("hidden");
        backgroundLayer.classList.add("hidden");
        window.scrollTo(0, scroll);
    });
};
let searchInput = document.getElementById("search");
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("keyup", () => {
    let search = searchInput === null || searchInput === void 0 ? void 0 : searchInput.value;
    clearSection();
    if (search === "") {
        createCountries(mainObj);
    }
    else {
        let countries = searchByName(search);
        createCountries(countries);
    }
});
let continentFilter = document.getElementById("filter");
continentFilter === null || continentFilter === void 0 ? void 0 : continentFilter.addEventListener("click", () => {
    let options = document.getElementsByClassName("options")[0];
    options.classList.toggle("hidden");
    let lis = document.getElementsByTagName("li");
    let lisArray = Array.from(lis);
    lisArray.forEach((element) => {
        element.addEventListener("click", () => {
            let region = element.dataset.value;
            clearSection();
            if (region === "all") {
                createCountries(mainObj);
            }
            else {
                let regionCountries = searchByRegion(region);
                createCountries(regionCountries);
            }
        });
    });
});
let searchByCode = (code) => {
    return mainObj.filter((country) => country.cca3 == code);
};
let searchByRegion = (region) => {
    return mainObj.filter((country) => country.region == region);
};
let searchByName = (search) => {
    return mainObj.filter((country) => country.name.common.includes(search));
};
let clearSection = () => {
    let section = document.querySelector("main section");
    while (section === null || section === void 0 ? void 0 : section.lastChild) {
        section.lastChild.remove();
    }
};
let clearInfo = () => {
    let info = document.querySelector(".card-details .container .full-info");
    info === null || info === void 0 ? void 0 : info.remove();
};
let mainObj;
fetchAllCountries();
