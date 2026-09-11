document.addEventListener("DOMContentLoaded", () => {
    const donationImages = [
        "images/Grid/tiv-2-build-photos-v0-7azoa8n2m9sd1.jpg",
        "images/Grid/TornadoAlley-web.jpg",
        "images/Grid/GettyImages-89510934.jpg",
        "images/Grid/images.jpg",
        "images/Special/ROSTY.jpg",
    ];

    const thankYouModalEl = document.getElementById("thankYouModal");

    if (typeof bootstrap !== "undefined" && thankYouModalEl) {
        const thankYouModal = new bootstrap.Modal(thankYouModalEl);
        const modalBg = document.getElementById("modalBg");
        const donationDetails = document.getElementById("donationDetails");

        const donateButtons = document.querySelectorAll("#donations .btn-danger");

        donateButtons.forEach((button) => {
            button.addEventListener("click", function (e) {
                e.preventDefault();

                const card = this.closest(".card");
                let bgImage = "";
                let categoryName = "Custom Donation";
                let amount = 0;

                if (card) {
                    const cardTitle = card.querySelector(".card-title");
                    if (cardTitle) {
                        categoryName = cardTitle.innerText.trim();
                    }

                    const cardImg = card.querySelector(".card-img-top");

                    if (cardImg) {
                        bgImage = cardImg.getAttribute("src");
                    } else {
                        const randomIndex = Math.floor(
                            Math.random() * donationImages.length,
                        );
                        bgImage = donationImages[randomIndex];
                    }

                    const customInput = card.querySelector('input[name="customAmount"]');

                    if (customInput) {
                        amount = parseInt(customInput.value);

                        if (!amount || amount <= 0) {
                            alert("Please enter a valid custom donation amount.");
                            return;
                        }

                        customInput.value = "";
                    } else {
                        const checkedRadio = card.querySelector('input[type="radio"]:checked');
                        if (checkedRadio) {
                            amount = checkedRadio.value;
                        }
                    }
                }

                modalBg.style.backgroundImage = `url('${bgImage}')`;
                donationDetails.innerText = `Fund Supported: ${categoryName} \n Donation Amount: $${amount}.00`;
                thankYouModal.show();
            });
        });
    }
});