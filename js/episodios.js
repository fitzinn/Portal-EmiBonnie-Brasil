function initEpisodePlayers() {

    const players = document.querySelectorAll(".episode-player");

    if (!players.length) return;

    players.forEach(function (player) {

        if (player.dataset.initialized) return;
        player.dataset.initialized = "true";

        const parts = player.dataset.parts.split(",");
        let currentPart = 0;

        const frame = player.querySelector(".episode-frame");
        const indicator = player.closest(".serie-episodes")
                                .querySelector(".episode-number");

        const leftBtn = player.querySelector(".episode-btn.left");
        const rightBtn = player.querySelector(".episode-btn.right");

        function updateVideo() {
            frame.src = "https://www.youtube.com/embed/" + parts[currentPart].trim();
            if (indicator) {
                indicator.textContent = currentPart + 1;
            }
        }

        leftBtn.addEventListener("click", function () {
            currentPart = (currentPart - 1 + parts.length) % parts.length;
            updateVideo();
        });

        rightBtn.addEventListener("click", function () {
            currentPart = (currentPart + 1) % parts.length;
            updateVideo();
        });

    });
}