"use strict";

// Initialize the Leaflet map
var map = L.map("map").setView([51.505, -0.09], 13);

// Use OpenStreetMap tiles
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      map.setView([lat, lon], 30);

      L.marker([lat, lon]).addTo(map).bindPopup("You are here.").openPopup();

      L.circle([lat, lon], {
        color: "blue",
        fillColor: "#3882f6",
        fillOpacity: 0.5,
        radius: position.coords.accuracy / 10, // radius based on accuracy of geolocation
      }).addTo(map);
    },
    function (error) {
      console.error("Geolocation error: " + error.message);
      alert(
        "Unable to retrieve your location. Please enable location services."
      );
    }
  );
} else {
  alert("Geolocation is not supported by your browser.");
}

// Get the current location
map.locate({ setView: true, maxZoom: 16 });

// Handle the result of location found
map.on("locationfound", function (e) {
  var radius = e.accuracy / 20;

  L.marker(e.latlng)
    .addTo(map)
    .bindPopup("You are within " + radius + " meters from this point.")
    .openPopup();

  L.circle(e.latlng, radius).addTo(map);
});

// Handle location errors
map.on("locationerror", function (e) {
  alert("Location access denied.");
});

document.addEventListener("DOMContentLoaded", function () {
  const popups = {
    attendance: document.getElementById("attendancePopup"),
    communications: document.getElementById("communicationsPopup"),
    tasks: document.getElementById("tasksPopup"),
    manageGuards: document.getElementById("manageGuardsPopup"),
    evaluate: document.getElementById("evaluatePopup"),
  };

  // Open pop-up and apply background blur
  document
    .getElementById("attendanceButton")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      openPopup(popups.attendance);
    });

  document
    .getElementById("communicationsButton")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      openPopup(popups.communications);
    });

  document
    .getElementById("tasksButton")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      openPopup(popups.tasks);
    });

  document
    .getElementById("manageGuardsButton")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      openPopup(popups.manageGuards);
    });

  document
    .getElementById("evaluateButton")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      openPopup(popups.evaluate);
    });

  // Function to open the respective pop-up
  function openPopup(popup) {
    closeAllPopups(); // Close other open popups
    popup.style.display = "block";
    document.body.classList.add("blur-active");

    // Close pop-up if clicked outside
    document.addEventListener(
      "click",
      function (event) {
        if (!popup.contains(event.target) && event.target !== popup) {
          closePopup(popup);
        }
      },
      { once: true }
    );
  }

  // Function to close the pop-up
  function closePopup(popup) {
    popup.style.display = "none";
    document.body.classList.remove("blur-active");
  }

  // Close all popups
  function closeAllPopups() {
    Object.values(popups).forEach((popup) => (popup.style.display = "none"));
  }

  // Add close button functionality
  document.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const popup = btn.closest(".popup");
      closePopup(popup);
    });
  });

  // Add functionality for managing guards
  document
    .getElementById("manageGuardsButton")
    .addEventListener("click", function () {
      const username = document.getElementById("guardUsername").value;
      const email = document.getElementById("guardEmail").value;
      const password = document.getElementById("guardPassword").value;
      const uniqueSentence = document.getElementById("guardSentence").value;

      if (username && email && password && uniqueSentence) {
        // Logic to add guard information (e.g., sending to a database)
        alert("Guard added successfully!");
        document.getElementById("manageGuardsForm").reset();
      } else {
        alert("Please fill in all fields.");
      }
    });
});

document.getElementById("logoutButton").addEventListener("click", () => {
  localStorage.clear(); // Clear localStorage on logout
  window.location.href = "/main.html"; // Redirect to the login page
});

navigator.geolocation.watchPosition((position) => {
  const { latitude, longitude } = position.coords;

  fetch("http://localhost:5500/api/guard/location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("guardToken")}`,
    },
    body: JSON.stringify({ latitude, longitude }),
  });
});
