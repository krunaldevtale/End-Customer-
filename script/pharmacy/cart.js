(function() {
    const container = document.getElementById('scrollContainer');
    const leftBtn = document.getElementById('scrollLeftBtn');
    const rightBtn = document.getElementById('scrollRightBtn');

    if (!container || !leftBtn || !rightBtn) return;

    // Scroll by approximately 2 cards width (adjust as needed)
    const scrollAmount = 420; // pixels

    leftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Optional: hide buttons when at start/end (adds polish)
    const updateButtons = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      leftBtn.style.opacity = container.scrollLeft <= 10 ? '0.4' : '1';
      rightBtn.style.opacity = container.scrollLeft >= maxScroll - 10 ? '0.4' : '1';
    };
    container.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
  })();


  const tabs = document.querySelectorAll(".tab-btn");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(btn => btn.classList.remove("active-tab"));
    tab.classList.add("active-tab");
  });
});

  lucide.createIcons();