
// Pipeline data structure
const stages = [
  { name: 'Leads Recebidos', count: 1000, color: '#9b87f5' },
  { name: 'Tentativa de Conexão', count: 750, color: '#8b77e5' },
  { name: 'Conectado', count: 500, color: '#7b67d5' },
  { name: 'Negociando', count: 250, color: '#6b57c5' },
  { name: 'Venda', count: 100, color: '#5b47b5' }
];

// State management
let state = {
  viewMode: 'static',
  dateRange: {
    from: null,
    to: null
  },
  product: 'all',
  campaign: 'all',
  closedReason: 'all'
};

// DOM Elements
const funnelContainer = document.getElementById('funnel-container');
const viewButtons = document.querySelectorAll('[data-view]');
const productSelect = document.getElementById('product');
const campaignSelect = document.getElementById('campaign');
const dateFromInput = document.getElementById('dateFrom');
const dateToInput = document.getElementById('dateTo');

// Render funnel stages
function renderFunnel() {
  funnelContainer.innerHTML = '';
  
  const maxWidth = 100;
  const minWidth = 40; // minimum width for the last stage
  const widthStep = (maxWidth - minWidth) / (stages.length - 1);
  
  stages.forEach((stage, index) => {
    const width = maxWidth - (widthStep * index);
    const opacity = 0.9 - (index * 0.1);
    
    const stageElement = document.createElement('div');
    stageElement.className = 'funnel-stage fade-in';
    stageElement.style.width = `${width}%`;
    stageElement.style.opacity = opacity;
    stageElement.style.background = `linear-gradient(to right, ${stage.color}, #2d1b4e)`;
    
    stageElement.innerHTML = `
      <h3 class="text-xl font-semibold mb-2">${stage.name}</h3>
      <p class="text-2xl font-bold">${stage.count.toLocaleString()}</p>
      ${index > 0 ? `
        <div class="text-sm text-gray-300 mt-2">
          ${Math.round((stage.count / stages[index - 1].count) * 100)}% conversion
        </div>
      ` : ''}
    `;
    
    funnelContainer.appendChild(stageElement);
    
    if (index < stages.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'funnel-arrow';
      funnelContainer.appendChild(arrow);
    }
  });
}

// Event Listeners
viewButtons.forEach(button => {
  button.addEventListener('click', () => {
    viewButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    state.viewMode = button.dataset.view;
    renderFunnel();
  });
});

productSelect.addEventListener('change', (e) => {
  state.product = e.target.value;
  renderFunnel();
});

campaignSelect.addEventListener('change', (e) => {
  state.campaign = e.target.value;
  renderFunnel();
});

dateFromInput.addEventListener('change', (e) => {
  state.dateRange.from = e.target.value;
  renderFunnel();
});

dateToInput.addEventListener('change', (e) => {
  state.dateRange.to = e.target.value;
  renderFunnel();
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  renderFunnel();
});
