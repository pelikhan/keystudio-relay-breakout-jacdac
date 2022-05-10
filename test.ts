let k = 0
forever(() => {
    modules.keystudioRelay1.setActive(k == 0)
    modules.keystudioRelay2.setActive(k == 1)
    modules.keystudioRelay3.setActive(k == 2)
    modules.keystudioRelay4.setActive(k == 3)
    basic.showNumber(k + 1)
    pause(2000)
    k = (k + 1) % 4
})