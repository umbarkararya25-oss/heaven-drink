function selectProduct(productName) {

    const productSelect = document.getElementById("product");

    if (productSelect) {
        productSelect.value = productName;
    }

    const appointmentSection =
        document.getElementById("appointment");

    if (appointmentSection) {
        appointmentSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================================
   APPOINTMENT FORM
   ========================================= */

const appointmentForm =
    document.getElementById("appointmentForm");

if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById("customerName")
                .value
                .trim();

            const phone =
                document.getElementById("phone")
                .value
                .trim();

            const date =
                document.getElementById("date")
                .value;

            const time =
                document.getElementById("time")
                .value;

            const service =
                document.getElementById("service")
                .value
                .trim();

            const message =
                document.getElementById(
                    "appointmentMessage"
                );


            /* Basic validation */

            if (
                !name ||
                !phone ||
                !date ||
                !time ||
                !service
            ) {

                message.textContent =
                    "Please fill in all required fields.";

                message.style.color = "#d93025";

                return;
            }


            /* Success message */

            message.textContent =
                `Thank you, ${name}! Your appointment request has been recorded. We will contact you soon.`;

            message.style.color = "#1677c8";


            /* Clear form */

            appointmentForm.reset();

        }
    );
}


/* =========================================
   COMPLAINT FORM
   ========================================= */

const complaintForm =
    document.getElementById("complaintForm");

if (complaintForm) {

    complaintForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById("complaintName")
                .value
                .trim();

            const details =
                document.getElementById(
                    "complaintDetails"
                )
                .value
                .trim();

            const message =
                document.getElementById(
                    "complaintMessage"
                );


            /* Validation */

            if (!name || !details) {

                message.textContent =
                    "Please enter your name and complaint details.";

                message.style.color = "#d93025";

                return;
            }


            /* Generate complaint ID */

            const complaintNumber =
                Math.floor(
                    100000 +
                    Math.random() * 900000
                );

            const complaintID =
                `HD-${complaintNumber}`;


            /* Success message */

            message.textContent =
                `Complaint submitted successfully for ${name}. Your complaint ID is ${complaintID}.`;

            message.style.color = "#1677c8";


            /* Clear form */

            complaintForm.reset();

        }
    );
}


/* =========================================
   AI CHATBOT
   ========================================= */

function addChatMessage(text, type) {

    const chatBox =
        document.getElementById(
            "chatMessages"
        );

    if (!chatBox) {
        return;
    }


    const message =
        document.createElement("div");

    message.className =
        `${type} message-bubble`;

    message.textContent = text;


    chatBox.appendChild(message);


    /* Automatically scroll to latest message */

    chatBox.scrollTop =
        chatBox.scrollHeight;
}


/* =========================================
   AI CHATBOT RESPONSES
   ========================================= */

function getBotReply(question) {

    const query =
        question.toLowerCase();


    /* Filter question */

    if (
        query.includes("filter") ||
        query.includes("filters")
    ) {

        return (
            "Filters require periodic replacement " +
            "depending on the purifier model and water usage. " +
            "Please check the manufacturer's recommended schedule."
        );
    }


    /* Leakage question */

    if (
        query.includes("leak") ||
        query.includes("leaking")
    ) {

        return (
            "If your purifier is leaking, switch off the " +
            "water supply and power if necessary. " +
            "Check visible connections. If the problem continues, " +
            "please arrange a service appointment."
        );
    }


    /* Water taste or smell */

    if (
        query.includes("taste") ||
        query.includes("smell")
    ) {

        return (
            "Unusual taste or smell may be related to " +
            "filter condition, water storage, or changes " +
            "in the water source. Consider checking the filters " +
            "and arranging a service."
        );
    }


    /* Water softener */

    if (
        query.includes("softener") ||
        query.includes("hard water")
    ) {

        return (
            "A water softener helps reduce hardness-related " +
            "minerals in water. Regular regeneration, " +
            "salt or brine maintenance, and servicing " +
            "depend on the specific model."
        );
    }


    /* Low water flow */

    if (
        query.includes("low water") ||
        query.includes("slow water") ||
        query.includes("water flow")
    ) {

        return (
            "Low water flow can be related to clogged filters, " +
            "low inlet pressure, or a blockage. Check the " +
            "filter condition and contact service if the issue continues."
        );
    }


    /* Maintenance */

    if (
        query.includes("maintenance") ||
        query.includes("maintain")
    ) {

        return (
            "Regular maintenance includes checking filters, " +
            "connections, water flow and overall purifier performance. " +
            "You can book a maintenance appointment using our service form."
        );
    }


    /* Service */

    if (
        query.includes("service") ||
        query.includes("repair")
    ) {

        return (
            "You can book a service appointment using the " +
            "Appointment section on the Heaven Drink website."
        );
    }


    /* Installation */

    if (
        query.includes("install") ||
        query.includes("installation")
    ) {

        return (
            "Heaven Drink provides installation support. " +
            "Please use the Appointment section to request an installation service."
        );
    }


    /* Greeting */

    if (
        query.includes("hello") ||
        query.includes("hi") ||
        query.includes("hey")
    ) {

        return (
            "Hello! 💧 Welcome to Heaven Drink. " +
            "How can I help you with your water purifier or softener?"
        );
    }


    /* Default response */

    return (
        "I can help with common water purifier and " +
        "softener questions such as filters, leakage, " +
        "water taste, low water flow, maintenance, " +
        "installation and service appointments."
    );
}


/* =========================================
   SEND CHAT MESSAGE
   ========================================= */

function sendMessage() {

    const input =
        document.getElementById(
            "chatInput"
        );

    if (!input) {
        return;
    }


    const question =
        input.value.trim();


    /* Don't send empty messages */

    if (!question) {
        return;
    }


    /* Display user's message */

    addChatMessage(
        question,
        "user"
    );


    /* Clear input */

    input.value = "";


    /* Generate bot response */

    setTimeout(
        function () {

            const reply =
                getBotReply(question);

            addChatMessage(
                reply,
                "bot"
            );

        },
        400
    );
}


/* =========================================
   ENTER KEY SUPPORT
   ========================================= */

const chatInput =
    document.getElementById("chatInput");

if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();
            }

        }
    );
}


/* =========================================
   PAGE LOADED MESSAGE
   ========================================= */

console.log(
    "Heaven Drink website loaded successfully."
);