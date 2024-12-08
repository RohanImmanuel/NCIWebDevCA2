// Initialize the map
        const map = L.map('map').setView([53.349805, -6.26031], 13); // Dublin coordinates and zoom level

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add markers for attractions
        const attractions = [
            {
                name: "Dublin Castle",
                coords: [53.3437935, -6.2674693],
                url: "https://dublincastle.ie",
                image: "img/attractions/dublin-castle.jpg"
            },
            {
                name: "Phoenix Park",
                coords: [53.356937, -6.329998],
                url: "https://www.phoenixpark.ie",
                image: "img/attractions/phoenix-park.avif"
            },
            {
                name: "Guinness Storehouse",
                coords: [53.341864, -6.28686],
                url: "https://www.guinness-storehouse.com",
                image: "img/attractions/guinness-storehouse.jpg"
            },
            {
                name: "St. Stephen's Green",
                coords: [53.338190, -6.259262],
                image: "img/attractions/st-stephens-green.jpg"
            },
            {
                name: "Trinity College Library",
                coords: [53.343, -6.254],
                url: "https://www.tcd.ie/library",
                image: "img/attractions/trinity-college-library.webp"
            },
            {
                name: "Kilmainham Gaol",
                coords: [53.345, -6.297],
                url: "https://www.kilmainhamgaolmuseum.ie/",
                image: "img/attractions/kilmainham-gaol.webp"
            },
            {
                name: "Epic Museum",
                coords: [53.348, -6.248],
                url: "https://epicchq.com/",
                image: "img/attractions/epic-museum.jpg"
            }
        ];

        // Add a marker with a popup
        attractions.forEach(attraction => {
            const marker = L.marker(attraction.coords).addTo(map)
                .bindPopup(
                    `<strong>${attraction.name}</strong><br>` +
                    (attraction.image ? `<img src="${attraction.image}" alt="${attraction.name}" style="width:100%; max-height:200px; object-fit:cover; margin-top: 5px; margin-bottom: 5px;">` : '') +
                    (attraction.url ? `<a href="${attraction.url}" target="_blank">Visit Website</a><br>` : '')

                );
        });