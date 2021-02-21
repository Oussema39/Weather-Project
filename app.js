const log = console.log;


const input = document.querySelector('#search');
const menu = document.querySelector('.drop-down');

const countriesArr = ['Tunisia','Canada','England','New York'];


document.addEventListener('click',(e)=>{
    if (e.target.tagName != 'INPUT' && e.target.tagName != 'LI'){
        
        if (checkCountry(input.value.toLowerCase())){
            log('true');        
            input.style.border = '2px solid #392F5A';
        }else{
            input.style.border = '2px solid red';
        }
        input.classList.remove('focus');
        menu.style.display = 'none';

    }
})

scaleLanding = () =>{
    const landing = document.querySelector('.landing');
    log(landing);
    landing.style.transform = 'translateY(100%)';
}

scaleWeatherDetails = () => {
    const wd = document.querySelector('.weather-details');
    log(wd);
    wd.style.top = '0';
    wd.style.opacity = '1'; 
}



document.querySelector('.search')
    .addEventListener('click',(e)=>{
        if (e.target.nodeName == 'INPUT'){
            input.focus();
            menu.style.display = 'block'
        }

})

input.addEventListener('keydown',(e)=>{
    log(e.keyCode);
    const element = document.querySelector('.hover');
    if (!element){
        return;
    }

    const last = document.querySelector('#countries').lastChild;
    const first = document.querySelector('#countries').firstChild;
    
    if (e.keyCode == 40){
        if (element == last){
            first.classList.add('hover');
        }else{
            element.nextSibling.classList.add('hover');
        }
    
    }else if(e.keyCode == 38){
        if (element == first){
            last.classList.add('hover');
        }else{
            element.previousSibling.classList.add('hover');
        }

    }else{
        return ;
    }
    element.classList.remove('hover');

})

input.addEventListener('input',()=>{
    const regEx = /[0-9]/ig;
    if(input.value.match(regEx)){
        const sliced = input.value.slice(0,input.value.length-1);
        input.value = sliced;
    }
    const arr = countriesArr;
    if (input.value == ''){
        document.querySelector('#countries').remove();
        let ul = listCountries(arr);
        document.querySelector('.drop-down').appendChild(ul);
    }else{
        let filteredArray = arr.filter(c => c.toLowerCase().startsWith(input.value.toLowerCase()))
        document.querySelector('#countries').remove();
        const ul = listCountries(filteredArray);
        document.querySelector('.drop-down').appendChild(ul);
    }

})

input.addEventListener('focus',()=>{
        input.classList.add('focus');
        menu.style.display = "block";        
})

// input.addEventListener('focusout',()=>{
//     // if (e.target.nodeName == 'LI' ){
//     //     log('true');
//     // // }
//     // log(e.target);
//     // if (e.target.nodeName != 'LI' || 'SPAN'){
//     //     menu.style.display = "none";
//     // }
//     log(input.value)
    
//     if (checkCountry(input.value.toLowerCase())){
//         input.style.border = '2px solid #392F5A';
//         input.classList.remove('focus');
//         menu.style.display = 'none';
//         return ;
//     }else{
//         log(false);
//     }
//     setTimeout(()=>{
//         menu.style.display = "none";
//         input.classList.remove('focus');
//     },100);
// });

// input.addEventListener('change',()=>{
    // scaleLanding();
    // document.querySelector('#country-name').innerHTML = input.value;
    // scaleWeatherDetails();
    
// })


filterCountrie = () =>{

}


const checkCountry= (country) => {
    const list = document.querySelectorAll('#countries li');
    const arr = Object.entries(list).map(
        e => e[1].firstChild.textContent.toLowerCase()
    );
    log(arr);
    return arr.includes(country) ;
}

const createCountry = (country) => {
    const text = document.createTextNode(country);
    const li = document.createElement('li');
    // const span = document.createElement('span');
    // span.appendChild(text);
    li.appendChild(text);
    li.addEventListener('click',()=>{
        input.value = li.firstChild.textContent;
        input.classList.remove('focus');
        menu.style.display = "none";
    })

    return li;
}



const listCountries = (countries) => {
    let ul = document.createElement('ul');
    ul.setAttribute('id','countries');
    for (country of countries){
        let li = createCountry(country);
        ul.appendChild(li);
    }
    if (ul.firstChild){
        ul.firstChild.classList.add('hover');
    }
    return ul;
}


(()=>{
    const arr = countriesArr;
    const ul = listCountries(arr);
    document.querySelector('.drop-down').appendChild(ul);
})();










//Animation

const getStarted = document.querySelector('.get-started');
getStarted.addEventListener('click',()=>{
    const start = document.querySelector('.get-started #start');
    const thankYou = document.querySelector('.get-started #thank-you');
    start.style.transform = 'translateY(50%)';
    start.style.opacity = '0';
    setInterval(
        ()=>{
            thankYou.style.top = '25%';
            thankYou.style.opacity = '1';
        },500
    )
})





const apiKey ='32b2de38bff92ab6faa937d56e34e1ca';

const countryApi = 'hammamet';

const apiByCountry = 'http://api.openweathermap.org/data/2.5/weather?q='+countryApi+'&appid='+apiKey+'&units=metric';

function fetchWeather() {
    fetch(apiByCountry)
        .then(data => data.json())
        .then(_data => log(_data))
        .catch(err => log(err.message));
}
    
