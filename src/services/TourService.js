const Place = require('../models/Place');
const Tour = require('../models/Tour');

class TourService {
    async getToursByRegion(region) {
        try {
            const tours = await Tour.find().populate({
                path: 'placeData',
                match: { region: region },
            });
            const filteredTours = tours.filter((tour) => tour.placeData !== null);
            return filteredTours;
        } catch (error) {
            console.error('Error in getToursByRegion:', error);
            throw error;
        }
    }
    async getHotPlaces(limit) {
        try {
            const tours = await Tour.find()
                .populate({
                    path: 'placeData',
                    match: { isFamous: true },
                })
                .limit(limit);
            const filteredTours = tours.filter((tour) => tour.placeData !== null);
            const hotPlaces = [];
            filteredTours.forEach((tour) => {
                hotPlaces.push(tour.placeData.name);
            });
            return hotPlaces;
        } catch (error) {
            console.error('Error in getToursFamous:', error);
            throw error;
        }
    }
}

module.exports = new TourService();
