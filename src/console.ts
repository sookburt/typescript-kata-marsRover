import readline from 'readline';

const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

export function clear(spacer: boolean): void {
	console.clear();
	if (spacer) {
		print('------------------------------------');
	}
}

export function print(message: string): void {
	console.log();
  console.log(message);
  console.log();
}

export function askQuestion(question: string, callback: (arg: string) => void) {
	reader.question(`❓ ${question} 👉 `, callback);
}

export function closeInputStream() {
  reader.close();
}