const readline = require('readline');
const moment = require('moment');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let startingWeight;
let presentWeight;
let startingDate;
let presentDate;
let goalWeight;

rl.question('Enter the starting weight (in lbs): ', (weight) => {
    startingWeight = parseFloat(weight);
    rl.question('Enter the present weight (in lbs): ', (weight) => {
        presentWeight = parseFloat(weight);
        rl.question('Enter the starting date (in YYYY-MM-DD format): ', (date) => {
            startingDate = moment(date, 'YYYY-MM-DD');
            rl.question('Enter the present date (in YYYY-MM-DD format): ', (date) => {
                presentDate = moment(date, 'YYYY-MM-DD');
                rl.question('Enter your goal weight (in lbs): ', (weight) => {
                    goalWeight = parseFloat(weight);
                    calculateLossRate();
                    rl.close();
                });
            });
        });
    });
});

function calculateLossRate() {
    const totalDays = presentDate.diff(startingDate, 'days');
    const totalWeightLoss = startingWeight - presentWeight;
    const dailyLossRate = totalWeightLoss / totalDays;
    const weeklyLossRate = dailyLossRate * 7;
    const projectedWeightAfter30Days = presentWeight - (dailyLossRate * 30);
    const daysToGoal = Math.ceil((presentWeight - goalWeight) / dailyLossRate);
    const goalDate = moment(presentDate).add(daysToGoal, 'days');

    console.log(`Total weight loss: ${totalWeightLoss.toFixed(2)} lbs`);
    console.log(`Total duration: ${totalDays} days`);
    console.log(`Daily weight loss rate: ${dailyLossRate.toFixed(2)} lbs/day`);
    console.log(`Weekly weight loss rate: ${weeklyLossRate.toFixed(2)} lbs/week`);
    console.log(`Projected weight after 30 days: ${projectedWeightAfter30Days.toFixed(2)} lbs`);
    console.log(`Projected date to reach goal weight: ${goalDate.format('YYYY-MM-DD')}`);
}
