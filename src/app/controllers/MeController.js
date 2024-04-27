
const {mongooseToObject, mutipleMongooseToObject} = require('../../uitl/mongoose')
const Course = require('../models/Course');

class MeController {
    //[GET] /courses/:slug
  
    storedCourses(req, res, next){
        Course.find({})
            .then(courses => {
                res.render('me/stored-courses',{
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next);   
    }

    trashCourses(req, res, next){
        Course.findWithDeleted({deleted:true})
            .then(courses => {
                res.render('me/trash-courses',{
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next);   
    }
}

module.exports = new MeController();
