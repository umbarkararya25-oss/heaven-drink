from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-only-change-me")

PRODUCTS = [
    {"id": 1, "name": "AquaPure RO", "category": "RO Purifier", "price": 12999, "description": "Multi-stage reverse osmosis purification for everyday home use.", "tag": "Popular", "icon": "💧"},
    {"id": 2, "name": "ClearUV Shield", "category": "UV Purifier", "price": 8999, "description": "UV-based purification for treated water supplies.", "tag": "Compact", "icon": "✨"},
    {"id": 3, "name": "SoftFlow Home", "category": "Water Softener", "price": 18499, "description": "A home water-softening solution designed to reduce hardness.", "tag": "Home care", "icon": "🏡"},
]

@app.route("/")
def home():
    return render_template("index.html", products=PRODUCTS)

@app.route("/api/chat", methods=["POST"])
def chat():
    message = request.get_json(silent=True, force=True).get("message", "").lower()
    if any(word in message for word in ["filter", "replace", "change"]):
        answer = "Filter replacement depends on your purifier model, water quality, and usage. Check the manufacturer's schedule or book a professional service."
    elif any(word in message for word in ["booking", "service", "repair", "technician"]):
        answer = "You can use the Book a Service button to request installation, maintenance, or repair. This starter demo doesn't yet save appointments."
    elif any(word in message for word in ["ro", "uv", "softener", "product"]):
        answer = "We currently showcase RO purifiers, UV purifiers, and water softeners. Visit the Products section to explore the demo catalogue."
    elif any(word in message for word in ["hello", "hi", "hey"]):
        answer = "Hi there! I'm the Heaven Drink demo assistant. Ask me about products, filters, or service bookings."
    else:
        answer = "I can help with general product, filter-care, and service questions. For safety or water-quality concerns, contact a qualified technician or testing service."
    return jsonify({"reply": answer})

if __name__ == "__main__":
    app.run(debug=True)
