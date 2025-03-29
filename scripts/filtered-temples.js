const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
      templeName: "Tokyo Japan",
      location: "Tokyo, Japan",
      dedicated: "1980, October, 27-29",
      area: 53997,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-57277.jpg"
    },
    {
      templeName: "Sydney Australia",
      location: "Sydney, Australia",
      dedicated: "1984, September, 20-23",
      area: 30067,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/sydney-australia-temple/sydney-australia-temple-16028.jpg"
    },
    {
      templeName: "Accra Ghana",
      location: "Accra, Ghana",
      dedicated: "2004, January, 11",
      area: 17500,
      imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-7149.jpg"
    }
  ];
  
  function createTempleCard(temple) {
    const card = document.createElement("article");
    card.classList.add("temple-card");
    
    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple`;
    img.loading = "lazy";
    img.width = 400;
    img.height = 250;
    card.appendChild(img);
  
    const content = document.createElement("div");
    content.classList.add("card-content");
    
    const name = document.createElement("h3");
    name.textContent = temple.templeName;
    content.appendChild(name);
  
    const location = document.createElement("p");
    location.textContent = `Location: ${temple.location}`;
    content.appendChild(location);
  
    const dedicated = document.createElement("p");
    dedicated.textContent = `Dedicated: ${temple.dedicated}`;
    content.appendChild(dedicated);
  
    const area = document.createElement("p");
    area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;
    content.appendChild(area);
  
    card.appendChild(content);
    return card;
  }
  
  function displayTemples(templeList) {
    const gallery = document.getElementById("templeGallery");
    gallery.innerHTML = "";
    templeList.forEach(temple => {
      const card = createTempleCard(temple);
      gallery.appendChild(card);
    });
  }
  
  function filterTemples(filter) {
    let filtered = [];
    switch (filter) {
      case "old":
        filtered = temples.filter(temple => {
          const year = parseInt(temple.dedicated.split(',')[0].trim());
          return year < 1900;
        });
        break;
      case "new":
        filtered = temples.filter(temple => {
          const year = parseInt(temple.dedicated.split(',')[0].trim());
          return year > 2000;
        });
        break;
      case "large":
        filtered = temples.filter(temple => temple.area > 90000);
        break;
      case "small":
        filtered = temples.filter(temple => temple.area < 10000);
        break;
      default:
        filtered = temples;
    }
    displayTemples(filtered);
  }
  
  function setupFilters() {
    // Select all <a> elements within #filter-nav
    const links = document.querySelectorAll("#filter-nav a");
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        // Remove aria-pressed attribute from all links
        links.forEach(lnk => lnk.setAttribute("aria-pressed", "false"));
        // Set aria-pressed true on clicked link
        link.setAttribute("aria-pressed", "true");
        const filter = link.getAttribute("data-filter");
        filterTemples(filter);
      });
    });
  }
  
  function setupFooter() {
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    setupFooter();
    setupFilters();
    displayTemples(temples);
  });
  