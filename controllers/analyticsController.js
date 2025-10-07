exports.getAnalytics = (req, res) => {
    const analytics = {
        totalProjects: 24,
        activeContributors: 2,
        monthlyViews: 1200
    };
    res.json(analytics);
}