
    
        // JavaScript makes the website interactive
        
        // ===== VARIABLE DECLARATIONS =====
        // Variables store data
        
        let submissions = [];
        // submissions = array (list) to store all form submissions
        // let = keyword to declare variable
        
        let chatMessages = [
            {
                type: 'bot',
                text: "Hello! I'm the Healthcare Support Assistant. How can I help you? Ask me about services, registration, or volunteering!"
            }
            // This is the first message bot sends when page loads
            // Objects have type (who said it) and text (what they said)
        ];
        
        // ===== FAQ KNOWLEDGE BASE =====
        // This is the AI's brain - it knows answers to common questions
        
        const faqResponses = {
            // const = constant - doesn't change
            // Each key is a word/phrase, each value is the answer
            
            'hello': "Hi there! Welcome to our Healthcare Support platform.",
            
            'services': "We provide patient support, volunteer coordination, and healthcare resources.",
            
            'register': "To register, fill out the form in the Register tab. Choose your role as patient or volunteer.",
            
            'volunteer': "We'd love to have you volunteer! Register as a volunteer and tell us about your availability.",
            
            'contact': "Email us at support@healthcare.com or call 1-800-HEALTH-1.",
            
            'hours': "We're available Monday-Friday, 9 AM to 6 PM. Emergency services 24/7.",
            
            'help': "I can answer questions about services, registration, volunteering, and more. What would you like to know?"
        };
        
        // ===== FUNCTION: TAB SWITCHING =====
        
        function showTab(tabName) {
            // Function to show/hide tabs
            // tabName = which tab to show (register, chatbot, or summary)
            
            // STEP 1: Hide all tabs
            const allTabs = document.querySelectorAll('.tab-content');
            // querySelectorAll = finds ALL elements with class "tab-content"
            // document = the entire webpage
            
            allTabs.forEach(tab => {
                // forEach = loop through each tab
                tab.classList.remove('active');
                // classList.remove('active') = remove the 'active' class, hiding the tab
            });
            
            // STEP 2: Hide all tab buttons (remove highlight)
            const allButtons = document.querySelectorAll('.tab-btn');
            allButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // STEP 3: Show the selected tab
            document.getElementById(tabName).classList.add('active');
            // getElementById(tabName) = find element with id matching tabName
            // classList.add('active') = add 'active' class, showing the tab
            
            // STEP 4: Highlight the clicked button
            event.target.classList.add('active');
            // event.target = the button that was clicked
            
            // STEP 5: Update summary if summary tab opened
            if (tabName === 'summary') {
                updateSummary();
                // Call updateSummary function to refresh statistics
            }
        }
        
        // ===== FUNCTION: HANDLE FORM SUBMIT =====
        
        function handleFormSubmit(event) {
            // This function runs when user clicks "Submit Registration"
            // event = the form submission event
            
            event.preventDefault();
            // preventDefault() = stops page from reloading (default behavior)
            
            // STEP 1: Get values from form fields
            const name = document.getElementById('name').value;
            // .value = the text user typed
            
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const role = document.getElementById('role').value;
            const message = document.getElementById('message').value;
            
            // STEP 2: Validate that required fields are filled
            if (!name || !email) {
                // if NOT name or NOT email = if either is empty
                alert('Please fill in all required fields!');
                return;
                // return = stop function here, don't continue
            }
            
            // STEP 3: Create submission object
            const submission = {
                // Object containing all form data
                id: Date.now(),
                // Date.now() = current time in milliseconds (unique ID)
                name: name,
                email: email,
                phone: phone,
                role: role,
                message: message,
                timestamp: new Date().toLocaleString()
                // toLocaleString() = converts date to readable format
            };
            
            // STEP 4: Add submission to array
            submissions.push(submission);
            // push() = adds item to end of array
            
            // STEP 5: Clear form fields
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('role').value = 'patient';
            document.getElementById('message').value = '';
            
            // STEP 6: Show success message
            alert('✓ Registration submitted successfully!');
        }
        
        // ===== FUNCTION: SEND CHAT MESSAGE =====
        
        function sendChatMessage() {
            // This function runs when user clicks "Send" in chatbot
            
            // STEP 1: Get chat input
            const chatInput = document.getElementById('chatInput');
            const userMessage = chatInput.value.trim();
            // .trim() = removes extra spaces from start/end
            
            // STEP 2: Check if message is empty
            if (!userMessage) {
                // If message is empty, don't send
                return;
            }
            
            // STEP 3: Add user message to chat
            chatMessages.push({
                type: 'user',
                text: userMessage
            });
            
            // STEP 4: Get AI response
            const botResponse = getAIResponse(userMessage);
            // Call getAIResponse function to get answer
            
            // STEP 5: Add bot response to chat
            chatMessages.push({
                type: 'bot',
                text: botResponse
            });
            
            // STEP 6: Clear input field
            chatInput.value = '';
            // .value = '' means empty string
            
            // STEP 7: Refresh chat display
            displayChatMessages();
        }
        
        // ===== FUNCTION: GET AI RESPONSE =====
        
        function getAIResponse(userMessage) {
            // This is the "AI brain" - matches user input to FAQ answers
            // userMessage = what the user typed
            
            const lowerMessage = userMessage.toLowerCase();
            // toLowerCase() = converts to lowercase (so "HELLO", "Hello", "hello" all match)
            
            // Loop through all FAQ responses
            for (let key in faqResponses) {
                // for...in = loop through each question/answer pair
                
                if (lowerMessage.includes(key)) {
                    // includes() = checks if message contains this keyword
                    // e.g., if user says "how do I register" it includes "register"
                    
                    return faqResponses[key];
                    // Return the matching answer
                }
            }
            
            // If no match found, return default response
            return "I'm not sure about that. Please contact us directly at support@healthcare.com or call 1-800-HEALTH-1.";
        }
        
        // ===== FUNCTION: DISPLAY CHAT MESSAGES =====
        
        function displayChatMessages() {
            // This function shows all messages in the chat box
            
            const messagesContainer = document.getElementById('messagesContainer');
            // Find the container where messages go
            
            messagesContainer.innerHTML = '';
            // innerHTML = '' clears all content
            
            // Loop through all messages
            chatMessages.forEach(msg => {
                // Create HTML for each message
                const messageDiv = document.createElement('div');
                // createElement = creates a new HTML element
                
                messageDiv.className = `message ${msg.type}`;
                // className = sets the class (determines styling)
                // msg.type = 'user' or 'bot' (different styling for each)
                
                messageDiv.innerHTML = `<div class="message-text">${msg.text}</div>`;
                // innerHTML = the message content
                // ${msg.text} = JavaScript template string (inserts variable)
                
                messagesContainer.appendChild(messageDiv);
                // appendChild = adds the message to the container
            });
            
            // Scroll to bottom so newest message is visible
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            // scrollHeight = total height of all content
        }
        
        // ===== FUNCTION: UPDATE SUMMARY =====
        
        function updateSummary() {
            // This function updates the statistics cards
            
            // Count totals
            const totalCount = submissions.length;
            // .length = number of items in array
            
            const patientCount = submissions.filter(s => s.role === 'patient').length;
            // filter() = creates new array with only matching items
            // s => s.role === 'patient' = only items where role equals 'patient'
            
            const volunteerCount = submissions.filter(s => s.role === 'volunteer').length;
            
            // Update the HTML
            document.getElementById('totalCount').textContent = totalCount;
            // textContent = the text shown on page
            
            document.getElementById('patientCount').textContent = patientCount;
            document.getElementById('volunteerCount').textContent = volunteerCount;
            
            // Update submissions list
            const submissionsList = document.getElementById('submissionsList');
            
            if (submissions.length === 0) {
                // If no submissions
                submissionsList.innerHTML = '<p style="color: #999;">No submissions yet. Be the first to register!</p>';
                return;
                // Return early, don't continue
            }
            
            submissionsList.innerHTML = '';
            // Clear old list
            
            // Loop through submissions in reverse (newest first)
            submissions.reverse().forEach(sub => {
                // reverse() = reverses array order
                
                const subDiv = document.createElement('div');
                subDiv.className = 'submission-item';
                
                subDiv.innerHTML = `
                    <strong>${sub.name}</strong>
                    <small>Email: ${sub.email}</small><br>
                    <small>Role: ${sub.role === 'patient' ? '🏥 Patient' : '👤 Volunteer'}</small><br>
                    <small>Registered: ${sub.timestamp}</small>
                `;
                
                submissionsList.appendChild(subDiv);
            });
        }
        
        // ===== INITIALIZE PAGE =====
        
        // When page first loads, display initial chat messages
        displayChatMessages();
        
        // Done! Now the page is ready for user interaction
    