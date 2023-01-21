const express = require("express")
const app = express.Router()


app.post("/", (req, res) => {
    try {
        const Amount = Number(req.body.Amount)
        const Rate = Number(req.body.Rate)
        const Years = Number(req.body.Years)
        const RatePercentage = Rate/100

        let Total_Maturity_Value = eval(
            (Amount * ((RatePercentage + 1)** Years - 1))/RatePercentage
        );

        Total_Maturity_Value = Number(String(Total_Maturity_Value).split('.')[0]);


        const Total_Investment_Amount =Amount*Years

        const Total_Interest_Gained =Total_Maturity_Value - Total_Investment_Amount

        return res.status(200).json({
            Total_Maturity_Value,
            Total_Investment_Amount,
            Total_Interest_Gained,
        });
    }
     catch (err) {
        return res.status(500).send({ message: err.message });
    }
})

module.exports = app