// Pipeline data structure
const stages = [
  { name: 'Leads Recebidos', count: 1000, color: '#ec0000' },
  { name: 'Tentativa de Conexão', count: 750, color: '#d40000' },
  { name: 'Conectado', count: 500, color: '#c00000' },
  { name: 'Negociando', count: 250, color: '#b30000' },
  { name: 'Venda', count: 100, color: '#a60000' }
];

// DOM Elements
const viewButtons = document.querySelectorAll('[data-view]');
const productSelect = document.getElementById('product');
const campaignSelect = document.getElementById('campaign');
const dateFromInput = document.getElementById('dateFrom');
const dateToInput = document.getElementById('dateTo');

// Event Listeners
viewButtons.forEach(button => {
  button.addEventListener('click', () => {
    viewButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    updateFunnel();
  });
});

[productSelect, campaignSelect, dateFromInput, dateToInput].forEach(element => {
  element.addEventListener('change', updateFunnel);
});

// Funnel Rendering
function updateFunnel() {
  const funnelContainer = document.getElementById('funnel-container');
  funnelContainer.innerHTML = '';

  stages.forEach((stage, index) => {
    const stageElement = document.createElement('div');
    stageElement.className = 'funnel-stage fade-in';
    stageElement.style.width = `${100 - index * 10}%`;
    stageElement.style.background = `linear-gradient(to right, ${stage.color}, ${stages[Math.min(index + 1, stages.length - 1)].color})`;

    const content = `
      <h3 class="text-xl font-semibold">${stage.name}</h3>
      <p class="text-2xl font-bold">${stage.count.toLocaleString()}</p>
      ${index > 0 ? `<div class="text-sm opacity-80">
        ${Math.round((stage.count / stages[index - 1].count) * 100)}% conversion
      </div>` : ''}
    `;

    stageElement.innerHTML = content;
    funnelContainer.appendChild(stageElement);

    if (index < stages.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'funnel-arrow';
      funnelContainer.appendChild(arrow);
    }
  });
}

// Initialize funnel on page load
document.addEventListener('DOMContentLoaded', updateFunnel);
