var authMiddle=function(req,res,next){
    console.log("In the middle.");
    console.log(req.url)
    next()
}
module.exports = {
    authMiddle:authMiddle,
}
