from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')
# Роут для відображення кошика (GET)
@app.route('/cart')
def cartShow():
    return render_template('cart.html')

# Роут для оновлення кошика (POST)
@app.route('/cart', methods=['POST'])
def cartUpdate():
    cart_data = request.json  # Отримуємо дані JSON з тіла запиту
    print(cart_data)  # Виводимо дані на сервері для перевірки
    return jsonify({'status': 'success', 'cart': cart_data})  # Відправляємо відповідь назад

# API route to fetch cart data (optional)
@app.route('/api/cart', methods=['POST'])
def api_cart():
    cart_data = request.json
    return jsonify({'status': 'success', 'cart': cart_data})

if __name__ == '__main__':
    app.run(debug=True)
