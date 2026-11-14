document.addEventListener("DOMContentLoaded", () => {
    // Seleção dos elementos do DOM
    const containerMembros = document.getElementById("container-membros");
    const btnGrid = document.getElementById("btn-grid");
    const btnLista = document.getElementById("btn-lista");
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    // Menu Hambúrguer (Mobile)
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }

    // 1. Função assíncrona para buscar os dados JSON
    async function obterMembros() {
        // Se o container de membros não existir nesta página, interrompe a execução
        if (!containerMembros) return;

        try {
            const resposta = await fetch("dados/membros.json");
            if (!resposta.ok) {
                throw new Error(`Erro ao carregar os dados: ${resposta.status}`);
            }
            const membros = await resposta.json();
            renderizarMembros(membros);
        } catch (erro) {
            console.error("Falha na requisição:", erro);
            containerMembros.innerHTML = `<p class="erro">Não foi possível carregar o diretório de membros.</p>`;
        }
    }

    // Função para renderizar os cartões dos membros
    function renderizarMembros(membros) {
        containerMembros.innerHTML = ""; 

        membros.forEach(membro => {
            const cartao = document.createElement("section");
            cartao.classList.add("card");

            // Estrutura HTML do cartão respeitando as classes definidas em telas-pequenas.css
            cartao.innerHTML = `
                <a href="${membro.site}" target="_blank" rel="noopener noreferrer" class="link-detalhes"><img src="${membro.logo}" alt="Logo de ${membro.nome}"></a>
                <div class="card-info">
                    <h2>${membro.nome}</h2>
                    <p class="categoria">${membro.categoria}</p>
                    <p class="info-extra"><strong>E-mail:</strong> ${membro.email}</p>
                    <p class="info-extra"><strong>Telefone:</strong> ${membro.telefone}</p>
                    <p class="info-extra"><strong>Site:</strong> ${membro.site}</p>
                </div>
            `;

            containerMembros.appendChild(cartao);
        });
    }

    // 2. Lógica para alternar entre as visualizações Grid e Lista
    if (btnGrid && btnLista && containerMembros) {
        btnGrid.addEventListener("click", () => {
            containerMembros.classList.add("grid-view");
            containerMembros.classList.remove("list-view");
            btnGrid.classList.add("active");
            btnLista.classList.remove("active");
        });

        btnLista.addEventListener("click", () => {
            containerMembros.classList.add("list-view");
            containerMembros.classList.remove("grid-view");
            btnLista.classList.add("active");
            btnGrid.classList.remove("active");
        });
    }

    // Inicializa a busca dos dados
    obterMembros();
});