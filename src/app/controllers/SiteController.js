
const {mutipleMongooseToObject} = require('../../uitl/mongoose')
const Course = require('../models/Course');

class SiteController {
    //[GET] /
  
    index(req,res,next){
       Course.find({})
            .then(courses => {
                res.render('home',{
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next); 
    }
    
    //[GET] /index/search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
