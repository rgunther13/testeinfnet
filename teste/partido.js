document.querySelector("#caixa").addEventListener("change", pegarID);

function pegarID() {
    id = document.getElementById("caixa").value;
    carregarParlamentares(id);
}


async function carregarPartidos() {
    //event.preventDefault();

    let dropdown = document.querySelector("select");
    //tabela.innerHTML = '';
    let partidos;

    partidos = await consultar_partidos();

    for (let partido of partidos) {
        criarLinha(partido.id, partido.sigla);
    }

}

function criarLinha(id, sigla) {
    
    let linha = document.createElement("option");
    linha.value = id;
    linha.innerHTML = sigla;
    let dropdown = document.querySelector("select");
    dropdown.appendChild(linha);
}



async function carregarParlamentares(id){
    let url = 'https://dadosabertos.camara.leg.br/api/v2/partidos/' + id + '/membros?ordenarPor=nome&ordem=asc'
    try {
        let res = await fetch(url)
        .then(response => response.json())
        .then(dados => dados)
        ;
        console.log(res.dados);
        let tabela = document.querySelector("tbody");
        tabela.innerHTML = '';
        for (let parlamentar of res.dados){
            criarLinhaParlamentares(parlamentar.nome, parlamentar.siglaPartido, parlamentar.siglaUf,parlamentar.email, parlamentar.urlFoto);
        }
    } catch (err) {
        console.log(err);
    }
}

function criarLinhaParlamentares(nome, partido, estado, email, imagem) {

    
    let linha = document.createElement("tr");
    let nomeCelula = document.createElement("th");
    let partidoCelula = document.createElement("td");
    let estadoCelula = document.createElement("td");
    let emailCelula = document.createElement("td");
    let imagemCelula = document.createElement("td");

    nomeCelula.textContent = nome;
    partidoCelula.textContent = partido;
    estadoCelula.textContent = estado;
    emailCelula.innerHTML = "<a href=\"mailto:" + email + "\"\>" + email + "</a>";
    //imagemCelula.textContent = "<img src=\"" +imagem + "\"\\>";
    imagemCelula.innerHTML = "<a href=\"" + imagem + "\"  data-toggle=\"lightbox\" />" + "<img class=\"miniatura\" src=\"" + imagem + "\" />" + "</a>";

    linha.appendChild(nomeCelula);
    linha.appendChild(partidoCelula);
    linha.appendChild(estadoCelula);
    linha.appendChild(emailCelula);
    linha.appendChild(imagemCelula);

    let tabela = document.querySelector("tbody");
    tabela.appendChild(linha);
}

async function consultar_partidos() {

    let url = 'https://dadosabertos.camara.leg.br/api/v2/partidos?dataInicio=2022-01-01&dataFim=2022-12-31&ordem=ASC&ordenarPor=sigla';
    
    try {
        let res = await fetch(url)
        .then(response => response.json())
        .then(dados => dados)
        ;
        return await res.dados;
    } catch (err) {
        console.log(err);
    }
}