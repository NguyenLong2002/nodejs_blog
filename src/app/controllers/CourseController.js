
const {mongooseToObject} = require('../../uitl/mongoose')
const Course = require('../models/Course');

class CourseController {
    //[GET] /courses/:slug
  
    show(req, res, next){
        Course.findOne({slug:req.params.slug})
        .then(course =>{
            res.render('courses/show',{course:mongooseToObject(course)})
        })
        .catch(next)
    }
    //[GET] /courses/create
    create(req, res, next){
        res.render('courses/create')
    }
    
    //[POST] /courses/store
    store(req, res, next){
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save().then(() => res.redirect('/me/stored/courses')).catch((err) => {})
        
        
    }
    //[GET] /courses/:id/edit
    edit(req, res, next){
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit',{
                course : mongooseToObject(course)
            }))
            .catch(next)
    }
    //[PUT]
    update(req, res, next){
        Course.updateOne({_id: req.params.id},req.body).then(() => res.redirect('/me/stored/courses')).catch(next);
    }
    //[DELETE] (xóa mềm)
    destroy(req, res, next){
        Course.delete({_id: req.params.id}).then(() => res.redirect('back')).catch(next);
    }
    //[DELETE] /courses/:id/force (xóa cứng)
    forceDestroy(req, res, next){
        Course.deleteOne({_id: req.params.id}).then(() => res.redirect('back')).catch(next);
    }
    //[PATCH]
    restore(req, res, next){
        Course.restore({_id: req.params.id}).then(() => res.redirect('back')).catch(next);
    }
    //[POST] /courses/handle-form-actions
    handleFormAction(req,res ,next){
        switch(req.body.action){
            case 'delete':
                 Course.delete({_id: { $in: req.body.courseIds }}).then(() => res.redirect('back')).catch(next);
                break;
            default:
                res.json({message:'Action invalid!'})
        }
    }
    //[POST] /courses/handle-form-actions-trash
    handleFormActionTrash(req, res ,next){
        switch(req.body.action){
            case 'restore':
                Course.restore({_id: { $in: req.body.courseIds }}).then(() => res.redirect('back')).catch(next);
                break;
            case 'delete':
                 Course.deleteMany({_id: { $in: req.body.courseIds }}).then(() => res.redirect('back')).catch(next);
                break;
            default:
                res.json({message:'Action invalid!'})
        }
    }
}

module.exports = new CourseController();
