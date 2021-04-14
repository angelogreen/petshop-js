const moment = require('moment');
const fs = require('fs');
const { arch } = require('os');
const nomeArquivo = 'pets.json';
const petshop = "PETSHOP DH";

let petsJSON = fs.readFileSync(nomeArquivo);
let arquivoPets = JSON.parse(petsJSON); //converte para fomrato JS

 //console.log(arquivoPets.pets);

const atualizarJson= ()=> {

let listaJson = JSON.stringify(arquivoPets, null , 2);//Objeto para converter , null para nao  minificar , 2 para numero de linhas - converte o objeto literal para JSON
fs.writeFileSync(nomeArquivo,listaJson, 'utf-8'); //caminho arquivo , conteudo novo , formato 
}

const listarPets = (listaDePets) => {
  for (let contador = 0; contador < listaDePets.length; contador++) {
    console.log(`${listaDePets[contador].nome}, ${listaDePets[contador].idade} anos, ${listaDePets[contador].tipo}, ${listaDePets[contador].raca}, ${(listaDePets[contador].vacinado) ? 'vacinado' : 'não vacinado'}`);
    for (let index = 0; index < listaDePets[contador].servicos.length; index++) {
        console.log(`${listaDePets[contador].servicos[index].data} - ${listaDePets[contador].servicos[index].nome}`);
    }
  }
};
const vacinarPet = (pet) => {
    if (!pet.vacinado) {
        pet.vacinado = true;
        atualizarJson();
        console.log(`${pet.nome} foi vacinado com sucesso!`);
    } else {
        console.log(`Ops, ${pet.nome} já está vacinado!`);
    }
} 
const campanhaVacina = (listaPets) => {
    let totalVacinados = 0;
    for (let i = 0; i < listaPets.length; i++) {
        if (!listaPets[i].vacinado) {
            listaPets[i].vacinado = true;
            totalVacinados++;
        }
    }
    atualizarJson();

    console.log(`Parabéns, ${totalVacinados} pets foram vacinados nessa campanha!`);
};
const adicionarPet = (infoPet) => {
    arquivoPets.pets.push(infoPet);
    atualizarJson();
console.log(`${infoPet.nome} está cadastrado no Sistema`);

}
const darBanhoPet = (pet) => {
    pet.servicos.push({
        nome: 'banho',
        data: moment().format('DD-MM-YYYY')
    });
    atualizarJson();
    console.log(`${pet.nome} está cherose!`);
}


const tosarPet = (pet)=> {
pet.servicos.push({
nome: 'tosa',
data: moment().format('DD-MM-YYYY')

});
atualizarJson();
console.log(`${pet.nome} está com cabelo na regra `);
}

const apararUnhasPet =(pet)=> {
pet.servicos.push({
nome: 'Aparar unhas',
data: moment().format('DD-MM-YYYY')

});
atualizarJson();
console.log(`${pet.nome} está com as unhas aparadas`);
}


const buscarPet = (nomePet) => {
    const petEncontrado = arquivoPets.pets.find((pet) => {
        return pet.nome == nomePet;
    });
    console.log(petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`);
}
const atenderCliente = (pet, servico) => {
    console.log(`Olá, ${pet.nome}!`);
    servico(pet);
    console.log('Até mais!');
}


const addInfoCastrado = () => {
    arquivoPets.pets = listaPets.map((pet) => {
        pet.castrado = true;
        return pet;
    })
    atualizarJson();
}
const listarVacinados = () => {
    console.log('** VACINADO **');
    let vacinados = arquivoPets.pets.filter((pet) => {
        return pet.vacinado;
    })
    console.log(vacinados);
    console.log(`Temos ${vacinados.length} pets vacinados!`);
}
listarVacinados();


// atenderCliente(arquivoPets.pets[0], darBanhoPet);
// console.log('----------')
// atenderCliente(arquivoPets.pets[3], tosarPet);



//listarPets(arquivoPets.pets);
//apararUnhasPet(arquivoPets.pets[1]);
 //tosarPet(arquivoPets.pets[2]);
// tosarPet(pets[4])
 //darBanhoPet(arquivoPets.pets[4]);
// darBanhoPet(pets[4]);
// darBanhoPet(pets[3]);
//listarPets(pets);

 //vacinarPet(arquivoPets.pets[0]);
// vacinarPet(pets[1]);
// vacinarPet(pets[3]);
//campanhaVacina(arquivoPets);


// adicionarPet({
//     nome: 'Rex2', 
//     idade: 1, 
//     raca: 'Maltes', 
//     tipo: 'cachorro', 
//     vacinado: false,
//     genero: 'M',
//     servicos: []
// }); 