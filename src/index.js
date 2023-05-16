document.addEventListener('DOMContentLoaded', () => {

    fetch("http://localhost:3000/dogs")
    .then(r => r.json())
    .then(dogs => renderDogs(dogs))

    function renderDogs(dogs){
        let tableBody = document.getElementById("table-body")
        tableBody.innerHTML = ""
        dogs.forEach(dog => {
            let tr = document.createElement("tr")
            tr.id = dog.id
            let nametd = document.createElement("td")
            nametd.textContent = dog.name
            tr.appendChild(nametd)
            let breedtd = document.createElement("td")
            breedtd.textContent = dog.breed
            tr.appendChild(breedtd)
            let sextd = document.createElement("td")
            sextd.textContent = dog.sex
            tr.appendChild(sextd)
            let editButton = document.createElement("button")
            editButton.name = "edit"
            editButton.textContent = "Edit Dog"
            editButton.addEventListener("click", e => {
                let form = document.getElementById("dog-form")
                form.name.value = dog.name
                form.breed.value = dog.breed
                form.sex.value = dog.sex
                form.idnum.value = dog.id
            })
            tr.append(document.createElement("td").appendChild(editButton))
            tableBody.appendChild(tr)
        })
    }

    let form = document.getElementById("dog-form")
    form.addEventListener("submit", e => {
        e.preventDefault()
        let updatedDog = {
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        }
        fetch(`http://localhost:3000/dogs/${e.target.idnum.value}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedDog)
        })
        .then(() => {
            fetch("http://localhost:3000/dogs")
            .then(re => re.json())
            .then(updatedDogs => renderDogs(updatedDogs))
        })
    })
})