//fetch api
function getdata(){
    //Initializing the api parameters
    source = "Enter your source"
    apiKey = "Enter your API key"

    url=`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`
    fetch(url).then((response)=>{

        return response.json()

    }).then((data)=>{
        let newsAccordian = document.getElementById("newsAccordian")
        let articles=JSON.parse(JSON.stringify(data))
        let html = ""
        articles.articles.forEach(function (element, index) {
            let news = ` <div class="searchAccordian accordion-item"> <h2 class="accordion-header" id="heading${index}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
            <span><strong>News ${index+1}: &nbsp;</strong> ${element.title}</span>
            </button>
          </h2>
          <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordian">
            <div class="accordion-body">
              <p>${element.content} <a href="${element.url}" target="_blank"> Read more...</a></p>
            </div>
          </div>
          </div>`

          html+=news
        });
        newsAccordian.innerHTML=html

    })
}

getdata()



//function to search news
let searchTxt=document.getElementById("searchText")
searchTxt.addEventListener("input",searchNewsUpdate)

let searchbtn=document.getElementById("searchbtn")

searchTxt.addEventListener("click",searchNewsUpdate)

function searchNewsUpdate(){
    let inpLowerSearchValue=searchTxt.value.toLowerCase();

    let accordion=document.getElementsByClassName("searchAccordian")
    Array.from(accordion).forEach(function(element){
     
        let newsTitle = element.getElementsByTagName("span")[0].innerText.toLowerCase();
      
        let newsDescription = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        
        if(newsTitle.includes(inpLowerSearchValue)||newsDescription.includes(inpLowerSearchValue)){
            element.style.display ="block";
        }
        else{
            element.style.display ="none";
        }
    })
}