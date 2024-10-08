
// category 
fetch('https://openapi.programming-hero.com/api/peddy/categories')
  .then(res => res.json())
  .then(data => {
    const categories = data.categories;
    const list = document.getElementById('categories-list');

    
    categories.forEach(category => {
      list.innerHTML += `
          <div onclick="buttonCategory('${category.category}',this)" class="button bg-white border-2 rounded-xl  ld:p-4 md:p-4 p-2 flex justify-center align-center">
            <img class="lg:w-8 md:w-8 w-4" src="${category.category_icon}">
            <h3 class="font-bold lg:ml-4 md:ml-4 ml-2 lg:mt-1 md:mt-1 text-xl">${category.category}s</h3>
          </div>
          `;
    });
  })
  .catch(error => console.error('Error:', error));

//loader
const loader = document.getElementById('loader');
const petList = document.getElementById('pets-list');

const adoptModal = document.getElementById('adopt-modal');
const countdownElement = document.getElementById('countdown');
const adoptBtnId= document.getElementById("adoptBtnId");

//like card data
const likedDataDiv = document.getElementById('likedData');
function likeButton(imageUrl){
  const imageDiv = document.createElement('div');
  // imageDiv.classList.add('w-full','h-full', 'border', 'rounded-lg', 'p-2');
  imageDiv.innerHTML = `
  <img src="${imageUrl}" class="border rounded-lg p-1 ">
`;

likedDataDiv.appendChild(imageDiv);
  
}

//model or coundown
function adoptPet() {
  adoptModal.classList.remove('hidden');
  let counter = 3;
  
  const countdownInterval = setInterval(() => {
    countdownElement.innerHTML = `<span class="font-bold lg:text-6xl md:text-2xl text-xl">${counter}</span>`; 
    counter--; 

    if (counter < 0) {
      countdownElement.innerHTML = `<span class="font-bold lg:text-6xl md:text-2xl text-xl">3</span>`
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

// name,price, breed, image,gender,  petDetails,vaccinatedStatus, birthDate

function detailsBtn(name,image,breed,gender,vaccinatedStatus,birthDate,price) {
  // console.log(name);
  // console.log(image);
  // console.log(breed);
  // console.log(gender);
  // console.log(vaccinatedStatus);
  // console.log(birthDate);
  // console.log(price);
  // console.log(petDetails);
  document.getElementById('pet-name').innerText = name;
  document.getElementById('pet-breed').innerText = breed;
  document.getElementById('pet-gender').innerText = gender;
  document.getElementById('pet-image').src = image;
  document.getElementById('pet-vaccinated').innerText = vaccinatedStatus;
  document.getElementById('pet-birth').innerText = birthDate;
  // document.getElementById('pet-details').innerText = petDetails;
  document.getElementById('pet-price').innerText = price;

  // Show the modal
  document.getElementById('details-modal').classList.remove('hidden');
}

// Close modal when clicking the close button
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('details-modal').classList.add('hidden');
});

 //all data
fetch('https://openapi.programming-hero.com/api/peddy/pets')
.then(res => res.json())
.then(data => {
  const pets = data.pets;
  setTimeout(()=>{
    loader.style.display = 'none';
    pets.forEach(pet =>{
        petList.innerHTML +=`
        <div class="border rounded-lg lg:p-4 md:p-4 p-2 border-slate-300">
          <img class="border rounded-lg lg:w-80 md:w-80 w-60 lg:h-40 md:h-40 h-32" src=${pet?.image ?? 'Not Available'}/>
          <p class="font-bold text-xl my-2">${pet?.pet_name ?? 'Not Available'}</p>
          <p><i class="fa-sharp-duotone fa-solid fa-table-cells-large mr-2"></i>Breed: ${pet?.breed ?? 'Not Available'}</p>
          <p class="my-2"><i class="fa-sharp-duotone fa-solid fa-cake-candles mr-2"></i>Birth: ${pet?.date_of_birth ?? 'Not Available'}</p>
          <p><i class="fa-sharp-duotone fa-solid fa-mercury mr-2"></i>Gender: ${pet?.gender ?? 'Not Available'}</p>
          <p class="mb-4 mt-2"><i class="fa-sharp-duotone fa-solid fa-dollar-sign mr-2"></i>Price: ${pet?.price ?? 'Not Available'}$</p>
           <hr>
          <div class="lg:flex justify-between mt-4 gap-2 mr-4">
            <button onclick="likeButton('${pet.image}')" class="btn btn-outline border-slate-300 btn-accent px-4 lg:w-1/3 w-full"><i class="fa-sharp-duotone fa-solid fa-thumbs-up"></i></button>
            <button onclick="adoptPet()" class="btn btn-outline border-slate-300 btn-accent px-4 lg:my-0 my-2 lg:w-1/3 w-full">Adopt</button>

             <button onClick="detailsBtn('${pet.pet_name}','${pet.image}','${pet.breed}','${pet.gender}','${pet.vaccinated_status}','${pet.date_of_birth}','${pet.price}')" class="btn btn-outline border-slate-300 btn-accent px-6 lg:w-1/3 w-full">Details</button>

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
      displayPets(petsData); 
    }, 2000);

   
  })
  .catch(error => console.error('Error fetching pets data:', error));

  
 
function displayPets(pets) {
  loader.style.display = 'none'; 
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
          <button onclick="likeButton('${pet.image}')" class="btn btn-outline border-slate-300 btn-accent px-4 lg:w-1/3 w-full"><i class="fa-sharp-duotone fa-solid fa-thumbs-up"></i></button>
          <button onclick="adoptPet()"  class="adopt-btn btn btn-outline border-slate-300 btn-accent px-4 lg:my-0 my-2 lg:w-1/3 w-full">Adopt</button>

          <button onClick="detailsBtn('${pet.pet_name}','${pet.image}','${pet.breed}','${pet.gender}','${pet.vaccinated_status}','${pet.date_of_birth}','${pet.price}')" class="btn btn-outline border-slate-300 btn-accent px-6 lg:w-1/3 w-full">Details</button>

        </div>
      </div>
    `;
  });
}

 
sortButton.addEventListener('click', () => {
  petList.innerHTML = ''; 
  loader.style.display = 'block'; 
  const sortedPets = [...petsData].sort((a, b) => b.price - a.price); 
  displayPets(sortedPets); 
});


// // show specific category data
 

function buttonCategory(category,element) {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });
  element.classList.add('active');
  petList.innerHTML = '';
  console.log(category);
  loader.style.display = 'block';
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);  
      const specficData = data.data; 
      console.log(specficData.length);

     
      if(specficData.length>0){
        setTimeout(()=>{
          
          loader.style.display = 'none';
          petList.classList.add('grid');
          specficData.forEach(pet =>{
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
                <button onclick="likeButton('${pet.image}')" class="btn btn-outline border-slate-300 btn-accent px-4 lg:w-1/3 w-full"><i class="fa-sharp-duotone fa-solid fa-thumbs-up"></i></button>
                <button onclick="adoptPet()" class="btn btn-outline border-slate-300 btn-accent px-4 lg:my-0 my-2 lg:w-1/3 w-full">Adopt</button>
    
                 <button onClick="detailsBtn('${pet.pet_name}','${pet.image}','${pet.breed}','${pet.gender}','${pet.vaccinated_status}','${pet.date_of_birth}','${pet.price}')" class="btn btn-outline border-slate-300 btn-accent px-6 lg:w-1/3 w-full">Details</button>
    
              <div>
            </div>
            `
        })
        },2000)
      }
      if(specficData.length == 0){
        petList.innerHTML = '';
        loader.style.display = 'none';
        petList.classList.remove('grid');
        petList.innerHTML = `
        <div class="text-center w-full bg-slate-300 border rounded-md p-4">
          <img class="mx-auto mt-8 mb-4" src="images/error.webp"/>
          <p class="font-bold text-2xl mb-4">No Information Available</p>
          <p class="pb-12">No information available" indicates that relevant data or details are currently missing or inaccessible. It often implies the need for further input or clarification to proceed effectively</p>
           
        </div>
      `;

      }
    })
    .catch(error => {
      console.error('Error fetching pets data:', error);
    });
}


 