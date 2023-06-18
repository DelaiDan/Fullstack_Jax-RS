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
async function populateVehicles(){
    if(!populateVehicles){
        const response = await fetch('http://localhost:8000/v1/vehicles/');
        if(response.ok){
            const jsonData = await response.json();
    
            const vehicleSelect = document.querySelectorAll('select[name=vehicles]');
        
            vehicleSelect.forEach((select) => {
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
    const idProd = document.querySelector(".remove-vehicle input[name='id_vehicle']");
    const msg = document.querySelector(".remove-vehicle .msg");

    if(!idProd.value){
        window.alert("ID do Veículo inválida!");
        msg.classList.add('error');
        msg.innerText = "ID do Veículo inválida!";
    } else {
        const response = await fetch('http://localhost:8000/v1/vehicles/' + idProd.value,{
            method: "DELETE",
        });
        if(response.ok){
            window.alert("Veículo " + idProd.value + " Deletado com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Veículo " + idProd.value + " Deletado com SUCESSO!";
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
    const brandVehicle = document.querySelector("#add_category");

    const msg = document.querySelector(".insert-vehicle .msg");

    if(!nameVehicle.value || !yearVehicle.value || !brandVehicle.value){
        window.alert("Dados inválidos!");
        msg.classList.add('error');
        msg.innerText = "Dados inválidos!";
    } else {
        let data = {
            name: nameVehicle.value,
            year: yearVehicle.value,
            brand: brandVehicle.value,
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
            window.alert("Veículo " + vehicle.id +" Inserido com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Veículo " + vehicle.id +" Inserido com SUCESSO!";
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

async function updateProduct(){
    const idVehicle = document.querySelector("#update_vehicle");
    const nameVehicle = document.querySelector(".update-vehicle input[name='name_vehicle']");
    const yearVehicle = document.querySelector(".update-vehicle input[name='year_vehicle']");
    const brandVehicle = document.querySelector("#update_brand");

    const msg = document.querySelector(".update-vehicle .msg");

    if(!idVehicle.value || !nameVehicle.value || !yearVehicle.value || !brandVehicle.value){
        window.alert("Dados inválidos!");
        msg.classList.add('error');
        msg.innerText = "Dados inválidos!";
    } else {
        let data = {
            name: nameVehicle.value,
            year: yearVehicle.value,
            brand: brandVehicle.value,
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
            window.alert("Veículo " + vehicle.id +" Atualizado com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Veículo " + vehicle.id +" Atualizado com SUCESSO!";
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

//Marcas
async function populateBrands(){
    if(!populateBrands){
        const response = await fetch('http://localhost:8000/v1/brands/');
        if(response.ok){
            const jsonData = await response.json();
            const brandSelect = document.querySelectorAll('select[name=brands]');
    
            brandSelect.forEach((select) => {
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

async function getByID(){
    const idProd = document.querySelector(".single-product input[name='id_prod']");
    const msg = document.querySelector(".single-product .msg");

    if(!idProd.value){
        window.alert("ID do Produto inválida!");
        msg.classList.add('error');
        msg.innerText = "ID do Produto inválida!";
    } else {
        const response = await fetch('http://localhost:3001/products/' + idProd.value);
        if(response.ok){
            const product = await response.json();
            const productsContainer = document.querySelector('.products');
            productsContainer.innerHTML = '';
        
            const li = document.createElement('li');
            const spec = document.createElement('div');
            const id_prod = document.createElement('span');
            const category = document.createElement('span');
            const name = document.createElement('p');
            const price = document.createElement('p');
            const descr = document.createElement('p');
    
            li.classList.add('product');
            spec.classList.add('spec');
            id_prod.classList.add('id_prod');
            category.classList.add('category');
            name.classList.add('name');
            price.classList.add('price');
            descr.classList.add('descr');
    
            id_prod.innerText = product.id;
            category.innerText = product.category;
            name.innerText = product.name;
            price.innerText = "R$ " + product.price;
            descr.innerText = product.description;
    
            spec.appendChild(id_prod);
            spec.appendChild(category);
    
            li.appendChild(spec);
            li.appendChild(name);
            li.appendChild(price);
            li.appendChild(descr);
    
            productsContainer.appendChild(li);
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

async function removeProduct(){
    const idProd = document.querySelector(".remove-product input[name='id_prod']");
    const msg = document.querySelector(".remove-product .msg");

    if(!idProd.value){
        window.alert("ID do Produto inválida!");
        msg.classList.add('error');
        msg.innerText = "ID do Produto inválida!";
    } else {
        const response = await fetch('http://localhost:3001/products/' + idProd.value,{
            method: "DELETE",
        });
        if(response.ok){
            window.alert("Produto " + idProd.value + " Deletado com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Produto " + idProd.value + " Deletado com SUCESSO!";
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

async function insertProduct(){
    const nameProd = document.querySelector(".insert-product input[name='name_prod']");
    const priceProd = document.querySelector(".insert-product input[name='price_prod']");
    const descrProd = document.querySelector(".insert-product input[name='descr_prod']");
    const categoryProd = document.querySelector("#add_category");

    const msg = document.querySelector(".insert-product .msg");

    if(!nameProd.value || !priceProd.value || !descrProd.value || !categoryProd.value){
        window.alert("Dados inválidos!");
        msg.classList.add('error');
        msg.innerText = "Dados inválidos!";
    } else {
        let data = {
            name: nameProd.value,
            price: priceProd.value,
            description: descrProd.value,
            category: categoryProd.value
        }
        const response = await fetch('http://localhost:3001/products/',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(response.ok){
            const product = await response.json();
            window.alert("Produto " + product.id +" Inserido com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Produto " + product.id +" Inserido com SUCESSO!";
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}

async function updateProduct(){
    const idProd = document.querySelector(".update-product input[name='id_prod']");
    const nameProd = document.querySelector(".update-product input[name='name_prod']");
    const priceProd = document.querySelector(".update-product input[name='price_prod']");
    const descrProd = document.querySelector(".update-product input[name='descr_prod']");
    const categoryProd = document.querySelector("#update_category");

    const msg = document.querySelector(".update-product .msg");

    if(!nameProd.value || !priceProd.value || !descrProd.value || !categoryProd.value){
        window.alert("Dados inválidos!");
        msg.classList.add('error');
        msg.innerText = "Dados inválidos!";
    } else {
        let data = {
            name: nameProd.value,
            price: priceProd.value,
            description: descrProd.value,
            category: categoryProd.value
        }
        const response = await fetch('http://localhost:3001/products/' + idProd.value,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(response.ok){
            const product = await response.json();
            window.alert("Produto " + product.id +" Atualizado com SUCESSO!");
            msg.classList.add('success');
            msg.innerText = "Produto " + product.id +" Atualizado com SUCESSO!";
        } else {
            window.alert("ERRO na Operação!");
            msg.classList.add('error');
            msg.innerText = "ERRO na Operação!";
        }
    }
}