var authMiddle=function(req,res,next){
    console.log("In the middle.")
    next()
}
module.exports = {
    authMiddle:authMiddle,
}
