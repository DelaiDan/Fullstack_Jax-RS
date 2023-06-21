//Variáveis
const dropVehicles = document.querySelector('#vehicles .drop-btn');
const dropBrands = document.querySelector('#brands .drop-btn');

var populateVehicles = false;
var populateBrands = false;

//Dropdowns
dropVehicles.onclick = function(){
    let options =  document.querySelector('#vehicles .options');
    options.classList.toggle('closed');
}

dropBrands.onclick = function(){
    let options =  document.querySelector('#brands .options');
    options.classList.toggle('closed');
}

//Veículos
async function populateSelects(){
    if(!populateVehicles){
        const response = await fetch('http://localhost:8000/v1/vehicles/');
        if(response.ok){
            const jsonData = await response.json();
    
            const vehicleSelect = document.querySelectorAll('select[name=vehicles]');
        
            vehicleSelect.forEach((select) => {
                select.innerHTML = '';
                jsonData.forEach((veiculo) => {
                    let option = document.createElement('option');
                    option.value = veiculo.id;
                    option.innerText = veiculo.model;
                    select.appendChild(option);
                });
            });
            populateVehicles = true;
        } else {
            window.alert("ERRO na Operação!");
        }
    }

    if(!populateBrands){
        const response = await fetch('http://localhost:8000/v1/brands/');
        if(response.ok){
            const jsonData = await response.json();
            const brandSelect = document.querySelectorAll('select[name=brands]');
    
            brandSelect.forEach((select) => {
                select.innerHTML = '';
                jsonData.forEach((brand) => {
                    let option = document.createElement('option');
                    option.value = brand.id;
                    option.innerText = brand.name;
                    select.appendChild(option);
                });
            });
            populateBrands = true;
        } else {
            window.alert("ERRO na Operação!");
        }
    }
}

async function listAllVehicles(){
    const response = await fetch('http://localhost:8000/v1/vehicles/');
    if(response.ok){
        const jsonData = await response.json();
        const productsContainer = document.querySelector('.products');
        productsContainer.innerHTML = '';
    
        jsonData.forEach((vehicle) => {
            const li = document.createElement('li');
            const spec = document.createElement('div');
            const id_vehicle = document.createElement('span');
            const year = document.createElement('span');
            const model = document.createElement('p');
            const brand = document.createElement('p');
            const descr = document.createElement('p');
    
            li.classList.add('container');
            spec.classList.add('spec');
            id_vehicle.classList.add('id_vehicle');
            year.classList.add('year');
            model.classList.add('name');
            brand.classList.add('brand');
    
            id_vehicle.innerText = vehicle.id;
            year.innerText = vehicle.year;
            brand.innerText = vehicle.brand;
            model.innerText = vehicle.model;
    
            spec.appendChild(id_vehicle);
            spec.appendChild(year);
    
            li.appendChild(spec);
            li.appendChild(brand);
            li.appendChild(model);
            li.appendChild(descr);
    
            productsContainer.appendChild(li);
        });
    } else {
        window.alert("ERRO na Operação!");
    }
}

async function getVehicleByID(){
    const idProd = document.querySelector(".single-vehicle input[name='id_vehicle']");
    const msg = document.querySelector(".single-vehicle .msg");

    if(!idProd.value){
        window.alert("ID do Veículo inválida!");
        msg.classList.add('error');
        msg.innerText = "ID do Veículo inválida!";
    } else {
        const response = await fetch('http://localhost:8000/v1/vehicles/' + idProd.value);
        if(response.ok){
            const vehicle = await response.json();
            const productsContainer = document.querySelector('.products');
            productsContainer.innerHTML = '';
        
            const li = document.createElement('li');
            const spec = document.createElement('div');
            const id_vehicle = document.createElement('span');
            const year = document.createElement('span');
            const model = document.createElement('p');
            const brand = document.createElement('p');
            const descr = document.createElement('p');
    
            li.classList.add('container');
            spec.classList.add('spec');
            id_vehicle.classList.add('id_vehicle');
            year.classList.add('year');
            model.classList.add('name');
            brand.classList.add('brand');
    
            id_vehicle.innerText = vehicle.id;
            year.innerText = vehicle.year;
            brand.innerText = vehicle.brand;
            model.innerText = vehicle.model;
    
            spec.appendChild(id_vehicle);
            spec.appendChild(year);
    
            li.appendChild(spec);
            li.appendChild(brand);
            li.appendChild(model);
            li.appendChild(descr);
    
            productsContainer.appendChild(li);
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

async function removeVehicle(){
    const idVehicle = document.querySelector("#remove_vehicle");
    const msg = document.querySelector(".remove-vehicle .msg");

    if(!idVehicle.value){
        window.alert("ID do Veículo inválida!");
        msg.classList.add('error');
        msg.innerText = "ID do Veículo inválida!";
    } else {
        const response = await fetch('http://localhost:8000/v1/vehicles/' + idVehicle.value,{
            method: "DELETE",
        });
        if(response.ok){
            window.alert("Veículo " + idVehicle.value + " Deletado com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Veículo " + idVehicle.value + " Deletado com SUCESSO!";

            populateVehicles = false;
            populateSelects();
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

async function insertVehicle(){
    const nameVehicle = document.querySelector(".insert-vehicle input[name='name_vehicle']");
    const yearVehicle = document.querySelector(".insert-vehicle input[name='year_vehicle']");
    const brandVehicle = document.querySelector("#add_marca");

    const msg = document.querySelector(".insert-vehicle .msg");

    if(!nameVehicle.value || !yearVehicle.value || !brandVehicle.value){
        window.alert("Dados inválidos!");
        msg.classList.add('error');
        msg.innerText = "Dados inválidos!";
    } else {
        let data = {
            model: nameVehicle.value,
            brand: brandVehicle.value,
            year: yearVehicle.value,
        }
        const response = await fetch('http://localhost:8000/v1/vehicles/',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(response.ok){
            const vehicle = await response.json();
            window.alert("Veículo " + vehicle +" Inserido com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Veículo " + vehicle +" Inserido com SUCESSO!";

            populateVehicles = false;
            populateSelects();
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

async function updateVehicle(){
    const idVehicle = document.querySelector("#update_vehicle");
    const nameVehicle = document.querySelector(".update-vehicle input[name='name_vehicle']");
    const yearVehicle = document.querySelector(".update-vehicle input[name='year_vehicle']");
    const brandVehicle = document.querySelector("#update_vehicle_brand");

    const msg = document.querySelector(".update-vehicle .msg");

    if(!idVehicle.value || !nameVehicle.value || !yearVehicle.value || !brandVehicle.value){
        window.alert("Dados inválidos!");
        msg.classList.add('error');
        msg.innerText = "Dados inválidos!";
    } else {
        let data = {
            model: nameVehicle.value,
            brand: brandVehicle.value,
            year: yearVehicle.value,
        }
        const response = await fetch('http://localhost:8000/v1/vehicles/' + idVehicle.value,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(response.ok){
            const vehicle = await response.json();
            window.alert("Veículo " + vehicle +" Atualizado com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Veículo " + vehicle +" Atualizado com SUCESSO!";

            populateVehicles = false;
            populateSelects();
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

//Marcas
async function listAllBrands(){
    const response = await fetch('http://localhost:8000/v1/brands/');
    if(response.ok){
        const jsonData = await response.json();
        const productsContainer = document.querySelector('.products');
        productsContainer.innerHTML = '';
    
        jsonData.forEach((brand) => {
            const li = document.createElement('li');
            const spec = document.createElement('div');
            const id_brand = document.createElement('span');
            const name = document.createElement('p');
    
            li.classList.add('container');
            spec.classList.add('spec');
            id_brand.classList.add('id_brand');
            name.classList.add('name');
    
            id_brand.innerText = brand.id;
            name.innerText = brand.name;
    
            spec.appendChild(id_brand);
    
            li.appendChild(spec);
            li.appendChild(name);
    
            productsContainer.appendChild(li);
        });
    } else {
        window.alert("ERRO na Operação!");
    }
}

async function getBrandByID(){
    const idBrand = document.querySelector(".single-brand input[name='id_brand']");
    const msg = document.querySelector(".single-brand .msg");

    if(!idBrand.value){
        window.alert("ID da Marca inválida!");
        msg.classList.add('error');
        msg.innerText = "ID da Marca inválida!";
    } else {
        const response = await fetch('http://localhost:8000/v1/brands/' + idBrand.value);
        if(response.ok){
            const brand = await response.json();
            const productsContainer = document.querySelector('.products');
            productsContainer.innerHTML = '';
        
            const li = document.createElement('li');
            const spec = document.createElement('div');
            const id_brand = document.createElement('span');
            const name = document.createElement('p');
    
            li.classList.add('container');
            spec.classList.add('spec');
            id_brand.classList.add('id_brand');
            name.classList.add('name');
    
            id_brand.innerText = brand.id;
            name.innerText = brand.name;
    
            spec.appendChild(id_brand);
    
            li.appendChild(spec);
            li.appendChild(name);
    
            productsContainer.appendChild(li);
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

async function removeBrand(){
    const idBrand = document.querySelector("#remove_brand");
    const msg = document.querySelector(".remove-brand .msg");

    if(!idBrand.value){
        window.alert("ID do Produto inválida!");
        msg.classList.add('error');
        msg.innerText = "ID do Produto inválida!";
    } else {
        const response = await fetch('http://localhost:8000/v1/brands/' + idBrand.value,{
            method: "DELETE",
        });
        if(response.ok){
            window.alert("Marca " + idBrand.value + " Deletada com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Marca " + idBrand.value + " Deletada com SUCESSO!";

            populateBrands = false;
            populateSelects();
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

async function insertBrand(){
    const nameBrand = document.querySelector(".insert-brand input[name='name_brand']");
    const msg = document.querySelector(".insert-brand .msg");

    if(!nameBrand.value){
        window.alert("Dados inválidos!");
        msg.classList.add('error');
        msg.innerText = "Dados inválidos!";
    } else {
        let data = {
            name: nameBrand.value
        }
        const response = await fetch('http://localhost:8000/v1/brands/',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(response.ok){
            const brand = await response.json();
            window.alert("Marca " + brand +" Inserida com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Marca " + brand +" Inserida com SUCESSO!";

            populateBrands = false;
            populateSelects();
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

async function updateBrand(){
    const idBrand = document.querySelector("#update_brand");
    const nameBrand = document.querySelector(".update-brand input[name='name_brand']");

    const msg = document.querySelector(".update-brand .msg");

    if(!idBrand.value || !nameBrand.value){
        window.alert("Dados inválidos!");
        msg.classList.add('error');
        msg.innerText = "Dados inválidos!";
    } else {
        let data = {
            name: nameBrand.value
        }
        const response = await fetch('http://localhost:8000/v1/brands/' + idBrand.value,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(response.ok){
            const brand = await response.json();
            window.alert("Marca " + brand +" Atualizada com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Marca " + brand +" Atualizada com SUCESSO!";

            populateBrands = false;
            populateSelects();
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}