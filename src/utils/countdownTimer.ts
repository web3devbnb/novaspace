    
  function twoDigits(num) {
    return '0'.concat(num < 0 ? '0' : num.toString()).slice(-2)
  }

export default function showCountdown(countDownDate) {
    const now = new Date().getTime()
    const timeleft = countDownDate - now

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000)

    let clock
    
    if(days > 0) {
        clock = twoDigits(days)
        clock += ':'
        clock += twoDigits(hours)
        clock += ':'
        clock += twoDigits(minutes)
        clock += ':'
        clock += twoDigits(seconds)
    } else {
        clock = twoDigits(hours)
        clock += ':'
        clock += twoDigits(minutes)
        clock += ':'
        clock += twoDigits(seconds)
    }

    return clock
  }

