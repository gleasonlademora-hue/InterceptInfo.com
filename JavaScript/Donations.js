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
        const thankYouModal = bootstrap.Modal.getOrCreateInstance(thankYouModalEl);
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
                    if (cardImg && cardImg.getAttribute("src")) {
                        bgImage = cardImg.getAttribute("src");
                    } else {
                        const randomIndex = Math.floor(
                            Math.random() * donationImages.length,
                        );
                        bgImage = donationImages[randomIndex];
                    }

                    const customInput = card.querySelector('input[name="customAmount"]');

                    if (customInput && customInput.value) {
                        amount = parseInt(customInput.value, 10);
                    } else {
                        const checkedRadio = card.querySelector(
                            'input[type="radio"]:checked',
                        );
                        if (checkedRadio) {
                            amount = parseInt(checkedRadio.value, 10);
                        }
                    }

                    if (isNaN(amount) || amount <= 0) {
                        alert(
                            "Please select or enter a valid donation amount greater than 0.",
                        );
                        return;
                    }

                    if (customInput) customInput.value = "";
                }

                if (modalBg) {
                    modalBg.style.backgroundImage = `url('${bgImage}')`;
                }
                if (donationDetails) {
                    donationDetails.innerText = `Fund Supported: ${categoryName} \n Donation Amount: $${amount}.00`;
                }

                thankYouModal.show();
            });
        });
    }
});
