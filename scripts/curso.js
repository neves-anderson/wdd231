const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basics of computer programming and software development.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to markup languages such as HTML and CSS.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more proficient programmers by writing programs that contain functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the concepts of object-oriented programming.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students will learn to create dynamic websites using JavaScript to manipulate the DOM.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and Dynamic Web Fundamentals.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container-cursos");
    const totalCreditosEl = document.getElementById("total-creditos");
    const btnTodos = document.getElementById("btn-todos");
    const btnWDD = document.getElementById("btn-wdd");
    const btnCSE = document.getElementById("btn-cse");

    function renderCursos(listaCursos) {
        container.innerHTML = "";

        listaCursos.forEach(course => {
            const card = document.createElement("div");
            card.className = `curso-card ${course.completed ? "completed" : ""}`;
            card.innerHTML = `
                <span>${course.completed ? "✓ " : ""}${course.subject} ${course.number}</span>
            `;
            container.appendChild(card);
        });

        // Cálculo dinâmico dos créditos com .reduce()
        const totalCreditos = listaCursos.reduce((sum, course) => sum + course.credits, 0);
        if (totalCreditosEl) {
            totalCreditosEl.textContent = totalCreditos;
        }
    }

    function setActiveButton(btnAtivo) {
        [btnTodos, btnWDD, btnCSE].forEach(btn => btn.classList.remove("active"));
        btnAtivo.classList.add("active");
    }

    if (btnTodos) {
        btnTodos.addEventListener("click", () => {
            renderCursos(courses);
            setActiveButton(btnTodos);
        });
    }

    if (btnWDD) {
        btnWDD.addEventListener("click", () => {
            const wddCursos = courses.filter(c => c.subject === "WDD");
            renderCursos(wddCursos);
            setActiveButton(btnWDD);
        });
    }

    if (btnCSE) {
        btnCSE.addEventListener("click", () => {
            const cseCursos = courses.filter(c => c.subject === "CSE");
            renderCursos(cseCursos);
            setActiveButton(btnCSE);
        });
    }

    // Renderiza inicialmente todos os cursos
    renderCursos(courses);
});