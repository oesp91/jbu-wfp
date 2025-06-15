document.addEventListener('DOMContentLoaded', () => {
  // Get initial greeting based on time
  function getInitialGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 19) return "Good evening";
    return "Happy late night";
  }

  // Typewriter effect
  function typeWriter(text, element, speed = 70) {
    let index = 0;
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Initialize typewriter
  const greeting = getInitialGreeting();
  const typingText = `${greeting}, Developer`;
  const displayText = document.getElementById('display-text');
  typeWriter(typingText, displayText);

  // Navigation
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
      document.querySelector('.nav-links').classList.remove('open');
      document.querySelector('.navbar').classList.remove('nav-open');
    });
  });

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  hamburger.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
    document.querySelector('.navbar').classList.toggle('nav-open');
  });

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  });

  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
  }

  // Project data with links
  const projects = [
    { title: '중간고사 팀 프로젝트', category: 'dev', description: '웹해킹 학습 플랫폼 1', link: 'https://jbu-web-team-flame.vercel.app/' },
    { title: '중간고사 개인 프로젝트', category: 'dev', description: '개인 포트폴리오', link: 'https://project-html-alpha.vercel.app/' },
    { title: '기말고사 팀 프로젝트', category: 'dev', description: '웹해킹 학습 플랫폼 2', link: 'https://web-programming-final-exam-team-one.vercel.app/' },
    { title: 'WPHunter', category: 'security', description: '워드프레스 취약점 탐지 자동화 도구', link: 'https://github.com/oesp91/WPHunter' },
  ];

  // Team data with links
  const team = [
    { name: '심재훈', role: 'Security Researcher', description: 'Interested in Pwnable', image: './images/심재훈.jpeg', link: 'https://web-programming-final-exam.vercel.app/' },
    { name: '우성민', role: 'Security Enginier', description: 'Looking for an area of interest', image: './images/우성민.jpg', link: 'https://final-team-six.vercel.app' },
    { name: '정재성', role: 'Security Researcher', description: 'Interested in Web Security', image: './images/정재성.jpeg', link: 'https://final-personal-project-peach.vercel.app/' },
  ];

  // Render projects
  const projectGrid = document.getElementById('project-grid');
  function renderProjects(filter = 'all') {
    projectGrid.innerHTML = '';
    projects
      .filter(project => filter === 'all' || project.category === filter)
      .forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        `;
        card.addEventListener('click', () => {
          window.location.href = project.link;
        });
        projectGrid.appendChild(card);
      });
  }
  renderProjects();

  // Render team
  const teamGrid = document.getElementById('team-grid');
  function renderTeam() {
    teamGrid.innerHTML = '';
    team.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('team-card');
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" class="profile-image">
        <h3>${member.name}</h3>
        <p>${member.role}</p>
        <p>${member.description}</p>
      `;
      card.addEventListener('click', () => {
        window.location.href = member.link;
      });
      teamGrid.appendChild(card);
    });
  }
  renderTeam();

  // Project filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      renderProjects(filter);
    });
  });

  // Scroll animation
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Contact form
  const contactForm = document.getElementById('contact-form');
  const formMessages = document.getElementById('form-messages');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      timestamp: new Date().toISOString(),
    };

    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push(formData);
    localStorage.setItem('messages', JSON.stringify(messages));

    formMessages.textContent = 'Message saved successfully!';
    formMessages.style.color = 'green';
    contactForm.reset();

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => console.log('Mock API response:', data))
      .catch(error => console.error('Error:', error));
  });
});
