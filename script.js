document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    const logToConsole = (data) => {
        console.log("New Submission Received:");
        console.table(data);
    };

    const saveToLocalStorage = (data) => {
        const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions')) || [];
        
        const submissionWithDate = { ...data, submittedAt: new Date().toLocaleString() };
        
        existingSubmissions.push(submissionWithDate);
        
        localStorage.setItem('contact_submissions', JSON.stringify(existingSubmissions));
        
        console.log(`Stored! Total submissions: ${existingSubmissions.length}`);
    };

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            saveToLocalStorage(data);

            if (formMessage) {
                formMessage.textContent = `Submission saved successfully!`;
                formMessage.classList.remove('opacity-0');
                formMessage.classList.add('opacity-100', 'bg-[#F7EFDA]', 'text-[#644737]', 'text-center');
                
                setTimeout(() => formMessage.classList.replace('opacity-100', 'opacity-0'), 3000);
            }

            this.reset();
        });
    }

    function viewSubmissions() {
        const list = document.getElementById('submissions-list');
        const data = JSON.parse(localStorage.getItem('contact_submissions')) || [];

        if (data.length === 0) {
            const empty = document.getElementById('empty-state');
            if (empty) empty.classList.remove('hidden');
            return;
        }

        list.innerHTML = data.reverse().map(entry => `
            <tr class="border-b border-gray-100">
                <td class="px-6 py-4 text-xs font-mono text-gray-400">${entry.submittedAt}</td>
                <td class="px-6 py-4 font-bold text-gray-800">${entry.name}</td>
                <td class="px-6 py-4 text-blue-600">${entry.email}</td>
                <td class="px-6 py-4 text-gray-600">${entry.message}</td>
            </tr>
        `).join('');
    }

    const submissionsList = document.getElementById('submissions-list');

    if (submissionsList) {
        viewSubmissions();
    }

});