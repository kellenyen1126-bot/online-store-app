from flask import Flask, render_template, redirect, url_for, request, session
from models import db, User, Product, Order, OrderItem

app = Flask(__name__)
app.config.from_object('config')
db.init_app(app)

@app.route('/')
def index():
    products = Product.query.all()
    return render_template('index.html', products=products)

@app.route('/cart')
def cart():
    # 顯示購物車
    return render_template('cart.html')

@app.route('/checkout', methods=['POST'])
def checkout():
    # 建立訂單並扣庫存
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
