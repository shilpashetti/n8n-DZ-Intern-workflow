// Sample workflow data (this would be fetched from n8n API in a real app)
const workflows = [
    { id: 1, name: 'DZ Interns summary', status: 'Active' }
];

const workflowListContainer = document.getElementById('workflow-cards');

// Function to create and display workflow cards
function displayWorkflows() {
  workflowListContainer.innerHTML = ''; // Clear any existing content

  workflows.forEach(workflow => {
    const card = document.createElement('div');
    card.classList.add('workflow-card');
    card.innerHTML = `
      <h3>${workflow.name}</h3>
      <p>Status: ${workflow.status}</p>
      <button class="trigger-btn" onclick="triggerWorkflow(${workflow.id})">Trigger</button>
    `;
    workflowListContainer.appendChild(card);
  });
}

// Simulate workflow trigger (this would be an API call in a real app)
async function triggerWorkflow(id) {
  const webhookUrl = 'http://localhost:5678/webhook/ctnFhfMRJCAf9ZAg';
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: "Hello!" // Customize this based on workflow data
      })
    });

    const result = await response.json();
    console.log('Workflow Output:', result);

    // Show the result in a pop-up message as simple text
    const message = result.status === 'success' 
      ? 'The workflow was triggered successfully!' 
      : 'Workflow was started.';
      
    alert(message);

  } catch (error) {
    console.error('Error:', error);
    alert('Failed to trigger the workflow.');
  }
}

function openAddWorkflowForm() {
  document.getElementById('add-workflow-form').style.display = 'block';
}

function saveWorkflow() {
  const name = document.getElementById('new-workflow-name').value;
  const status = document.getElementById('new-workflow-status').value;

  if (name && status) {
    const newWorkflow = {
      id: workflows.length + 1, // auto-increment
      name: name,
      status: status
    };
    workflows.push(newWorkflow);
    displayWorkflows(); // Refresh workflow cards
    document.getElementById('add-workflow-form').style.display = 'none'; // Hide form
  } else {
    alert('Please fill in all fields.');
  }
}

// Initial call to display workflows
displayWorkflows();
