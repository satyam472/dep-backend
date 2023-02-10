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
    tutor_iconUrl:{
        type: String,
        required: true
    },
    modules:[
        {
            module_name:{
                type: String,
            },
            videos_of_module:[{ 
                video_token:{
                    type: String,
                }, 
                video_name:{
                    type: String,
                }, 
                video_imageUrl:{
                    type: String,
                },
                video_url:{
                    type: String,
                },
                video_price:{
                    type: Number,
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