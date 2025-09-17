// Données des séries (seront stockées dans le localStorage)
let series = JSON.parse(localStorage.getItem('series')) || [];

// Éléments du DOM
const seriesForm = document.getElementById('series-form');
const seriesLists = {
    watched: document.querySelector('#mes-series .series-list'),
    toWatch: document.querySelector('#a-voir .series-list'),
    favorite: document.querySelector('#favorites .series-list')
};

// Ajouter une série
seriesForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const status = document.getElementById('status').value;
    const rating = document.getElementById('rating').value;
    
    if (title) {
        const newSeries = {
            id: Date.now(),
            title,
            status,
            rating: rating || null
        };
        
        series.push(newSeries);
        saveSeries();
        renderSeries();
        seriesForm.reset();
    }
});

// Sauvegarder les séries dans le localStorage
function saveSeries() {
    localStorage.setItem('series', JSON.stringify(series));
}

// Afficher les séries
function renderSeries() {
    // Vider les listes
    Object.values(seriesLists).forEach(list => {
        list.innerHTML = '';
    });
    
    // Ajouter les séries aux listes appropriées
    series.forEach(serie => {
        const card = document.createElement('div');
        card.className = 'serie-card';
        card.innerHTML = `
            <h3>${serie.title}</h3>
            ${serie.rating ? `<p>Note: ${serie.rating}/10</p>` : ''}
            <button onclick="removeSeries(${serie.id})">Supprimer</button>
        `;
        
        seriesLists[serie.status].appendChild(card);
    });
}

// Supprimer une série
function removeSeries(id) {
    series = series.filter(serie => serie.id !== id);
    saveSeries();
    renderSeries();
}

// Charger les séries au démarrage
document.addEventListener('DOMContentLoaded', renderSeries);
