document.addEventListener("DOMContentLoaded", () => {
    
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Controle dos Modais de Nível de Associação
    const openModalButtons = document.querySelectorAll(".open-modal-btn");
    const closeModalButtons = document.querySelectorAll(".close-modal-btn");

    openModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });
});