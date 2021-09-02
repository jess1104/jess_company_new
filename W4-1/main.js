//輸入的量
const input_amount = document.getElementById("original-currency-amount");
//匯率
const exchange_rate = document.getElementById("exchange-rate");
//想轉換幣別select
const from_currency = document.getElementById("from_currency");
//欲轉換幣別select
const to_currency = document.getElementById("to_currency");
//最底部輸出
const output_amount = document.getElementById("output-text");
//中間圓按鈕
const exchange = document.getElementById("exchange");
const output_from = document.getElementById("from");
const output_to = document.getElementById("to");

// 點擊中間轉換圓鈕事件
exchange.addEventListener("click",()=>{
    [from_currency.value, to_currency.value] = [to_currency.value, from_currency.value];
    calculate();
});

var to_amount = 0;
// 計算事件
function calculate(){
    const from_currency_value = from_currency.value;
    const to_currency_value = to_currency.value;
    // api
    const exchangerateUrl = `https://v6.exchangerate-api.com/v6/3b0ea361e3bbb6b38bf6228c/latest/${from_currency_value}`
    fetch(exchangerateUrl)
    .then(res => {
        res.json();
    console.log(res)
    })
    .then(res => {
        // console.log(res)
        const rate = res.conversion_rates[to_currency_value];
        // console.log(rate)
        //匯率帶進去
        exchange_rate.value = `${rate}`
        //輸入要換算的金額會去乘以匯率（取到小數第三位）＝換算後的價格
        to_amount = (input_amount.value * rate).toFixed(3);
        output_from.innerText= `${input_amount.value} ${from_currency_value}`;
        output_to.innerText = `${to_amount} ${to_currency_value}`;
        output_amount.style.display="block";
    }).catch(function(err){
        // const title = document.getElementsByTagName('h1');
        // title.innerText="不好意思系統出錯，正進行維護"
        console.log(err)
    } )
}
// 點擊最下面按鈕進行計算
document.getElementById("exchange_button").addEventListener("click",()=>{
    calculate();
});