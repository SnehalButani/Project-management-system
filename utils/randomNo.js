function generateOTP(){
    return Math.floor(1000 + Math.random() * 90000) 
}

module.exports = { generateOTP };