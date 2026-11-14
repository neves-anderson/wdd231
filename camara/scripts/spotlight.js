async function carregarSpotlights() {
    const spotlightContainer = document.getElementById('spotlight-container');
    
    if (!spotlightContainer) {
        console.error("Erro crítico: O elemento com id 'spotlight-container' não foi encontrado no HTML da página.");
        return;
    }

    try {
        // Tentativa de carregar o arquivo JSON na raiz do projeto
        const resposta = await fetch('dados/membros.json');
        
        if (!resposta.ok) {
            throw new Error(`Não foi possível carregar o arquivo membros.json (Status: ${resposta.status})`);
        }
        
        const membros = await resposta.json();

        // Filtrar apenas empresas de nível 2 (Prata) e nível 3 (Ouro)
        const membrosEspeciais = membros.filter(membro => {
            const nivel = String(membro["nível de associação"]).trim();
            return nivel === "2" || nivel === "3";
        });

        if (membrosEspeciais.length === 0) {
            console.warn("Atenção: O arquivo JSON foi lido, mas nenhuma empresa com nível 2 ou 3 foi encontrada.");
            spotlightContainer.innerHTML = "<p>Nenhuma empresa em destaque disponível no momento.</p>";
            return;
        }

        // Embaralhar aleatoriamente e selecionar até 3 empresas
        const embaralhados = [...membrosEspeciais].sort(() => 0.5 - Math.random());
        const selecionados = embaralhados.slice(0, 3);

        renderizarSpotlights(spotlightContainer, selecionados);

    } catch (erro) {
        console.error("Erro no carregamento dos spotlights:", erro);
        spotlightContainer.innerHTML = `<p style="color: red; padding: 1rem;">Erro ao carregar destaques. Verifique se está usando um servidor local (Live Server).</p>`;
    }
}

function renderizarSpotlights(container, membros) {
    container.innerHTML = membros.map(membro => {
        const nivel = String(membro["nível de associação"]).trim();
        const badgeClasse = nivel === "3" ? "badge-gold" : "badge-silver";
        const badgeTexto = nivel === "3" ? "Ouro" : "Prata";

        return `
            <article class="card spotlight-card">
                <span class="badge-membership ${badgeClasse}">${badgeTexto}</span>
                <div class="card-header-spotlight">
                    <h3>${membro.nome}</h3>
                    <p class="slogan">${membro.categoria}</p>
                </div>
                <div class="card-body spotlight-body-content">
                    <img src="${membro.logo}" alt="Logo ${membro.nome}" class="company-logo" onerror="this.src='imagens/logo.png'">
                    <div class="company-details">
                        <p><strong>E-mail:</strong> ${membro.email}</p>
                        <p><strong>Telefone:</strong> ${membro.telefone}</p>
                        <p><strong>Site:</strong> <a href="${membro.site}" target="_blank" rel="noopener">Acessar Site</a></p>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}


document.addEventListener('DOMContentLoaded', carregarSpotlights);