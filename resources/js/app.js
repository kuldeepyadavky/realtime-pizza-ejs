import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add_to_cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
	axios
		.post('/update-cart', pizza)
		.then((res) => {
			cartCounter.innerText = res.data.totalQty
			new Noty({
				type: 'success',
				text: 'Item added to cart',
				timeout: 2000,
				progressBar: false,
			}).show()
		})
		.catch((error) => {
			new Noty({
				type: 'error',
				text: 'Something Went Wrong!',
				timeout: 2000,
				progressBar: false,
			}).show()
		})
}

addToCart.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		let pizza = JSON.parse(btn.dataset.pizza)
		updateCart(pizza)
	})
})
