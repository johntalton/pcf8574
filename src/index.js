import { BitSmush } from '@johntalton/bitsmush'

export const SMUSH_MAP = [
	[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]
]

export const DEFAULT_ADDRESS = 0x20

export class PCF8574 {
	#bus

	static from(bus, options) { return Promise.resolve(new PCF8574(bus, options)) }

	constructor(bus, options) { this.#bus = bus }

	async readPort() {
		const portArray = await this.#bus.i2cRead(1)
		const portBytes = new Uint8Array(portArray)
		const portValue = portBytes[0]
		const [ p0, p1, p2, p3, p4, p5, p6, p7 ] = BitSmush.unSmushBits(SMUSH_MAP, portValue)
		return { p0, p1, p2, p3, p4, p5 ,p6, p7 }
	}

	async writePort({ p0, p1, p2, p3, p4, p5 ,p6, p7 }) {
		const portValue = BitSmush.smushBits(SMUSH_MAP, [ p0, p1, p2, p3, p4, p5 ,p6, p7 ])
		const portArray = Uint8Array.from([ portValue ])
		await this.#bus.i2cWrite(portArray)
	}
}

