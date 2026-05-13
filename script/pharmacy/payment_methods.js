document.addEventListener("DOMContentLoaded", function () {
    const cardsPerPage = 3;
    let currentPage = 1;

    const cards = document.querySelectorAll('.payment-card');
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    function showPage(page) {
        // Show only cards for the current page
        cards.forEach((card, index) => {
            card.style.display =
                index >= (page - 1) * cardsPerPage && index < page * cardsPerPage
                    ? "flex"
                    : "none";
        });

        // Style pagination buttons
        document.querySelectorAll(".page-btn").forEach((btn) => {
            btn.classList.remove("bg-sea-green-dark", "text-white", "bg-gray-200", "text-black");

            if (parseInt(btn.dataset.page) === page) {
                btn.classList.add("bg-sea-green-dark", "text-white"); // active
            } else {
                btn.classList.add("bg-gray-200", "text-black"); // inactive
            }
        });
    }

    document.querySelector(".prev-page").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.querySelector(".next-page").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    document.querySelectorAll(".page-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            currentPage = parseInt(btn.dataset.page);
            showPage(currentPage);
        });
    });

    // Initial load
    showPage(currentPage);
});

//Add new payment popup
  const modal = document.querySelector(".payment-modal");
const openBtns = document.querySelectorAll(".open-modal");
const closeBtns = document.querySelectorAll(".close-modal");
const saveBtn = document.querySelector(".save-modal");

// Open modal
openBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
});

// Close modal
closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});

// Close modal when clicking outside content
modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("payment-modal")) {
    modal.classList.add("hidden");
  }
});

// ✅ Save button => close modal + trigger toast
saveBtn.addEventListener("click", () => {
  modal.classList.add("hidden"); // close popup
  showToast("Saved successfully!"); // call toast function
});

// ✅ Toast function (3s display)
function showToast(message) {
  const $toast = $(".toast");
  $toast.text(message).removeClass("hidden").hide().fadeIn(300);

  setTimeout(() => {
    $toast.fadeOut(300, function () {
      $toast.addClass("hidden");
    });
  }, 3000); // stays for 3 seconds
}

//Edit delete functionality of Payment Cards

  const paymentCards = document.querySelectorAll(".payment-card");

  paymentCards.forEach(card => {
    let isEditing = false; // now scoped per card

    const editBtn = card.querySelector(".edit-btn");
    const deleteBtn = card.querySelector(".delete-btn");
    const title = card.querySelector(".card-title");
    const subtitle = card.querySelector(".card-subtitle");

    // ✏️ Edit functionality
    editBtn.addEventListener("click", () => {
      if (!isEditing) {
        // Enable editing
        title.contentEditable = true;
        subtitle.contentEditable = true;

        title.classList.add("outline-none", "ring-1", "ring-emerald-400", "rounded");
        subtitle.classList.add("outline-none", "ring-1", "ring-emerald-400", "rounded");

        title.focus();

        // Change icon to check
        editBtn.setAttribute("data-lucide", "check");
        lucide.createIcons();
        isEditing = true;
      } else {
        // Disable editing
        title.contentEditable = false;
        subtitle.contentEditable = false;

        title.classList.remove("ring-1", "ring-emerald-400");
        subtitle.classList.remove("ring-1", "ring-emerald-400");

        // Restore pencil icon
        editBtn.setAttribute("data-lucide", "pencil");
        lucide.createIcons();
        isEditing = false;
      }
    });

    // 🗑️ Delete functionality
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // stop bubbling issues
      card.remove(); // remove that card
    });
  });




