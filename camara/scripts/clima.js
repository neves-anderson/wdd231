// Configuração da API OpenWeatherMap para Manaus com a chave fornecida
const API_KEY = "8c9450b8088e414200e2b49e8e0be1df"; 
const LAT = "-3.1190";
const LON = "-60.0217";

const URL_CLIMA_ATUAL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&lang=pt_br&appid=${API_KEY}`;
const URL_PREVISAO = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&lang=pt_br&appid=${API_KEY}`;

// Dados Mockados de Fallback caso ocorra algum problema de rede
const mockClimaAtual = {
    temp: 31,
    tempMax: 34,
    tempMin: 24,
    umidade: 78,
    descricao: "Ensolarado com nuvens esparsas",
    icone: "https://openweathermap.org/img/wn/02d@2x.png",
    nascerSol: "05:45",
    porSol: "18:05"
};

const mockPrevisao = [
    { dia: "Hoje", temp: "32°C" },
    { dia: "Quarta-Feira", temp: "31°C" },
    { dia: "Sexta-Feira", temp: "29°C" }
];

async function carregarClima() {
    const climaContainer = document.getElementById('clima-container');
    const previsaoContainer = document.getElementById('previsao-container');

    if (!climaContainer || !previsaoContainer) return;

    try {
        const [resAtual, resPrevisao] = await Promise.all([
            fetch(URL_CLIMA_ATUAL),
            fetch(URL_PREVISAO)
        ]);

        if (!resAtual.ok || !resPrevisao.ok) {
            throw new Error("Falha na requisição da API de clima");
        }

        const dataAtual = await resAtual.json();
        const dataPrevisao = await resPrevisao.json();

        renderizarClimaAtual(climaContainer, {
            temp: Math.round(dataAtual.main.temp),
            tempMax: Math.round(dataAtual.main.temp_max),
            tempMin: Math.round(dataAtual.main.temp_min),
            umidade: dataAtual.main.humidity,
            descricao: dataAtual.weather[0].description,
            icone: `https://openweathermap.org/img/wn/${dataAtual.weather[0].icon}@2x.png`,
            nascerSol: formatarHora(dataAtual.sys.sunrise),
            porSol: formatarHora(dataAtual.sys.sunset)
        });

        const listaPrevisao = [
            { dia: "Hoje", temp: `${Math.round(dataPrevisao.list[0].main.temp)}°C` },
            { dia: obterNomeDia(dataPrevisao.list[8]?.dt), temp: `${Math.round(dataPrevisao.list[8]?.main.temp || 31)}°C` },
            { dia: obterNomeDia(dataPrevisao.list[16]?.dt), temp: `${Math.round(dataPrevisao.list[16]?.main.temp || 30)}°C` }
        ];

        renderizarPrevisao(previsaoContainer, listaPrevisao);

    } catch (error) {
        console.warn("Utilizando fallback de clima mockado para Manaus:", error.message);
        renderizarClimaAtual(climaContainer, mockClimaAtual);
        renderizarPrevisao(previsaoContainer, mockPrevisao);
    }
}

function renderizarClimaAtual(container, dados) {
    container.innerHTML = `
        <div class="weather-current">
            <img src="${dados.icone}" alt="${dados.descricao}" class="weather-icon-img">
            <div>
                <div class="temp-display">${dados.temp}°C</div>
                <div class="weather-desc">${dados.descricao}</div>
            </div>
        </div>
        <div class="weather-details">
            <p><strong>Máxima:</strong> ${dados.tempMax}°C</p>
            <p><strong>Mínima:</strong> ${dados.tempMin}°C</p>
            <p><strong>Umidade:</strong> ${dados.umidade}%</p>
            <p><strong>Nascer do Sol:</strong> ${dados.nascerSol}</p>
            <p><strong>Pôr do Sol:</strong> ${dados.porSol}</p>
        </div>
    `;
}

function renderizarPrevisao(container, lista) {
    container.innerHTML = `
        <div class="forecast-list">
            ${lista.map(item => `
                <div class="forecast-item">
                    <strong>${item.dia}:</strong>
                    <span>${item.temp}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function formatarHora(timestamp) {
    const data = new Date(timestamp * 1000);
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function obterNomeDia(timestamp) {
    if (!timestamp) return "Amanhã";
    const data = new Date(timestamp * 1000);
    const dia = data.toLocaleDateString('pt-BR', { weekday: 'long' });
    return dia.charAt(0).toUpperCase() + dia.slice(1);
}

document.addEventListener('DOMContentLoaded', carregarClima);