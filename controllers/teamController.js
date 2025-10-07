exports.getTeam = (req, res) => {
    const team = [
        {
            name: "Philip",
            role: "Engineer and Educator",
            bio: "Engineer, tech educator and system designer, founder.",
            photoUrl: "/assets/philip1.jpg"
        },
        {
            name: "Njoki",
            role: "Sales and Marketing Manager",
            bio: "Handles sales and marketing of our services and products.",
            photoUrl:  "/assets/njoki.jpg"
        }
    ];
    res.json(team);
}