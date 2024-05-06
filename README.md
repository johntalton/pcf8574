# PCF8574 ⚙️

[![npm Version](http://img.shields.io/npm/v/@johntalton/PCF8574.svg)](https://www.npmjs.com/package/@johntalton/PCF8574)
![GitHub package.json version](https://img.shields.io/github/package-json/v/johntalton/PCF8574)
![CI](https://github.com/johntalton/PCF8574/workflows/CI/badge.svg)
![GitHub](https://img.shields.io/github/license/johntalton/PCF8574)
[![Downloads Per Month](http://img.shields.io/npm/dm/@johntalton/PCF8574.svg)](https://www.npmjs.com/package/@johntalton/PCF8574)
![GitHub last commit](https://img.shields.io/github/last-commit/johntalton/PCF8574)

GPIO-like 8bit device with simplistic interface and interrupt support.

## Behavior

Unlike most GPIO, this chip considers the pin / port to be both input and output at the same time.  This is achieved by tri-stating the pin, floating it, when set to LOW (0 / ground).

When set HIGH, the pin is driven to Vcc.

In both states, driven or not, the pins state can be read.  With the LOW (floated) being of most interest.

## Interrupt

When a pin is driven externally, not by setting it HIGH, the INT will be grounded (open drain).  This style interrupt allows for a flexible, chainable, efficient interrupt implementations.

In this chips specific case, the interrupt will be be toggled based on the difference from last read state.  That is, if the state changes from A to B, and back to A (ex: HIGH, LOW, HIGH)), then the interrupt will be self-cleared.  Thus, late reads of the state may not reflect changes if not timely enough.

Other clear state are achieved by writing or reading to the chip.  Both achieve clear the interrupt.

### LED stuff

Apparently this chip has some benefit for driving LEDs.  Much todo is given in the Datasheet about that.  Make sure your using resistor where everyone on the internet sais you should be. 🥳