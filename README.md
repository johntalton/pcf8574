# PCF8574 ⚙️

GPIO-like 8bit device with simplistic interface and interrupt support.


[![npm Version](http://img.shields.io/npm/v/@johntalton/PCF8574.svg)](https://www.npmjs.com/package/@johntalton/PCF8574)
![GitHub package.json version](https://img.shields.io/github/package-json/v/johntalton/PCF8574)
[![CI](https://github.com/johntalton/pcf8574/actions/workflows/CI.yml/badge.svg)](https://github.com/johntalton/pcf8574/actions/workflows/CI.yml)



## Behavior

Unlike most GPIO, this chip considers the pin / port to be both input and output at the same time.  This is achieved by tri-stating the pin, floating it, when set to LOW (0 / ground).

When set HIGH, the pin is driven to Vcc.

In both states, driven or not, the pins state can be read.  With the LOW (floated) being of most interest.

## Interrupt

When a pin is driven externally, not by setting it HIGH, the INT will be grounded (open drain).  This style interrupt allows for a flexible, chainable, efficient interrupt implementations.

In this chips specific case, the interrupt will be be toggled based on the difference from last read state.  That is, if the state changes from A to B, and back to A (ex: HIGH, LOW, HIGH), then the interrupt will be self-cleared.  Thus, late reads of the state may not reflect changes if not timely enough.

Other clear state are achieved by writing or reading to the chip.  Both achieve clear the interrupt.

### LED stuff

Apparently this chip has some benefit for driving LEDs.  Much todo is given in the Datasheet about that.  Make sure your using resistor where everyone on the internet says you should be. 🥳

# Example

```javascript
import { I2CAddressedBus } from '@johntalton/and-other-delights'
import { PCF8574, DEFAULT_ADDRESS } from '@johntalton/pcf8574'

const bus = /* some I2CBus */
const device = new PCF8574(new I2CAddressedBus(bus, DEFAULT_ADDRESS))

const { p0, p1, /* ..etc */. } = await device.readPort()


await device.writerPort({
  p2: true,
  p5: true
  // all other default false
})

```