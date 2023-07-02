let now_playing = document.getElementById("music-now-playing");
let now_playing_total = document.getElementById("music-now-playing-total");
let track_art = document.getElementById("music-track-art");
let track_name = document.getElementById("music-track-name");
let track_artist = document.getElementById("music-track-artist");

//let seek_slider = document.querySelector(".seek_slider");
//let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.getElementById("music-current-time");
let total_duration = document.getElementById("music-total-duration");

let track_index = 0;
let curr_track = document.getElementById('music-audio');

let track_list = [
    {
        name: "Fôret",
        artist: "lasonotheque.org",
        image: "",
        path: "https://lasonotheque.org/UPLOAD/mp3/0100.mp3"
    },
    {
        name: "Vagues",
        artist: "lasonotheque.org",
        image: "",
        path: "https://lasonotheque.org/UPLOAD/mp3/0267.mp3"
    },
    {
        name: "Vent",
        artist: "lasonotheque.org",
        image: "",
        path: "https://lasonotheque.org/UPLOAD/mp3/0595.mp3"
    },
    {
        name: "Campagne",
        artist: "lasonotheque.org",
        image: "",
        path: "https://lasonotheque.org/UPLOAD/mp3/0097.mp3"
    },
    {
        name: "Pluie et Orage sous tente",
        artist: "lasonotheque.org",
        image: "",
        path: "https://lasonotheque.org/UPLOAD/mp3/0820.mp3"
    },
    {
        name: "Réveil des oiseaux",
        artist: "lasonotheque.org",
        image: "",
        path: "https://lasonotheque.org/UPLOAD/mp3/0999.mp3"
    },
    {
        name: "Petit ruisseau",
        artist: "lasonotheque.org",
        image: "",
        path: "https://lasonotheque.org/UPLOAD/mp3/1354.mp3"
    },
    {
        name: "Discussions extérieures",
        artist: "lasonotheque.org",
        image: "",
        path: "https://lasonotheque.org/UPLOAD/mp3/2968.mp3"
    },
    {
        name: "Vent, herbes hautes",
        artist: "lasonotheque.org",
        image: "",
        path: "https://lasonotheque.org/UPLOAD/mp3/0908.mp3"
    },
    {
        name: "Pluie et orage",
        artist: "lasonotheque.org",
        image: "",
        path: "https://lasonotheque.org/UPLOAD/mp3/0740.mp3"
    },
];

function setVolume(VolumeName) {
    localStorage.setItem('music-volume', VolumeName);

    if (VolumeName === "max") {
        curr_track.volume = 1;
    } if (VolumeName === "med") {
        curr_track.volume = 0.6;
    } if (VolumeName === "min") {
        curr_track.volume = 0.25;
    } if (VolumeName === "mute") {
        curr_track.volume = 0;
    }

    var element = document.getElementById("audio-max");
    element.classList.remove("clicked");
    var element = document.getElementById("audio-med");
    element.classList.remove("clicked");
    var element = document.getElementById("audio-min");
    element.classList.remove("clicked");
    var element = document.getElementById("audio-mute");
    element.classList.remove("clicked");

    var element = document.getElementById("audio-" + VolumeName);
    element.classList.add("clicked");
}

function setState(StateName) {
    localStorage.setItem('music-state', StateName);

    if (StateName === "play") {
        var element = document.getElementById("audio-pause");
        element.classList.remove("hidden");
        playTrack();
    }
    if (StateName === "pause") {
        var element = document.getElementById("audio-play");
        element.classList.remove("hidden");
        pauseTrack();
    }

    var element = document.getElementById("audio-" + StateName);
    element.classList.add("hidden");
}

function setTrack(trackIndex, autoPlay) {
    localStorage.setItem('music-current-track-index', trackIndex);
    track_index = trackIndex;
    loadTrack(track_index);
    if (autoPlay) {
        setState("play");
    }
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index = track_index + parseInt(1);
    else track_index = 0;
    setTrack(track_index, true);
}

function prevTrack() {
    if (track_index > 0)
        track_index = track_index - parseInt(1);
    else track_index = track_list.length - 1;
    setTrack(track_index, true);
}

function loadTrack(track_index) {
    track_index = Number(track_index);
    if (track_index > (track_list.length - 1)) {
        track_index = 0;
    }
    //clearInterval(updateTimer);  

    //seek_slider.value = 0;

    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Update details of the track
    document.getElementById("music-track-art").style.backgroundImage = "url(" + track_list[track_index].image + ")";
    document.getElementById("music-track-name").textContent = track_list[track_index].name;
    document.getElementById("music-track-artist").textContent = track_list[track_index].artist;
    document.getElementById("music-now-playing").textContent = (track_index + 1);
    document.getElementById("music-now-playing-total").textContent = track_list.length;

    seekUpdate();

    updateTimer = setInterval(seekUpdate, 500);

    curr_track.addEventListener("ended", nextTrack);
}


/* function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);

    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
} */

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        /* seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition; */

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        document.getElementById("music-current-time").textContent = currentMinutes + ":" + currentSeconds;
        document.getElementById("music-total-duration").textContent = durationMinutes + ":" + durationSeconds;
    }
}

(function () {
    if (localStorage.getItem('music-volume') === 'max') {
        setVolume('max');
    } else if (localStorage.getItem('music-volume') === 'med') {
        setVolume('med');
    } else if (localStorage.getItem('music-volume') === 'min') {
        setVolume('min');
    } else if (localStorage.getItem('music-volume') === 'mute') {
        setVolume('mute');
    } else {
        setVolume('max');
    }
})();

(function () {
    if (localStorage.getItem('music-state') === 'play') {
        setState('pause');
    } else if (localStorage.getItem('music-state') === 'pause') {
        setState('pause');
    } else {
        setState('play');
    }
})();

(function () {
    if (localStorage.getItem('music-current-track-index') != null) {
        setTrack(localStorage.getItem('music-current-track-index'), false);
    } else {
        setTrack(0, false);
    }
})(); 