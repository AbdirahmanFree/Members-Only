exports.signUpFormGet = (req,res) => {
    res.render("sign-up-form")
}

exports.signUpFormPost =(req,res) => {
    console.log(req.body)
}