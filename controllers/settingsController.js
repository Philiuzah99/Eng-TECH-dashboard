exports.getSettings = (req, res) =>{
    const settings = {
        them: "dark",
        notifications: true
    };
    res.json(settings);
};