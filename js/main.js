const apiKey='563492ad6f917000010000012fe5085838c9448b8b3c3b44d3d3905c'
const input=document.querySelector('.nav__input')
const searchBtn=document.querySelector('.form')
let searchText=''
let search=false;
async function defoultPhoto(){
    const data=await fetch(`https://api.pexels.com/v1/curated`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            Authorization:apiKey
        }
    })
    const response=await data.json()
    console.log(response)
    displayImge(response)
}
function displayImge(response){
    response.photos.forEach(image => {
      const photo=document.createElement('div')
      photo.className='photo'
      photo.innerHTML=`
        <a class='photo_link' href=${image.src.large} target="_blank">
            <img src=${image.src.large} alt=${image.url} />
        </a>
        <span>${image.photographer}</span>
      `
        document.querySelector('.displey__img').appendChild(photo)
    })
}
async function searchPhoto(query){
    const data=await fetch(`https://api.pexels.com/v1/search?query=${query}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            Authorization:apiKey
        }
    })
    const response=await data.json()
    console.log(response)
    displayImge(response)
}
input.addEventListener('input', evt=>{
    evt.preventDefault();
    searchText=evt.target.value
})
searchBtn.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(input.value=='') {
    document.querySelector('.nav__text').innerHTML="Empty search! Plz"
    } else {
        document.querySelector('.nav__text').innerHTML=""  
        search=true 
        searchPhoto(searchText)
        clear()
    }

})
function clear(){
    document.querySelector('.displey__img').innerHTML=""

}

defoultPhoto();
