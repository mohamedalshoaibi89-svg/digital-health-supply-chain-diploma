// =========================================================
// CUSTOMIZE THESE VALUES BEFORE PUBLISHING
// =========================================================
const CONFIG = {
  // Paste the public Google Form URL here when it is ready.
  registrationUrl: "",
  // Add a confirmed venue address to enable a real Google Maps link.
  venueAddress: "",
  // Optional trainer information, e.g. "Dr. Name — Supply Chain Expert".
  trainerName: "",
  // Optional trainer biography.
  trainerBio: ""
};

const startDate = new Date("2026-12-01T09:00:00");
const $ = (id) => document.getElementById(id);
let currentLanguage = "en";

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function updateCountdown() {
  const now = new Date();
  const distance = startDate - now;
  if (distance <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => $(id).textContent = "00");
    return;
  }
  $("days").textContent = String(Math.floor(distance / 86400000)).padStart(2, "0");
  $("hours").textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0");
  $("minutes").textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0");
  $("seconds").textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, "0");
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

function setLanguage(language) {
  currentLanguage = language;
  const isArabic = language === "ar";
  document.documentElement.lang = language;
  document.body.dir = isArabic ? "rtl" : "ltr";
  document.querySelectorAll("[data-en][data-ar]").forEach(el => {
    el.innerHTML = isArabic ? el.dataset.ar : el.dataset.en;
  });
  $("languageToggle").textContent = isArabic ? "English" : "العربية";
}
$("languageToggle").addEventListener("click", () => setLanguage(currentLanguage === "en" ? "ar" : "en"));

$("menuToggle").addEventListener("click", () => {
  const nav = document.querySelector(".desktop-nav");
  const open = nav.classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".desktop-nav a").forEach(link => link.addEventListener("click", () => {
  document.querySelector(".desktop-nav").classList.remove("open");
  $("menuToggle").setAttribute("aria-expanded", "false");
}));

$("calendarButton").addEventListener("click", () => {
  // The start time is a placeholder (09:00 local time); update once the organizer confirms it.
  const start = new Date(2026, 11, 1, 9, 0, 0);
  const end = new Date(2026, 11, 1, 17, 0, 0);
  const fmt = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//UPA//Digital Health Supply Chain Diploma//EN",
    "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
    `DTSTAMP:${fmt(new Date())}`, `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
    "SUMMARY:Digital Health Supply Chain Diploma",
    "DESCRIPTION:Professional diploma organized by the Unified Procurement Authority. Confirm the final time and venue with the organizer.",
    "END:VEVENT", "END:VCALENDAR"
  ].join("\r\n");
  const blob = new Blob([ics], {type: "text/calendar;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "digital-health-supply-chain-diploma.ics";
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  showToast(currentLanguage === "ar" ? "تم تنزيل ملف التقويم. يرجى تحديث الوقت بعد تأكيده." : "Calendar file downloaded. Please update the time once confirmed.");
});

$("shareButton").addEventListener("click", async () => {
  const shareData = {
    title: "Digital Health Supply Chain Diploma",
    text: "Join the Digital Health Supply Chain Diploma, organized by the Unified Procurement Authority.",
    url: window.location.href
  };
  try {
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      showToast(currentLanguage === "ar" ? "تم نسخ رابط الدعوة." : "Invitation link copied.");
    } else {
      window.prompt(currentLanguage === "ar" ? "انسخ رابط الدعوة:" : "Copy the invitation link:", window.location.href);
    }
  } catch (error) {
    if (error.name !== "AbortError") showToast(currentLanguage === "ar" ? "تعذرت المشاركة من هذا المتصفح." : "Sharing is unavailable in this browser.");
  }
});

const registrationLink = $("registrationLink");
if (CONFIG.registrationUrl.trim()) {
  registrationLink.href = CONFIG.registrationUrl.trim();
  registrationLink.target = "_blank";
  registrationLink.rel = "noopener noreferrer";
  registrationLink.removeAttribute("aria-disabled");
  registrationLink.querySelector("span").textContent = currentLanguage === "ar" ? "سجّل الآن" : "Register now";
} else {
  registrationLink.addEventListener("click", e => {
    e.preventDefault();
    showToast(currentLanguage === "ar" ? "سيتم تفعيل التسجيل عند إضافة رابط نموذج Google." : "Registration will open when the Google Form link is added.");
  });
}

if (CONFIG.venueAddress.trim()) {
  const mapCard = document.querySelector(".map-card");
  const mapLink = document.createElement("a");
  mapLink.className = "button button-outline";
  mapLink.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.venueAddress);
  mapLink.target = "_blank";
  mapLink.rel = "noopener noreferrer";
  mapLink.textContent = "Open venue in Google Maps ↗";
  mapCard.querySelector(".map-caption").appendChild(mapLink);
}
if (CONFIG.trainerName.trim()) {
  const trainer = document.querySelector(".faculty-placeholder strong");
  trainer.textContent = CONFIG.trainerName;
  if (CONFIG.trainerBio.trim()) {
    const bio = document.querySelector(".faculty-placeholder span");
    bio.textContent = CONFIG.trainerBio;
  }
}
$("backTop").addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
