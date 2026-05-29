 lucide.createIcons();
let allNotifications = [
    {
        id: "order1",
        type: "order",
        read: false,
        title: "Received Order",
        message: "Thank you! Your order #546567 has been placed successfully.",
        timestamp: "1 min ago",
        iconBg: "bg-cyan-100",
        iconSvg: '<svg class="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    },
    {
        id: "pharm_main",
        type: "bidding",
        read: false,
        pharmacyName: "Pharmacy",
        rating: 4.3,
        distance: "6km away",
        offerNumber: "13332512",
        timeLeft: "4 hours",
        iconBg: "bg-teal-950",
        iconSvg: '<svg class="w-6 h-6 text-emerald-400 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>'
    },
    
    {
        id: "offer_discount",
        type: "offer",
        read: false,
        title: "Discount Offer",
        message: "Hurry! Get up to 50% off on selected items. Shop now!",
        timestamp: "1 min ago",
        iconBg: "bg-emerald-100",
        iconSvg: '<svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    },
    {
        id: "offer_seasonal",
        type: "offer",
        read: false,
        title: "Seasonal Sale",
        message: "Our Sale is Live! Grab your favorite deals before they're gone!",
        timestamp: "1 min ago",
        iconBg: "bg-amber-100",
        iconSvg: '<svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    },
    {
        id: "offer_cart",
        type: "offer",
        read: false,
        title: "Cart Reminder",
        message: "Your cart is waiting! Grab your favorite deals before they're gone!",
        timestamp: "1 min ago",
        iconBg: "bg-rose-100",
        iconSvg: '<svg class="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    }
];

// 5 identical copy-pasted cards exclusively inside the bidding filter array
let biddingNotifications = [
    {
        id: "pharm_bid_1",
        type: "bidding",
        read: false,
        pharmacyName: "Pharmacy",
        rating: 4.3,
        distance: "6km away",
        offerNumber: "13332512",
        timeLeft: "4 hours",
        iconBg: "bg-teal-950",
        iconSvg: '<svg class="w-6 h-6 text-emerald-400 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>'
    },
    {
        id: "pharm_bid_2",
        type: "bidding",
        read: false,
        pharmacyName: "Pharmacy",
        rating: 4.3,
        distance: "6km away",
        offerNumber: "13332512",
        timeLeft: "4 hours",
        iconBg: "bg-teal-950",
        iconSvg: '<svg class="w-6 h-6 text-emerald-400 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>'
    },
    {
        id: "pharm_bid_3",
        type: "bidding",
        read: false,
        pharmacyName: "Pharmacy",
        rating: 4.3,
        distance: "6km away",
        offerNumber: "13332512",
        timeLeft: "4 hours",
        iconBg: "bg-teal-950",
        iconSvg: '<svg class="w-6 h-6 text-emerald-400 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>'
    },
    {
        id: "pharm_bid_4",
        type: "bidding",
        read: false,
        pharmacyName: "Pharmacy",
        rating: 4.3,
        distance: "6km away",
        offerNumber: "13332512",
        timeLeft: "4 hours",
        iconBg: "bg-teal-950",
        iconSvg: '<svg class="w-6 h-6 text-emerald-400 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>'
    },
    {
        id: "pharm_bid_5",
        type: "bidding",
        read: false,
        pharmacyName: "Pharmacy",
        rating: 4.3,
        distance: "6km away",
        offerNumber: "13332512",
        timeLeft: "4 hours",
        iconBg: "bg-teal-950",
        iconSvg: '<svg class="w-6 h-6 text-emerald-400 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>'
    }
];

        let currentFilter = "all";
        let targetedNotifId = null;

        function renderStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalf = (rating % 1) >= 0.3 && (rating % 1) <= 0.7;
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) {
                    starsHtml += '<svg class="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
                } else if (i === fullStars + 1 && hasHalf) {
                    starsHtml += '<svg class="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
                } else {
                    starsHtml += '<svg class="w-3.5 h-3.5 fill-none stroke-current text-gray-300" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
                }
            }
           return `<div class="flex items-center gap-0.5">${starsHtml}</div>`;
        }

        function renderCard(notif) {
            const isUnread = !notif.read;
            const cardBg = isUnread ? "bg-light-green-b border-teal-100" : "bg-white border-gray-light3";
            
            if (notif.type === "order") {
                return `
                    <div class="notification-card flex items-start justify-between gap-4 p-4 rounded-xl ${cardBg} border transition hover:shadow-sm relative" data-id="${notif.id}">
                        <div class="flex items-start gap-4 flex-grow">
                           <div class="flex-shrink-0 w-10 h-10 rounded-full ${notif.iconBg} flex items-center justify-center">
    <img 
        src="/assets/img/ic_info.svg" 
        alt="Info"
        class="w-5 h-5 object-contain"
    >
</div>
                            <div>
                                <h3 class="font-semibold text-gray-900 text-sm md:text-base">${notif.title}</h3>
                                <p class="text-xs md:text-sm text-gray-600 mt-1">${notif.message}</p>
                                <span class="text-xs text-gray-400 block mt-2">${notif.timestamp}</span>
                            </div>
                        </div>
                        <button class="three-dots-btn p-1 text-gray-400 hover:text-gray-600 transition focus:outline-none pt-0.5" data-id="${notif.id}">
                            <i class="fas fa-ellipsis-v text-sm"></i>
                        </button>
                    </div>
                `;
            } else if (notif.type === "bidding") {
                return `
                    <div class="notification-card flex flex-col md:flex-row md:items-start justify-between gap-3 p-4 rounded-xl ${cardBg} border transition hover:shadow-sm relative" data-id="${notif.id}">
                        <div class="flex items-start gap-3 flex-grow">
                        <div class="flex flex-col items-center">
    
    <div class="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-white">
        <img 
            src="/assets/img/Avatar_placeholder.svg" 
            alt="Pharmacy"
            class="w-full h-full object-cover"
        >
    </div>

    <span class="text-xs text-gray-dark-1 mt-1">
        ${notif.distance}
    </span>

</div>
                            <div>
                               <div class="flex items-center gap-2 flex-wrap">
    <h3 class="font-semibold text-gray text-base">${notif.pharmacyName}</h3>

    <img 
        src="/assets/img/Frame 1321315881.svg" 
        alt="Quick Delivery"
        class="h-5 object-contain"
    >
</div>
                             <div class="flex items-center gap-1 mt-1 text-gray-dark-1">
    <span class="text-xs font-semibold">${notif.rating}
        </span>
    ${renderStars(notif.rating)}
</div>
                               
                            </div>
                        </div>
                    <div class="flex items-start justify-end gap-2 w-full md:w-auto mt-2 md:mt-0">
    <div class="flex flex-col items-end gap-1.5">
        <div class="flex items-start gap-4">
            <div class="text-right">
                <span class="text-[11px] text-gray-500 font-medium tracking-wide">Offer for Order</span>
                <span class="text-xs font-semibold text-gray-800 block -mt-0.5">no. ${notif.offerNumber}</span>
            </div>
            <button class="text-gray-600 hover:text-gray-900 transition focus:outline-none pt-0.5">
                <i class="fas fa-chevron-down text-sm"></i>
            </button>
        </div>
        
        <div class="pharmacy-time pr-8">
            <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-xs text-gray-500 font-medium">${notif.timeLeft}</span>
        </div>
    </div>
</div>
                    </div>
                `;
            } else {
                return `
                    <div class="notification-card flex items-start justify-between gap-4 p-4 rounded-xl ${cardBg} border transition hover:shadow-sm relative" data-id="${notif.id}">
                        <div class="flex items-start gap-4 flex-grow">
                          <div class="flex-shrink-0 w-10 h-10 rounded-full ${notif.iconBg} flex items-center justify-center">
    ${
        notif.id === "offer_discount"
        ? `<img src="/assets/img/ic_info-green.svg" alt="Discount" class="w-5 h-5 object-contain">`

        : notif.id === "offer_seasonal"
        ? `<img src="/assets/img/ic_info-yellow.svg" alt="Seasonal" class="w-5 h-5 object-contain">`

        : notif.id === "offer_cart"
        ? `<img src="/assets/img/ic_info-red.svg" alt="Cart" class="w-5 h-5 object-contain">`

        : notif.iconSvg
    }
</div>
                            <div>
                                <h3 class="font-semibold text-gray-900 text-sm md:text-base">${notif.title}</h3>
                                <p class="text-xs md:text-sm text-gray-600 mt-1">${notif.message}</p>
                                <span class="text-xs text-gray-400 block mt-2">${notif.timestamp}</span>
                            </div>
                        </div>
                        <button class="three-dots-btn p-1 text-gray-400 hover:text-gray-600 transition focus:outline-none pt-0.5" data-id="${notif.id}">
                            <i class="fas fa-ellipsis-v text-sm"></i>
                        </button>
                    </div>
                `;
            }
        }

        function findNotificationById(id) {
            let item = allNotifications.find(n => n.id === id);
            if (!item) item = biddingNotifications.find(n => n.id === id);
            return item;
        }

        function deleteNotificationById(id) {
            allNotifications = allNotifications.filter(n => n.id !== id);
            biddingNotifications = biddingNotifications.filter(n => n.id !== id);
        }

        function getCurrentNotifications() {
            if (currentFilter === 'all') return allNotifications;
            if (currentFilter === 'bidding') return biddingNotifications;
            if (currentFilter === 'unread') {
                const combined = [...allNotifications, ...biddingNotifications];
                return combined.filter(n => !n.read);
            }
            return [];
        }

        function renderNotifications() {
            const container = document.getElementById('notification-feed');
            let items = getCurrentNotifications();
            if (items.length === 0) {
                container.innerHTML = `<div class="text-center py-12 bg-white rounded-xl border"><i class="fas fa-bell-slash text-gray-300 text-4xl mb-2"></i><p class="text-gray-500">No notifications</p></div>`;
                return;
            }
            container.innerHTML = items.map(notif => renderCard(notif)).join('');
            attachThreeDotListeners();
        }

        function attachThreeDotListeners() {
            const buttons = document.querySelectorAll('.three-dots-btn');
            const popup = document.getElementById('action-popup');
            const readIcon = document.getElementById('popup-read-icon');
            const readText = document.getElementById('popup-read-text');

            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    const id = btn.getAttribute('data-id');
                    targetedNotifId = id;
                    const item = findNotificationById(id);

                    if (!item) return;

                    if (item.read) {
                        readIcon.innerHTML = '<i class="fas fa-times text-gray-500 text-sm"></i>';
                        readText.innerText = "Mark as Unread";
                    } else {
                        readIcon.innerHTML = '<i class="fas fa-check-double text-gray-500 text-xs"></i>';
                        readText.innerText = "Mark as read";
                    }

                    const rect = btn.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                    popup.style.top = `${rect.bottom + scrollTop + 6}px`;
                    popup.style.left = `${rect.left + scrollLeft - 140}px`; 

                    popup.classList.remove('hidden');
                });
            });
        }

        function initPopupActions() {
            const popup = document.getElementById('action-popup');
            
            document.getElementById('popup-toggle-read-btn').addEventListener('click', () => {
                if (!targetedNotifId) return;
                const item = findNotificationById(targetedNotifId);
                if (item) {
                    item.read = !item.read;
                    renderNotifications();
                }
                popup.classList.add('hidden');
            });

            document.getElementById('popup-delete-btn').addEventListener('click', () => {
                if (!targetedNotifId) return;
                deleteNotificationById(targetedNotifId);
                renderNotifications();
                popup.classList.add('hidden');
            });

            window.addEventListener('click', () => {
                popup.classList.add('hidden');
            });
        }

        function updateTabStyles() {
            const tabs = document.querySelectorAll('.filter-tab-btn');
            tabs.forEach(btn => {
                const filterValue = btn.getAttribute('data-filter');
                if (filterValue === currentFilter) {
                    btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-300', 'hover:bg-gray-50');
                    btn.classList.add('bg-teal-800', 'text-white', 'border-teal-800');
                } else {
                    btn.classList.remove('bg-teal-800', 'text-white', 'border-teal-800');
                    btn.classList.add('bg-white', 'text-gray-600', 'border-gray-300', 'hover:bg-gray-50');
                }
            });
        }

        function initTabs() {
            const tabs = document.querySelectorAll('.filter-tab-btn');
            tabs.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.getAttribute('data-filter');
                    if (filter === currentFilter) return;
                    currentFilter = filter;
                    renderNotifications();
                    updateTabStyles();
                });
            });
        }

        renderNotifications();
        initTabs();
        updateTabStyles();
        initPopupActions();