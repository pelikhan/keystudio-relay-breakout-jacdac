namespace modules {
    /**
     * KeyStudio Relay COM1
     */
    //% fixedInstance whenUsed block="keystudio relay 1"
    export const keystudioRelay1 = new RelayClient("keystudio relay 1?dev=self&srvo=0&name=COM1")
    /**
     * KeyStudio Relay COM2
     */
    //% fixedInstance whenUsed block="keystudio relay 2"
    export const keystudioRelay2 = new RelayClient("keystudio relay 2?dev=self&srvo=1&name=COM2")
    /**
     * KeyStudio Relay COM3
     */
    //% fixedInstance whenUsed block="keystudio relay 3"
    export const keystudioRelay3 = new RelayClient("keystudio relay 3?dev=self&srvo=2&name=COM3")
    /**
     * KeyStudio Relay COM4
     */
    //% fixedInstance whenUsed block="keystudio relay 4"
    export const keystudioRelay4 = new RelayClient("keystudio relay 4?dev=self&srvo=3&name=COM4")
}

namespace servers {
    function start() {
        jacdac.productIdentifier = 0x35b7e929
        jacdac.deviceDescription = "Keystudio Relay Board"
        jacdac.startSelfServers(() => {
            const servers: jacdac.Server[] =
                [DigitalPin.P7, DigitalPin.P6, DigitalPin.P4, DigitalPin.P3]
                    .map((pin, i) => jacdac.createActuatorServer(jacdac.SRV_RELAY, server => {
                        const active = server.intensity > 0 ? 1 : 0
                        pins.digitalWritePin(pin, active)
                    }, {
                        intensityPackFormat: jacdac.RelayRegPack.Active,
                        instanceName: `COM${i + 1}`,
                        variant: jacdac.RelayVariant.Electromechanical
                    }))
            return servers
        })
    }
    start()
}