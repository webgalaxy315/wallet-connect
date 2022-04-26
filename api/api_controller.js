const axios = require("axios");
const rand = require("random-seed").create();
require("dotenv").config();

const getState = (num1, num2, roll) => {
    let reward = 0;
    if (roll == "False") {
        if (num1 > num2) {
            reward = 2;
        } else {
            reward = 1;
        }
    } else {
        if (num1 < num2) {
            reward = 2;
        } else {
            reward = 1;
        }
    }
    return reward;
}

const getAmount = (num, reward, betAmount) => {
    let earnAmount = 0;
    if (reward == 1) {
        earnAmount = 0;
    } else if (reward == 2) {
        earnAmount = betAmount * (98 / num);
    }
    return earnAmount;
}

module.exports = {
    BET: async (req, res) => {
        try {
            let users = [];
            let earnAmount = 0;

            const { token, betAmount, SlideValue, roll } = req.body;

            const bet_Amount = parseFloat(betAmount);
            const Slide_Value = parseFloat(SlideValue);

            users[token] = {
                token: token,
                betAmount: bet_Amount,
                SlideValue: Slide_Value,
                roll: roll
            }
            try {
                // await axios.post(process.env.PLATFORM_SERVER + "api/games/bet", {
                //     token: users[token].token,
                //     amount: users[token].betAmount
                // });
            } catch (err) {
                throw new Error("BET ERROR!");
            }
            try {
                let randomNumber = await rand.intBetween(0, 99);

                let winState = await getState(users[token].SlideValue, randomNumber, users[token].roll);

                earnAmount = await getAmount(users[token].SlideValue, winState, users[token].betAmount);
                res.json({
                    randomNumber: randomNumber,
                    earnAmount: earnAmount,
                    Message: "SUCCESS!"
                })

            } catch (err) {
                throw new Error("DATA ERROR!");
            }
            try {
                // await axios.post(process.env.PLATFORM_SERVER + "api/games/winlose", {
                //     token: users[token].token,
                //     amount: earnAmount,
                //     winState: earnAmount > 0 ? true : false
                // });
            } catch (err) {
                throw new Error("SERVER ERROR!");
            }
        } catch (err) {
            res.json({

                Message: err.message
            });
        }
    },
};
