const MORSE_TABLE = {
		'.-':     'a', // 0000001011
		'-...':   'b',
		'-.-.':   'c',
		'-..':    'd',
		'.':      'e',
		'..-.':   'f',
		'--.':    'g',
		'....':   'h',
		'..':     'i',
		'.---':   'j',
		'-.-':    'k',
		'.-..':   'l',
		'--':     'm',
		'-.':     'n',
		'---':    'o',
		'.--.':   'p',
		'--.-':   'q',
		'.-.':    'r',
		'...':    's',
		'-':      't',
		'..-':    'u',
		'...-':   'v',
		'.--':    'w',
		'-..-':   'x',
		'-.--':   'y',
		'--..':   'z',
		'.----':  '1',
		'..---':  '2',
		'...--':  '3',
		'....-':  '4',
		'.....':  '5',
		'-....':  '6',
		'--...':  '7',
		'---..':  '8',
		'----.':  '9',
		'-----':  '0', // 1111111111
};


function decode(expr) {
	const dot = '.' // 10
	const dashes = '-' // 11
	const space = '**********' // space


	function sliceChunks(array, chunkSize) {
    const res = []
    for (let i = 0; i < array.length; i += chunkSize) {
			const chunk = array.slice(i, i + chunkSize)
			res.push(chunk)
    }
    return res
	}

	const exprArr = sliceChunks(expr, 10)


	const codeArr = Object.entries(MORSE_TABLE).reduce((accum, item, index) => {
		let [key, value] = item
		key = [...key].map(s => {
			if(s == dot) return '10'
			if(s == dashes) return '11'
		})
		key = key.join(' ').replace(/\s+/g, '')
		if (key.length < 10) key = key.padStart(10, '0')

		accum[key] = value
		return accum
	}, {})


	const resArray = exprArr.map(el => {
		for (const key in codeArr) {
			if (key == el) return codeArr[key]
		}
		if(el == space) return ' '
	})

	return resArray.join('')
}


module.exports = {
		decode
}
