 // FILTER TAB TOGGLE
    const filterTabs = document.querySelectorAll(".filter-tab");

    filterTabs.forEach(tab => {
        tab.addEventListener("click", () => {

            tab.classList.toggle("active-filter");

            if (tab.classList.contains("active-filter")) {

                tab.classList.remove(
                    "bg-white",
                    "text-white"
                );

                tab.classList.add(
                    "bg-bright-green1",
                    "text-white"
                );

            } else {

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

    // WISHLIST TOGGLE
   
      document.addEventListener("click", function (e) {

        const wishlistBtn = e.target.closest(".wishlist-btn");

        if (!wishlistBtn) return;

        const icon = wishlistBtn.querySelector(".wishlist-icon");

        // Fill heart
        icon.classList.toggle("active");

        // Change only heart color
        icon.classList.toggle("text-bright-green1");
        icon.classList.toggle("text-gray-light1");

    });