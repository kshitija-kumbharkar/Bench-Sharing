document.addEventListener('DOMContentLoaded', function () {
    // Sample user data
    const users = [
        { username: 'admin', password: 'adminpass', role: 'Admin' },
        { username: 'Ram', password: 'company1pass', role: 'HR' },
        { username: 'Keshav', password: 'company2pass', role: 'Developer' },
        { username: 'Radha', password: 'company3pass', role: 'Programmer' },
        { username: 'Madhusudan', password: 'company4pass', role: 'Tester' },
        { username: 'Gopal', password: 'company5pass', role: 'QA-Engineer' }
    ];

    // Sample resource data
    const resources = [
        { name: 'Engineer 1', type: 'Engineer', description: 'Software Engineer', availableFrom: '2024-07-11' },

        { name: 'Seating Space 1', type: 'Seating Space', description: 'Open Desk', availableFrom: '2024-07-11' },
        
        { name: 'Product License 1', type: 'Product License', description: 'Software License', availableFrom: '2024-07-11' },
    ];

    // User management
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');

    userForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        users.push({ username, password, role: 'Developer' });
        displayUsers();
    });

    function displayUsers() {
        userList.innerHTML = '<h3>Existing Users:</h3>';
        users.forEach(user => {
            const div = document.createElement('div');
            div.textContent = `Username: ${user.username}, Role: ${user.role}`;
            userList.appendChild(div);
        });
    }
    displayUsers();

    // Admin management
    const resourceForm = document.getElementById('resource-form');
    const resourceList = document.getElementById('resource-list');

    resourceForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = e.target['resource-name'].value;
        const type = e.target['resource-type'].value;
        resources.push({ name, type, description: 'New Resource', availableFrom: '2024-07-11' });
        displayResources();
    });

    function displayResources() {
        resourceList.innerHTML = '<h3>Existing Resources:</h3>';
        resources.forEach(resource => {
            const div = document.createElement('div');
            div.textContent = `Name: ${resource.name}, Type: ${resource.type}, Description: ${resource.description}, Available From: ${resource.availableFrom}`;
            resourceList.appendChild(div);
        });
    }
    displayResources();

    // Company management
    const companyList = document.getElementById('company-list');
    const bookedResources = document.getElementById('    bookedResources');

    function displayResourceCategories() {
        companyList.innerHTML = '<h3>Bench Available by Category/Type:</h3>';
        const categories = resources.reduce((acc, resource) => {
            acc[resource.type] = (acc[resource.type] || 0) + 1;
            return acc;
        }, {});
        
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'resource-category';
        
        for (const [type, count] of Object.entries(categories)) {
            const card = document.createElement('div');
            card.className = 'resource-card';
            card.textContent = `${type} (${count})`;
            card.addEventListener('click', () => {
                displayResourcesByCategory(type);
            });
            categoryContainer.appendChild(card);
        }
        
        companyList.appendChild(categoryContainer);
    }

    function displayResourcesByCategory(category) {
        const filteredResources = resources.filter(resource => resource.type === category);
        
        bookedResources.innerHTML = `<h3>${category} Resources:</h3>`;
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        
        ['Name', 'Type', 'Description', 'Available From', 'Action'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        
        table.appendChild(headerRow);
        
        filteredResources.forEach(resource => {
            const row = document.createElement('tr');
            
            for (const key in resource) {
                const td = document.createElement('td');
                td.textContent = resource[key];
                row.appendChild(td);
            }
            
            const actionTd = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = 'Book for Me';
            button.addEventListener('click', () => {
                bookResource(resource);
            });
            actionTd.appendChild(button);
            row.appendChild(actionTd);
            
            table.appendChild(row);
        });
        
        bookedResources.appendChild(table);
    }

    function bookResource(resource) {
        alert(`Resource ${resource.name} has been booked.`);
        // Logic to update the resource booking status can be added here.
    }

    function displayBookedResources() {
        // Logic to display the list of booked resources.
        bookedResources.innerHTML = '<h3>Booked Resources:</h3>';
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        
        ['Name', 'Type', 'Description', 'Available From', 'Action'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        
        table.appendChild(headerRow);
        
        // Assuming we have a way to track booked resources
        const bookedResourcesList = resources.filter(resource => resource.booked);
        
        bookedResourcesList.forEach(resource => {
            const row = document.createElement('tr');
            
            for (const key in resource) {
                const td = document.createElement('td');
                td.textContent = resource[key];
                row.appendChild(td);
            }
            
            const actionTd = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = 'Release Resource';
            button.addEventListener('click', () => {
                releaseResource(resource);
            });
            actionTd.appendChild(button);
            row.appendChild(actionTd);
            
            table.appendChild(row);
        });
        
        bookedResources.appendChild(table);
    }

    function releaseResource(resource) {
        alert(`Resource ${resource.name} has been released.`);
        // Logic to update the resource release status can be added here.
    }

    displayResourceCategories();
});


