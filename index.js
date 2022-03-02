const fs = require("fs");

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const calculateFee = (arrayInput) => {
  const stringToArray = JSON.parse(arrayInput)
  let store = [];
  stringToArray.forEach(element => {
    if (element.type === "cash_in") {
      const initialFee = element.operation.amount * 0.03 / 100;
      const result = initialFee > 5 ? 5 : initialFee;
      console.log(Math.ceil(result).toFixed(2))
    } else if (element.user_type === "natural") {
      const findUser = store.findIndex(i => i.user_id === element.user_id)
      if (findUser === -1) {
        store.push({ user_id: element.user_id, amount: element.operation.amount, date: element.date });
        const initialFee = element.operation.amount <= 1000 ? 0 : (element.operation.amount - 1000) * 0.3 / 100;
        console.log(Math.ceil(initialFee).toFixed(2))
      } else {
        const thisWeek = (new Date(element.date) - new Date(store[findUser].date)) / 86400000;
        if (thisWeek < 7) {
          store[findUser].amount = store[findUser].amount + element.operation.amount;
          if (store[findUser].amount >= 1000) {
            store[findUser].freeFee = true;
          }
        } else {
          store[findUser].amount = element.operation.amount;
          store[findUser].date = element.date;
          store[findUser].freeFee = false;
          if (store[findUser].amount >= 1000) {
            store[findUser].freeFee = true;
          }
        }
        if (store[findUser].freeFee) {
          const initialFee = element.operation.amount * 0.3 / 100;
          console.log(Math.ceil(initialFee).toFixed(2))
        } else {
          const initialFee = element.operation.amount <= 1000 ? 0 : (element.operation.amount - 1000) * 0.3 / 100;
          console.log(Math.ceil(initialFee).toFixed(2))
        }

      }

    } else {
      const initialFee = element.operation.amount * 0.3 / 100;
      const result = initialFee < 0.5 ? 0.5 : initialFee;
      console.log(result.toFixed(2))
    }
  });

}

readline.question(`Please Enter the name of your file (or if you want, you can put your valid array json in text.json)`, fileName => {
  const content = fs.readFileSync(`${fileName || "text"}.json`, 'utf8');
  calculateFee(content)
  readline.close()
})
