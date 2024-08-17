const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

// Encryption function
const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, process.env.ENCRYPTION_KEY).toString();
};

// Decryption function
const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        set: encrypt, // Encrypt before saving
        get: decrypt  // Decrypt when retrieving
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        set: encrypt, // Encrypt before saving
        get: decrypt  // Decrypt when retrieving
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['owner', 'agent', 'buyer'], required: true },
    isAdmin: { type: Boolean, default: false },
    address: { 
        type: String,
        set: encrypt, // Encrypt before saving
        get: decrypt  // Decrypt when retrieving
    },
    passwordChangeDate: { type: Date, default: Date.now },
    previousPasswords: [{ type: String }]  // Storing old hashed passwords
}, { timestamps: true, toJSON: { getters: true }, toObject: { getters: true } });

userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!complexityRegex.test(this.password)) {
            throw new Error('Password does not meet complexity requirements.');
        }

        const hashedPassword = await bcrypt.hash(this.password, 10);

        // Check if the new password matches any previous passwords
        for (let oldPassword of this.previousPasswords) {
            const isMatch = await bcrypt.compare(this.password, oldPassword);
            if (isMatch) {
                throw new Error('You cannot reuse an old password.');
            }
        }

        // Limit the number of stored previous passwords to 5
        if (this.previousPasswords.length >= 5) {
            this.previousPasswords.shift();
        }

        this.previousPasswords.push(hashedPassword);

        this.password = hashedPassword;
        this.passwordChangeDate = Date.now();  // Update the password creation date
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
