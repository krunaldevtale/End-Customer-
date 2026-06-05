(function() {
  let modal = document.getElementById('rxGlobalModal');
  if (!modal) return;

  let currentFile = null;
  let selectedPrescriptionId = null;

  const resetSelections = () => {
    currentFile = null;
    selectedPrescriptionId = null;
    const fileDiv = document.getElementById('selectedFileDisplay');
    if (fileDiv) fileDiv.innerHTML = '';
    const fileInput = document.getElementById('hiddenFileInput');
    if (fileInput) fileInput.value = '';

    document.querySelectorAll('.rx-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('input[name="savedPrescription"]').forEach(r => r.checked = false);
  };

  const updateFileUI = (fileName) => {
    const container = document.getElementById('selectedFileDisplay');
    if (!container) return;
    if (fileName) {
      container.innerHTML = `<div class="mt-2 text-[0.75rem] text-[#1f2937] inline-flex items-center gap-1.5"><i class="fas fa-file-alt"></i> ${fileName} <button id="clearFileBtn" class="text-red-500 font-bold ml-1.5 cursor-pointer bg-none border-none">Remove</button></div>`;
      document.getElementById('clearFileBtn').onclick = (e) => {
        e.stopPropagation();
        currentFile = null;
        updateFileUI(null);
        document.getElementById('hiddenFileInput').value = '';
      };
    } else {
      container.innerHTML = '';
    }
  };

  const selectPrescription = (id) => {
    if (currentFile) {
      currentFile = null;
      updateFileUI(null);
      document.getElementById('hiddenFileInput').value = '';
    }
    selectedPrescriptionId = id;
    document.querySelectorAll('.rx-card').forEach(card => card.classList.remove('selected'));
    
    const selectedCard = document.getElementById(`rxCard${id === 'rx1' ? '1' : '2'}`);
    if (selectedCard) selectedCard.classList.add('selected');
    
    const radio = document.getElementById(`rxRadio${id === 'rx1' ? '1' : '2'}`);
    if (radio) radio.checked = true;
  };

  const handleFile = (file) => {
    const allowed = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4'];
    if (!allowed.includes(file.type)) {
      alert('Invalid format. Only JPEG, PNG, PDF, MP4 allowed.');
      return false;
    }
    if (file.size > 50 * 1024 * 1024) {
      alert('File exceeds 50MB limit.');
      return false;
    }
    
    document.querySelectorAll('.rx-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('input[name="savedPrescription"]').forEach(r => r.checked = false);
    selectedPrescriptionId = null;
    currentFile = file;
    updateFileUI(file.name);
    return true;
  };

  // UI action handlers binding
  const closeModal = () => {
    modal.classList.add('invisible', 'opacity-0');
    resetSelections();
  };

  document.getElementById('cancelModalBtn')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  const selectBtn = document.getElementById('selectFileBtn');
  const hiddenFile = document.getElementById('hiddenFileInput');
  if (selectBtn && hiddenFile) {
    selectBtn.onclick = () => hiddenFile.click();
    hiddenFile.onchange = (e) => {
      if (e.target.files?.[0]) handleFile(e.target.files[0]);
    };
  }

  const dragZone = document.getElementById('dragDropZone');
  if (dragZone) {
    ['dragenter','dragover','dragleave','drop'].forEach(ev => dragZone.addEventListener(ev, (e) => e.preventDefault()));
    dragZone.ondragenter = () => dragZone.classList.add('bg-[#f0fdfa]');
    dragZone.ondragleave = () => dragZone.classList.remove('bg-[#f0fdfa]');
    dragZone.ondrop = (e) => {
      e.preventDefault();
      dragZone.classList.remove('bg-[#f0fdfa]');
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    };
  }

  document.getElementById('rxCard1')?.addEventListener('click', () => selectPrescription('rx1'));
  document.getElementById('rxCard2')?.addEventListener('click', () => selectPrescription('rx2'));

  document.getElementById('continueModalBtn')?.addEventListener('click', () => {
    if (currentFile) {
      alert(`✅ Prescription file "${currentFile.name}" attached. You can now proceed.`);
      closeModal();
    } else if (selectedPrescriptionId === 'rx1') {
      alert('📄 Prescriptions_June2026.pdf selected. Proceed with order.');
      closeModal();
    } else if (selectedPrescriptionId === 'rx2') {
      alert('📄 Diabetes_T1.pdf selected. Proceed with order.');
      closeModal();
    } else {
      alert('⚠️ Please upload a prescription or choose from saved prescriptions.');
    }
  });

  document.getElementById('viewAllLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('📚 View all saved prescriptions (demo: 2 available)');
  });

  window.showPrescriptionModal = () => {
    resetSelections();
    modal.classList.remove('invisible', 'opacity-0');
  };

  const attachUploadBtn = () => {
    const btns = Array.from(document.querySelectorAll('button'));
    const uploadBtn = btns.find(btn => btn.textContent.trim() === 'Upload Now');
    if (uploadBtn) {
      uploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.showPrescriptionModal();
      });
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attachUploadBtn);
  else attachUploadBtn();
})();


