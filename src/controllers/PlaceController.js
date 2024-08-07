const Place = require('../models/Place');
const User = require('../models/User');
class PlaceController {
    // POST api/place/add-place
    async addPlace(req, res, next) {
        try {
            const placeData = {
                name: req.body.name,
                desc: req.body.desc,
                img: req.body.img || '', // Sử dụng đường dẫn đến ảnh từ request body (nếu có)
                isFamous: req.body.isFamous || false,
                region: req.body.region || '',
            };
            const existingPlace = await Place.findOne({ name: placeData.name });
            if (existingPlace) {
                return res.status(200).json({ message: 'Place with this name already exists', isupload: true });
            }
            const place = new Place(placeData);
            const savedPlace = await place.save();
            res.json({ message: 'Place created successfully', data: savedPlace });
        } catch (error) {
            next(error);
        }
    }
    createForm(req, res, next) {
        const userId = req.user.id;
        const user = User.findById(userId);
        res.render('create-form', { layout: 'layouts/dashboard-layout', user });
    }
    // GET api/place/edit-place/:id
    async editForm(req, res, next) {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const placeId = req.params.id;
        Place.findById(placeId)
            .then((place) => {
                if (!place) {
                    return res.status(404).json({ message: 'Place not found' });
                } else {
                    res.render('edit-form', { layout: 'layouts/dashboard-layout', place: place, user });
                }
            })
            .catch(next);
    }
    // PUT api/place/edit-place/:id
    editPlace(req, res, next) {
        const placeId = req.params.id;
        const updateData = req.body;
        Place.findByIdAndUpdate(placeId, updateData)
            .then((place) => {
                if (!place) {
                    return res.status(404).json({ message: 'Place not found' });
                } else {
                    res.status(200).json({ message: 'Edit place successfully', data: place });
                }
            })
            .catch(next);
    }
    // GET api/place/search-place/:name
    searchPlace(req, res, next) {
        const placeName = req.params.name;
        Place.find({ name: { $regex: placeName, $options: 'i' } })
            .then((places) => {
                if (places.length < 0) {
                    return res.status(404).json({ message: 'Place not found' });
                } else {
                    res.status(200).json({ message: 'Success', data: places });
                }
            })
            .catch(next);
    }

    // GET api/place/place-data
    placeTable(req, res, next) {
        const userId = req.user.id;
        const user = User.findById(userId);
        Place.find()
            .then((places) => {
                if (places.length === 0) {
                    return res.status(404).json({ message: 'Empty' });
                } else {
                    res.render('table-data', {
                        places,
                        layout: 'layouts/dashboard-layout',
                        user,
                    });
                }
            })
            .catch(next);
    }
}

module.exports = new PlaceController();
