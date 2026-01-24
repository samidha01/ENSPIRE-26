 // Navigation
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });

    // Events Data
    // FIX: Updated all image paths to be relative (./figmaAssets/...)
    const events = [
      { title: "IDEATHON", description: "Offline Competition to understand the startup system", image: "../Landing Page/Images/Ideathon.png", color: "#ff751f" },
      { title: "PITCH PERFECT", description: "Showcase your business idea to potential investors", image: "rectangle-97-1.png", color: "#3bea4f" },
      { title: "WORKSHOP", description: "Hands-on learning session with industry experts", image: "rectangle-93.png", color: "#fee541" },
      { title: "PANEL DISCUSSION", description: "Insights from successful entrepreneurs and leaders", image: "rectangle-95.png", color: "#ef4444" },
      { title: "NETWORKING", description: "Connect with like-minded aspiring entrepreneurs", image: "../Landing Page/Images/networking.png", color: "#24c4e0" },
      { title: "STARTUP EXPO", description: "Explore innovative startups and their solutions", image: "../Landing Page/Images/Startup-Hub.png", color: "#a100ff" }
    ];

    // Render Events
    const eventsGrid = document.getElementById('events-grid');
    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.style.borderColor = event.color;
      card.innerHTML = `
        <div class="event-image"><img src="${event.image}" alt="${event.title}"></div>
        <div class="event-content" style="border-color: ${event.color};">
          <h3 class="event-title">${event.title}</h3>
          <p class="event-description" style="color: ${event.color};">${event.description}</p>
          <button class="event-btn" style="background-color: ${event.color};">Register</button>
        </div>
      `;
      eventsGrid.appendChild(card);
    });

    // Speakers Data
    // FIX: Removed incorrect "/client/public" prefix and made paths relative
    const speakers = [
      { name: "Mr. Agarwal", title: "(CORPORATE COMMUNICATION TRAINER & PUBLIC SPEAKING COACH)", image: "image-30.png" },
      { name: "Speaker 2", title: "(Title)", image: "image-31.png" },
      { name: "Speaker 3", title: "(Title)", image: "image-32.png" },
      { name: "Speaker 4", title: "(Title)", image: "image-33.png" }
    ];

    // Render Speakers
    const speakersGrid = document.getElementById('speakers-grid');
    speakers.forEach(speaker => {
      const card = document.createElement('div');
      card.className = 'speaker-card';
      card.innerHTML = `
        <div class="speaker-image" style="background-image: url('${speaker.image}'); background-size: cover; background-position: center;"></div>
        <div class="speaker-info">
          <div>
            <div class="speaker-name">${speaker.name}</div>
            <div class="speaker-title">${speaker.title}</div>
          </div>
        </div>
      `;
      speakersGrid.appendChild(card);
    });

    // Sponsors Data
    // FIX: Updated all image paths to be relative (./figmaAssets/...)
    const sponsors = [
      { name: "Associate Partner", image: "../Landing Page/Images/paradise.png", borderColor: "#24c4e0", description: "Associate\nPartner" },
      { name: "Academic Partner", image: "../Landing Page/Images/upgrad.png", borderColor: "red", description: "Academic\nPartner" },
      { name: "Enterprise Partner", image: "../Landing Page/Images/Maannomay.png", borderColor: "#fee541", description: "Enterprise\nPartner" },
      { name: "Study Abroad Partner", image: "../Landing Page/Images/SIUK.png", borderColor: "#00ff37", description: "Study Abroad\nPartner" },
      { name: "Beverage Partner", image: "../Landing Page/Images/Habbit.png", borderColor: "#a100ff", description: "Beverage\nPartner" },
      { name: "Digital Media Partner", image: "../Landing Page/Images/Siddhivinayak.png", borderColor: "#ff751f", description: "Digital Media\nPartner" },
      { name: "Gaming Partner", image: "../Landing Page/Images/RVR.png", borderColor: "#24c4e0", description: "Gaming\nPartner" },
      { name: "Clothing Partner", image: "../Landing Page/Images/Coasyloom.png", borderColor: "#fee541", description: "Clothing\nPartner" },
      { name: "Technical Partner", image: "../Landing Page/Images/Krawlnet.png", borderColor: "#a100ff", description: "Technical\nPartner" }
    ];

    // Render Sponsors
    const sponsorsGrid = document.getElementById('sponsors-grid');
    sponsors.forEach((sponsor, index) => {
      const card = document.createElement('div');
      card.className = 'sponsor-card';
      card.style.animationDelay = `${index * 0.1}s`;
      card.innerHTML = `
        <div class="sponsor-border" style="border-color: ${sponsor.borderColor};"></div>
        <div class="sponsor-content">
          <div class="sponsor-image">
            <img src="${sponsor.image}" alt="${sponsor.name}">
          </div>
          <p class="sponsor-description">${sponsor.description}</p>
        </div>
      `;
      sponsorsGrid.appendChild(card);
    });