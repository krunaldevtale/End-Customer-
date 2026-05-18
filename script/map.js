// Data
const locations = {
  "New York, NY": {
    center: [40.7589, -73.9851],
    zoom: 13,
    facilities: [
      {
        id: 1,
        name: "NewYork-Presbyterian Hospital",
        type: "Hospital",
        lat: 40.7831,
        lng: -73.9712,
        address: "525 E 68th St, New York, NY 10065",
        phone: "(212) 746-5454",
        rating: 4.2,
        hours: "24/7",
        specialties: ["Emergency Care", "Surgery", "Cardiology", "Oncology"],
        description: "Leading academic medical center with comprehensive care",
      },
      {
        id: 2,
        name: "Dr. Sarah Johnson, MD",
        type: "Doctor",
        lat: 40.7614,
        lng: -73.9776,
        address: "1040 Park Ave, New York, NY 10028",
        phone: "(212) 555-0123",
        rating: 4.8,
        hours: "Mon-Fri: 9 AM - 6 PM",
        specialties: [
          "Family Medicine",
          "Internal Medicine",
          "Preventive Care",
        ],
        description:
          "Board-certified family physician with 15+ years experience",
      },
      {
        id: 3,
        name: "CVS Pharmacy",
        type: "Pharmacy",
        lat: 40.7505,
        lng: -73.9934,
        address: "1633 Broadway, New York, NY 10019",
        phone: "(212) 247-8384",
        rating: 4.1,
        hours: "Mon-Sun: 8 AM - 10 PM",
        specialties: [
          "Prescription Drugs",
          "OTC Medications",
          "Vaccinations",
          "Health Screenings",
        ],
        description: "Full-service pharmacy with minute clinic services",
      },
      {
        id: 4,
        name: "LabCorp",
        type: "Lab",
        lat: 40.7549,
        lng: -73.984,
        address: "1335 York Ave, New York, NY 10021",
        phone: "(212) 794-6850",
        rating: 4.3,
        hours: "Mon-Fri: 7 AM - 7 PM, Sat: 8 AM - 4 PM",
        specialties: [
          "Blood Tests",
          "Diagnostic Imaging",
          "Pathology",
          "Genetic Testing",
        ],
        description: "Comprehensive laboratory services and diagnostic testing",
      },
      {
        id: 5,
        name: "Mount Sinai Hospital",
        type: "Hospital",
        lat: 40.7903,
        lng: -73.9527,
        address: "1 Gustave L. Levy Pl, New York, NY 10029",
        phone: "(212) 241-6500",
        rating: 4.4,
        hours: "24/7",
        specialties: [
          "Emergency Care",
          "Trauma Center",
          "Neurology",
          "Transplant Services",
        ],
        description:
          "Major teaching hospital with specialized medical services",
      },
    ],
  },
  "Los Angeles, CA": {
    center: [34.0522, -118.2437],
    zoom: 12,
    facilities: [
      {
        id: 6,
        name: "Cedars-Sinai Medical Center",
        type: "Hospital",
        lat: 34.0755,
        lng: -118.3785,
        address: "8700 Beverly Blvd, Los Angeles, CA 90048",
        phone: "(310) 423-3277",
        rating: 4.3,
        hours: "24/7",
        specialties: [
          "Emergency Care",
          "Heart Surgery",
          "Cancer Treatment",
          "Neurology",
        ],
        description:
          "World-renowned medical center with cutting-edge treatments",
      },
      {
        id: 7,
        name: "Dr. Maria Garcia, MD",
        type: "Doctor",
        lat: 34.0522,
        lng: -118.2437,
        address: "1245 Wilshire Blvd, Los Angeles, CA 90017",
        phone: "(213) 555-0456",
        rating: 4.7,
        hours: "Mon-Fri: 8 AM - 6 PM",
        specialties: ["Cardiology", "Internal Medicine", "Preventive Care"],
        description:
          "Board-certified cardiologist with expertise in heart disease prevention",
      },
      {
        id: 8,
        name: "Walgreens Pharmacy",
        type: "Pharmacy",
        lat: 34.0407,
        lng: -118.2468,
        address: "800 S Hope St, Los Angeles, CA 90017",
        phone: "(213) 627-3874",
        rating: 4.0,
        hours: "Mon-Sun: 7 AM - 11 PM",
        specialties: [
          "Prescription Drugs",
          "Health Consultations",
          "Immunizations",
        ],
        description: "Full-service pharmacy with healthcare clinic",
      },
      {
        id: 9,
        name: "Quest Diagnostics",
        type: "Lab",
        lat: 34.0736,
        lng: -118.24,
        address: "1500 S Central Ave, Los Angeles, CA 90021",
        phone: "(323) 780-6500",
        rating: 4.2,
        hours: "Mon-Fri: 6 AM - 8 PM, Sat: 7 AM - 4 PM",
        specialties: ["Blood Work", "Imaging", "Pathology", "Drug Testing"],
        description: "Comprehensive diagnostic laboratory services",
      },
    ],
  },
  "Chicago, IL": {
    center: [41.8781, -87.6298],
    zoom: 12,
    facilities: [
      {
        id: 10,
        name: "Northwestern Memorial Hospital",
        type: "Hospital",
        lat: 41.8955,
        lng: -87.6217,
        address: "251 E Huron St, Chicago, IL 60611",
        phone: "(312) 926-2000",
        rating: 4.5,
        hours: "24/7",
        specialties: [
          "Emergency Care",
          "Transplant Center",
          "Cancer Care",
          "Neurosurgery",
        ],
        description: "Top-ranked academic medical center in downtown Chicago",
      },
      {
        id: 11,
        name: "Dr. James Wilson, MD",
        type: "Doctor",
        lat: 41.8781,
        lng: -87.6298,
        address: "55 E Washington St, Chicago, IL 60602",
        phone: "(312) 555-0789",
        rating: 4.6,
        hours: "Mon-Fri: 9 AM - 5 PM",
        specialties: ["Orthopedics", "Sports Medicine", "Joint Replacement"],
        description:
          "Orthopedic surgeon specializing in sports injuries and joint care",
      },
      {
        id: 12,
        name: "CVS Pharmacy",
        type: "Pharmacy",
        lat: 41.8819,
        lng: -87.6278,
        address: "30 N Michigan Ave, Chicago, IL 60602",
        phone: "(312) 236-0872",
        rating: 4.1,
        hours: "Mon-Sun: 8 AM - 10 PM",
        specialties: [
          "Prescription Drugs",
          "Vaccinations",
          "Health Screenings",
        ],
        description: "Downtown pharmacy with comprehensive health services",
      },
      {
        id: 13,
        name: "LabCorp",
        type: "Lab",
        lat: 41.8708,
        lng: -87.6505,
        address: "1775 W 18th St, Chicago, IL 60608",
        phone: "(312) 666-2200",
        rating: 4.4,
        hours: "Mon-Fri: 7 AM - 7 PM, Sat: 8 AM - 3 PM",
        specialties: ["Clinical Testing", "Genetic Testing", "Wellness Panels"],
        description:
          "Full-service laboratory with advanced diagnostic capabilities",
      },
    ],
  },
  "Miami, FL": {
    center: [25.7617, -80.1918],
    zoom: 12,
    facilities: [
      {
        id: 14,
        name: "Jackson Memorial Hospital",
        type: "Hospital",
        lat: 25.7617,
        lng: -80.2106,
        address: "1611 NW 12th Ave, Miami, FL 33136",
        phone: "(305) 585-1111",
        rating: 4.2,
        hours: "24/7",
        specialties: [
          "Trauma Center",
          "Emergency Care",
          "Pediatrics",
          "Burn Center",
        ],
        description: "Major public hospital and Level I trauma center",
      },
      {
        id: 15,
        name: "Dr. Carlos Rodriguez, MD",
        type: "Doctor",
        lat: 25.7743,
        lng: -80.1937,
        address: "1400 NW 12th Ave, Miami, FL 33136",
        phone: "(305) 555-0321",
        rating: 4.8,
        hours: "Mon-Fri: 8 AM - 6 PM",
        specialties: ["Family Medicine", "Geriatrics", "Diabetes Care"],
        description:
          "Bilingual family physician with focus on chronic disease management",
      },
      {
        id: 16,
        name: "Walgreens Pharmacy",
        type: "Pharmacy",
        lat: 25.7814,
        lng: -80.187,
        address: "3661 S Miami Ave, Miami, FL 33133",
        phone: "(305) 854-9900",
        rating: 4.0,
        hours: "Mon-Sun: 8 AM - 10 PM",
        specialties: [
          "Prescription Drugs",
          "Travel Vaccines",
          "Health Consultations",
        ],
        description: "Neighborhood pharmacy with travel health services",
      },
    ],
  },
  "Houston, TX": {
    center: [29.7604, -95.3698],
    zoom: 12,
    facilities: [
      {
        id: 17,
        name: "Houston Methodist Hospital",
        type: "Hospital",
        lat: 29.737,
        lng: -95.3992,
        address: "6565 Fannin St, Houston, TX 77030",
        phone: "(713) 790-3311",
        rating: 4.6,
        hours: "24/7",
        specialties: [
          "Heart Surgery",
          "Cancer Treatment",
          "Neurology",
          "Transplants",
        ],
        description: "Leading hospital in the Texas Medical Center",
      },
      {
        id: 18,
        name: "Dr. Lisa Chen, MD",
        type: "Doctor",
        lat: 29.7604,
        lng: -95.3698,
        address: "1200 Binz St, Houston, TX 77004",
        phone: "(713) 555-0654",
        rating: 4.9,
        hours: "Mon-Thu: 9 AM - 7 PM, Fri: 9 AM - 5 PM",
        specialties: ["Dermatology", "Mohs Surgery", "Cosmetic Dermatology"],
        description: "Board-certified dermatologist and Mohs surgeon",
      },
      {
        id: 19,
        name: "CVS Pharmacy",
        type: "Pharmacy",
        lat: 29.7372,
        lng: -95.3991,
        address: "6624 Fannin St, Houston, TX 77030",
        phone: "(713) 795-8400",
        rating: 4.2,
        hours: "Mon-Sun: 7 AM - 11 PM",
        specialties: [
          "Prescription Drugs",
          "Specialty Medications",
          "Immunizations",
        ],
        description: "Medical center pharmacy with specialty drug services",
      },
    ],
  },
};

const categories = ["All", "Doctor", "Hospital", "Pharmacy", "Lab"];

const categoryColors = {
  Doctor: "#10b981",
  Hospital: "#ef4444",
  Pharmacy: "#3b82f6",
  Lab: "#f59e0b",
  All: "#6b7280",
};

const categoryIcons = {
  Doctor: "👨‍⚕️",
  Hospital: "🏥",
  Pharmacy: "💊",
  Lab: "🔬",
};

// State
let selectedLocation = "New York, NY";
let currentFacilities = [];
let selectedCategory = "All";
let filteredFacilities = [];
let selectedFacility = null;
let searchQuery = "";
let mapLoaded = false;

// DOM Elements
const mapElement = document.getElementById("map");
const loadingOverlay = document.getElementById("loadingOverlay");
const locationSelect = document.getElementById("locationSelect");
const searchInput = document.getElementById("searchInput");
const resultsCount = document.getElementById("resultsCount");
const categoryButtons = document.querySelectorAll(".category-btn");

// Map variables
let mapInstance = null;
let markers = [];

// Initialize the application
function init() {
  // Initialize Lucide icons
  // lucide.createIcons();

  // Set up event listeners
  setupEventListeners();

  // Initialize map
  initMap();

  // Load initial data
  updateFacilities();
}

// Set up event listeners
function setupEventListeners() {
  // Location select change
  locationSelect.addEventListener("change", (e) => {
    selectedLocation = e.target.value;
    updateFacilities();
  });

  // Search input
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    filterFacilities();
  });

  // Category buttons
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update selected category
      selectedCategory = button.dataset.category;

      // Update button styles
      categoryButtons.forEach((btn) => {
        if (btn.dataset.category === selectedCategory) {
          btn.classList.add("bg-[#238b6d]", "text-white");
          btn.classList.remove(
            "bg-white",
            "border",
            "border-gray-300",
            "hover:bg-[#238b6d]",
            "hover:text-white"
          );
        } else {
          btn.classList.remove(
            "bg-[#238b6d]",
            "text-white",
            "hover:bg-[#238b6d]"
          );
          btn.classList.add(
            "bg-white",
            "border",
            "border-gray-300",
            "hover:bg-[#238b6d]",
            "hover:text-white"
          );
        }
      });

      filterFacilities();
    });
  });
}

// Initialize the map
function initMap() {
  // Fix for default markers in Leaflet
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  // Initialize map with selected location
  const locationData = locations[selectedLocation];
  mapInstance = L.map(mapElement).setView(
    locationData.center,
    locationData.zoom
  );

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(mapInstance);

  // Hide loading overlay when map is loaded
  mapInstance.whenReady(() => {
    loadingOverlay.classList.add("hidden");
    mapLoaded = true;
  });
}

// Update facilities when location changes
function updateFacilities() {
  const locationData = locations[selectedLocation];
  currentFacilities = locationData.facilities;
  selectedFacility = null;
  searchQuery = "";
  searchInput.value = "";

  // Update map view if map is loaded
  if (mapInstance && mapLoaded) {
    mapInstance.setView(locationData.center, locationData.zoom);
  }

  filterFacilities();
}

// Filter facilities based on category and search
function filterFacilities() {
  let filtered = currentFacilities;

  if (selectedCategory !== "All") {
    filtered = filtered.filter(
      (facility) => facility.type === selectedCategory
    );
  }

  if (searchQuery) {
    filtered = filtered.filter(
      (facility) =>
        facility.name.toLowerCase().includes(searchQuery) ||
        facility.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchQuery)
        ) ||
        facility.address.toLowerCase().includes(searchQuery)
    );
  }

  filteredFacilities = filtered;
  updateResultsCount();
  updateMapMarkers();
}

// Update the results count
function updateResultsCount() {
  resultsCount.textContent = `${filteredFacilities.length} locations found`;
}

// Update map markers when filtered facilities change
function updateMapMarkers() {
  if (!mapInstance || !mapLoaded) return;

  // Clear existing markers
  markers.forEach((marker) => {
    mapInstance.removeLayer(marker);
  });
  markers = [];

  // Add new markers
  filteredFacilities.forEach((facility) => {
    // Create custom icon
    const customIcon = L.divIcon({
      html: `
            <div style="
              background-color: ${categoryColors[facility.type]};
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 3px solid white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              cursor: pointer;
            ">
              ${categoryIcons[facility.type]}
            </div>
          `,
      className: "custom-marker",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    const marker = L.marker([facility.lat, facility.lng], { icon: customIcon })
      .addTo(mapInstance)
      .bindPopup(
        `
            <div style="min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${
                facility.name
              }</h3>
              <p style="margin: 0 0 4px 0; color: ${
                categoryColors[facility.type]
              }; font-weight: bold;">${facility.type}</p>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${
                facility.address
              }</p>
              <p style="margin: 0 0 4px 0; font-size: 12px;"><strong>Phone:</strong> ${
                facility.phone
              }</p>
              <p style="margin: 0 0 4px 0; font-size: 12px;"><strong>Hours:</strong> ${
                facility.hours
              }</p>
              <div style="display: flex; align-items: center; gap: 4px; margin: 4px 0;">
                <span style="color: #fbbf24;">★</span>
                <span style="font-size: 12px;">${facility.rating}</span>
              </div>
              <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${
                facility.lat
              },${facility.lng}', '_blank')" 
                style="margin-top: 8px; width: 100%; padding: 4px; background: white; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; cursor: pointer;">
                Get Directions
              </button>
            </div>
          `
      );

    markers.push(marker);
  });
}

const dropdownBtn = document.getElementById("locationDropdownBtn");
const dropdownMenu = document.getElementById("locationDropdownMenu");
const selectedText = document.getElementById("selectedLocation");
dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});
document
  .querySelectorAll("#locationDropdownMenu .dropdown-item")
  .forEach((item) => {
    item.addEventListener("click", (e) => {
      const value = e.target.getAttribute("data-value");
      selectedText.textContent = value;
      selectedLocation = value;
      updateFacilities();
      dropdownMenu.classList.add("hidden");
    });
  });
document.addEventListener("click", (e) => {
  if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.add("hidden");
  }
});

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
