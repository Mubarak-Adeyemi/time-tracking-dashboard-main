fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    renderCards("weekly", data);

    const timeRangeBtns = document.querySelectorAll(".time-range button");
    timeRangeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        timeRangeBtns.forEach((button) => {
          button.classList.remove("active");
          button.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        renderCards(btn.id, data);
      });
    });
  })
  .catch((error) => console.error("Error fetching the data", error));

function renderCards(timeframe, data) {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";

  data.forEach((item) => {
    const current = item.timeframes[timeframe].current;
    const previous = item.timeframes[timeframe].previous;
    let time;
    if (timeframe === "daily") {
      time = "Day";
    } else if (timeframe === "weekly") {
      time = "Week";
    } else if (timeframe === "monthly") {
      time = "Month";
    }
    const card = `<article class="card ${item.class.toLowerCase()}">
            <div class="card-header">
            </div>
            <div class="card-body">
              <h3 class="title">${item.title}</h3>
              <button class="menu-btn" aria-label="More options for work">
                <img
                  src="./images/icon-ellipsis.svg"
                  alt="icon ellipsis"
                  srcset=""
                />
              </button>
              <p class="time">${current}hrs</p>
              <p class="previous">Last ${time} - <span>${previous}hrs</span></p>
            </div>
          </article>`;
    cardsContainer.innerHTML += card;
  });
}
