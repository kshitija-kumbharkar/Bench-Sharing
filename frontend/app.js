
const apiUrl = 'http://localhost:3000/api';

const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const resourceSummary = document.getElementById('resourceSummary');
const bookedResourcesTable = document.getElementById('bookedResourcesTable');
const resourceDetailsTable = document.getElementById('resourceDetailsTable');

if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    if (data.role === 'admin') {
                        window.location.href = 'admin.html'; // Redirect to admin dashboard
                    } else if (data.role === 'company') {
                        window.location.href = 'company.html'; // Redirect to company dashboard
                    } else {
                        alert('Role not defined');
                    }
                } else {
                    alert('Login failed: ' + data.message); // Display specific error message from backend
                }
            })
            .catch((error) => {
                console.error('Error fetching or parsing data:', error);
                alert('Error logging in. Please try again later.');
            });
    });
}

function logout() {
    window.location.href = 'index.html';
}

if (window.location.pathname.endsWith('admin.html')) {
    document.getElementById('resourceTypeForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const resourceTypeName = document.getElementById('resourceTypeName').value;

        fetch(`${apiUrl}/resourceTypes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: resourceTypeName })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    addResourceTypeToTable(data.resourceType);
                    document.getElementById('resourceTypeName').value = '';
                } else {
                    alert('Error adding resource type');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error adding resource type');
            });
    });

    function addResourceTypeToTable(resourceType) {
        const table = document.getElementById('resourceTypesTable');
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = resourceType.name;
        cell2.innerHTML = `<button onclick="deleteResourceType(${resourceType.id}, this)">Delete</button>`;
    }
}

function deleteResourceType(resourceTypeId, button) {
    fetch(`${apiUrl}/resourceTypes/${resourceTypeId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const row = button.parentNode.parentNode;
                row.parentNode.removeChild(row);
            } else {
                alert('Error deleting resource type');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting resource type');
        });
}

if (window.location.pathname.endsWith('company.html')) {
    
    fetch(`${apiUrl}/resources`)
        .then(response => response.json())
        .then(data => {
            const resources = data.resources;
            const resourceTypes = [...new Set(resources.map(resource => resource.type))];

            resourceTypes.forEach(type => {
                const count = resources.filter(resource => resource.type === type).length;
                const card = document.createElement('div');
                card.className = 'resource-card';
                card.innerHTML = `<h3>${type}</h3><p>${count} available</p>`;
                card.onclick = () => viewResources(type);
                resourceSummary.appendChild(card);
            });

            fetch(`${apiUrl}/bookings`)
                .then(response => response.json())
                .then(data => {
                    const bookings = data.bookings;
                    bookings.forEach(booking => {
                        addBookedResourceToTable(booking.resource);
                    });
                });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching resources');
        });
}

function viewResources(type) {
    window.location.href = `resource.html?type=${type}`;
}

function addBookedResourceToTable(resource) {
    const row = bookedResourcesTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.innerHTML = resource.name;
    cell2.innerHTML = resource.description;
    cell3.innerHTML = `<button onclick="releaseResource(${resource.id})">Release</button>`;
}

if (window.location.pathname.endsWith('resource.html')) {
    
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');

    if (type) {
        
        fetch(`${apiUrl}/resources?type=${type}`)
            .then(response => response.json())
            .then(data => {
                const resources = data.resources;
                resources.forEach(resource => {
                    addResourceToDetailsTable(resource);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error fetching resources');
            });
    }
}

function addResourceToDetailsTable(resource) {
    const row = resourceDetailsTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.innerHTML = resource.name;
    cell2.innerHTML = resource.description;
    cell3.innerHTML = new Date(resource.availableFrom).toLocaleDateString();
    cell4.innerHTML = `<button onclick="bookResource(${resource.id})">Book for Me</button>`;
}


function bookResource(resourceId) {
    fetch(`${apiUrl}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Resource booked successfully!');
                window.location.reload();
            } else {
                alert('Error booking resource');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error booking resource');
        });
}

function releaseResource(resourceId) {
    fetch(`${apiUrl}/bookings/${resourceId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Resource released successfully!');
                window.location.reload();
            } else {
                alert('Error releasing resource');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error releasing resource');
        });
}


function goBack() {
    window.history.back();
}
try {
    let jsonResponse = JSON.parse(apiResponse);
    
    console.log('Successfully parsed JSON:', jsonResponse);
   
} catch (error) {
    console.error('Error parsing JSON:', error);
    
    alert('Error parsing JSON data. Please try again later.');
    
}

