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

        const empty = document.getElementById('empty-state');
        if (data.length === 0) {
            if (empty) empty.classList.remove('hidden');
            return;
        } else {
            if (empty) empty.classList.add('hidden');
        }

        list.innerHTML = data.reverse().map(entry => `
            <tr class="block px-[20px] md:table-row bg-white">

                <!-- Name -->
                <td class="block font-semibold justify-start text-gray-900 md:table-cell text-lg pt-[20px] pb-2 md:p-4 md:text-base">
                    ${entry.name}
                </td>

                <!-- Contact + Email -->
                <td class="block text-sm text-gray-700 md:table-cell md:p-4 md:text-base">
                    <span class="md:hidden">${entry.tel} • ${entry.email}</span>
                    <span class="hidden md:inline">${entry.tel}</span>
                </td>

                <!-- Email column hidden on mobile -->
                <td class="hidden md:table-cell md:p-4 text-gray-700 break-all md:text-base">
                    ${entry.email}
                </td>

                <!-- Message -->
                <td class="block text-gray-700 my-[20px] overflow-auto max-h-[300px] md:table-cell md:p-4 md:overflow-y-auto md:mt-0 md:max-w-[500px]">
                    ${entry.message}
                </td>
            </tr>
        `).join('');
    }

    const submissionsList = document.getElementById('submissions-list');

    if (submissionsList) {
        viewSubmissions();
    }

});