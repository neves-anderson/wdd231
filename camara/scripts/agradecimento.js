document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    const formData = currentUrl.split("?")[1];

    const resultsElement = document.getElementById("results");

    if (formData && resultsElement) {
        const urlParams = new URLSearchParams(formData);

        function showParam(key) {
            return urlParams.get(key) || "Não informado";
        }

     
        let formattedDate = showParam("timestamp");
        if (formattedDate !== "Não informado") {
            const parsedDate = new Date(formattedDate);
            if (!isNaN(parsedDate)) {
                formattedDate = parsedDate.toLocaleString("pt-BR", {
                    dateStyle: "long",
                    timeStyle: "medium"
                });
            }
        }

        resultsElement.innerHTML = `
            <div class="summary-card">
                <p><strong>Nome:</strong> ${showParam("fname")}</p>
                <p><strong>Sobrenome:</strong> ${showParam("lname")}</p>
                <p><strong>E-mail:</strong> ${showParam("email")}</p>
                <p><strong>Celular:</strong> ${showParam("phone")}</p>
                <p><strong>Empresa/Organização:</strong> ${showParam("organization")}</p>
                <p><strong>Data/Hora do Envio:</strong> ${formattedDate}</p>
            </div>
        `;
    }

    // Atualização de rodapé
    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedPara = document.getElementById("lastModified");
    if (lastModifiedPara) {
        lastModifiedPara.textContent = `Última Modificação: ${document.lastModified}`;
    }
});