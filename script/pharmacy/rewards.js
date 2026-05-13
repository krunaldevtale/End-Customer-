document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Reset all tabs to inactive styles
            tabs.forEach(t => {
                t.classList.remove(
                    "bg-mint-cream", "text-green-light", "font-bold",
                    "rounded-full", "shadow-sm", "border", "border-gray-300"
                );
                t.classList.add("bg-white", "text-gray", "font-medium", "rounded-full");
            });

            // Hide all tab contents
            contents.forEach(c => c.classList.add("hidden"));

            // Apply active styles to clicked tab
            tab.classList.remove("bg-white", "text-gray", "font-medium", "rounded-full");
            tab.classList.add(
                "bg-mint-cream", "text-green-light", "font-bold",
                "rounded-full", "shadow-sm", "border", "border-gray-300"
            );

            // Show the related content
            document.querySelector(`.${tab.dataset.tab}`).classList.remove("hidden");
        });
    });

    // Graph

   const ctx = document.getElementById('myChart').getContext('2d');

// Create gradient
const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Adjust height as needed
gradient.addColorStop(0, '#168E8F');
gradient.addColorStop(0.4825, '#8FE2E3');
gradient.addColorStop(1, '#FFFFFF');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [{
      label: 'Sales',
      data: [2200, 3000, 1500, 2500, 4000, 3200, 3500, 2700, 3100, 2800, 2300, 3700],
      borderColor: '#1A7A5E',
      backgroundColor: gradient, // Use the gradient here
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#047857',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: { 
      legend: { display: false } 
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5000,
        ticks: {
          stepSize: 1000,
          callback: function(value) {
            return value >= 1000 ? (value / 1000) + 'k' : value;
          }
        }
      }
    }
  }
});

//Pagination //

  const rows = document.querySelectorAll('.docTable tbody tr');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageBtns = document.querySelectorAll('.page-btn');

  const rowsPerPage = 3;
  let currentPage = 1;
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // Initialize
  showPage(currentPage);
  updatePaginationButtons();

  function showPage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.forEach((row, index) => {
      row.style.display = (index >= start && index < end) ? '' : 'none';
    });

    // Update active page button styles
    pageBtns.forEach(btn => {
      const btnPage = parseInt(btn.dataset.page);
      if (btnPage === page) {
        btn.classList.remove('bg-gray-100', 'text-black', 'border-gray-300');
        btn.classList.add('bg-sea-green-dark', 'text-white', 'border-sea-green-dark');
      } else {
        btn.classList.remove('bg-sea-green-dark', 'text-white', 'border-sea-green-dark');
        btn.classList.add('bg-gray-100', 'text-black', 'border-gray-300');
      }
    });

    currentPage = page;
    updatePaginationButtons();
  }

  function updatePaginationButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  // Event listeners
  pageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showPage(parseInt(btn.dataset.page));
    });
  });

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      showPage(currentPage + 1);
    }
  });
});

