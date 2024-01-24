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
let form = document.querySelector("form")
let file = document.querySelector("#file")
let imgdiv = document.querySelector(".imgdiv img")
let name = document.querySelector("#name")
let text = document.querySelector("#text")
let tbody = document.querySelector("table tbody")
let valid = document.querySelector(".valide")
let filter = []
let copy = []


file.addEventListener("change",(e)=>{
    let src = e.target.files[0]
    if(src){
        let r = new FileReader()
        r.readAsDataURL(src)
        r.onload=(e)=>{
            imgdiv.src = e.target.result
        }
    }
})







async function getall2(){
    let res = await axios.get(url)
    let data = await res.data
    copy = data
    tbody.innerHTML=""
    filter = filter.length || search.value ? filter:data;

filter.forEach(element => {
    tbody.innerHTML+=`
    <tr>
    <td>${element.id}</td>
    <td>${element.name}</td>
    <td>${element.text}</td>
    <td><i class="bi bi-trash" onclick="deletecard(${element.id})"></i></td>
</tr>
    `
});
}
getall2()



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
    getall2()
})


search.addEventListener("input",(e)=>{
    filter = copy
    filter = filter.filter((y)=>{
        return y.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    })
    getall2()
})


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    if(name.value.trim() == "" || text.value == "" || file.files.length === 0){
        valid.style.display = "flex"
        setTimeout(() => {
            valid.style.display = "none"
        }, 2000);
    }
    else{
        axios.post(url,{
            img:imgdiv.src,
            name:name.value,
            text:text.value,
        })
    }
})


function deletecard(id) {
    axios.delete(url+id)
    getall2()
}

document.querySelector(".clickx").addEventListener("click",(e)=>{
    valid.style.display = "none";
    console.log(e.target);
})

