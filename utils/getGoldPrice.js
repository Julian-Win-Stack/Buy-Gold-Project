let goldPrice = 2000.57

export function getGoldPrice(){
    let min = 1500
    let max = 2500
    const direction = Math.random() > 0.5 ? 1 : -1
    const change = Math.random() * 10 * direction
    goldPrice += change

    goldPrice = Math.max(min, Math.min(max, goldPrice))    

    return Number(goldPrice.toFixed(2))
}