const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    course_name:{
        type: String,
        required: true
    }, 
    image:{
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
const CourseModel = mongoose.model('course', UserSchema);

module.exports = CourseModel;