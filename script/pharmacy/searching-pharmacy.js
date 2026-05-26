$(document).ready(function () {
  (function () {
    const statusEl = document.getElementById("map-status");

    const pharmacyIcon = L.divIcon({
      className: "",
      html: `<div style="background:#0F6E56;color:#fff;border-radius:50%;width:32px;height:32px;
           display:flex;align-items:center;justify-content:center;font-size:16px;
           border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.25);">💊</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18],
    });

    const userIcon = L.divIcon({
      className: "",
      html: `<div style="background:#185FA5;border-radius:50%;width:16px;height:16px;
           border:3px solid #fff;box-shadow:0 0 0 3px rgba(24,95,165,0.35);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    function getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371000;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    function initMap(lat, lng) {
      const map = L.map("pharmacy-map").setView([lat, lng], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // User location marker
      L.marker([lat, lng], { icon: userIcon })
        .addTo(map)
        .bindPopup("<b>Your location</b>")
        .openPopup();

      // Fetch pharmacies via Overpass API (1.5km radius)
      const radius = 1500;
      statusEl.textContent = "Searching for nearby pharmacies...";

      const query = `[out:json][timeout:25];
      (node["amenity"="pharmacy"](around:${radius},${lat},${lng});
       way["amenity"="pharmacy"](around:${radius},${lat},${lng}););
      out center;`;

      fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
      )
        .then((r) => r.json())
        .then((data) => {
          const elements = data.elements || [];

          elements.forEach((el) => {
            const elLat = el.lat ?? el.center?.lat;
            const elLng = el.lon ?? el.center?.lon;
            if (!elLat || !elLng) return;

            const name = el.tags?.name || "Pharmacy";
            const addr =
              [
                el.tags?.["addr:housenumber"],
                el.tags?.["addr:street"],
                el.tags?.["addr:city"],
              ]
                .filter(Boolean)
                .join(", ") || "Address not available";
            const phone = el.tags?.phone || el.tags?.["contact:phone"] || "";
            const opening = el.tags?.opening_hours || "";
            const website =
              el.tags?.website || el.tags?.["contact:website"] || "";
            const dist = Math.round(getDistance(lat, lng, elLat, elLng));

            const popup = `
            <div style="min-width:180px;">
              <b>💊 ${name}</b><br>
              <small>${addr}</small><br>
              ${phone ? `📞 <small>${phone}</small><br>` : ""}
              ${opening ? `🕐 <small>${opening}</small><br>` : ""}
              ${website ? `<a href="${website}" target="_blank">Visit website</a><br>` : ""}
              <small style="color:#888;">~${dist}m away</small>
            </div>`;

            L.marker([elLat, elLng], { icon: pharmacyIcon })
              .addTo(map)
              .bindPopup(popup);
          });

          statusEl.textContent = `Found ${elements.length} pharmacies within 1.5km.`;
        })
        .catch(() => {
          statusEl.textContent = "Could not load pharmacy data.";
        });
    }

    // Get user location, fallback to Bengaluru
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => initMap(pos.coords.latitude, pos.coords.longitude),
        () => {
          statusEl.textContent = "Location denied — using default.";
          initMap(12.9716, 77.5946);
        },
        { timeout: 8000 },
      );
    } else {
      initMap(12.9716, 77.5946);
    }
  })();
});
