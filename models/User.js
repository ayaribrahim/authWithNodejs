const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {                                                                                                                                        
    if(this.password) {                                                                                                                                                        
        const salt = await bcrypt.genSaltSync(10)                                                                                                                                     
        this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
})  


const User = mongoose.model('User', userSchema);

module.exports = User;