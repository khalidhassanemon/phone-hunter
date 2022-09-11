const loadPhone=async(searchText,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    const res=await fetch(url);
    const data=await res.json();
    displayPhone(data.data,dataLimit);
}


const displayPhone=(phones,dataLimit)=>{

const phoneContainer=document.getElementById('phone-container');

phoneContainer.textContent='';
const showAll=document.getElementById('show-all');
if(dataLimit && phones.length>10){
  phones=phones.slice(0,10);
  showAll.classList.remove('d-none');
}

else{
  showAll.classList.add('d-none');
}

//display no phones found
const noPhone=document.getElementById('no-found-massege');

if(phones.length === 0){
noPhone.classList.remove('d-none');//d-none mane:vanish houar process remove hoye jabe mane holo oi likhata thakbe
}
else{
  noPhone.classList.add('d-none');//d-none mane:vanish houar process thakbe mane holo oi likhata thakbena cz vanish houar proces active ase
                               
}

phones.forEach(phone=>{

    const phoneDiv=document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML=`
 
    <div class="card p-4">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
      </div>
  
  </div>
    `;
    phoneContainer.appendChild(phoneDiv);
})

toggleSpinner(false);
}

const processSearch=(dataLimit)=>{
  toggleSpinner(true);
  const searchField=document.getElementById('search-field');
  const searchText=searchField.value;
 loadPhone(searchText,dataLimit); 
 
}
//handle search btn click
document.getElementById('btn-search').addEventListener('click',function(){
  //start loader 
  processSearch(10);
  
})

//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
  // console.log(e.key);
  if (e.key === 'Enter') {
    processSearch(10);
  }
});


const toggleSpinner= isLoading =>{
const loadSection=document.getElementById('loader');
if(isLoading){
  loadSection.classList.remove('d-none');
}
else{
  loadSection.classList.add('d-none');
}
}

document.getElementById('btn-show-all').addEventListener('click',function(){
  processSearch();
})

const loadPhoneDetails = async id=>{
const url=`https://openapi.programming-hero.com/api/phone/${id}`;
const res=await fetch(url);
const data=await res.json();
displayPhoneDetails(data.data);
}


const displayPhoneDetails=phone=>{
console.log(phone);
const modalTitle=document.getElementById('phoneDetailModalLabel');
modalTitle.innerText=phone.name;
const phoneDetail=document.getElementById('phone-details');
phoneDetail.innerHTML=`
<p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
<p>Storage:${phone.mainFeatures? phone.mainFeatures.storage:'No Storage information found'}</p>
<p>Others:${phone.others ? phone.others.Bluetooth  :'No Blutooth support'}</p>
`;
}
loadPhone('apple');