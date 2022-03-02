const { calculateFee} = require('./src/index');
const fs = require("fs");


test('gettin an array and return expectable result', async () => {
    const content = fs.readFileSync(`text.json`, 'utf8');
    expect(calculateFee(content)).toStrictEqual([
        '1.00',  '0.90',
        '87.00', '3.00',
        '1.00',  '1.00',
        '5.00',  '0.00',
        '0.00'
      ].join("\n"))
})