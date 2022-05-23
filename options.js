
// Update default values on form submit
let form = document.forms['defaultRatesForm']
form.addEventListener('submit', () => {
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
})

setDefaultRatesOnForm()

function setDefaultRatesOnForm() {
	chrome.storage.sync.get(['startRate', 'maxRate', 'minRate', 'stepRate'], (data) => {
		form['startRate'].value = data.startRate ?? defaultStartRate
		form['maxRate'].value = data.maxRate ?? defaultMaxRate
		form['minRate'].value = data.minRate ?? defaultMinRate
		form['stepRate'].value = data.stepRate ?? defaultStepRate
	})
}