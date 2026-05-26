document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // FILTER TAB TOGGLE
    // =========================================================

    const filterTabs = document.querySelectorAll(".filter-tab");

    filterTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            tab.classList.toggle("active-filter");

            // ACTIVE
            if (tab.classList.contains("active-filter")) {

                tab.classList.remove(
                    "bg-white",
                    "text-snow-gray5"
                );

                tab.classList.add(
                    "bg-bright-green1",
                    "text-white"
                );

            }

            // INACTIVE
            else {

                tab.classList.remove(
                    "bg-bright-green1",
                    "text-white"
                );

                tab.classList.add(
                    "bg-white",
                    "text-snow-gray5"
                );

            }

        });

    });


    // =========================================================
    // WISHLIST TOGGLE
    // =========================================================

    document.addEventListener("click", function (e) {

        const wishlistBtn = e.target.closest(".wishlist-btn");

        if (!wishlistBtn) return;

        // STOP CARD REDIRECT
        e.preventDefault();
        e.stopPropagation();

        const icon = wishlistBtn.querySelector(".wishlist-icon");

        // HEART FILL
        icon.classList.toggle("active");

        // HEART COLOR
        icon.classList.toggle("text-bright-green1");
        icon.classList.toggle("text-gray-light1");

    });

    // =========================================================
    // SEARCH FUNCTIONALITY
    // =========================================================

    // STATIC MEDICINES
    const medicines = [
        "Dolo 650",
        "Vitamin D3",
        "Metformin",
        "Paracetamol",
        "Shelcal 500mg",
        "Oziva Plant Based Biotin"
    ];


    // RECENT SEARCH STORAGE
    let recentSearches =
        JSON.parse(localStorage.getItem("recentMedicines")) || [];


    // ELEMENTS
    const searchInput =
        document.getElementById("medicineSearch");

    const dropdown =
        document.getElementById("searchDropdown");

    const resultsContainer =
        document.getElementById("searchResults");

    const clearBtn =
        document.getElementById("clearRecentSearch");

    const micBtn =
        document.getElementById("voiceSearchBtn");


    // STOP IF ELEMENT NOT FOUND
    if (!searchInput) return;


    // =========================================================
    // SAVE RECENT SEARCH FUNCTION
    // =========================================================

    function saveRecentSearch(medicineName) {

        // REMOVE DUPLICATES
        recentSearches =
            recentSearches.filter(
                item => item !== medicineName
            );

        // ADD NEW SEARCH AT TOP
        recentSearches.unshift(medicineName);

        // LIMIT
        recentSearches =
            recentSearches.slice(0, 10);

        // SAVE LOCAL STORAGE
        localStorage.setItem(
            "recentMedicines",
            JSON.stringify(recentSearches)
        );

    }


    // =========================================================
    // RENDER RESULTS
    // =========================================================

    function renderResults(data) {

        resultsContainer.innerHTML = "";


        // NO DATA
        if (data.length === 0) {

            resultsContainer.innerHTML = `

                <div class="px-5 py-6 text-center text-sm text-[#6B7280]">

                    No medicines found

                </div>

            `;

            dropdown.classList.remove("hidden");

            return;
        }


        // LOOP ITEMS
        data.forEach(item => {

            resultsContainer.innerHTML += `

                <div
                    class="search-item flex items-center justify-between px-5 py-4 border-t border-[#F3F4F6] cursor-pointer hover:bg-[#FAFAFA]"
                    data-name="${item}">

                    <!-- LEFT -->
                    <div class="flex items-center gap-3">

                        <span class="material-symbols-outlined text-gray text-[20px]">

                           schedule

                        </span>
                       

                        <span class="text-gray text-sm font-medium">

                            ${item}

                        </span>

                    </div>

                    <!-- RIGHT -->
                    <span class="material-symbols-outlined text-gray-light1 text-[18px]">

                        chevron_right

                    </span>

                </div>

            `;

        });

        dropdown.classList.remove("hidden");

    }


    // =========================================================
    // INPUT SEARCH SUGGESTIONS
    // =========================================================

    searchInput.addEventListener("input", function () {

        const value =
            this.value.toLowerCase().trim();


        // SHOW RECENT IF EMPTY
        if (value === "") {

            renderResults(recentSearches);

            return;
        }


        // FILTER MEDICINES
        const filtered = medicines.filter(item =>
            item.toLowerCase().includes(value)
        );

        renderResults(filtered);

    });


    // =========================================================
    // ENTER SEARCH
    // =========================================================

    searchInput.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            const value =
                this.value.trim();

            if (value === "") return;


            // SAVE SEARCH
            saveRecentSearch(value);


            // REDIRECT
            window.location.href =
                `search-result-medicine.html?medicine=${encodeURIComponent(value)}`;

        }

    });


    // =========================================================
    // SHOW RECENT SEARCH ON FOCUS
    // =========================================================

    searchInput.addEventListener("focus", () => {

        renderResults(recentSearches);

    });


    // =========================================================
    // CLICK SEARCH ITEM
    // =========================================================

    document.addEventListener("click", function (e) {

        const item =
            e.target.closest(".search-item");

        if (item) {

            const medicineName =
                item.dataset.name;


            // SAVE RECENT
            saveRecentSearch(medicineName);


            // REDIRECT
            window.location.href =
                `search-result-medicine.html?medicine=${encodeURIComponent(medicineName)}`;

        }

    });


    // =========================================================
    // CLEAR RECENT SEARCH
    // =========================================================

    if (clearBtn) {

        clearBtn.addEventListener("click", () => {

            recentSearches = [];

            localStorage.removeItem(
                "recentMedicines"
            );

            renderResults([]);

        });

    }


    // =========================================================
    // CLOSE DROPDOWN
    // =========================================================

    document.addEventListener("click", function (e) {

        const wrapper =
            e.target.closest(".relative");

        if (!wrapper) {

            dropdown.classList.add("hidden");

        }

    });


    // =========================================================
    // VOICE SEARCH
    // =========================================================

    if (micBtn) {

        micBtn.addEventListener("click", () => {

            // CHECK SUPPORT
            const SpeechRecognition =
                window.SpeechRecognition ||
                window.webkitSpeechRecognition;

            if (!SpeechRecognition) {

                alert(
                    "Voice search not supported in this browser"
                );

                return;
            }


            const recognition =
                new SpeechRecognition();

            recognition.lang = "en-US";

            recognition.start();


            // RESULT
            recognition.onresult = function (event) {

                const transcript =
                    event.results[0][0].transcript;

                searchInput.value = transcript;


                // SAVE SEARCH
                saveRecentSearch(transcript);


                // FILTER RESULTS
                const filtered = medicines.filter(item =>
                    item.toLowerCase().includes(
                        transcript.toLowerCase()
                    )
                );

                renderResults(filtered);


                // REDIRECT
                setTimeout(() => {

                    window.location.href =
                        `search-result-medicine.html?medicine=${encodeURIComponent(transcript)}`;

                }, 800);

            };

        });

    }

});