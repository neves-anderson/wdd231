document.addEventListener("DOMContentLoaded", () => {
    // Exibe o ano atual dinamicamente
    const anoElemento = document.getElementById("anoAtual");
    if (anoElemento) {
        anoElemento.textContent = new Date().getFullYear();
    }
 
    // Data de modificação
    const modificacaoElemento = document.getElementById("ultimaModificacao");
 
    if (modificacaoElemento) {
    const data = new Date(document.lastModified);
   
    // Exibe data e hora: DD/MM/AAAA HH:mm:ss
    const dataFormatada = data.toLocaleString("pt-BR");
 
    modificacaoElemento.textContent = `Última Modificação: ${dataFormatada}`;
}
});