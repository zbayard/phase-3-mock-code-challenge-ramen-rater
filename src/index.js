// *****DOM STUFF*****
const ramenMenu = document.querySelector("#ramen-menu")
const ramenShow = document.querySelector("#ramen-detail")
const ramenImg = document.querySelector(".detail-image")
const ramenName = document.querySelector("h2.name")
const ramenRestaurant = document.querySelector("h3.restaurant")
const ratingForm = document.querySelector("#ramen-rating")
const ratingLabel = ratingForm.querySelector("label")
const commentLabel = ratingForm.querySelector("#comment")



// *****RENDER RAMEN*****
function renderRamen(ramenObj){
    const ramenPic = document.createElement("img")
    ramenPic.src = `${ramenObj.image}`
    ramenMenu.append(ramenPic)

    

    ramenPic.addEventListener("click", ()=> {
        fetch(`http://localhost:3000/ramens/${ramenObj.id}`)
        .then(response => response.json())
        .then(ramenObj => { 
        
        ramenImg.src = ramenObj.image
        ramenImg.alt = ramenObj.name

        ramenName.innerHTML = ramenObj.name
        ramenRestaurant.innerHTML = ramenObj.restaurant

        ratingLabel.innerHTML = `Rating: ${ramenObj.rating}`
        
        commentLabel.innerHTML = `Comment: ${ramenObj.comment}`

        ratingForm.dataset.id = ramenObj.id
        
        
        })
    })

}

// *****FORM EVENT LISTENER/PATCH*****
ratingForm.addEventListener("submit", e => {
    e.preventDefault()
    
    const ratingInput = e.target.rating.value
    const commentInput = e.target.comment.value
    

    fetch(`http://localhost:3000/ramens/${ratingForm.dataset.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        rating: ratingInput,
        comment: commentInput
    }),
    })
    .then(response => response.json())
    .then(data => {
        ratingLabel.innerHTML = `Rating: ${data.rating}`

        commentLabel.innerHTML = `Comment: ${data.comment}`
         
        
        ratingForm.reset()
    console.log('Success:', data);
    })
})

// *****INITIAL GET FETCH*****
fetch(`http://localhost:3000/ramens`)
.then(response => response.json())
.then(ramenObj => ramenObj.forEach(ramen => {
    renderRamen(ramen)
}))











