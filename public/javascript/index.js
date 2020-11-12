const charactersAPI = new APIHandler('http://localhost:8000');



window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList()
    .then((response) => {
      const data = response.data;
      let listItems = "";
      data.forEach(character => {
        listItems+= `
        <div class="characters-container" id="character-info">
        <div class="character-info">
        <div class="name">Character Name: ${character.name}</div>
        <div class="occupation">Character Occupation: ${character.occupation}</div>
        <div class="cartoon">Is a Cartoon? ${character.cartoon}</div>
        <div class="weapon">Character Weapon:${character.weapon}</div>
        <div class="id">Character id:${character.id}</div>
        
        </div>
        </div>`
      })
      document.getElementById("character-info").innerHTML = listItems;

    })
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    event.preventDefault();
    let id = document.getElementById("character-id").value
    charactersAPI.getOneRegister(id)
    .then((response) => {
      const { name, occupation, weapon, cartoon } = response.data;
      document.getElementById("name").innerHTML = name;
      document.getElementById("occupation").innerHTML = occupation;
      document.getElementById("weapon").innerHTML = weapon;
      document.getElementById("cartoon").innerHTML = cartoon;
  })
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    let id = document.getElementById("delete-id").value
    charactersAPI.deleteOneRegister(id)
  });


  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const updatedCharacter = {
      name: document.getElementById("name2").value,
      occupation: document.getElementById("occupation2").value,
      weapon: document.getElementById("weapon2").value,
      cartoon: document.getElementById("cartoon2").checked
  }
  let id = document.getElementById("update-id").value
  charactersAPI.updateOneRegister(id, updatedCharacter)
  .then(() => {
    
    document.getElementById("update-character-form").reset();
})
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById("name1").value;
    const occupation = document.getElementById("occupation1").value;
    const weapon = document.getElementById("weapon1").value;
    const cartoon = document.getElementById("cartoon1").checked;

    const newCharacter = {
        name, 
        occupation, 
        weapon, 
        cartoon
    }
    console.log("new character", newCharacter);
    charactersAPI.createOneRegister(newCharacter) 
    document.getElementById("new-character-form").reset();
  })

});
