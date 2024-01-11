const API_KEY = "53932dfe81e144fc9dae8fb7a62d05f4";
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load' , () => fetchNews("india"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const Data = await res.json();
    bindData(Data.articles);
}

function bindData(articles){
   const cardcontainer = document.getElementById("card_container");
   const newscardtemplate = document.getElementById("template_news_card");
   
   cardcontainer.innerHTML = "";
   articles.forEach(articles => {
    if(!articles.urlToImage) return;
    const cardClone = newscardtemplate.content.cloneNode(true);
    fillDataIncard(cardClone, articles)
    cardcontainer.appendChild(cardClone);
   })
}

function fillDataIncard(cardClone, articles){
    const newimage = cardClone.querySelector('#news_img');
    const newtitle = cardClone.querySelector('#news_title');
    const newsource = cardClone.querySelector('#news_source');
    const newdesc = cardClone.querySelector('#new_desc');

    newimage.src = articles.urlToImage;
    newtitle.innerHTML = articles.title;
    newdesc.innerHTML = articles.description;

    const date = new Date(articles.publishedAt).toLocaleString("en-us",{
        timeZone:"Asia/Jakarta"
    });

    newsource.innerHTML = `${articles.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', () =>{
        window.open(articles.url, "_blank");
    })
}
let curSelectnavitem = null;
function onclicknav(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectnavitem?.classList.remove("active"); 
    curSelectnavitem = navItem;
    curSelectnavitem.classList.add("active");
}

const searchtext = document.getElementById('text_input');
const searchbtn = document.getElementById('search_btn');

searchbtn.addEventListener('click',()=>{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelectnavitem?.classList.remove("active");
    curSelectnavitem = null;
})