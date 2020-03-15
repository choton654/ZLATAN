var mongoose = require('mongoose')
var Comment = require('./models/comment')

var yelCamp = require('./models/yel_model')
var data = [{
        title: 'New Camp 1',
        image: 'https://images.all-free-download.com/images/wallpapers_large/fire_autumn_wallpaper_autumn_nature_wallpaper_1452.jpg',
        description: 'Nothing new here'

    },
    {
        title: 'New Camp 2',
        image: 'https://images.all-free-download.com/images/wallpapers_large/fire_autumn_wallpaper_autumn_nature_wallpaper_1452.jpg',
        description: 'Nothing new here'

    },
    {
        title: 'New Camp 3',
        image: 'https://images.all-free-download.com/images/wallpapers_large/fire_autumn_wallpaper_autumn_nature_wallpaper_1452.jpg',
        description: 'Nothing new here'

    }
]

function seedDb() {
    yelCamp.remove({}, function(err) {
        if (err) {
            console.log(err)

        } else {
            console.log('removed camps')
        }
    })
}

//             data.forEach(function(seed) {
//                 yelCamp.create(seed, function(err, text) {
//                     if (err) {
//                         console.log(err);

//                     } else {
//                         console.log('new camps are created');
//                         Comment.create({
//                             text: 'The place is very nice',
//                             author: 'Homer'
//                         }, function(err, comment) {
//                             if (err) {
//                                 console.log(err);

//                             } else {
//                                 text.comments.push(comment)
//                                 text.save()
//                                 console.log('created new comments');
//                             }
//                         })
//                     }
//                 })
//             })
//         }
//     }


// )
// }


module.exports = seedDb;