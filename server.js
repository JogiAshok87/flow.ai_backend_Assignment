const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const categoryModel = require('./models/Category')
const transactionModel = require('./models/Transaction')
const devuser = require('./devusermodel')
const middleware = require('./middleware')
const jwt = require('jsonwebtoken')

dotEnv.config()
app = express()
app.use(express.json())


mongoose.connect(process.env.MONGO_URL)
.then((res)=>{
    console.log('MongoDB connected Successfully')
})
.catch((err)=>{
    console.log(`${err}`)
})

app.post('/register',async(req,res)=>{
    try{
        const { fullname, email,password,Confirmpassword} = req.body;
        const exist = await devuser.findOne({email})
        if(exist){
            return res.status(400).send('User Already Registered')
        }
        if(password != Confirmpassword){
            return res.status(403).send('Invalid Password')
        }
        let newUser = new devuser({
            fullname,email,password,Confirmpassword
        })
        newUser.save()
        

        const payload = { user: { id: newUser.id } };
        jwt.sign(payload, 'jwtPassword', { expiresIn: '1hr' }, (err, token) => {
        if (err) throw err;
        console.log('Generated Token:', token);
        res.status(200).json({ token }); 
        });
    }
    catch(err){
       console.log(err)
       return res.status(500).send('Server Error')
    }
})

app.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;
        const exist = await devuser.findOne({email})
        if(!exist){
            return res.status(400).send("User Not Exist")
        }
        if(exist.password != password){
            return res.status(400).send('Password Invalid')

        }
        let payload={
            user:{
                id: exist.id
            }
        }
        jwt.sign(payload,"jwtPassword",{expiresIn:'1hr'},
            (err,token)=>{
              if(err) throw err
              return res.json({token})
            }
        )
       
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Server Error')
    }
})



app.post('/transactions', async (req, res) => {
    try {
      const { type, category, amount, date, description } = req.body;
      const transaction = new transactionModel({ type, category, amount, date, description });
      await transaction.save();
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.get('/transactions', async (req, res) => {
try {
    const transactions = await transactionModel.find();
    res.json(transactions);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

app.get('/transactions/:id', async (req, res) => {
    try {
      const transaction = await transactionModel.findById(req.params.id);
      if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.put('/transactions/:id', async (req, res) => {
try {
    const updatedTransaction = await transactionModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true } 
    );
    if (!updatedTransaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(updatedTransaction);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

app.delete('/transactions/:id', async (req, res) => {
    try {
      const deletedTransaction = await transactionModel.findByIdAndDelete(req.params.id);
      if (!deletedTransaction) return res.status(404).json({ error: 'Transaction not found' });
      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.get('/summary', async (req, res) => {
    try {
      const { startDate, endDate, category } = req.query;
  
      
      const filter = {};
      if (startDate && endDate) {
        filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
      }
      if (category) filter.category = category;
  
      const transactions = await transactionModel.find(filter);
  
      
      const summary = transactions.reduce(
        (acc, transaction) => {
          if (transaction.type === 'income') acc.totalIncome += transaction.amount;
          else if (transaction.type === 'expense') acc.totalExpense += transaction.amount;
          return acc;
        },
        { totalIncome: 0, totalExpense: 0 }
      );
  
      summary.balance = summary.totalIncome - summary.totalExpense;
  
      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  

  
  
  

app.listen(process.env.PORT,()=>{
    console.log('Server is Started Succesfully on',process.env.PORT)
})

