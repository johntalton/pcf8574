export const DEFAULT_ADDRESS = 0x20

export const BIT = 0b1
export const BIT_UNSET = 0

export const BYTE_LENGTH_ONE = 1

export const OFFSET = {
	P0: 0,
	P1: 1,
	P2: 2,
	P3: 3,
	P4: 4,
	P5: 5,
	P6: 6,
	P7: 7
}

export class PCF8574 {
	#bus

	static from(bus) { return new PCF8574(bus) }

	constructor(bus) { this.#bus = bus }

	async readPort() {
		const portArray = await this.#bus.i2cRead(BYTE_LENGTH_ONE)
		const [ portValue, ] = new Uint8Array(portArray)

		return {
			p0: ((portValue >> OFFSET.P0) & BIT) === BIT,
			p1: ((portValue >> OFFSET.P1) & BIT) === BIT,
			p2: ((portValue >> OFFSET.P2) & BIT) === BIT,
			p3: ((portValue >> OFFSET.P3) & BIT) === BIT,
			p4: ((portValue >> OFFSET.P4) & BIT) === BIT,
			p5: ((portValue >> OFFSET.P5) & BIT) === BIT,
			p6: ((portValue >> OFFSET.P6) & BIT) === BIT,
			p7: ((portValue >> OFFSET.P7) & BIT) === BIT
		}
	}

	async writePort({
		p0 = false,
		p1 = false,
		p2 = false,
		p3 = false,
		p4 = false,
		p5 = false,
		p6 = false,
		p7 = false
	}) {
		const p0bit = p0 ? BIT : BIT_UNSET
		const p1bit = p1 ? BIT : BIT_UNSET
		const p2bit = p2 ? BIT : BIT_UNSET
		const p3bit = p3 ? BIT : BIT_UNSET
		const p4bit = p4 ? BIT : BIT_UNSET
		const p5bit = p5 ? BIT : BIT_UNSET
		const p6bit = p6 ? BIT : BIT_UNSET
		const p7bit = p7 ? BIT : BIT_UNSET

		const portValue =
			  (p0bit << OFFSET.P0)
			| (p1bit << OFFSET.P1)
			| (p2bit << OFFSET.P2)
			| (p3bit << OFFSET.P3)
			| (p4bit << OFFSET.P4)
			| (p5bit << OFFSET.P5)
			| (p6bit << OFFSET.P6)
			| (p7bit << OFFSET.P7)

		return this.#bus.i2cWrite(Uint8Array.from([ portValue ]))
	}
}

