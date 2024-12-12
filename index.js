const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRouter');

const app = express();
app.use(bodyParser.json());
app.use('/api/auth',authRoutes);
const PORT = process.env.PORT || 5000;
app.get('/',(req, res)=>{
    res.status(200).json({message:"server runs good"})
})

// sequelize.sync({force:false}).then(()=>{
//     app.listen(PORT, ()=> {
//         console.log(`server running on ${PORT}`)
//     })
// })

sequelize.sync({ force: false }).then(() => {
    console.log("Database synced");
  });
  
  // Export the app for Vercel serverless functions
module.exports = app;