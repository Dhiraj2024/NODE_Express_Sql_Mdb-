  const express = require("express");
  const app = express();
  const mongoose = require('mongoose')
    const Schema = mongoose.Schema;;
  
  main()
  .then(() =>console.log("connection successfull"))
  .catch((err) =>
  console.log(err));
  async function main() {
   await  mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');   
  }
  

  //schema
  const orderSchema = new Schema({
              
              item: String,
              price: Number,
        });
  
//===models  

//   const addOrders = async ()=> {
//     let res =  await Order.insertMany([
//         { item:"Samosa",
//           price:12},
//         { item:"Chips",
//           price:10},
//         { item:"Chocholate",
//           price:40},
//    ] );
// console.log(res);
//   };

//schema 
  const customerSchema = new Schema({
            name:String,
             orders:[{
             type: Schema.Types.ObjectId,
             ref:"Order",
                },
        ],
        });


const Order = mongoose.model("Order",orderSchema);

const Customer = mongoose.model("Customer", customerSchema);

//custoomerschema ke liye module data
  const addCustomer = async () => {
    let cust1 =  new Customer(
        { name:"Rahul Kumar"});

        let order1 = await Order.findOne({item: "Chips"});
        let order2 = await Order.findOne({item: "Chocholate"});

        cust1.orders.push(order1);
        cust1.orders.push(order2);

        let result = await cust1.save();
        console.log("in orders",result);
};

addCustomer();
//   addOrders();