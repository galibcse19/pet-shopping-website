// category data
fetch('https://openapi.programming-hero.com/api/peddy/categories')
  .then(res => res.json())
  .then(data => {
    const categories = data.categories;
    const list = document.getElementById('categories-list');

    
    categories.forEach(category => {
      list.innerHTML += `
          <a>
          <div class="bg-white border-2 rounded-xl border-emerald-400 ld:p-4 md:p-4 p-2 flex justify-center align-center">
            <img class="lg:w-8 md:w-8 w-4" src="${category.category_icon}">
            <h3 class="font-bold lg:ml-4 md:ml-4 ml-2 lg:mt-1 md:mt-1 text-xl">${category.category}s</h3>
          </div>
          </a>`;
    });
  })
  .catch(error => console.error('Error:', error));

//loader
const loader = document.getElementById('loader');
const petList = document.getElementById('pets-list');

const adoptModal = document.getElementById('adopt-modal');
const countdownElement = document.getElementById('countdown');
const adoptBtnId= document.getElementById("adoptBtnId");

function adoptPet() {
  adoptModal.classList.remove('hidden');
  let counter = 3;
  
  const countdownInterval = setInterval(() => {
    countdownElement.innerHTML = `<span class="font-bold text-6xl">${counter}</span>`; 
    counter--; 

    if (counter < 0) {
      countdownElement.innerHTML = `<span class="font-bold text-6xl">3</span>`
      clearInterval(countdownInterval); 
    }
  }, 800);

  setTimeout(() => {
    hideSimpleModal();
  }, 3000);
   
}
function hideSimpleModal() {
  adoptModal.classList.add('hidden');
}
 

 //all data
fetch('https://openapi.programming-hero.com/api/peddy/pets')
.then(res => res.json())
.then(data => {
  const pets = data.pets;
 
  setTimeout(()=>{
    loader.style.display = 'none';
    pets.forEach(pet =>{
        petList.innerHTML +=`
        <div class="border rounded-lg p-4 border-slate-300">
          <img class="border rounded-lg w-80 lg:h-40 md:40 h-32" src=${pet?.image ?? 'Not Available'}/>
          <p class="font-bold text-xl my-2">${pet?.pet_name ?? 'Not Available'}</p>
          <p><i class="fa-sharp-duotone fa-solid fa-table-cells-large mr-2"></i>Breed: ${pet?.breed ?? 'Not Available'}</p>
          <p class="my-2"><i class="fa-sharp-duotone fa-solid fa-cake-candles mr-2"></i>Birth: ${pet?.date_of_birth ?? 'Not Available'}</p>
          <p><i class="fa-sharp-duotone fa-solid fa-mercury mr-2"></i>Gender: ${pet?.gender ?? 'Not Available'}</p>
          <p class="mb-4 mt-2"><i class="fa-sharp-duotone fa-solid fa-dollar-sign mr-2"></i>Price: ${pet?.price ?? 'Not Available'}$</p>
           <hr>
          <div class="lg:flex justify-between mt-4 gap-2 mr-4">
            <button class="btn btn-outline border-slate-300 btn-accent px-4 lg:w-1/3 w-full"><i class="fa-sharp-duotone fa-solid fa-thumbs-up"></i></button>
            <button onclick="adoptPet()" class="btn btn-outline border-slate-300 btn-accent px-4 lg:my-0 my-2 lg:w-1/3 w-full">Adopt</button>
            <button class="btn btn-outline border-slate-300 btn-accent px-6 lg:w-1/3 w-full">Details</button>
          <div>
        </div>
        `
    })
  },2000);


})
.catch(error => console.error('Error fetching pets data:', error));



//sort here.... 
const sortButton = document.getElementById('sort-button');

let petsData = [];  
 
fetch('https://openapi.programming-hero.com/api/peddy/pets')
  .then(res => res.json())
  .then(data => {
    petsData = data.pets; 

    setTimeout(() => {
      loader.style.display = 'none'; 
      displayPets(petsData); 
    }, 2000);

   
  })
  .catch(error => console.error('Error fetching pets data:', error));

  
 
function displayPets(pets) {
  petList.innerHTML = ''; 
  pets.forEach(pet => {
    petList.innerHTML += `
      <div class="border rounded-lg p-4 border-slate-300">
        <img class="border rounded-lg w-80 lg:h-40 md:40 h-32" src=${pet?.image ?? 'Not Available'}/>
        <p class="font-bold text-xl my-2">${pet?.pet_name ?? 'Not Available'}</p>
        <p><i class="fa-sharp-duotone fa-solid fa-table-cells-large mr-2"></i>Breed: ${pet?.breed ?? 'Not Available'}</p>
        <p class="my-2"><i class="fa-sharp-duotone fa-solid fa-cake-candles mr-2"></i>Birth: ${pet?.date_of_birth ?? 'Not Available'}</p>
        <p><i class="fa-sharp-duotone fa-solid fa-mercury mr-2"></i>Gender: ${pet?.gender ?? 'Not Available'}</p>
        <p class="mb-4 mt-2"><i class="fa-sharp-duotone fa-solid fa-dollar-sign mr-2"></i>Price: ${pet?.price ?? 'Not Available'}$</p>
         <hr>
        <div class="lg:flex justify-between mt-4 gap-2 mr-4">
          <button class="btn btn-outline border-slate-300 btn-accent px-4 lg:w-1/3 w-full"><i class="fa-sharp-duotone fa-solid fa-thumbs-up"></i></button>
          <button onclick="adoptPet()"  class="adopt-btn btn btn-outline border-slate-300 btn-accent px-4 lg:my-0 my-2 lg:w-1/3 w-full">Adopt</button>
          <button class="btn btn-outline border-slate-300 btn-accent px-6 lg:w-1/3 w-full">Details</button>
        </div>
      </div>
    `;
  });
}

 
sortButton.addEventListener('click', () => {
  const sortedPets = [...petsData].sort((a, b) => b.price - a.price); 
  displayPets(sortedPets); 
});


