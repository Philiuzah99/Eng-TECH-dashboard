const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');

fetch('/api/settings')
    .then(res =>res.json())
    .then(settings =>{
        document.body.classList.toggle('dark-mode',settings.theme === 'dark');
    })

toggleBtn.addEventListener('click', ()=>{
    sidebar.classList.toggle('active');
});

document.addEventListener('click', (e)=>{
    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedToggleBtn = toggleBtn.contains(e.target);

    if(!clickedInsideSidebar && !clickedToggleBtn){
        sidebar.classList.remove('active');
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }

});

const links = document.querySelectorAll('.sidebar a');
const sections = document.querySelectorAll('.page');
const mainSection = document.querySelector('.main-section');
const moreSection = document.querySelector('.more');

links.forEach(link =>{
    link.addEventListener('click',(e)=>{
        e.preventDefault();
        const target = link.getAttribute('data-target');

        sections.forEach(sec => sec.style.display = 'none');

        if(target === 'home'){
            mainSection.style.display = 'block';
            moreSection.style.display = 'flex';
        }
        else{
            mainSection.style.display = 'none';
            moreSection.style.display = 'none';
            document.getElementById(target).style.display ='block';
            
        }
        sidebar.classList.remove('active');
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        if(target === 'projects'){
            renderProjects();
        }
        if(target === 'team') renderTeam();
        if(target === 'analytics') renderAnalytics();
        if(target === 'settings') renderSettings();
        if(target === 'services') renderServices();
        if(target === 'contact') renderContact();
    });
});

function renderProjects(){
    fetch('/api/projects')
    .then(res => res.json())
    .then(projects =>{
        const container = document.querySelector('.project-list');
        container.innerHTML = '';

        projects.forEach(project =>{
            const card = document.createElement('div');
            card.className = 'project-card';

            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.mediaType === 'video' ?
                    `<video controls src="${project.mediaUrl}" width="100%"></video>`:
                    project.mediaType === 'image'?
                    `<img src="${project.mediaUrl}" alt="${project.title}" width="100%">`:
                    `<a href="${project.mediaUrl}" target="_blank">View Project</a>`
                }
                ${project.githubUrl ? `<a href ="${project.githubUrl}" target="_blank">GitHub Repo</a>`: ''}
                `;
                container.appendChild(card);
        });
    })
    .catch(err =>{
        console.error('Error loading projects:', err);
        document.querySelector('.project-list').innerHTML = '<p>Failed to load projects.</p>';
    });
};

function renderTeam(){
    fetch('/api/team')
    .then(res => res.json())
    .then(team =>{
        const container = document.querySelector('.team-grid');
        container.innerHTML = '';

        team.forEach(member => {
            const card = document.createElement('div');
            card.className = 'team-card';

            card.innerHTML = `
            <h3>${member.name}</h3>
            <p><strong>Role:</strong> ${member.role}</p>
            <p>${member.bio}</p>
            ${member.photoUrl ? `<img src="${member.photoUrl}" alt ="${member.name}" width="100%">` : ''}
            `;
            container.appendChild(card);
        });
    })
    .catch(err => {
        console.error('Error loading team:', err);
        document.querySelector('.team-grid').innerHTML = '<p>Failed to load team members.</p>';
    });
    console.log('renderTeam is triggered');
};

//helper functions


function renderAnalytics(){
    fetch('/api/analytics')
    .then(res => res.json())
    .then(data =>{
        const container = document.getElementById('analytics');
        container.innerHTML = `
        <h2>Analytics Dashboard</h2>
        <div class="analytics-grid">
            <div class="stat-card"><h3>Total Projects</h3><p>${data.totalProjects}</p></div>
            <div class="stat-card"><h3>Active Contributors</h3><p>${data.activeContributors}</p></div>
            <div class="stat-card"><h3>Monthly Views</h3><p>${data.monthlyViews}</p></div>
        </div>
        `;
    })
    .catch(err =>{
        console.error('Error loading analytics:', err);
        document.getElementById('analytics').innerHTML = '<p>Failed to load analytics.</p>';
    });
};

function renderSettings(){
    fetch('/api/settings')
    .then(res => res.json())
    .then(settings => {
        const container = document.getElementById('settings');
        container.innerHTML = `
        <h2>Customise Your Experience</h2>
        <form class="settings-form" id="settingsForm">
            
            <label>Theme:
                <select name="theme">
                    <option ${settings.theme === 'light' ? 'selected': ''}>Light</option>
                    <option ${settings.theme === 'dark' ? 'selected': ''}>Dark</option>
                </select>
            </label>
            <label>Notifications:
                <input type="checkbox" ${settings.notifications ? 'checked' : ''} name=notifications"/>
            </label>
            <button type="submit">Save Preferences</button>
        </form>
        <p id="settingsFeedback" style="margin-top:1rem;"></p>
            `;
        
        document.body.classList.toggle('dark-mode', settings.theme === 'dark');

        const form = document.getElementById('settingsForm');
        form.addEventListener('submit', (e) =>{
            e.preventDefault();
            const theme = form.theme.value;
            const notifications = form.notifications.checked;

            document.body.classList.toggle('dark-mode',theme==='dark');

            fetch('/api/settings', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({theme, notifications})
            })
            .then(res => {
                if(!res.ok) throw new Error('Failed to save');
                return res.json();
            })
            .then(data =>{
                document.getElementById('settingsFeedback').textContent ='Preferences saved successfully!';
                document.getElementById('settingsFeedback').style.color ='green';
            })
            .catch(err =>{
                console.error('Error saving settings:', err);
                document.getElementById('settingsFeedback').textContent = 'Failed to save preferences.';
                document.getElementById('settingsFeedback').style.color ='red';
            });
        });
    })
    .catch(err => {
        console.error('Error loading settings:',err);
        document.getElementById('settings').innerHTML = '<p>Failed to load settings.</p>';
    });
};

function renderServices(){
    const container = document.querySelector('.services-list');
    container.innerHTML = `
        <div class="service-card">
            <h3>Biomedical Equipment Maintenance</h3>
            <p>Diagnostics and repair for hospital-grade devices.</p>
        </div>
        <div class="service-card">
            <h3>Web & IoT Development</h3>
            <p>Custom dashboards, responsive UIs , and smart device integration.</p>
        </div>
        <div class="service-card">
            <h3>Electronics Repair</h3>
            <p>We troubleshootand repair Electronics- Computers and Laptops.</p>
        </div>
        <div class="service-card">
            <h3>Tech Education & Micro-Courses</h3>
            <p>Modular lessons in programming, electronics, and UX design.
        </div>
        `;
};
function renderContact(){
    //static section
    document.getElementById('contactInfo').style.display = 'block';
};

function renderFilteredProjects(filteredProjects) {
  const container = document.querySelector('.project-list');
  container.innerHTML = '';

  filteredProjects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      ${project.mediaType === 'video' ?
        `<video controls src="${project.mediaUrl}" width="100%"></video>` :
        project.mediaType === 'image' ?
        `<img src="${project.mediaUrl}" alt="${project.title}" width="100%">` :
        `<a href="${project.mediaUrl}" target="_blank">View Project</a>`
      }
      ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">GitHub Repo</a>` : ''}
    `;
    container.appendChild(card);
  });
  if(filteredProjects.length === 0){
    container.innerHTML = '<p>No macthing projects found.</p>';
  }
}

function renderFilteredTeam(filteredTeam){
    const container = document.querySelector('.team-grid');
    container.innerHTML = '';

    filteredTeam.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';

        card.innerHTML = `
        <h3>${member.name}</h3>
        <p><strong>Role:</strong> ${member.role}</p>
        <p>${member.bio}</p>
        ${member.photoUrl ? `<img src="${member.photoUrl}" alt="${member.name}" width="100%">`: ''}
        `;
        container.appendChild(card);
    });
    if(filteredTeam.length === 0){
        container.innerHTML = '<p>No matching team members found.</p>';
    }
}

const searchInput = document.getElementById('searchBar');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  document.getElementById('searchLabel').style.display ='block';
  document.getElementById('projects').style.display = 'block';
  document.getElementById('team').style.display = 'block';
  document.querySelector('.main-section').style.display = 'none';
  document.querySelector('.more').style.display = 'none';


  // Fetch and filter projects
  fetch('/api/projects')
    .then(res => res.json())
    .then(projects => {
      const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
      );
      renderFilteredProjects(filteredProjects);
    });

  // Fetch and filter team
  fetch('/api/team')
    .then(res => res.json())
    .then(team => {
      const filteredTeam = team.filter(member =>
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.bio.toLowerCase().includes(query)
      );
      renderFilteredTeam(filteredTeam);
    });
});

const clearBtn = document.getElementById('clearSearchBtn');
clearBtn.style.display = 'inline-block';

clearBtn.addEventListener('click', ()=>{
    searchInput.value = '';
    document.getElementById('searchLabel').style.display = 'none';
    clearBtn.style.display = 'none';

    document.querySelector('.main-section').style.display = 'block';
    document.querySelector('.more').style.display = 'flex';

    document.getElementById('.projects').style.display = 'none';
    document.getElementById('team').style.display = 'none';
});
