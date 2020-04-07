// export function toMoney(money){

//     let newMoney = money
//     if(newMoney){
//         newMoney = newMoney.toFixed(2)
//     }else{
//         newMoney =0
//         newMoney = newMoney.toFixed(2)
//     }
//     return newMoney
// }
//优雅而又精准
export function toMoney(money=0){
    return money.toFixed(2)
}