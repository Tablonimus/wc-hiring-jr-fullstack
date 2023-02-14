/*
Jr Fullstack Developer Test - Webcat

Welcome to the Technical test for Jr Fullstack Developer

We hope that everything is fully clear and understandable.
However, if you have any questions, please send us an email
to support@webcat.app with the subject "Jr Fullstack Test Questions"
*/

import $t from "./libs/test.js";

/*
1. Data manipulation:
  1. Transform the source data to the target data.
  2. Return the target data.

  Source data:
    You can inspect the source data at /libs/1-source-data.js
  Target Data:
    {
      balance: 1606400,
      income: 3900000,
      expenses: 2293600,
      byCategories: {
        Restaurants: -43600,
        Income: 3900000,
        Groceries: -250000,
        Rent: -2000000
      }
    }

  Hint: Use native array methods as well as
    Lodash(https://lodash.com/docs) modules.
*/
import _ from "lodash";
const source = $t.source(1);
$t.answer(1, async () => {
  // Your code goes here
  let expenses = [];
  let incomes = [];

  let type = source.filter((data) =>
    data.type === "expense"
      ? expenses.push(data.amount)
      : data.type === "income"
      ? incomes.push(data.amount)
      : false
  );

  let balance =
    incomes.reduce((a, b) => a + b, 0) - expenses.reduce((a, b) => a + b, 0);

  let targetCategories = {};

  let allCategories = [];
  source.filter((data) =>
    allCategories.includes(data.category)
      ? false
      : allCategories.push(data.category)
  );

  for (let i = 0; i < allCategories.length; i++) {
    let totalAmount = 0;
    for (let x = 0; x < source.length; x++) {
      if (allCategories[i] === source[x].category) {
        totalAmount = totalAmount + source[x].amount;
        targetCategories = {
          ...targetCategories,
          [source[x].category]:
            source[x].type === "expense" ? totalAmount * -1 : totalAmount,
        };
      }
    }
  }

  const targetData = {
    balance: balance,
    income: incomes.reduce((a, b) => a + b, 0),
    expenses: expenses.reduce((a, b) => a + b, 0),
    byCategories: targetCategories,
  };

  return targetData;
});

/*
2. Asynchronous programming: 
  1. First get the list of ids from the async function $source.getIds()
  2. Then, for every id call the async function $source.getText(id) to get its text
  3. Finally, return the list of resulting texts as an array.
    
*/
const $source = $t.source(2);
$t.answer(2, async () => {
  // Your code goes here:
  // 1. Get ids: $source.getIds()
  // 2. Get text for every id: $source.getText(id)
  // 3. Return array of texts

  const getIds = await $source.getIds();
  const promises = [];
  getIds.map((id) => promises.push($source.getText(id)));

  const response = Promise.all(promises)
    .then((res) => res)
    .catch((err) => console.log(err));
  return response;
});
