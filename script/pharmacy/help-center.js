 
//  Form (Module 3)
 (function() {
        const uploadTrigger = document.getElementById('emailUploadTrigger');
        const fileInput = document.getElementById('emailFileInput');
        const previewArea = document.getElementById('emailPreviewArea');
        let currentEmailImage = null;

        if (uploadTrigger && fileInput && previewArea) {
            uploadTrigger.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (!file) return;
                if (file.size > 1 * 1024 * 1024) {
                    alert('File size exceeds 1MB limit');
                    fileInput.value = '';
                    return;
                }
                if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
                    alert('Only image or video files allowed');
                    fileInput.value = '';
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(ev) {
                    previewArea.innerHTML = '';
                    const wrapper = document.createElement('div');
                    wrapper.className = 'email-relative-group';
                    const img = document.createElement('img');
                    img.src = ev.target.result;
                    img.className = 'email-preview-img';
                    const removeBtn = document.createElement('span');
                    removeBtn.className = 'email-remove-img-btn material-symbols-outlined bg-white rounded-full p-0.5 text-gray-600 shadow-sm';
                    removeBtn.textContent = 'close';
                    removeBtn.style.position = 'absolute';
                    removeBtn.style.top = '-8px';
                    removeBtn.style.right = '-8px';
                    removeBtn.style.cursor = 'pointer';
                    removeBtn.onclick = () => {
                        previewArea.innerHTML = '';
                        fileInput.value = '';
                        currentEmailImage = null;
                    };
                    wrapper.appendChild(img);
                    wrapper.appendChild(removeBtn);
                    previewArea.appendChild(wrapper);
                    currentEmailImage = ev.target.result;
                };
                reader.readAsDataURL(file);
            });
        }

        const emailForm = document.getElementById('enhancedEmailForm');
        if (emailForm) {
            emailForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = emailForm.querySelector('input[type="email"]').value;
                const message = emailForm.querySelector('textarea').value;
                alert(`Email Support Request\nTo: ${email}\nMessage: ${message}\nImage attached: ${currentEmailImage ? 'Yes' : 'No'}`);
            });
        }
    })();


    // Module 4
     (function() {
        // Wait for DOM to be ready
        function initChat() {
            const container = document.getElementById('chatMessagesContainer');
            if (!container) return;
            
            // Message store
            let messages = [
                { type: 'bot', text: 'Is Cash on Delivery (COD) available?', timestamp: new Date() },
                { type: 'bot', text: 'How do I apply a coupon or discount code?', timestamp: new Date() },
                { type: 'bot', text: 'How do I get a refund if my order is cancelled?', timestamp: new Date() }
            ];
            
            let pendingAttachment = null; 
            
            // Helper: format time HH:MM AM/PM
            function formatTime(date) {
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
            
            // Escape HTML
            function escapeHtml(str) {
                return str.replace(/[&<>]/g, function(m) {
                    if (m === '&') return '&amp;';
                    if (m === '<') return '&lt;';
                    if (m === '>') return '&gt;';
                    return m;
                });
            }
            
            // Render all messages
            function renderMessages() {
                container.innerHTML = '';
                messages.forEach(msg => {
                    if (msg.type === 'bot') {
                        const div = document.createElement('div');
                        div.className = 'chat-bubble-bot';
                        div.innerHTML = `
                            <div class="avatar-bot"><span class="material-symbols-outlined">support_agent</span></div>
                            <div>
                                <div class="bubble-text-bot">${escapeHtml(msg.text)}</div>
                                ${msg.attachment ? `<div class="mt-2">${msg.attachment}</div>` : ''}
                                <div class="chat-time">${formatTime(msg.timestamp)}</div>
                            </div>
                        `;
                        container.appendChild(div);
                    } else {
                        const div = document.createElement('div');
                        div.className = 'chat-bubble-user';
                        div.innerHTML = `
                            <div>
                                <div class="bubble-text-user">${escapeHtml(msg.text)}</div>
                                ${msg.attachment ? `<div class="mt-2 text-right">${msg.attachment}</div>` : ''}
                                <div class="user-time">${formatTime(msg.timestamp)}</div>
                            </div>
                        `;
                        container.appendChild(div);
                    }
                });
                container.scrollTop = container.scrollHeight;
            }
            
            // Add a new message
            function addMessage(type, text, attachmentHtml = null, timestamp = new Date()) {
                messages.push({ type, text, attachment: attachmentHtml, timestamp });
                renderMessages();
            }
            
            // Bot reply generator
            function getBotReply(userMessage) {
                const lowerMsg = userMessage.toLowerCase();
                if (lowerMsg.includes('cash on delivery') || lowerMsg.includes('cod')) {
                    return 'Yes, Cash on Delivery is available for orders above ₹249. A small convenience fee may apply.';
                } else if (lowerMsg.includes('coupon') || lowerMsg.includes('discount')) {
                    return 'You can apply coupons at checkout page under "Apply Coupon" section. Enter your code and click apply.';
                } else if (lowerMsg.includes('refund') || lowerMsg.includes('cancelled')) {
                    return 'If your order is cancelled, refund will be processed within 5-7 business days to original payment method.';
                } else {
                    return 'Thank you for your message. Our support team will get back to you shortly.';
                }
            }
            
            // Send user message (text + optional attachment)
            function sendUserMessage(text, attachmentData = null) {
                if (!text.trim() && !attachmentData) return;
                let attachmentHtml = null;
                if (attachmentData) {
                    if (attachmentData.type === 'image') {
                        attachmentHtml = `<img src="${attachmentData.dataURL}" style="max-width:150px; max-height:150px; border-radius:8px;">`;
                    } else {
                        attachmentHtml = `<span class="attachment-chip">📎 ${escapeHtml(attachmentData.name)}</span>`;
                    }
                }
                addMessage('user', text || (attachmentData ? '📎 Sent an attachment' : ''), attachmentHtml);
                // Clear pending attachment
                pendingAttachment = null;
                updateAttachmentPreview();
                
                // Bot reply after short delay
                if (text && text.trim()) {
                    setTimeout(() => {
                        const reply = getBotReply(text);
                        addMessage('bot', reply);
                    }, 600);
                } else if (attachmentData) {
                    setTimeout(() => {
                        addMessage('bot', 'Thank you for sharing the file. Our team will review it and get back to you soon.');
                    }, 600);
                }
            }
            
            // Update attachment preview UI
            function updateAttachmentPreview() {
                const previewContainer = document.getElementById('chatAttachmentPreview');
                if (!previewContainer) return;
                previewContainer.innerHTML = '';
                if (pendingAttachment) {
                    const chip = document.createElement('div');
                    chip.className = 'attachment-chip';
                    if (pendingAttachment.type === 'image') {
                        chip.innerHTML = `<img src="${pendingAttachment.dataURL}" style="width:30px; height:30px; object-fit:cover; border-radius:6px;"> <span>${pendingAttachment.name}</span> <span class="material-symbols-outlined" style="font-size:16px; cursor:pointer;" id="removeAttachment">close</span>`;
                    } else {
                        chip.innerHTML = `<span>📎 ${pendingAttachment.name}</span> <span class="material-symbols-outlined" style="font-size:16px; cursor:pointer;" id="removeAttachment">close</span>`;
                    }
                    previewContainer.appendChild(chip);
                    document.getElementById('removeAttachment')?.addEventListener('click', () => {
                        pendingAttachment = null;
                        updateAttachmentPreview();
                    });
                }
            }
            
            // Handle file selection
            const attachBtn = document.getElementById('chatAttachBtn');
            const fileInput = document.getElementById('chatFileInput');
            attachBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                    alert('File size exceeds 2MB limit');
                    fileInput.value = '';
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(ev) {
                    let type = 'file';
                    if (file.type.startsWith('image/')) type = 'image';
                    pendingAttachment = {
                        name: file.name,
                        dataURL: ev.target.result,
                        type: type,
                        file: file
                    };
                    updateAttachmentPreview();
                    // Optionally auto-fill input with a message
                    document.getElementById('chatInput').value = `Sent file: ${file.name}`;
                };
                reader.readAsDataURL(file);
                fileInput.value = ''; // reset
            });
            
            // Voice Recognition
            const voiceBtn = document.getElementById('chatVoiceBtn');
            let recognition = null;
            let isRecording = false;
            
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';
                
                recognition.onstart = () => {
                    isRecording = true;
                    voiceBtn.classList.add('recording-active');
                    voiceBtn.style.color = '#ef4444';
                };
                recognition.onend = () => {
                    isRecording = false;
                    voiceBtn.classList.remove('recording-active');
                    voiceBtn.style.color = '';
                };
                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    const inputField = document.getElementById('chatInput');
                    inputField.value = transcript;
                    // Auto send after voice input
                    if (transcript.trim()) {
                        sendUserMessage(transcript);
                        inputField.value = '';
                    }
                };
                recognition.onerror = (event) => {
                    console.error('Speech recognition error', event.error);
                    alert('Voice recognition error: ' + event.error);
                    isRecording = false;
                    voiceBtn.classList.remove('recording-active');
                    voiceBtn.style.color = '';
                };
            } else {
                voiceBtn.style.opacity = '0.5';
                voiceBtn.title = 'Voice recognition not supported in this browser';
                voiceBtn.style.cursor = 'not-allowed';
            }
            
            voiceBtn.addEventListener('click', () => {
                if (!recognition) {
                    alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
                    return;
                }
                if (isRecording) {
                    recognition.stop();
                } else {
                    recognition.start();
                }
            });
            
            // Send button logic
            const sendBtn = document.getElementById('sendChatBtn');
            const input = document.getElementById('chatInput');
            
            function handleSend() {
                const text = input.value.trim();
                if (text || pendingAttachment) {
                    sendUserMessage(text, pendingAttachment);
                    input.value = '';
                }
            }
            
            sendBtn.addEventListener('click', handleSend);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                }
            });
            
            // Quick prompts
            document.querySelectorAll('.quick-prompt').forEach(btn => {
                btn.addEventListener('click', () => {
                    const promptText = btn.innerText;
                    sendUserMessage(promptText);
                });
            });
            
            // Initial render
            renderMessages();
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initChat);
        } else {
            initChat();
        }
    })();

    // module 5

     (function() {
        // ---------- Generate ticket data (33 rows, 11 per page) ----------
        const issueTypes = ['Service Request', 'Payment Issue', 'Account Verification', 'Order Modification', 'Refund Request', 'Delivery Complaint'];
        const statuses = ['On Hold', 'Resolved', 'Active', 'Closed'];
        const statusColors = {
            'On Hold': 'bg-[#F79E1B78] font-semibold   text-[#6F4E01]',
            'Resolved': 'bg-[#CAF8E4] font-semibold text-[#088178]',
            'Active': 'bg-[#1890FF2E] font-semibold text-[#1890FF]',
            'Closed': 'bg-[#FFD1D2] font-semibold text-[#E62552]'
        };
        const issueToTypeMap = {
            'Service Request': 'Order & Bidding',
            'Payment Issue': 'Payments',
            'Account Verification': 'Account Verification',
            'Order Modification': 'Order & Bidding',
            'Refund Request': 'Returns',
            'Delivery Complaint': 'Delivery'
        };
        const issueDescMap = {
            'Service Request': 'My accepted bid disappeared',
            'Payment Issue': 'My accepted bid disappeared',
            'Account Verification': 'Email verification pending',
            'Order Modification': 'I want to modify my order',
            'Refund Request': 'Refund not processed',
            'Delivery Complaint': 'Order not delivered'
        };
        
        // Demo image URLs for tickets (can be customized)
        const getTicketImages = (ticketId, issue) => {
            // Return array of image URLs (max 2 for demo)
            const baseImages = [
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
                'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=100&q=80'
            ];
            // For demo, show 1-2 images per ticket
            const numImages = (parseInt(ticketId.replace('#', '')) % 2) + 1;
            return baseImages.slice(0, numImages);
        };
        
        let allTickets = [];
        for (let i = 1; i <= 33; i++) {
            const ticketId = `#${778400 + i}`;
            const issue = issueTypes[Math.floor(Math.random() * issueTypes.length)];
            const date = `Mar ${Math.floor(Math.random() * 28) + 1}, ${2024 + (Math.random() > 0.7 ? 1 : 0)}`;
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            allTickets.push({ ticketId, issue, date, status });
        }
        // Override first 11 rows to match image data
        const firstRows = [
            { ticketId: '#778456', issue: 'Service Request', date: 'Mar 26, 2024', status: 'On Hold' },
            { ticketId: '#778755', issue: 'Payment Issue', date: 'Mar 24, 2025', status: 'Resolved' },
            { ticketId: '#778456', issue: 'Account Verification', date: 'Mar 26, 2024', status: 'Active' },
            { ticketId: '#778755', issue: 'Payment Issue', date: 'Mar 24, 2025', status: 'Closed' },
            { ticketId: '#778755', issue: 'Payment Issue', date: 'Mar 24, 2025', status: 'Active' },
            { ticketId: '#778456', issue: 'Account Verification', date: 'Mar 26, 2024', status: 'Active' },
            { ticketId: '#778755', issue: 'Payment Issue', date: 'Mar 24, 2025', status: 'Active' },
            { ticketId: '#778456', issue: 'Service Request', date: 'Mar 26, 2024', status: 'On Hold' },
            { ticketId: '#778456', issue: 'Account Verification', date: 'Mar 26, 2024', status: 'Active' },
            { ticketId: '#778456', issue: 'Service Request', date: 'Mar 26, 2024', status: 'On Hold' },
            { ticketId: '#778456', issue: 'Service Request', date: 'Mar 26, 2024', status: 'On Hold' }
        ];
        for (let i = 0; i < firstRows.length; i++) allTickets[i] = firstRows[i];
        
        let currentPage = 1, rowsPerPage = 11;
        let filteredTickets = [...allTickets];
        let currentFilter = 'all';
        let currentSort = { column: null, order: 'asc' };
        
        const tbody = document.getElementById('ticketTableBody');
        const searchInput = document.getElementById('ticketSearchInput');
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        const paginationDiv = document.getElementById('paginationNumbers');
        const sortBtn = document.getElementById('sortBtn');
        const filterBtn = document.getElementById('filterBtn');
        
        // Modal elements
        const modal = document.getElementById('ticketModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const startConvBtn = document.getElementById('startNewConversationBtn');
        const modalIssueTitle = document.getElementById('modalIssueTitle');
        const modalTicketIdSpan = document.getElementById('modalTicketId');
        const modalStatusBadge = document.getElementById('modalStatusBadge');
        const modalIssueTypeSpan = document.getElementById('modalIssueType');
        const modalIssueDescSpan = document.getElementById('modalIssueDesc');
        const modalImagesContainer = document.getElementById('modalImagesContainer');
        
        function openModal(ticket) {
            modalIssueTitle.textContent = ticket.issue;
            modalTicketIdSpan.textContent = ticket.ticketId;
            modalStatusBadge.textContent = ticket.status === 'Resolved' ? 'Successful' : ticket.status;
            modalStatusBadge.className = `text-sm font-semibold ${ticket.status === 'Resolved' ? 'text-[#32B947]' : 'text-gray-500'}`;
            modalIssueTypeSpan.textContent = issueToTypeMap[ticket.issue] || 'General';
            modalIssueDescSpan.textContent = issueDescMap[ticket.issue] || 'Customer reported an issue';
            
            // Load images for this ticket
            const images = getTicketImages(ticket.ticketId, ticket.issue);
            modalImagesContainer.innerHTML = '';
            images.forEach((imgUrl, idx) => {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'relative w-16 h-16 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden p-1 flex items-center justify-center';
                imgDiv.innerHTML = `
                    <img src="${imgUrl}" alt="uploaded-${idx}" class="w-full h-full object-cover rounded-lg" />
                    <button class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shadow-sm border border-white modal-image-remove" data-img="${imgUrl}">×</button>
                `;
                modalImagesContainer.appendChild(imgDiv);
            });
            // If no images, show placeholder
            if (images.length === 0) {
                modalImagesContainer.innerHTML = '<div class="text-xs text-gray-400">No image uploaded</div>';
            }
            
            // Attach remove button listeners (demo only - removal from UI)
            document.querySelectorAll('.modal-image-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    btn.parentElement.remove();
                    if (modalImagesContainer.children.length === 0) {
                        modalImagesContainer.innerHTML = '<div class="text-xs text-gray-400">No image uploaded</div>';
                    }
                });
            });
            
            modal.classList.remove('hidden');
        }
        
        function closeModal() { modal.classList.add('hidden'); }
        function startNewConversation() {
            closeModal();
            if (typeof window.switchHelpTab === 'function') {
                window.switchHelpTab('chat');
            } else {
                // Fallback: trigger click on chat tab
                const chatTab = document.getElementById('tab-chat');
                if (chatTab) chatTab.click();
            }
        }
        
        function attachModalTriggers() {
            document.querySelectorAll('#ticketTableBody .material-symbols-outlined').forEach(icon => {
                if (icon.textContent === 'visibility') {
                    icon.removeEventListener('click', icon._handler);
                    const handler = (e) => {
                        e.stopPropagation();
                        const row = icon.closest('tr');
                        if (row) {
                            const cells = row.cells;
                            const ticketId = cells[0]?.innerText.trim();
                            const issue = cells[1]?.innerText.trim();
                            const date = cells[2]?.innerText.trim();
                            const statusElem = cells[3]?.querySelector('span')?.innerText.trim() || cells[3]?.innerText.trim();
                            const ticket = allTickets.find(t => t.ticketId === ticketId && t.issue === issue && t.date === date) ||
                                           { ticketId, issue, date, status: statusElem };
                            openModal(ticket);
                        }
                    };
                    icon.addEventListener('click', handler);
                    icon._handler = handler;
                }
            });
        }
        
        function renderTable() {
            const start = (currentPage-1)*rowsPerPage, end = start+rowsPerPage;
            const pageTickets = filteredTickets.slice(start, end);
            tbody.innerHTML = '';
            pageTickets.forEach(t => {
                const row = tbody.insertRow();
                row.className = 'hover:bg-gray-50 transition';
                row.innerHTML = `
                    <td class="px-5 py-1.5 text-center  text-[#212B36]">${t.ticketId}</td>
                    <td class="px-5 py-1.5 text-center text-[#212B36]">${t.issue}</td>
                    <td class="px-5 py-1.5 text-center text-[#212B36]">${t.date}</td>
                    <td class="px-5 py-1.5 text-center"><span class="inline-block w-[110px] h-[38px] px-6 py-2 rounded-lg ${statusColors[t.status]} font-semibold text-sm min-w-[85px]">${t.status}</span></td>
                    <td class="px-5 py-4 text-center"><span class="material-symbols-outlined text-sea-green-deep cursor-pointer hover:opacity-80 text-xs">visibility</span></td>
                `;
            });
            attachModalTriggers();
        }
        
        function updatePagination() {
            const total = Math.ceil(filteredTickets.length / rowsPerPage);
            paginationDiv.innerHTML = '';
            for (let i=1; i<=total; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                btn.className = `w-8 h-8 rounded-md text-sm font-medium transition ${i===currentPage ? 'bg-sea-green-deep text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`;
                btn.onclick = () => { currentPage = i; renderTable(); updatePagination(); updatePrevNext(); };
                paginationDiv.appendChild(btn);
            }
            updatePrevNext();
        }
        function updatePrevNext() {
            const total = Math.ceil(filteredTickets.length / rowsPerPage);
            prevBtn.disabled = currentPage===1;
            nextBtn.disabled = currentPage===total || total===0;
            prevBtn.classList.toggle('opacity-50', currentPage===1);
            nextBtn.classList.toggle('opacity-50', currentPage===total || total===0);
        }
        
        function applyFilters() {
            let temp = [...allTickets];
            const term = searchInput.value.toLowerCase();
            if (currentFilter !== 'all') {
                const map = { active:'Active', resolved:'Resolved', onhold:'On Hold', closed:'Closed' };
                temp = temp.filter(t => t.status === map[currentFilter]);
            }
            if (term) {
                temp = temp.filter(t => 
                    t.ticketId.toLowerCase().includes(term) || 
                    t.issue.toLowerCase().includes(term) || 
                    t.date.includes(term) || 
                    t.status.toLowerCase().includes(term)
                );
            }
            filteredTickets = temp;
            currentPage = 1;
            renderTable();
            updatePagination();
        }
        
        function toggleSort() {
            filteredTickets.sort((a,b) => {
                const cmp = a.issue.localeCompare(b.issue);
                return currentSort.order === 'asc' ? cmp : -cmp;
            });
            currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
            currentPage = 1;
            renderTable();
            updatePagination();
        }
        
        function cycleFilter() {
            const cycle = ['all','active','resolved','onhold','closed'];
            let idx = cycle.indexOf(currentFilter);
            currentFilter = cycle[(idx+1)%cycle.length];
            filterBtn.innerHTML = currentFilter !== 'all' 
                ? `<span class="material-symbols-outlined text-base">filter_list</span>Filter: ${currentFilter}` 
                : `<span class="material-symbols-outlined text-base">filter_list</span>Filter`;
            applyFilters();
        }
        
        // Event listeners
        searchInput.addEventListener('input', applyFilters);
        prevBtn.addEventListener('click', () => { if(currentPage>1){ currentPage--; renderTable(); updatePagination(); } });
        nextBtn.addEventListener('click', () => { const total=Math.ceil(filteredTickets.length/rowsPerPage); if(currentPage<total){ currentPage++; renderTable(); updatePagination(); } });
        sortBtn.addEventListener('click', toggleSort);
        filterBtn.addEventListener('click', cycleFilter);
        closeModalBtn.addEventListener('click', closeModal);
        startConvBtn.addEventListener('click', startNewConversation);
        modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
        
        // Initial render
        applyFilters();
    })();


     function switchHelpTab(tabName) {
                const contentIds = ['faq', 'report', 'email', 'chat', 'history'];
                contentIds.forEach(id => {
                    const btn = document.getElementById('tab-' + id);
                    const contentBlock = document.getElementById('content-' + id);
                    if (id === tabName) {
                        btn.className = "px-5 py-2 rounded-full text-sm font-medium bg-sea-green-deep text-white transition";
                        contentBlock.classList.remove('hidden');
                    } else {
                        btn.className = "px-5 py-2 rounded-full text-sm font-medium border border-gray-light3 text-gray hover:bg-gray-50 transition";
                        contentBlock.classList.add('hidden');
                    }
                });
            }
       
        // <!-- Enhanced Report Panel Scripts (Multi-select, Image Preview) -->
       
       
            (function() {
                // Multi-select Issue Type
                const issueTypeContainer = document.getElementById('issueTypeMultiselect');
                const issueTypeTrigger = document.getElementById('issueTypeTrigger');
                const issueTypeDropdown = document.getElementById('issueTypeDropdown');
                const issueTypeChipsContainer = document.getElementById('issueTypeChipsContainer');
                const issueTypePlaceholder = document.getElementById('issueTypePlaceholder');
                let selectedIssueTypes = [];

                const issueItemContainer = document.getElementById('issueItemMultiselect');
                const issueItemTrigger = document.getElementById('issueItemTrigger');
                const issueItemDropdown = document.getElementById('issueItemDropdown');
                const issueItemChipsContainer = document.getElementById('issueItemChipsContainer');
                const issueItemPlaceholder = document.getElementById('issueItemPlaceholder');
                let selectedIssueItems = [];

                function renderIssueTypeChips() {
                    issueTypeChipsContainer.innerHTML = '';
                    if (selectedIssueTypes.length === 0) {
                        issueTypePlaceholder.style.display = 'inline';
                        issueTypeChipsContainer.appendChild(issueTypePlaceholder);
                    } else {
                        issueTypePlaceholder.style.display = 'none';
                        selectedIssueTypes.forEach(value => {
                            const chip = document.createElement('span');
                            chip.className = 'chip';
                            chip.innerHTML = `${value} <span class="chip-remove material-symbols-outlined" data-value="${value}" style="font-size:14px">close</span>`;
                            chip.querySelector('.chip-remove').addEventListener('click', (e) => {
                                e.stopPropagation();
                                selectedIssueTypes = selectedIssueTypes.filter(v => v !== value);
                                renderIssueTypeChips();
                            });
                            issueTypeChipsContainer.appendChild(chip);
                        });
                    }
                }

                function renderIssueItemChips() {
                    issueItemChipsContainer.innerHTML = '';
                    if (selectedIssueItems.length === 0) {
                        issueItemPlaceholder.style.display = 'inline';
                        issueItemChipsContainer.appendChild(issueItemPlaceholder);
                    } else {
                        issueItemPlaceholder.style.display = 'none';
                        selectedIssueItems.forEach(value => {
                            const chip = document.createElement('span');
                            chip.className = 'chip';
                            chip.innerHTML = `${value} <span class="chip-remove material-symbols-outlined" data-value="${value}" style="font-size:14px">close</span>`;
                            chip.querySelector('.chip-remove').addEventListener('click', (e) => {
                                e.stopPropagation();
                                selectedIssueItems = selectedIssueItems.filter(v => v !== value);
                                renderIssueItemChips();
                            });
                            issueItemChipsContainer.appendChild(chip);
                        });
                    }
                }

                function closeAllDropdowns() {
                    issueTypeDropdown.classList.add('hidden');
                    issueItemDropdown.classList.add('hidden');
                }
                issueTypeTrigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeAllDropdowns();
                    issueTypeDropdown.classList.toggle('hidden');
                });
                issueItemTrigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeAllDropdowns();
                    issueItemDropdown.classList.toggle('hidden');
                });
                document.addEventListener('click', function(e) {
                    if (!issueTypeContainer.contains(e.target)) issueTypeDropdown.classList.add('hidden');
                    if (!issueItemContainer.contains(e.target)) issueItemDropdown.classList.add('hidden');
                });

                document.querySelectorAll('#issueTypeDropdown .option-item').forEach(opt => {
                    opt.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const val = opt.getAttribute('data-value');
                        if (!selectedIssueTypes.includes(val)) {
                            selectedIssueTypes.push(val);
                            renderIssueTypeChips();
                        }
                        issueTypeDropdown.classList.add('hidden');
                    });
                });

                document.querySelectorAll('#issueItemDropdown .option-item').forEach(opt => {
                    opt.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const val = opt.getAttribute('data-value');
                        if (!selectedIssueItems.includes(val)) {
                            selectedIssueItems.push(val);
                            renderIssueItemChips();
                            if (selectedIssueItems.length === 1) {
                                document.getElementById('issueDescriptionInput').value = val;
                            }
                        }
                        issueItemDropdown.classList.add('hidden');
                    });
                });

                renderIssueTypeChips();
                renderIssueItemChips();

                // Image Upload Preview
                const uploadTrigger = document.getElementById('uploadTrigger');
                const fileInput = document.getElementById('imageFileInput');
                const previewArea = document.getElementById('imagePreviewArea');
                let currentImageData = null;

                uploadTrigger.addEventListener('click', () => fileInput.click());
                fileInput.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 1 * 1024 * 1024) {
                        alert('File size exceeds 1MB limit');
                        fileInput.value = '';
                        return;
                    }
                    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
                        alert('Only image or video files allowed');
                        fileInput.value = '';
                        return;
                    }
                    const reader = new FileReader();
                    reader.onload = function(ev) {
                        previewArea.innerHTML = '';
                        const wrapper = document.createElement('div');
                        wrapper.className = 'relative-group';
                        const img = document.createElement('img');
                        img.src = ev.target.result;
                        img.className = 'preview-img';
                        const removeBtn = document.createElement('span');
                        removeBtn.className = 'remove-img-btn material-symbols-outlined bg-white rounded-full p-0.5 text-gray-600 shadow-sm';
                        removeBtn.textContent = 'close';
                        removeBtn.style.position = 'absolute';
                        removeBtn.style.top = '-8px';
                        removeBtn.style.right = '-8px';
                        removeBtn.style.cursor = 'pointer';
                        removeBtn.onclick = () => {
                            previewArea.innerHTML = '';
                            fileInput.value = '';
                            currentImageData = null;
                        };
                        wrapper.appendChild(img);
                        wrapper.appendChild(removeBtn);
                        previewArea.appendChild(wrapper);
                        currentImageData = ev.target.result;
                    };
                    reader.readAsDataURL(file);
                });

                const form = document.getElementById('enhancedReportForm');
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const desc = document.getElementById('issueDescriptionInput').value;
                    alert(`Issue Reported\nType(s): ${selectedIssueTypes.join(', ') || 'none'}\nIssue(s): ${selectedIssueItems.join(', ') || 'none'}\nDescription: ${desc}\nImage attached: ${currentImageData ? 'Yes' : 'No'}`);
                });
            })();