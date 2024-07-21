const url = "https://kimathinjoki.github.io/Wk3-code-challenge-Flatdango/db.json"

document.addEventListener('DOMContentLoaded',()=>{

    const moviePlaceHolder = ()=>{
        fetch(url)
        .then(res =>res.json())
        .then(content =>{
            const firstMovie = content.films[0]

            const filmImg = document.getElementById("poster")
            const movieTitle = document.getElementById("filmTitle")
            const movieDescr = document.getElementById("movieDescription")
            const runningTime = document.getElementById("runtime")
            const showingTime = document.getElementById("showtime")
            const availTicket =document.getElementById("ticketsAvailable")
            filmImg.src = firstMovie.poster
            movieTitle.innerText = firstMovie.title
            movieDescr.innerText = firstMovie.description
            runningTime.innerText =`Runtime: ${firstMovie.runtime} minutes`
            showingTime.innerText =`Showtime: ${firstMovie.showtime}`
            availTicket.innerText =`Tickets Available: (${firstMovie.capacity - firstMovie.tickets_sold})`


            const ticketBuy = document.getElementById("buyTicket")
            let tickets = Number(firstMovie.capacity - firstMovie.tickets_sold)

            ticketBuy.addEventListener('click',()=>{

                tickets--

                // const ticketRemaining = tickets-1

                if(tickets <= 0){
                    const frstMovie = document.getElementById("1")
                    frstMovie.innerHTML=`${firstMovie.title}  <span class="badge bg-danger me-1">SOLD OUT</span>`

                    availTicket.innerHTML = `Ticketd available:  <span class="badge bg-danger">SOLD OUT</span>`
                }else{
                    availTicket.innerText = `Tickets available: (${tickets})`
                }
            })

        })




    }



    const movieDetails = ()=>{
        fetch(url)
        .then(response=>response.json())
        .then(data=>{
            const filmData = data.films
            console.log(filmData)
            for(let i = 0; i < filmData.length; i++){
                let item = filmData[i]
                console.log(item)
                const movieList = document.createElement("li")
                const list = document.getElementById("showingMovie")

                movieList.classList.add("list-group-item", "border", "border-info", "sinema")

                movieList.setAttribute('id',`${item.id}`)
                // movieList.className = "sinema"
                movieList.innerText = item.title
                console.log(item.title)


                list.appendChild(movieList)

                movieList.addEventListener('click',()=>{
                    const filmImage = document.getElementById("poster")
                    const filmTitle = document.getElementById("filmTitle")
                    const filmDescr = document.getElementById("movieDescription")
                    const runTime = document.getElementById("runtime")
                    const showTime = document.getElementById("showtime")
                    const availTickets =document.getElementById("ticketsAvailable")


                    filmImage.src = item.poster
                    filmTitle.innerText = item.title
                    filmDescr.innerText = item.description
                    runTime.innerHTML =`Runtime:<span>${item.runtime}</span>`
                    showTime.innerText =`Showtime: ${item.showtime}`
                    availTickets.innerText =`Tickets available: (${item.capacity - item.tickets_sold})`

                    const ticketsBuy = document.getElementById("buyTicket")
                    let ticket = Number(item.capacity - item.tickets_sold)

                    ticketsBuy.addEventListener('click',()=>{

                        // const ticketRemain = ticket-1
                        ticket --
                        if(ticket <= 0){
                            movieList.innerHTML =`${item.title} <span class="badge bg-danger">SOLD OUT</span>`

                            availTickets.innerHTML = `Tickets available: <span class="badge bg-danger">SOLD OUT</span>`

                        }else{

                            availTickets.innerText = `Tickets available: (${ticket})`
                        }
                        // availTickets.innerText = `Tickets available: ${ticket}`
                        // while(ticket> -1){
                        //     availTickets.innerText = `Tickets available: ${ticket}`
                        //     if(ticket === 0){
                        //         return availTickets.innerText = "SOLD OUT"
                        //     }

                        // }




                        // if(ticket === 0){
                        //     return availTickets.innerText = "SOLD OUT"
                        // }

                        // for(let i = ticket; i > -1 ; i-=1 ){

                        //     const ticketRemain = i
                        //     availTickets.innerText = `Tickets available: ${ticketRemain}`
                        //     if(ticketRemain === 0){
                        //         availTickets.innerText = "SOLD OUT"
                        //     }


                        // }


                    })



                })


            }




        })

    }


    movieDetails()
    moviePlaceHolder()

})