  

   function switchTab(activeTabId) {
    const tabs = ['terms', 'privacy', 'disclaimer'];
    
    // 1. Get the title element from the DOM
    const titleElement = document.getElementById('dynamic-title');
    
    // 2. Define the titles exactly as shown in the original source images
    const titles = {
      'terms': 'Terms of Uses Conditions',
      'privacy': 'Privacy Policy',
      'disclaimer': 'Disclaimer'
    };
    
    // 3. Change the title text inside the HTML heading string directly
    if (titleElement && titles[activeTabId]) {
      titleElement.textContent = titles[activeTabId];
    }
    
    tabs.forEach(tab => {
      const tabBtn = document.getElementById(`tab-${tab}`);
      const contentEl = document.getElementById(`content-${tab}`);
      
      if (tab === activeTabId) {
        tabBtn.className = "px-5 py-2 text-sm font-medium rounded-full transition-colors bg-[#147A53] text-white border border-[#147A53]";
        contentEl.classList.remove('hidden');
      } else {
        tabBtn.className = "px-5 py-2 text-sm font-medium rounded-full transition-colors bg-transparent text-slate-600 border border-gray-300 hover:bg-gray-50/10";
        contentEl.classList.add('hidden');
      }
    });

    document.querySelector('.custom-scrollbar').scrollTop = 0;
  }
  
  $(function () {
            const $genderContainer = $(".edit-section .custom-select-container");

            $genderContainer.on("click", ".custom-select-input, .gender-chevron", function (e) {
                e.stopPropagation();
                $(".custom-select-menu").not($genderContainer.find(".custom-select-menu")).addClass("hidden");
                $genderContainer.find(".custom-select-menu").toggleClass("hidden");
            });

            $genderContainer.on("click", ".custom-select-option", function () {
                $genderContainer.find(".custom-select-input").val($(this).text().trim());
                $genderContainer.find(".custom-select-menu").addClass("hidden");
            });

            $(document).on("click", function (e) {
                if (!$(e.target).closest(".edit-section .custom-select-container").length) {
                    $genderContainer.find(".custom-select-menu").addClass("hidden");
                }
            });

            const $accountView = $("#account-view");
            const $editSection = $(".edit-section");

            function showEditSection() {
                $accountView.addClass("hidden");
                $editSection.removeClass("hidden");
            }

            function showAccountView() {
                $editSection.addClass("hidden");
                $accountView.removeClass("hidden");
            }

            $("#editBtn").on("click", showEditSection);

            const PROFILE_IMAGE_KEY = "myaccount_profile_image";
            const defaultProfileSrc = "/assets/img/Profile-acc.png";
            const $profileImg = $("#profile-image");
            const $profileInput = $("#profile-image-input");
            const $profileUpdateBtn = $("#profileUpdateBtn");
            let isProfileEditMode = false;
            let pendingImageDataUrl = null;
            let savedImageDataUrl = localStorage.getItem(PROFILE_IMAGE_KEY);

            if (savedImageDataUrl) {
                $profileImg.attr("src", savedImageDataUrl);
            }

            function resetProfileEditMode() {
                isProfileEditMode = false;
                pendingImageDataUrl = null;
                $profileUpdateBtn.text("Update");
                $profileInput.val("");
            }

            $profileUpdateBtn.on("click", function () {
                if (!isProfileEditMode) {
                    isProfileEditMode = true;
                    $profileUpdateBtn.text("Save");
                    $profileInput.trigger("click");
                    return;
                }

                if (pendingImageDataUrl) {
                    localStorage.setItem(PROFILE_IMAGE_KEY, pendingImageDataUrl);
                    savedImageDataUrl = pendingImageDataUrl;
                    $profileImg.attr("src", savedImageDataUrl);
                }

                resetProfileEditMode();
            });

            $profileInput.on("change", function () {
                const file = this.files && this.files[0];
                if (!file) {
                    if (!pendingImageDataUrl && !savedImageDataUrl) {
                        resetProfileEditMode();
                    }
                    return;
                }

                const reader = new FileReader();
                reader.onload = function (event) {
                    pendingImageDataUrl = event.target.result;
                    $profileImg.attr("src", pendingImageDataUrl);
                    $profileUpdateBtn.text("Save");
                    isProfileEditMode = true;
                };
                reader.readAsDataURL(file);
            });

            $("#profileRemoveBtn").on("click", function () {
                localStorage.removeItem(PROFILE_IMAGE_KEY);
                savedImageDataUrl = null;
                pendingImageDataUrl = null;
                $profileImg.attr("src", defaultProfileSrc);
                resetProfileEditMode();
            });

            $("#edit-cancel-btn").on("click", showAccountView);

            $("#edit-profile-form").on("submit", function (e) {
                e.preventDefault();
                showAccountView();
            });
        });