//URL for given data
let restcountriesurl="https://restcountries.eu/rest/v2/all";
//function to fetch data from given URL and promise is used here
async function restcountries(restcountriesurl){
   try{ 
    var data=await fetch(restcountriesurl);
    console.log(data);
    var parseddata=await data.json();
    console.log(parseddata);
    display(parseddata);
   }
catch(err){
    console.log(err);
}
}
restcountries(restcountriesurl)
//.then((response)=>{display(JSON.parse(response));})
//.catch((err) => console.error(err));

function display(data){
var container= createElement("div","container","cont1");
var row=createElement("div","row","row1");


data.forEach(element => {
    var col=createElement("div","col-3","row");
    var card=createcard(element);
    col.append(card);
    row.append(col);
});

container.append(row);
document.body.append(container);
}
function createcard(countryObj) {
    const card = createElement("div", "card");
    const cardBody = createElement("div", "card-body");
    const cardTitle = createElement("h5", "card-title");
if (countryObj.name.length > 20) cardTitle.classList.add("short-title");
    cardTitle.innerHTML = countryObj.name;
    // flag images to be displayed
    const image = createElement("img", "card-img-top");
    image.src = countryObj.flag;
    image.alt = countryObj.name;
    const cardContents = createElement("div", "card-contents");

    // create element to display captial
    const capitalP = createElement("p", "capital");
    capitalP.innerHTML = "Capital:";
    const capitalPSpan = createElement("span");
    if (!countryObj.capital) capitalPSpan.innerHTML = "NA";
    else capitalPSpan.innerHTML = countryObj.capital;
    capitalP.append(capitalPSpan);

    // create elements to display country codes
    const countryCodesP = createElement("p");
    countryCodesP.innerHTML = "Country Codes: ";
    const countryCodesPSpan = createElement("span");
    countryCodesPSpan.innerHTML = `${countryObj.alpha2Code}, ${countryObj.alpha3Code}`;
    countryCodesP.append(countryCodesPSpan);

    // create elements to display region
    const regionP = createElement("p");
    regionP.innerHTML = "Region:";
    const regionPSpan = createElement("span");
    regionPSpan.innerHTML = countryObj.region;
    regionP.append(regionPSpan);
    //lat long
    const latLongP = createElement("p");
    latLongP.innerHTML = "Lat Long:";
    const latLongPSpan = createElement("span");
    latLongP.append(latLongPSpan);
    //weather button
    var cardFooter = document.createElement('div',"card-footer text-muted text-center","cardfooter");
    var weatherButton = document.createElement('button');
    weatherButton.setAttribute('type','button');
    weatherButton.setAttribute('id','weather');
    weatherButton.setAttribute('data-toggle','modal');
    weatherButton.setAttribute('data-target','#displayWeather');
    weatherButton.classList.add('btn','btn-primary','weatherButton');
    weatherButton.innerHTML = 'Check Weather!';
    weatherButton.addEventListener('click',function(){
    getweather(countryObj);
  })

    cardFooter.append(weatherButton)
    cardContents.append(capitalP, countryCodesP, regionP, latLongP);
    cardBody.append(cardTitle, image, cardContents,cardFooter);
    card.append(cardBody);
    return card;
}
function getweather(obj){
var arr=obj.latlng;
let url = "https://api.openweathermap.org/data/2.5/weather?lat="+arr[0].toFixed(2)+"&lon="+arr[1].toFixed(2)+"&appid=75c4ca56ce33dc54730c9d30f7e71af5";
  var request = new XMLHttpRequest;
  request.open('GET',url,true);
  request.send();

  request.onload = function(){
    var data = JSON.parse(this.response);
    alert("TEMPERATURE : "+data.main.temp+"degree celcius DESCRIPTION : "+data.weather[0].description);
    
  }

}
function createElement(ele,eleclass="",eleid=""){
var element=document.createElement(ele);
element.className=eleclass;
element.id=eleid;
return element;
}