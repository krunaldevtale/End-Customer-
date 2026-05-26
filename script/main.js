$(document).ready(function () {
  $(function () {
    const $track = $(".carousel-track");
    const $slides = $(".carousel-slide");
    const $dotsContainer = $(".carousel-dots");
    let currentIndex = 0;
    const totalSlides = $slides.length;
    let autoPlayInterval;

    // Create dots
    $slides.each((i) => {
      $dotsContainer.append(`<div class="dot" data-index="${i}"></div>`);
    });
    const $dots = $(".dot");
    $dots.eq(0).addClass("active");

    function goToSlide(index) {
      const offset = index * 100;
      $track.css("transform", `translateX(-${offset}%)`);
      $dots.removeClass("active").eq(index).addClass("active");
      currentIndex = index;
    }

    $dots.on("click", function () {
      goToSlide($(this).data("index"));
    });

    function autoPlay() {
      autoPlayInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % totalSlides;
        goToSlide(nextIndex);
      }, 3000);
    }

    autoPlay();

    // Swipe Support
    let startX = 0;
    let isSwiping = false;

    $("#carousel")
      .on("touchstart", function (e) {
        startX = e.originalEvent.touches[0].clientX;
        isSwiping = true;
        clearInterval(autoPlayInterval);
      })
      .on("touchmove", function (e) {
        if (!isSwiping) return;
        const touchX = e.originalEvent.touches[0].clientX;
        const diff = startX - touchX;

        if (Math.abs(diff) > 50) {
          isSwiping = false;
          if (diff > 0) {
            // Swipe left
            goToSlide((currentIndex + 1) % totalSlides);
          } else {
            // Swipe right
            goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
          }
        }
      })
      .on("touchend", function () {
        autoPlay(); // resume autoplay
      });
  });

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();
  let selStart = null;
  let selEnd = null;
  let hovDate = null;

  function fmtDate(d) {
    if (!d) return "";
    return (
      d.getDate().toString().padStart(2, "0") +
      "/" +
      (d.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      d.getFullYear()
    );
  }

  function buildDow() {
    let html = "";
    DAYS.forEach(function (d) {
      html += `<div class="text-center text-sm font-normal text-[#424242] py-1">${d}</div>`;
    });
    $("#calDow").html(html);
  }

  function buildCal() {
    $("#calMonthLabel").text(MONTHS[viewMonth] + "  " + viewYear);

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevMonthEnd = new Date(viewYear, viewMonth, 0).getDate();

    let cells = [];
    for (let i = firstDay - 1; i >= 0; i--)
      cells.push({ day: prevMonthEnd - i, cur: false });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, cur: true });
    while (cells.length % 7 !== 0)
      cells.push({
        day: cells.length - firstDay - daysInMonth + 1,
        cur: false,
      });

    let html = "";
    cells.forEach(function (c, idx) {
      const dt = c.cur ? new Date(viewYear, viewMonth, c.day) : null;

      if (!c.cur) {
        html += `<div class="text-center text-xs text-gray-300 py-[7px] rounded-lg">${c.day}</div>`;
        return;
      }

      const isPast = dt < today;
      const isToday = dt.getTime() === today.getTime();
      const isStart = selStart && dt.getTime() === selStart.getTime();
      const isEnd = selEnd && dt.getTime() === selEnd.getTime();
      const endComp =
        selEnd || (hovDate && selStart && hovDate >= selStart ? hovDate : null);
      const isInRange = selStart && endComp && dt > selStart && dt < endComp;

      let cls = "text-center text-xs py-[7px] select-none ";

      if (isPast) {
        cls += "text-gray-300 cursor-default";
      } else if (isStart || isEnd) {
        cls += "text-white font-semibold rounded-lg cursor-pointer";
      } else if (isInRange) {
        const prevCur = cells[idx - 1] && cells[idx - 1].cur;
        const nextCur = cells[idx + 1] && cells[idx + 1].cur;
        cls += "cursor-pointer ";
        if (!prevCur) cls += "rounded-l-lg ";
        if (!nextCur) cls += "rounded-r-lg ";
      } else {
        cls += "text-gray-800 rounded-lg cursor-pointer hover:bg-[#4EAD603D]";
      }

      let inlineBg = "";
      if (isStart || isEnd) inlineBg = "background:#238B6D;";
      // else if (isInRange) inlineBg = "background:#d9f5ef;"; 

      const todayDot = isToday
        ? `<span class="block w-1 h-1 rounded-full mx-auto mt-0.5" style="background:#238B6D"></span>`
        : "";

      html += `<div class="${cls}" style="${inlineBg}" data-ts="${dt.getTime()}">${c.day}${todayDot}</div>`;
    });

    $("#calDays").html(html);
  }

  function openCalendar() {
    viewYear = today.getFullYear();
    viewMonth = today.getMonth();
    selStart = null;
    selEnd = null;
    hovDate = null;
    buildDow();
    buildCal();
    $("#calendarOverlay").removeClass("hidden");
  }

  function closeCalendar() {
    $("#calendarOverlay").addClass("hidden");
  }

  buildDow();

  // Matches your existing .calendarBtn class
  $(document).on("click", ".calendarBtn", function () {
    openCalendar();
  });

  $("#calendarOverlay").on("click", function (e) {
    if ($(e.target).is("#calendarOverlay")) closeCalendar();
  });

  $("#calendarBox").on("click", function (e) {
    e.stopPropagation();
  });

  $("#calCancel").on("click", function () {
    closeCalendar();
  });

  $("#calPrev").on("click", function () {
    viewMonth--;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear--;
    }
    buildCal();
  });

  $("#calNext").on("click", function () {
    viewMonth++;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear++;
    }
    buildCal();
  });

  $("#calDays").on("click", "[data-ts]", function () {
    if ($(this).hasClass("cursor-default")) return;
    const dt = new Date(parseInt($(this).data("ts")));
    if (!selStart || selEnd) {
      selStart = dt;
      selEnd = null;
    } else if (dt < selStart) {
      selStart = dt;
    } else if (dt.getTime() === selStart.getTime()) {
      selStart = null;
    } else {
      selEnd = dt;
    }
    buildCal();
  });

  $("#calDays").on("mouseover", "[data-ts]", function () {
    if ($(this).hasClass("cursor-default")) return;
    hovDate = new Date(parseInt($(this).data("ts")));
    if (selStart && !selEnd) buildCal();
  });

  $("#calDays").on("mouseleave", function () {
    hovDate = null;
    if (selStart && !selEnd) buildCal();
  });

  $("#calApply").on("click", function () {
    if (selStart && selEnd) {
      // Do something with selStart / selEnd here
    }
    closeCalendar();
  });

  $('.uploadButton').on('click',function(){
    $('.uploadOptionsPopup').removeClass('hidden')
  })

  $('.closeOptionsPopup').on('click',function(){
    $('.uploadOptionsPopup').addClass('hidden')
  })
});
