
// Update default values on form submit
let form = document.forms['defaultRatesForm']
form.addEventListener('submit', () => {
	saveFormRates()
})

function saveFormRates() {
	let startRate = form['startRate'].value
	let maxRate = form['maxRate'].value
	let minRate = form['minRate'].value
	let stepRate = form['stepRate'].value

	chrome.storage.sync.set({
		'startRate': startRate,
		'maxRate': maxRate,
		'minRate': minRate,
		'stepRate': stepRate
	})
}

setDefaultRatesOnForm()

function setDefaultRatesOnForm() {
	chrome.storage.sync.get(['startRate', 'maxRate', 'minRate', 'stepRate'], (data) => {
		const isEmpty = Object.keys(data).length === 0
		if (!isEmpty) {
			form['startRate'].value = data.startRate
			form['maxRate'].value = data.maxRate
			form['minRate'].value = data.minRate
			form['stepRate'].value = data.stepRate
		}
	})
}


form.addEventListener('submit', (e) => {
	validateForm()
})

function validateForm() {
	let startRate = form['startRate'].value
	let maxRate = form['maxRate'].value
	let minRate = form['minRate'].value
	let stepRate = form['stepRate'].value

	if (startRate < minRate) {
		alert(ErrorMessage['START_RATE_TOO_LOW'])
		return false
	}
	if (startRate > maxRate) {
		alert(ErrorMessage['START_RATE_TOO_HIGH'])
		return false
	}
	if (minRate > maxRate) {
		alert(ErrorMessage['MIN_RATE_TOO_HIGH'])
		return false
	}
	return true
}

const ErrorMessage = {
	'START_RATE_TOO_LOW': 'Start speed must be greater than min speed',
	'START_RATE_TOO_HIGH': 'Start speed must be less than max speed',
	'MIN_RATE_TOO_HIGH': 'Min speed must be less than max speed',
	'INVALID_RATES': 'Invalid rates'
}

var resetButton = form['resetButton']
resetButton.addEventListener('click', () => {
	form['startRate'].value = 1
	form['maxRate'].value = 3
	form['minRate'].value = 0.2
	form['stepRate'].value = 0.1

	saveFormRates()
})