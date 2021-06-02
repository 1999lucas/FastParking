//MODAL DE PREÇOS
const openModalPrecos = () => document.querySelector('#dv-modal').classList.add('abrir')
const closeModalPrecos = () => document.querySelector('#dv-modal').classList.remove('abrir')
document.querySelector('#preco').addEventListener('click', openModalPrecos)
document.querySelector('#cancelar').addEventListener('click', closeModalPrecos)

//MODAL DE COMPROVANTE
const openModalComprovante = () => document.querySelector('#modalComprovante').classList.add('abrir')
const closeModalComprovante = () => document.querySelector('#modalComprovante').classList.remove('abrir')
document.querySelector('#abrir-comprovante').addEventListener('click', openModalComprovante)
document.querySelector('#cancelar-comprovante').addEventListener('click', closeModalComprovante)


const readDB = () => JSON.parse(localStorage.getItem('db')) ?? []

const setDB = (db) => localStorage.setItem('db', JSON.stringify(db))

const insertDB = (client) => {
    //1 - ler o banco de dados
    const db = readDB()
    //2 - adicionar o novo cliente
    db.push(client)
    //3 - enviar ou fechar o banco de dados
    setDB(db)
}


const createRow = (client) => {
    const recordClient = document.querySelector('#tabelaClientes tbody')
    const newTr = document.createElement('tr')
    newTr.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.placa}</td>
        <td>${client.data}</td>
        <td>${client.hora}</td>
        <td>
            <button type='button' class='button blue'  >Comp.</button>
            <button type='button' class='button red'  >Editar</button>
            <button type='button' class='button red'  >Saída</button>
        </td>
    `
    recordClient.appendChild(newTr)

}

const clearTable = () => {
    const recordClient = document.querySelector ('#tabelaClientes tbody')
    while (recordClient.firstChild) {
        recordClient.removeChild(recordClient.lastChild)
    }
}
// como vou manipular a tabela, preciso de um id nela
const updateTable = () => {
    //0 - limpar tabela
    clearTable ()
    //1 - ler o banco de dados
    const db = readDB ()
    //2 - Criar linhas na tbody com os registros
    db.forEach(createRow)
}

const saveClient = () => {
    //0 - Validar dados
    // if (isValidForm()) {
        
    //1 - Ler as caixas de texto do formulário
    const newClient = {
        nome: document.querySelector('#nome').value,
        placa: document.querySelector('#placa').value,
        data: document.querySelector('#data').value,
        hora: document.querySelector('#hora').value
    }

    //2 - Adicionar o novo cliente ao banco de dados
    // const index = document.querySelector('#nome').dataset.index
//agora podemos trabalhar
    // if(index == '') {
    //     insertDB(newClient)
    // }else{
    //     updateClient(newClient, index)
    // }
    insertDB(newClient)
    //3 - Fechar modal
    closeModal()
    //4 - Limpar as caixas de texto
    clearInput()
    //5 - Atualizar a tabela
    updateTable();
}


document.querySelector('#adicionar').addEventListener('click', saveClient)

updateTable();//isso é oq vai fazer mostrar a tabela