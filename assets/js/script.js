let url = "http://localhost:3000/data/"


document.querySelector(".bi-list").addEventListener("click",()=>{
    document.querySelector("menu").style.display = "flex"
})
document.querySelector(".bi-x").addEventListener("click",()=>{
    document.querySelector("menu").style.display = "none"
})

window.addEventListener("resize",()=>{
    if(window.innerWidth>900){
        document.querySelector("menu").style.display = "none"

    }
})



let card = document.querySelector(".crudscon")
let search = document.querySelector("#search")
let sort = document.querySelector("#sort")
let filter = []
let copy = []


async function getall(){
    let res = await axios.get(url)
    let data = await res.data
    copy = data
    card.innerHTML=""
    filter = filter.length || search.value ? filter:data;

filter.forEach(element => {
    card.innerHTML+=`
    <div>
          <div class="imgdiv">
            <img src="${element.img}" alt=""/>
          </div>
          <h2>${element.name}</h2>
          <p>${element.text}</p>
        </div>
    `
});
}
getall()



sort.addEventListener("change",(e)=>{
    if(e.target.value == "az"){
        filter.sort((a,b)=>a.name.localeCompare(b.name))
    }
    else if(e.target.value == "az"){
        filter.sort((a,b)=>b.name.localeCompare(a.name))
    }
    else{
        filter = copy
    }
    getall()
})


search.addEventListener("input",(e)=>{
    filter = copy
    filter = filter.filter((y)=>{
        return y.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    })
    getall()

})