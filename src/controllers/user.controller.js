const User = require('../models/User');
const Role = require('../models/Role');

exports.createUser = async(req, res) => {
    try {
        const { username, email, password, roles } = req.body;

        const rolesFound = await Role.find({ name: { $in: roles } });

        // creating a new User
        const user = new User({
            username,
            email,
            password,
            roles: rolesFound.map((role) => role._id),
        });

        // encrypting password
        user.password = await User.encryptPassword(user.password);

        // saving the new user
        const savedUser = await user.save();

        return res.status(200).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            roles: savedUser.roles,
        });
    } catch (error) {
        console.error(error);
    }
};

exports.getUsers = async(req, res) => {
    const user = await User.find({});
    res.json(user)
};

exports.getUser = async(req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    res.json(user)
};

exports.remove = async(req, res, next) => {
    try {
        await User.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'el producto ha sido eliminado' })

    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion de eliminar producto'
        })
    }

}