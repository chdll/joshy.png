let video;
let bodyPose;
let poses = [];

function preload() {
    bodyPose = ml5.bodyPose("MoveNet", {flipped: true})
}

function gotPoses(results) {
 poses = results
}

function mousePressed() {
    console.log(poses)
}

function setup() {
    createCanvas(640, 480);
    video = createCapture({
        audio: false,
        video: {
            facingMode: "user",
            flipped: "true"
        }
    }, { flipped: true })

    video.hide()

    bodyPose.detectStart(video, gotPoses)
}

let lookingAway;

function draw() {
    image(video, 0, 0)

    if (poses.length > 0) {
        let pose = poses[0];
        let l = pose.left_ear
        let r = pose.right_ear

        // fill(255,0,0);
        // circle(l.x, l.y, 10)
        // circle(r.x, r.y, 10)


        for (let i = 0; i < 5; i++) {
            let keypoint = pose.keypoints[i];
            fill(255,0,0);
            noStroke()
            if (keypoint.confidence > 0) {
                circle(keypoint.x, keypoint.y, 12)
            }

            // if (pose.left_ear.x > pose.left_eye.x) {
            //     console.log('looking LEFT')
            //     lookingAway = true
            // }

            // if (pose.right_ear.x < pose.right_eye.x) {
            //     console.log('looking RIGHT')
            //     lookingAway = true
            // }

            // if (pose.nose.y - 21 < pose.left_eye.y || pose.nose.y - 21 < pose.right_eye.y) {
            //     console.log('looking UP')
            // }

            // if (Math.min(pose.left_ear.y, pose.right_ear.y) < Math.max(pose.left_eye.y, pose.right_eye.y)) {
            //     console.log('looking DOWN')
            //     lookingAway = true
            // }


            if ((pose.left_ear.x > pose.left_eye.x) || (pose.right_ear.x < pose.right_eye.x) || (Math.min(pose.left_ear.y, pose.right_ear.y) < Math.max(pose.left_eye.y, pose.right_eye.y))) {
                lookingAway = true
                console.log('lookingAway')
            } else {
                lookingAway = false
            }
        }
    }
}

// let lookAwayStartTime = null;
// let attentionStartTime = null;
// let distractedTrigger = false;

// function checkAttention() {
//     if (lookingAway) {
//         attentionStartTime = null;

//         if (lookAwayStartTime === null) {
//             lookAwayStartTime = Date.now()
//         }

//         if (Date.now() - lookAwayStartTime >= 5000 && !distractedTrigger) {
//             // distractedUser()
//             console.log('subway')
//             lookAwayStartTime = null;
//             distractedTrigger = true;
//         } else {
//             if (attentionStartTime === null) {
//                 attentionStartTime = Date.now()
//             }
//         }

//         if (distractedTrigger && Date.now() - attentionStartTime >= 10000) {
//             lookAwayStartTime = null;
//             distractedTrigger = false;
//             attentionStartTime = null;
//             console.log('user has paid attention for 10 secs')
//         }
//     } else {
//         lookAwayStartTime = null;
//         attentionStartTime = Date.now()
//     }
// }
// setInterval(checkAttention, 500)