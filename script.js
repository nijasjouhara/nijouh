/* =====================================================
   WEDDING WEBSITE SCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const opening =
    document.getElementById("opening");

const music =
    document.getElementById("weddingMusic");

const musicBtn =
    document.getElementById("musicBtn");

const panelMusicBtn =
    document.getElementById("panelMusicBtn");

const volumeControl =
    document.getElementById("volumeControl");

const weddingVideoPlayer =
    document.getElementById("weddingVideoPlayer");


/* =====================================================
   OPENING SCREEN
===================================================== */

if(opening){

    const closeOpening = () => {

        opening.classList.add("hide");

        setTimeout(() => {

            opening.style.display = "none";

        }, 800);

    };


    /*
       First touch/click:
       Close opening + start wedding music
    */

    const firstInteraction = () => {

        if(music){

            startMusic();

        }

        closeOpening();

    };


    setTimeout(() => {

        closeOpening();

    }, 3000);


    opening.addEventListener(
        "pointerdown",
        firstInteraction
    );


    opening.addEventListener(
        "touchstart",
        firstInteraction,
        {
            passive: true
        }
    );

}


/* =====================================================
   MUSIC
===================================================== */

let musicStarted = false;


if(music){

    music.volume = volumeControl
        ? Number(volumeControl.value)
        : 0.55;

}


/* =====================================================
   MUSIC START
===================================================== */

function startMusic(){

    if(!music) return;


    /*
       NEVER start website music while
       wedding video is playing
    */

    if(
        weddingVideoPlayer &&
        !weddingVideoPlayer.paused
    ){

        return;

    }


    music.volume = volumeControl
        ? Number(volumeControl.value)
        : 0.55;


    const playPromise =
        music.play();


    if(playPromise !== undefined){

        playPromise
            .then(() => {

                /*
                   Extra protection in case
                   video started at the same time
                */

                if(
                    weddingVideoPlayer &&
                    !weddingVideoPlayer.paused
                ){

                    music.pause();

                    musicStarted = false;

                    updateMusicButtons();

                    return;

                }


                musicStarted = true;

                updateMusicButtons();

            })
            .catch(() => {

                musicStarted = false;

                updateMusicButtons();

            });

    }

}


/* =====================================================
   MUSIC BUTTON UPDATE
===================================================== */

function updateMusicButtons(){

    if(!music) return;


    const isPlaying =
        !music.paused;


    if(musicBtn){

        musicBtn.classList.toggle(
            "playing",
            isPlaying
        );


        musicBtn.setAttribute(
            "aria-pressed",
            isPlaying
                ? "true"
                : "false"
        );

    }


    if(panelMusicBtn){

        panelMusicBtn.classList.toggle(
            "playing",
            isPlaying
        );


        panelMusicBtn.setAttribute(
            "aria-pressed",
            isPlaying
                ? "true"
                : "false"
        );

    }

}


/* =====================================================
   MAIN MUSIC BUTTON
===================================================== */

if(musicBtn){

    musicBtn.addEventListener(
        "click",
        () => {

            if(!music) return;


            /*
               Do not allow music while
               video is playing
            */

            if(
                weddingVideoPlayer &&
                !weddingVideoPlayer.paused
            ){

                music.pause();

                musicStarted = false;

                updateMusicButtons();

                return;

            }


            if(music.paused){

                startMusic();

            }else{

                music.pause();

                musicStarted = false;

                updateMusicButtons();

            }

        }
    );

}


/* =====================================================
   MUSIC EVENTS
===================================================== */

if(music){

    music.addEventListener(
        "play",
        () => {


            /*
               Video always has audio priority
            */

            if(
                weddingVideoPlayer &&
                !weddingVideoPlayer.paused
            ){

                music.pause();

                musicStarted = false;

                updateMusicButtons();

                return;

            }


            musicStarted = true;

            updateMusicButtons();

        }
    );


    music.addEventListener(
        "pause",
        () => {

            updateMusicButtons();

        }
    );


    music.addEventListener(
        "ended",
        () => {

            musicStarted = false;

            updateMusicButtons();

        }
    );

}


/* =====================================================
   HERO SCROLL
===================================================== */

const heroScroll =
    document.getElementById(
        "heroScroll"
    );


if(heroScroll){

    heroScroll.addEventListener(
        "click",
        () => {

            const target =
                document.getElementById(
                    "countdown"
                );


            if(target){

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate =
    new Date(
        "2026-09-21T11:00:00+05:30"
    ).getTime();


function updateCountdown(){

    const now =
        new Date().getTime();


    const distance =
        weddingDate - now;


    const days =
        document.getElementById(
            "days"
        );

    const hours =
        document.getElementById(
            "hours"
        );

    const minutes =
        document.getElementById(
            "minutes"
        );

    const seconds =
        document.getElementById(
            "seconds"
        );


    if(distance <= 0){

        if(days)
            days.textContent = "00";

        if(hours)
            hours.textContent = "00";

        if(minutes)
            minutes.textContent = "00";

        if(seconds)
            seconds.textContent = "00";

        return;

    }


    const d =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const h =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const m =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const s =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    if(days)
        days.textContent =
            String(d).padStart(2, "0");


    if(hours)
        hours.textContent =
            String(h).padStart(2, "0");


    if(minutes)
        minutes.textContent =
            String(m).padStart(2, "0");


    if(seconds)
        seconds.textContent =
            String(s).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if(
    "IntersectionObserver" in window
){

    const revealObserver =
        new IntersectionObserver(
            (
                entries,
                observer
            ) => {

                entries.forEach(
                    entry => {

                        if(
                            entry.isIntersecting
                        ){

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

}else{

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =====================================================
   PRE HERO SHOW
===================================================== */

const preHero =
    document.getElementById(
        "preHero"
    );


if(preHero){

    setTimeout(
        () => {

            preHero.classList.add(
                "show"
            );

        },
        100
    );

}


/* =====================================================
   WAKE LOCK
===================================================== */

let wakeLock = null;


async function requestWakeLock(){

    try{

        if(
            "wakeLock" in navigator
        ){

            wakeLock =
                await navigator.wakeLock.request(
                    "screen"
                );

        }

    }catch(error){

        console.log(
            "Wake Lock unavailable"
        );

    }

}


async function releaseWakeLock(){

    try{

        if(wakeLock){

            await wakeLock.release();

            wakeLock = null;

        }

    }catch(error){

        console.log(
            "Wake Lock release failed"
        );

    }

}


/* =====================================================
   AUTO SCROLL
===================================================== */

let autoScrolling = false;

let autoScrollFrame = null;

let resumeTimer = null;

const AUTO_SCROLL_SPEED = 0.65;


function autoScroll(){

    if(!autoScrolling)
        return;


    const settingsPanel =
        document.getElementById(
            "settingsPanel"
        );


    if(
        settingsPanel &&
        settingsPanel.classList.contains(
            "open"
        )
    ){

        autoScrolling = false;

        return;

    }


    window.scrollBy(
        0,
        AUTO_SCROLL_SPEED
    );


    const reachedBottom =
        window.innerHeight +
        window.scrollY >=
        document.documentElement
            .scrollHeight - 2;


    if(reachedBottom){

        autoScrolling = false;

        return;

    }


    autoScrollFrame =
        requestAnimationFrame(
            autoScroll
        );

}


function startAutoScroll(){

    if(autoScrolling)
        return;


    const settingsPanel =
        document.getElementById(
            "settingsPanel"
        );


    if(
        settingsPanel &&
        settingsPanel.classList.contains(
            "open"
        )
    ){

        return;

    }


    autoScrolling = true;


    cancelAnimationFrame(
        autoScrollFrame
    );


    autoScroll();

}


function pauseAutoScroll(){

    autoScrolling = false;


    cancelAnimationFrame(
        autoScrollFrame
    );


    clearTimeout(
        resumeTimer
    );

}


function scheduleResume(){

    pauseAutoScroll();


    resumeTimer =
        setTimeout(
            () => {

                const settingsPanel =
                    document.getElementById(
                        "settingsPanel"
                    );


                if(
                    settingsPanel &&
                    settingsPanel.classList.contains(
                        "open"
                    )
                ){

                    return;

                }


                startAutoScroll();

            },
            4000
        );

}


/* =====================================================
   START AUTO SCROLL AFTER 5 SECONDS
===================================================== */

setTimeout(
    () => {

        startAutoScroll();

    },
    5000
);


/* =====================================================
   AUTO SCROLL USER INTERACTION
===================================================== */

[
    "touchstart",
    "wheel",
    "pointerdown",
    "keydown"
].forEach(
    eventName => {

        window.addEventListener(
            eventName,
            () => {

                scheduleResume();

            },
            {
                passive:
                    eventName !==
                    "keydown"
            }
        );

    }
);


/* =====================================================
   LANGUAGE
===================================================== */

const translations = {

    en: {

        settings: "Settings",
        language: "Language",
        theme: "Theme",
        music: "Music",
        volume: "Volume",

        system: "System",
        light: "Light",
        dark: "Dark",

        on: "On",
        off: "Off"

    },


    ml: {

        settings: "ക്രമീകരണങ്ങൾ",
        language: "ഭാഷ",
        theme: "തീം",
        music: "സംഗീതം",
        volume: "ശബ്ദം",

        system: "സിസ്റ്റം",
        light: "ലൈറ്റ്",
        dark: "ഡാർക്ക്",

        on: "ഓൺ",
        off: "ഓഫ്"

    },


    ar: {

        settings: "الإعدادات",
        language: "اللغة",
        theme: "المظهر",
        music: "الموسيقى",
        volume: "مستوى الصوت",

        system: "النظام",
        light: "فاتح",
        dark: "داكن",

        on: "تشغيل",
        off: "إيقاف"

    }

};


let currentLanguage = "en";


function applyLanguage(
    language
){

    if(
        !translations[language]
    )
        return;


    currentLanguage =
        language;


    document.documentElement.lang =
        language;


    const elements =
        document.querySelectorAll(
            "[data-i18n]"
        );


    elements.forEach(
        element => {

            const key =
                element.getAttribute(
                    "data-i18n"
                );


            if(
                translations[language] &&
                translations[language][key]
            ){

                element.textContent =
                    translations[language][key];

            }

        }
    );


    const languageButtons =
        document.querySelectorAll(
            "[data-language]"
        );


    languageButtons.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.language ===
                    language
            );

        }
    );

}


/* =====================================================
   LANGUAGE BUTTONS
===================================================== */

document
    .querySelectorAll(
        "[data-language]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    applyLanguage(
                        button.dataset.language
                    );

                }
            );

        }
    );


/* =====================================================
   SETTINGS
===================================================== */

const settingsOpen =
    document.getElementById(
        "settingsOpen"
    );

const settingsBackdrop =
    document.getElementById(
        "settingsBackdrop"
    );

const settingsPanel =
    document.getElementById(
        "settingsPanel"
    );

const settingsClose =
    document.getElementById(
        "settingsClose"
    );


function openSettings(){

    if(!settingsPanel)
        return;


    settingsPanel.classList.add(
        "open"
    );


    if(settingsBackdrop){

        settingsBackdrop.classList.add(
            "open"
        );

    }


    pauseAutoScroll();

}


function closeSettings(){

    if(!settingsPanel)
        return;


    settingsPanel.classList.remove(
        "open"
    );


    if(settingsBackdrop){

        settingsBackdrop.classList.remove(
            "open"
        );

    }


    scheduleResume();

}


if(settingsOpen){

    settingsOpen.addEventListener(
        "click",
        openSettings
    );

}


if(settingsClose){

    settingsClose.addEventListener(
        "click",
        closeSettings
    );

}


if(settingsBackdrop){

    settingsBackdrop.addEventListener(
        "click",
        closeSettings
    );

}


document.addEventListener(
    "keydown",
    event => {

        if(
            event.key === "Escape"
        ){

            closeSettings();

        }

    }
);


/* =====================================================
   THEME
===================================================== */

function applyTheme(
    theme
){

    document.documentElement.dataset.theme =
        theme;


    if(
        theme === "dark"
    ){

        document.documentElement.classList.add(
            "dark"
        );

    }else{

        document.documentElement.classList.remove(
            "dark"
        );

    }


    const themeButtons =
        document.querySelectorAll(
            "[data-theme]"
        );


    themeButtons.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.theme ===
                    theme
            );

        }
    );

}


/* =====================================================
   THEME BUTTONS
===================================================== */

document
    .querySelectorAll(
        "[data-theme]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    applyTheme(
                        button.dataset.theme
                    );

                }
            );

        }
    );


/* =====================================================
   PANEL MUSIC BUTTON
===================================================== */

if(panelMusicBtn){

    panelMusicBtn.addEventListener(
        "click",
        () => {

            if(!music)
                return;


            /*
               Never allow music while
               video is playing
            */

            if(
                weddingVideoPlayer &&
                !weddingVideoPlayer.paused
            ){

                music.pause();

                musicStarted = false;

                updateMusicButtons();

                return;

            }


            if(music.paused){

                startMusic();

            }else{

                music.pause();

                musicStarted = false;

                updateMusicButtons();

            }

        }
    );

}


/* =====================================================
   VOLUME
===================================================== */

if(
    volumeControl &&
    music
){

    volumeControl.value =
        String(
            music.volume
        );


    volumeControl.addEventListener(
        "input",
        () => {

            music.volume =
                Number(
                    volumeControl.value
                );

        }
    );

}


/* =====================================================
   WEDDING VIDEO
===================================================== */

if(weddingVideoPlayer){

    /*
       When video starts:
       stop auto scroll
    */

    weddingVideoPlayer.addEventListener(
        "play",
        function(){

            autoScrolling = false;

            clearTimeout(
                resumeTimer
            );

        }
    );


    weddingVideoPlayer.addEventListener(
        "pause",
        function(){

            pauseAutoScroll();

        }
    );


    weddingVideoPlayer.addEventListener(
        "ended",
        function(){

            pauseAutoScroll();

        }
    );

}


/* =====================================================
   VIDEO AUDIO PRIORITY
===================================================== */

if(
    weddingVideoPlayer &&
    music
){

    /*
       VIDEO STARTS
       ↓
       WEBSITE MUSIC STOPS
    */

    weddingVideoPlayer.addEventListener(
        "play",
        function(){

            if(!music.paused){

                music.pause();

            }


            musicStarted = false;


            updateMusicButtons();


            autoScrolling = false;


            clearTimeout(
                resumeTimer
            );

        }
    );


    /*
       Extra protection:
       If website music tries to play
       while video is playing,
       stop it immediately.
    */

    music.addEventListener(
        "play",
        function(){

            if(
                !weddingVideoPlayer.paused
            ){

                music.pause();

                musicStarted = false;

                updateMusicButtons();

            }

        }
    );


    /*
       Additional protection during
       actual video playback
    */

    weddingVideoPlayer.addEventListener(
        "playing",
        function(){

            if(!music.paused){

                music.pause();

                musicStarted = false;

                updateMusicButtons();

            }

        }
    );

}


/* =====================================================
   TOUCH BLESSING
===================================================== */

const touchBlessing =
    document.getElementById(
        "touchBlessing"
    );


if(touchBlessing){

    document.addEventListener(
        "click",
        event => {

            if(
                event.target.closest(
                    "button, a, video, input"
                )
            ){

                return;

            }


            const blessing =
                document.createElement(
                    "div"
                );


            blessing.className =
                "floating-blessing";


            blessing.textContent =
                "Barakallah";


            blessing.style.left =
                `${event.clientX}px`;


            blessing.style.top =
                `${event.clientY}px`;


            document.body.appendChild(
                blessing
            );


            setTimeout(
                () => {

                    blessing.remove();

                },
                1800
            );

        }
    );

}


/* =====================================================
   FLOATING HEARTS / SPARKLES
===================================================== */

function createFloatingEffect(
    x,
    y
){

    const symbols = [
        "♡",
        "♥",
        "✦",
        "✧"
    ];


    const element =
        document.createElement(
            "span"
        );


    element.className =
        "floating-heart";


    element.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    element.style.left =
        `${x}px`;


    element.style.top =
        `${y}px`;


    document.body.appendChild(
        element
    );


    setTimeout(
        () => {

            element.remove();

        },
        1800
    );

}


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    () => {

        updateMusicButtons();


        if(
            volumeControl &&
            music
        ){

            volumeControl.value =
                String(
                    music.volume
                );

        }


        requestWakeLock();

    }
);


/* =====================================================
   VISIBILITY CHANGE
===================================================== */

document.addEventListener(
    "visibilitychange",
    async () => {

        if(
            document.visibilityState ===
            "visible"
        ){

            requestWakeLock();

        }else{

            releaseWakeLock();

        }

    }
);


/* =====================================================
   INITIAL LANGUAGE
===================================================== */

applyLanguage("en");


/* =====================================================
   INITIAL THEME
===================================================== */

applyTheme("system");
