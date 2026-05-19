 
        const tabs = document.querySelectorAll('.tab-btn');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove the active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add the active class to the clicked tab
        tab.classList.add('active');
        
    });
}); 
        // Rich dataset with categories: Doctor, Pharmacy, Hospital, Labs
        const ordersDataset = [
            { id: "10023", agendaName: "General Consultation", datetime: "28/04/2025 - 09:30 AM", price: "₹850", status: "Successful", category: "Doctor" },
            { id: "10024", agendaName: "Medicine Delivery", datetime: "28/04/2025 - 11:15 AM", price: "₹420", status: "Successful", category: "Pharmacy" },
            { id: "10025", agendaName: "MRI Scan", datetime: "27/04/2025 - 02:00 PM", price: "₹3200", status: "Ongoing", category: "Labs" },
            { id: "10026", agendaName: "Physiotherapy", datetime: "27/04/2025 - 04:30 PM", price: "₹1250", status: "Successful", category: "Hospital" },
            { id: "10027", agendaName: "Cardio Checkup", datetime: "26/04/2025 - 10:00 AM", price: "₹2100", status: "Ongoing", category: "Doctor" },
            { id: "10028", agendaName: "Blood Test", datetime: "26/04/2025 - 08:00 AM", price: "₹550", status: "Successful", category: "Labs" },
            { id: "10029", agendaName: "Emergency Medicine", datetime: "25/04/2025 - 07:20 PM", price: "₹780", status: "Successful", category: "Pharmacy" },
            { id: "10030", agendaName: "Orthopedic Visit", datetime: "25/04/2025 - 12:00 PM", price: "₹1500", status: "Successful", category: "Hospital" },
            { id: "10031", agendaName: "Dermatology", datetime: "24/04/2025 - 03:30 PM", price: "₹1100", status: "Ongoing", category: "Doctor" },
            { id: "10032", agendaName: "X-Ray Imaging", datetime: "24/04/2025 - 01:45 PM", price: "₹890", status: "Successful", category: "Labs" },
            { id: "10033", agendaName: "Prescription Meds", datetime: "23/04/2025 - 10:15 AM", price: "₹320", status: "Successful", category: "Pharmacy" },
            { id: "10034", agendaName: "Maternity Care", datetime: "23/04/2025 - 05:00 PM", price: "₹2450", status: "Ongoing", category: "Hospital" },
            { id: "10035", agendaName: "Neurology Consult", datetime: "22/04/2025 - 09:00 AM", price: "₹1950", status: "Successful", category: "Doctor" },
            { id: "10036", agendaName: "Home Healthcare", datetime: "22/04/2025 - 02:30 PM", price: "₹1800", status: "Successful", category: "Hospital" },
            { id: "10037", agendaName: "Covid Test", datetime: "21/04/2025 - 11:20 AM", price: "₹500", status: "Successful", category: "Labs" },
            { id: "10038", agendaName: "Vitamins Supply", datetime: "21/04/2025 - 04:00 PM", price: "₹290", status: "Ongoing", category: "Pharmacy" }
        ];

        // State management
        let currentCategory = "all";    // 'all', 'Doctor', 'Pharmacy', 'Hospital', 'Labs'
        let currentPage = 1;
        const rowsPerPage = 5;
        let searchKeyword = "";          // additional search (by agenda name or order id)
        
        // DOM elements
        const ordersContainer = document.getElementById("ordersListContainer");
        const paginationWrapper = document.getElementById("paginationWrapper");
        const searchInput = document.getElementById("searchInput");
        
        // Helper: get filtered orders based on category + search
        function getFilteredOrders() {
            let filtered = [...ordersDataset];
            if (currentCategory !== "all") {
                filtered = filtered.filter(order => order.category === currentCategory);
            }
            if (searchKeyword.trim() !== "") {
                const kw = searchKeyword.trim().toLowerCase();
                filtered = filtered.filter(order => order.agendaName.toLowerCase().includes(kw) || order.id.includes(kw));
            }
            return filtered;
        }
        
        // Render current page rows
        function renderOrders() {
            const filtered = getFilteredOrders();
            const totalPages = Math.ceil(filtered.length / rowsPerPage);
            if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
            if (currentPage < 1) currentPage = 1;
            const startIdx = (currentPage - 1) * rowsPerPage;
            const paginatedOrders = filtered.slice(startIdx, startIdx + rowsPerPage);
            
            if (paginatedOrders.length === 0) {
                ordersContainer.innerHTML = `<div class="text-center py-12 text-gray-500 text-base">No orders found for this category</div>`;
                return;
            }
            
            let rowsHtml = "";
            paginatedOrders.forEach(order => {
                const statusClass = order.status === "Ongoing" ? "bg-[#F79E1B78] text-[#6F4E01]" : "bg-[#CAF8E4] text-[#088178]";
                rowsHtml += `
                    <div class="order-row grid grid-cols-5 items-center py-6 text-sm">
                        <div class="text-center font-medium text-gray-600" data-label="Order ID">${order.id}</div>
                        <div class="flex items-center justify-center gap-3" data-label="Agenda’s">
                            <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center"><div class="w-2.5 h-2.5 rounded-full bg-green-500"></div></div>
                            <div class="text-left"><p class="text-gray-900 text-[#191919] font-semibold text-sm">${order.agendaName}</p><p class="font-['Nunito'] font-normal text-[12px] leading-[120%] text-[#5A6A72]">${order.datetime}</p></div>
                        </div>
                        <div class="text-center text-[#007d73] font-semibold text-base" data-label="Price">${order.price}</div>
                        <div class="text-center" data-label="Status"><span class="${statusClass} text-sm px-8 py-2.5 rounded-lg font-semibold inline-block">${order.status}</span></div>
                        <div class="text-center" data-label="Actions"><button class="text-[#007d73] font-semibold hover:underline view-details-btn" data-id="${order.id}">View Details</button></div>
                    </div>
                `;
            });
            ordersContainer.innerHTML = rowsHtml;
            
            // attach view details event listeners (just simulation)
            document.querySelectorAll('.view-details-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    alert(`Order details for ID ${btn.getAttribute('data-id')} — (demo) More info will appear soon.`);
                });
            });
        }
        
        // separate pagination generator (1,2,3, previous, next)
        function renderPagination() {
            const filtered = getFilteredOrders();
            const totalPages = Math.ceil(filtered.length / rowsPerPage);
            if (totalPages <= 1 && filtered.length > 0) {
                paginationWrapper.innerHTML = `<div class="flex gap-3"><span class="text-gray-400 text-sm">Page 1 of 1</span></div>`;
                return;
            } else if (filtered.length === 0) {
                paginationWrapper.innerHTML = ``;
                return;
            }
            
            let paginationHtml = `<button class="prev-page text-gray-500 font-medium hover:text-teal-700 px-3 py-1 rounded transition">Previous</button>`;
            for (let i = 1; i <= totalPages; i++) {
                const activeClass = (i === currentPage) ? 'pagination-btn-active bg-[#088178] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
                paginationHtml += `<button class="page-num w-9 h-9 rounded font-bold flex items-center justify-center transition-smooth ${activeClass}" data-page="${i}">${i}</button>`;
            }
            paginationHtml += `<button class="next-page text-gray-500 font-medium hover:text-teal-700 px-3 py-1 rounded transition">Next</button>`;
            paginationWrapper.innerHTML = paginationHtml;
            
            // attach events
            const prevBtn = paginationWrapper.querySelector('.prev-page');
            const nextBtn = paginationWrapper.querySelector('.next-page');
            const pageBtns = paginationWrapper.querySelectorAll('.page-num');
            
            if (prevBtn) prevBtn.addEventListener('click', () => {
                if (currentPage > 1) { currentPage--; renderOrders(); renderPagination(); }
            });
            if (nextBtn) nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) { currentPage++; renderOrders(); renderPagination(); }
            });
            pageBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const page = parseInt(btn.getAttribute('data-page'));
                    if (!isNaN(page) && page !== currentPage) {
                        currentPage = page;
                        renderOrders();
                        renderPagination();
                    }
                });
            });
        }
        
        // Update active tab style and re-trigger pagination reset
        function setActiveTab(category) {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                const btnCat = btn.getAttribute('data-category');
                if (btnCat === category) {
                    btn.classList.add('tab-btn-active', 'bg-[#1A7A5E]', 'text-white');
                    btn.classList.remove('bg-white', 'text-gray-600', 'border-[#000000]');
                } else {
                    btn.classList.remove('tab-btn-active', 'bg-[#1A7A5E]', 'text-white');
                    btn.classList.add('bg-white', 'text-gray-600', 'border', 'border-[#000000]');
                }
            });
        }
        
        // switch category and reset page
        function switchCategory(category) {
            currentCategory = category;
            currentPage = 1;
            setActiveTab(category);
            renderOrders();
            renderPagination();
        }
        
        // Search debouncer (for better UX)
        let searchDebounce;
        function onSearchInput() {
            if (searchDebounce) clearTimeout(searchDebounce);
            searchDebounce = setTimeout(() => {
                searchKeyword = searchInput.value;
                currentPage = 1;
                renderOrders();
                renderPagination();
            }, 300);
        }
        
        // Initialize tabs and event listeners
        function initTabsAndPagination() {
            // attach tab buttons
            const tabButtons = document.querySelectorAll('.tab-btn');
            tabButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const category = btn.getAttribute('data-category');
                    if (category === 'all') switchCategory('all');
                    else if (category === 'Doctor') switchCategory('Doctor');
                    else if (category === 'Pharmacy') switchCategory('Pharmacy');
                    else if (category === 'Hospital') switchCategory('Hospital');
                    else if (category === 'Labs') switchCategory('Labs');
                });
            });
            // initially set "All" as active
            setActiveTab('all');
            currentCategory = 'all';
            currentPage = 1;
            searchKeyword = "";
            if (searchInput) searchInput.value = "";
            renderOrders();
            renderPagination();
            // search event
            if (searchInput) searchInput.addEventListener('input', onSearchInput);
        }
        
        // Mobile menu toggle
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                mobileMenu.classList.toggle('mobile-nav-open');
            });
        }
        
        // Wait for DOM fully loaded, then init orders module
        document.addEventListener('DOMContentLoaded', () => {
            initTabsAndPagination();
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
        
        // Additional fix for dynamic row responsiveness: ensure data-label stays consistent
        // Also manually handle ongoing/successful icons
    

        