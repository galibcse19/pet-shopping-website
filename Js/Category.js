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

 //all data
fetch('https://openapi.programming-hero.com/api/peddy/pets')
.then(res => res.json())
.then(data => {
  const pets = data.pets;
  const list = document.getElementById('pets-list');
   

  setTimeout(()=>{
    loader.style.display = 'none';
    pets.forEach(pet =>{
        list.innerHTML +=`
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
            <button class="btn btn-outline border-slate-300 btn-accent px-4 lg:my-0 my-2 lg:w-1/3 w-full">Adopt</button>
            <button class="btn btn-outline border-slate-300 btn-accent px-6 lg:w-1/3 w-full">Details</button>
          <div>
        </div>
        `
    })
  },2000);

    
})
.catch(error => console.error('Error fetching pets data:', error));


