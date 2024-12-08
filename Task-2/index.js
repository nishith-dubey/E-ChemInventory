// document.addEventListener('DOMContentLoaded', ()=>{})
const chemicals = [
  { name: "Imidazole", boxNo: "01", casNo: "288-32-4", amount: "15 ml" },
  { name: "Penicillin", boxNo: "02", casNo: "288-36-5", amount: "25 ml" },
  { name: "Insulin", boxNo: "03", casNo: "288-23-2", amount: "10 ml" },
];
const container = document.querySelector(".chemicals-container");

function renderChemicals(chemicals) {
  container.innerHTML = "";
  chemicals.forEach((chemical, index) => {
    container.innerHTML += `
                <div class="content w-[25vw] h-[40vh] bg-white rounded-3xl p-5 flex flex-col justify-between">
                    <div>
                        <p>Chemical Name: <strong>${chemical.name}</strong></p>
                        <p>Box No: ${chemical.boxNo}</p>
                        <p>CAS No: ${chemical.casNo}</p>
                        <br/>
                        <p>Amount available: ${chemical.amount}</p>
                    </div>
                    <button class="edit-btn bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" id='${index}'>
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            `;
  });
}
renderChemicals(chemicals);

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    openEdit(e.target.id);
  }
});

const dialogBox = document.getElementById("dialogBox");
function openEdit(index) {
  dialogBox.innerHTML = `
    <div class="dialog-content z-10">
        <button class="h-4 w-4 text-red-600">&times;</button>
        <h2 class="text-blue-900 font-bold">Edit Chemical Details</h2>
        <form id="editForm">
            <label for="chemicalName">Chemical Name: ${chemicals[index].name}</label>
            <input type="text" id="chemicalName" name="chemicalName" placeholder="Enter new name here" required>
            <label for="boxNo">Box No: ${chemicals[index].boxNo}</label>
            <input type="text" id="boxNo" name="boxNo" placeholder="Enter new box number here" required>
            <label for="casNo">CAS No: ${chemicals[index].casNo}</label>
            <input type="text" id="casNo" name="casNo" placeholder="Enter new CAS number here" required>
            <label for="amount">Amount Available: ${chemicals[index].amount}</label>
            <input type="text" id="amount" name="amount" placeholder="Enter new amount here" required>
            <button id="${index}" class="save-btn" type="button" onclick="saveChanges(${index})">Save</button>
        </form>
    </div>
    `;
  dialogBox.style.display = "flex";
}

function saveChanges(index){
    console.log(index);
    
    const newChemName = document.querySelector('#chemicalName');
    const newBoxNo = document.querySelector('#boxNo');
    const newCAS = document.querySelector('#casNo');
    const newAmount = document.querySelector('#amount');
    chemicals[index].name = newChemName.value;
    chemicals[index].boxNo = newBoxNo.value;
    chemicals[index].casNo = newCAS.value;
    chemicals[index].amount = newAmount.value;
    console.log(chemicals[index].name);
    
    dialogBox.style.display = 'none';
    renderChemicals(chemicals);
}

const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", (e) => {
  console.log(searchBar.value);
  value = searchBar.value.toLowerCase();
  const filteredChemicals = chemicals.filter((chemical) => {
    return chemical.name.toLowerCase().includes(value);
  });
  renderChemicals(filteredChemicals);
  searchBar.value = "";
});
