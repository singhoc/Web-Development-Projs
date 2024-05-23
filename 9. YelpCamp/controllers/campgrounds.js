const Campground = require('../models/campground')


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}

module.exports.newCampForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.viewCamp = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'//for populating author reviews
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.createCamp = async (req, res) => {
    //if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400)
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully created new campground');

    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.editCampForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(req.params.id);

    res.render(`campgrounds/edit`, { campground });
}

module.exports.updateCamp = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCamp = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/campgrounds');
}