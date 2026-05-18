$(document).ready(function () {
  // Show overlay when search starts
  function showSearchOverlay() {
    $("#searchingOverlay").removeClass("hidden");
  }

  // Hide overlay when doctors are found
  function hideSearchOverlay() {
    $("#searchingOverlay").addClass("hidden");
    // Invalidate after overlay is hidden so map fills space correctly
    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 100);
  }

  // Map Integration
  let map = null;

  function initMap(lat, lng) {
    if (map) {
      map.remove();
    }

    // showSearchOverlay();

    map = L.map("doctors-map").setView([lat, lng], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const userIcon = L.divIcon({
      className: "",
      html: `<div class="w-4 h-4 bg-sea-green-deep border-[3px] border-white rounded-full shadow-md"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    L.marker([lat, lng], { icon: userIcon })
      .addTo(map)
      .bindPopup("<strong>Your Location</strong>")
      .openPopup();

    // First invalidateSize so map renders correctly
    setTimeout(() => {
      map.invalidateSize();
      // Then fetch after map is properly sized
      setTimeout(() => {
        fetchNearbyDoctors(lat, lng);
      }, 200);
    }, 300);
  }

  function fetchNearbyDoctors(lat, lng) {
    const radius = 2000;
    const query = `
      [out:json][timeout:10];
      (
        node["amenity"="pharmacy"](around:${radius},${lat},${lng});
        node["amenity"="clinic"](around:${radius},${lat},${lng});
        node["amenity"="hospital"](around:${radius},${lat},${lng});
      );
      out body;
    `;

    $.ajax({
      url: "https://overpass-api.de/api/interpreter",
      method: "POST",
      data: { data: query },
      success: function (response) {
        const places = response.elements;

        if (places.length === 0) {
          hideSearchOverlay();
          return;
        }

        $.each(places, function (i, place) {
          const name = place.tags.name || "Unnamed";
          const type = place.tags.amenity;

          const colors = {
            pharmacy: "#1a7f5a",
            clinic: "#2563eb",
            hospital: "#dc2626",
          };
          const color = colors[type] || "#888";

          const icon = L.divIcon({
            className: "",
            html: `
              <div style="background:${color}" class="w-7 h-7 rounded-[50%_50%_50%_0] -rotate-45 flex items-center justify-center border-2 border-white shadow-md">
                <span class="rotate-45 text-[13px]">
                  ${type === "pharmacy" ? "💊" : type === "hospital" ? "🏥" : "🏨"}
                </span>
              </div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 28],
            popupAnchor: [0, -30],
          });

          L.marker([place.lat, place.lon], { icon }).addTo(map).bindPopup(`
            <strong>${name}</strong><br>
            <span style="color:${color};text-transform:capitalize">${type}</span>
            ${place.tags["opening_hours"] ? `<br><small>Hours: ${place.tags["opening_hours"]}</small>` : ""}
            ${place.tags.phone ? `<br><small>📞 ${place.tags.phone}</small>` : ""}
          `);
        });

        // Hide overlay once all markers are rendered
        hideSearchOverlay();
      },
      error: function () {
        hideSearchOverlay();
      },
    });
  }

  // Replace your existing geolocation block at the bottom with this:

  function initMapWhenVisible() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          initMap(pos.coords.latitude, pos.coords.longitude);
        },
        function () {
          initMap(28.6139, 77.209);
        },
      );
    } else {
      initMap(28.6139, 77.209);
    }
  }

  $(document).on("searchingSectionVisible", function () {
    initMapWhenVisible();
  });
  $("#locate-btn").on("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        initMap(pos.coords.latitude, pos.coords.longitude);
      });
    }
  });

  // --- Your existing popup handlers (unchanged) ---
  $(".acceptBtn").on("click", function () {
    $(".orderDetailsPopup").removeClass("hidden");
  });

  $(".closePopupBtn").on("click", function () {
    $(".orderDetailsPopup").addClass("hidden");
  });

  $(".cancelBtnPopup").on("click", function () {
    $(".orderDetailsPopup").addClass("hidden");
    $(".cancelReasonPopup").removeClass("hidden");
  });

  $(".cancelReasonBtn").on("click", function () {
    $(".cancelReasonPopup").addClass("hidden");
    $(".cancelConfirmationPopup").removeClass("hidden");
  });

  $(".keepOrderBtn").on("click", function () {
    $(".cancelConfirmationPopup").addClass("hidden");
  });

  $(".confirmBtn").on("click", function () {
    $(".cancelConfirmationPopup").addClass("hidden");
    $(".cancellationSuccessfullPopup").removeClass("hidden");
  });
});
