const User = require('../models/User');

module.exports = {
    async store(req, res){
        const { email } = req.body;
        if(!email){
            return res.json({ message: 'Informe um e-mail'});
        }
        
        let user = await User.findOne({ email });
        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
};