const onSwitch = document.querySelector(".switch");
const regular = document.querySelector(".fa-regular")
const onBody = document.querySelector(".dark")
const book = document.querySelector(".book")
const wordSearch = document.querySelector(".word-search")
const search = document.querySelector(".fa-magnifying-glass")
const wordChild = document.querySelector(".wordChild")
const phonetics = document.querySelector(".phonetics")
const sound = document.querySelector(".fa-play")
const section = document.querySelector(".font-section")
const fontName = document.querySelector(".font-name")
const partOfSpeech = document.querySelector("#partOfSpeech")
const wrapper = document.querySelector(".wrapper")
const define = document.querySelector('.meaning .list');
let synonyms = document.querySelector("#synonyms");
const part = document.querySelector(".part")
const definition = document.querySelector("#definition-2")
const example = document.querySelector("#example")
const source = document.querySelector("#source")
const removeText = document.querySelector(".search-box #close")
const main = document.querySelector(".main")
let mainAudio;
let tag;
section.addEventListener('click', () => {
    fontName.classList.toggle("active")
})

onSwitch.addEventListener('click', () => {
    onSwitch.classList.toggle('active')
    onBody.classList.toggle('active')
    book.classList.toggle('active')
    regular.classList.replace('fa-moon', 'fa-sun')

    if(!onSwitch.classList.contains('active')) {
        regular.classList.replace('fa-sun', 'fa-moon')
    }
    else {
        return
    }
})

//Fetching the data from the API
let URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const getWord = (name) => {
    fetch(`${URL}/${name}`)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            data(result);
        })
}

const data =(result)=> {
    let wordSearch = document.querySelector(".word-search")
    if(result.title) {
        wordChild.innerHTML =`<span>Can't find the meaning of "${wordSearch.value}". Please try again</span>`
        // wordChild.style.color="red";
        wordChild.style.fontSize="small";
        // main.style.display="none";
        sound.style.display="none";
    } else{
        wordChild.innerText = `${result[0].word}`
        phonetics.innerText = `${result[0].phonetic}`
    
        mainAudio = new Audio(`${result[0].phonetics[0].audio}`);

        define.innerHTML="";
        for(i = 0; i < 3; i++) {
            let tag = `<li>${result[0].meanings[0].definitions[i].definition}</li>`
            define.insertAdjacentHTML("beforeend", tag)
        }

        partOfSpeech.innerText = `${result[0].meanings[0].partOfSpeech}`

        if(`${result[0].meanings[0].synonyms}`== undefined){
            synonyms.parentElement.style.display = "none";
        } else {
            for(i=0; i<2; i++) {
                synonyms.innerText= `${result[0].meanings[i].synonyms}`
            }
        }
        
        part.innerText = `${result[0].meanings[1].partOfSpeech}`

        definition.innerText=`${result[0].meanings[1].definitions[0].definition}`;
        example.innerText= `"${result[0].meanings[1].definitions[0].example}"`;

        source.innerText = `${result[0].sourceUrls}`
    }
}


search.onclick = () => {
    getWord(wordSearch.value)
    wrapper.style.display="block";
}

// using the "Enter" key to get searched results
wordSearch.addEventListener("keyup", e => {
    if(e.key === "Enter" && e.target.value) {
        getWord(e.target.value);
        wrapper.style.display="block";
    }
})

sound.addEventListener('click', () => {
    mainAudio.play()
})

removeText.addEventListener('click', ()=> {
    wordSearch.value="";
})
