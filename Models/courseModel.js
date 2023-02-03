const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    course_token :{
        type: Number,
        required: true
    },
    course_name:{
        type: String,
        required: true
    }, 
    course_imageUrl:{
        type: String,
        required: true
    },
    tutor_name:{
        type: String,
        required: true
    }, 
    tutor_icon:{
        type: String,
        required: true
    },
    modules:[
        {
            module_name:{
                type: String,
            },
            videos_of_module:[{ 
                video_name:{
                    type: String,
                }, 
                video:{
                    type: String,
                },
                video_image:{
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now,
                }
            }]
        }
    ],
    date: {
        type: Date,
        default: Date.now,
    }
});
const CourseModel = mongoose.model('course', courseSchema);

module.exports = CourseModel;