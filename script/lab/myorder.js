 // ========== DATASET (unchanged) ==========
        const baseOrders = [
            { id: "10023", agendaName: "General Consultation", datetime: "28/04/2025 - 09:30 AM", price: "₹850", status: "Successful", category: "Doctor" },
            { id: "10024", agendaName: "Medicine Delivery", datetime: "28/04/2025 - 11:15 AM", price: "₹420", status: "Successful", category: "Pharmacy" },
            { id: "65555", agendaName: "Lab", datetime: "27/04/2025 - 04:00 PM", price: "₹750", status: "Ongoing", category: "Labs" },
            { id: "10026", agendaName: "Physiotherapy", datetime: "27/04/2025 - 04:30 PM", price: "₹1250", status: "Successful", category: "Hospital" },
            { id: "10027", agendaName: "Cardio Checkup", datetime: "26/04/2025 - 10:00 AM", price: "₹2100", status: "Ongoing", category: "Doctor" },
            { id: "65556", agendaName: "Blood Test", datetime: "26/04/2025 - 04:00 AM", price: "₹750", status: "Successful", category: "Labs" },
            { id: "10029", agendaName: "Emergency Medicine", datetime: "25/04/2025 - 07:20 PM", price: "₹780", status: "Successful", category: "Pharmacy" },
            { id: "10030", agendaName: "Orthopedic Visit", datetime: "25/04/2025 - 12:00 PM", price: "₹1500", status: "Successful", category: "Hospital" },
            { id: "10031", agendaName: "Dermatology", datetime: "24/04/2025 - 03:30 PM", price: "₹1100", status: "Ongoing", category: "Doctor" },
            { id: "65557", agendaName: "Lab", datetime: "24/04/2025 - 04:00 PM", price: "₹750", status: "Successful", category: "Labs" },
            { id: "10033", agendaName: "Prescription Meds", datetime: "23/04/2025 - 10:15 AM", price: "₹320", status: "Successful", category: "Pharmacy" },
            { id: "10034", agendaName: "Maternity Care", datetime: "23/04/2025 - 05:00 PM", price: "₹2450", status: "Ongoing", category: "Hospital" },
            { id: "10035", agendaName: "Neurology Consult", datetime: "22/04/2025 - 09:00 AM", price: "₹1950", status: "Successful", category: "Doctor" },
            { id: "10036", agendaName: "Home Healthcare", datetime: "22/04/2025 - 02:30 PM", price: "₹1800", status: "Successful", category: "Hospital" },
            { id: "65558", agendaName: "Lab", datetime: "21/04/2025 - 04:00 AM", price: "₹750", status: "Successful", category: "Labs" },
            { id: "10038", agendaName: "Vitamins Supply", datetime: "21/04/2025 - 04:00 PM", price: "₹290", status: "Ongoing", category: "Pharmacy" }
        ];

        function generateExtraItems(category, currentCount, startIdOffset) {
            const needed = 20 - currentCount;
            const extra = [];
            const agendaMap = {
                Doctor: ["Routine Checkup", "ENT Specialist", "Psychiatrist Consult", "Pulmonology Visit", "Gastroenterology", "Ortho Follow-up", "Vaccination Drive", "Wellness Exam", "Pediatric Check", "Cardiac Stress Test", "Thyroid Consultation", "Sleep Study Review", "Dermatology Follow-up", "Neurology Review", "Immunotherapy", "Pain Management"],
                Pharmacy: ["Pain Relief Tablets", "Antibiotic Course", "Insulin Pens", "Multivitamin Pack", "Cough Syrup", "Nasal Spray", "Antihistamines", "Calcium Supplements", "Digestive Enzymes", "First Aid Kit", "BP Monitor Device", "Diabetes Care Pack", "Fever Reducer", "Antifungal Cream", "Eye Drops", "Probiotics"],
                Hospital: ["ICU Admission", "Daycare Surgery", "Physical Rehab", "Neonatal Care", "Emergency Trauma", "Cardiac Rehab", "Maternity Discharge", "Burn Unit Care", "Stroke Recovery", "Post-Op Care", "Dialysis Session", "Chemotherapy", "Radiotherapy", "Plastic Surgery", "Pain Clinic", "General Ward Stay"],
                Labs: ["Vitamin Profile", "Iron Deficiency Test", "Allergy Panel", "Hormone Test", "Genetic Screening", "Pap Smear", "PSA Test", "Urine Culture", "Stool Test", "PCR Swab", "ECG Monitoring", "Echo Test", "Liver Function", "Kidney Function", "Bone Density", "HbA1c Test"]
            };
            const statusOptions = ["Successful", "Ongoing"];
            let idCounter = startIdOffset;
            for (let i = 0; i < needed; i++) {
                const agendaList = agendaMap[category] || ["Standard Service"];
                const agenda = agendaList[i % agendaList.length] + " " + (i + 1);
                const randomPrice = Math.floor(Math.random() * (4500 - 250 + 1) + 250);
                const priceFormatted = `₹${randomPrice}`;
                const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
                const day = 10 + (i % 18);
                const hour = 8 + (i % 12);
                const minute = i % 60;
                const datetime = `${day}/05/2025 - ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
                extra.push({ id: `${idCounter++}`, agendaName: agenda, datetime: datetime, price: priceFormatted, status: randomStatus, category: category });
            }
            return { items: extra };
        }

        let doctorItems = baseOrders.filter(o => o.category === "Doctor");
        let pharmacyItems = baseOrders.filter(o => o.category === "Pharmacy");
        let hospitalItems = baseOrders.filter(o => o.category === "Hospital");
        let labsItems = baseOrders.filter(o => o.category === "Labs");

        let doctorExtra = generateExtraItems("Doctor", doctorItems.length, 20001);
        let pharmacyExtra = generateExtraItems("Pharmacy", pharmacyItems.length, 21001);
        let hospitalExtra = generateExtraItems("Hospital", hospitalItems.length, 22001);
        let labsExtra = generateExtraItems("Labs", labsItems.length, 23001);

        const fullOrdersDataset = [
            ...doctorItems, ...doctorExtra.items,
            ...pharmacyItems, ...pharmacyExtra.items,
            ...hospitalItems, ...hospitalExtra.items,
            ...labsItems, ...labsExtra.items
        ];

        let currentCategory = "all";
        let currentPage = 1;
        const rowsPerPage = 5;
        let searchKeyword = "";

        const ordersContainer = document.getElementById("ordersListContainer");
        const paginationWrapper = document.getElementById("paginationWrapper");
        const searchInput = document.getElementById("searchInput");

        function getFilteredOrders() {
            let filtered = [...fullOrdersDataset];
            if (currentCategory !== "all") filtered = filtered.filter(order => order.category === currentCategory);
            if (searchKeyword.trim() !== "") {
                const kw = searchKeyword.trim().toLowerCase();
                filtered = filtered.filter(order => order.agendaName.toLowerCase().includes(kw) || order.id.includes(kw));
            }
            return filtered;
        }

        function getCategoryIconHtml(category) {
            if (category === "Labs") {
                return `<div class="w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#FFE5EC] flex items-center justify-center flex-shrink-0"><img src="/assets/img/Shape.png" class="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" alt="Lab Icon" onerror="this.src='https://placehold.co/28x28?text=i'"></div>`;
            } else {
                return `<div class="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0"><div class="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500"></div></div>`;
            }
        }

        function renderOrders() {
            const filtered = getFilteredOrders();
            const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
            if (currentPage > totalPages) currentPage = totalPages;
            if (currentPage < 1) currentPage = 1;
            const startIdx = (currentPage - 1) * rowsPerPage;
            const paginatedOrders = filtered.slice(startIdx, startIdx + rowsPerPage);

            if (paginatedOrders.length === 0) {
                ordersContainer.innerHTML = `<div class="text-center py-12 text-gray-500 text-base">No orders found for this category</div>`;
                return;
            }

            let rowsHtml = "";
            paginatedOrders.forEach(order => {
                const statusClass = order.status === "Ongoing" ? "status-ongoing" : "status-success";
                const iconHtml = getCategoryIconHtml(order.category);
                rowsHtml += `
                <div class="order-row grid grid-cols-5 items-center py-3 md:py-6 text-xs md:text-sm border-b border-gray-100">
                    <div class="text-center font-medium text-gray-600">${order.id}</div>
                    <div class="flex items-center justify-start pl-4 md:pl-12 gap-2 md:gap-4">
                        ${iconHtml}
                        <div class="text-left">
                            <p class="text-gray-900 font-semibold text-xs md:text-sm">${escapeHtml(order.agendaName)}</p>
                            <p class="font-normal text-[10px] md:text-[12px] text-[#5A6A72]">${order.datetime}</p>
                        </div>
                    </div>
                    <div class="text-center text-[#007d73] font-semibold text-sm md:text-base">${order.price}</div>
                    <div class="text-center"><span class="status-badge ${statusClass}">${order.status}</span></div>
                    <div class="text-center"><button class="text-[#007d73] font-semibold hover:underline text-xs md:text-sm view-details-btn" data-id="${order.id}">View Details</button></div>
                </div>
            `;
            });
            ordersContainer.innerHTML = rowsHtml;
            document.querySelectorAll('.view-details-btn').forEach(btn => {
                btn.addEventListener('click', (e) => alert(`Order details for ID ${btn.getAttribute('data-id')} — (demo)`));
            });
        }

        function escapeHtml(str) { return str.replace(/[&<>]/g, function (m) { if (m === '&') return '&amp;'; if (m === '<') return '&lt;'; if (m === '>') return '&gt;'; return m; }); }

        function renderPagination() {
            const filtered = getFilteredOrders();
            const totalPages = Math.ceil(filtered.length / rowsPerPage);
            if (totalPages <= 1 && filtered.length > 0) {
                paginationWrapper.innerHTML = `<div class="text-gray-400 text-xs md:text-sm">Page 1 of 1</div>`;
                return;
            } else if (filtered.length === 0) {
                paginationWrapper.innerHTML = ``;
                return;
            }
            let paginationHtml = `<button class="prev-page text-gray-500 font-medium hover:text-teal-700 px-2 md:px-3 py-1 rounded transition text-sm">Previous</button>`;
            for (let i = 1; i <= totalPages; i++) {
                const activeClass = (i === currentPage) ? 'active-page' : '';
                paginationHtml += `<button class="page-num ${activeClass} text-sm" data-page="${i}">${i}</button>`;
            }
            paginationHtml += `<button class="next-page text-gray-500 font-medium hover:text-teal-700 px-2 md:px-3 py-1 rounded transition text-sm">Next</button>`;
            paginationWrapper.innerHTML = paginationHtml;

            const prevBtn = paginationWrapper.querySelector('.prev-page');
            const nextBtn = paginationWrapper.querySelector('.next-page');
            const pageBtns = paginationWrapper.querySelectorAll('.page-num');
            if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderOrders(); renderPagination(); } });
            if (nextBtn) nextBtn.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; renderOrders(); renderPagination(); } });
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

        function updateActiveTab(category) {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                if (btn.getAttribute('data-category') === category) btn.classList.add('active');
                else btn.classList.remove('active');
            });
        }

        function switchCategory(category) {
            currentCategory = category;
            currentPage = 1;
            updateActiveTab(category);
            renderOrders();
            renderPagination();
        }

        let debounceTimer;
        function onSearchInput() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                searchKeyword = searchInput.value;
                currentPage = 1;
                renderOrders();
                renderPagination();
            }, 300);
        }

        function init() {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => switchCategory(btn.getAttribute('data-category')));
            });
            updateActiveTab('all');
            renderOrders();
            renderPagination();
            if (searchInput) searchInput.addEventListener('input', onSearchInput);
            const menuBtn = document.getElementById('menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            if (menuBtn && mobileMenu) menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        }

        if (typeof lucide !== 'undefined') lucide.createIcons();
        document.addEventListener('DOMContentLoaded', init);
