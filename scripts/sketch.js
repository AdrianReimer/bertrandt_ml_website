// load model
var model
tf.loadLayersModel('https://www.adrianreimer.com/model.json').then(loaded_model=>{
	model = loaded_model
})

var label_dict = {
    "0": "Angry",
    "1": "Disgusted",
    "2": "Scared",
    "3": "Happy",
    "4": "Neutral",
    "5": "Sad",
    "6": "Surprised",
    7: "Laughter",
    8: "PosedLaughter",
    9: "SpeechLaughter",
}

var DEFAULT_MFCC_VALUE = new Array(261)
var FEATURE_NAME_MFCC = 'mfcc'
var FEATURE_NAME_RMS = 'rms'
var FEATURE_NAME_Buffer = 'buffer'

var THRESHOLD_RMS = 0.001 // threshold on rms value
var MFCC_HISTORY_MAX_LENGTH = 261

var BOX_WIDTH = 5
var BOX_HEIGHT = 5

var silence = true

var cur_mfcc = DEFAULT_MFCC_VALUE
var cur_rms = 0
var cur_buffer = 0
var mfcc_history = []

var canvas, ctx

var red_color = 150
var green_color = 144
var blue_color = 120


function
indexOfMax(arr) {
    if(arr.length == 0) {
        return -1
    }
    
    var max = arr[0]
    var max_idx = 0;
    
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] > max) {
            max_idx = i;
            max = arr[i];
        }
    }
    return max_idx
}

/* get new audio 
context object */
function createAudioCtx() {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
}

/* create microphone
audio input source from 
audio context */
function createMicSrcFrom(audioCtx) {
    // get microphone access
    return new Promise((resolve, reject)=> {
        // only audio
        let constraints = {audio:true, video:false}

        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream)=>{
            /* create source from
            microphone input stream */
            let src = audioCtx.createMediaStreamSource(stream)
            resolve(src)
        }).catch((err)=>{reject(err)})
    })
}

/* call given function
on new microphone analyser
data */
function onMicDataCall(features, callback) {
    return new Promise((resolve, reject)=> {
        let audioCtx = createAudioCtx()

        createMicSrcFrom(audioCtx)
        .then((src) => {
            let analyzer = Meyda.createMeydaAnalyzer({
                'audioContext': audioCtx,
                'source':src,
                'bufferSize':512,
                'featureExtractors':features,
                'callback':callback,
		'numberOfMFCCCoefficients': 40
            })
            resolve(analyzer)
        }).catch((err)=>{
            reject(err)
        })
    })
}


function setup() {
    buffer_canvas = document.getElementById('buffer')
    buffer_ctx = buffer_canvas.getContext('2d')
    mfcc_canvas = document.getElementById('mfcc')
    mfcc_ctx = mfcc_canvas.getContext('2d')

    // create meyda analyzer 
    // and connect to mic source
    onMicDataCall([FEATURE_NAME_MFCC, FEATURE_NAME_RMS, FEATURE_NAME_Buffer], show)
    .then((meydaAnalyzer) => {
        meydaAnalyzer.start()
    }).catch((err)=>{
        alert(err)
    })
}

function show(features) {
    // update spectral data size
    cur_mfcc = features[FEATURE_NAME_MFCC]
    cur_rms = features[FEATURE_NAME_RMS]
    cur_buffer = features[FEATURE_NAME_Buffer]
}

function draw() {
    // append new mfcc values
    if(cur_rms > THRESHOLD_RMS) {
        mfcc_history.push(cur_mfcc)
        silence = false
    }
    // plot new mfcc snippet
    plot_mfcc()
    plot_buffer()
    // predict output
    if(mfcc_history.length == MFCC_HISTORY_MAX_LENGTH) {
        var input = mfcc_history.slice()
        mfcc_history = []
        var stacked = tf.stack([input, input, input], axis=-1)
        var reshaped = stacked.reshape([1, 40, 261, 3])
        var model_pred = model.predict(reshaped) 
        document.getElementById("prediction").innerHTML = label_dict[tf.argMax(model_pred, axis=1).dataSync()]
    }	
}

function plot_mfcc() {
    if(mfcc_history.length) {
        var x = mfcc_history.length - 1
        for(let y = 0; y < mfcc_history[x].length; y++ ) {
            let color_strength = mfcc_history[x][y]
            // setting color
            if (mfcc_history[x][y] >= -300) {
                mfcc_ctx.fillStyle = "rgb(255, " +
                                (green_color + color_strength) +
                                "," +
                                (blue_color + color_strength) +
                                ")"
            } else {
                mfcc_ctx.fillStyle = "rgb(" +
                                (red_color + color_strength) +
                                "," +
                                (green_color + color_strength) +
                                ", 255)"
            }
            // drawing the rectangle
            mfcc_ctx.fillRect(x * BOX_WIDTH,
                         y * BOX_HEIGHT,
                         BOX_WIDTH,
                         BOX_HEIGHT)
        }
    }
}

function plot_buffer() {
    if(cur_buffer.length) {
        buffer_ctx.clearRect(0, 0, buffer_canvas.width, buffer_canvas.height);
        var buffer_idx = 0
        for(let i = 0; i < cur_buffer.length; i++ ) {
            let color_strength = cur_buffer[i] * 500
            // setting color
            buffer_ctx.fillStyle = "rgb(30, 30, 30)"
            // drawing the rectangle
            buffer_ctx.fillRect(buffer_idx,
                        color_strength + 100,
                         1.5,
                         1.5)     
            buffer_idx = buffer_idx + 1      
        }
    }
}

function full_plot_mfcc() {
    if(mfcc_history.length) {
        for(let x = 0; x < mfcc_history.length; x++ ) {
            for(let y = 0; y < mfcc_history[x].length; y++ ) {
                let color_strength = mfcc_history[x][y]
                // setting color
                if (mfcc_history[x][y] >= -300) {
                    mfcc_ctx.fillStyle = "rgb(255, " +
                                    (green_color + color_strength) +
                                    "," +
                                    (blue_color + color_strength) +
                                    ")"
                } else {
                    mfcc_ctx.fillStyle = "rgb(" +
                                    (red_color + color_strength) +
                                    "," +
                                    (green_color + color_strength) +
                                    ", 255)"
                }
                // drawing the rectangle
                mfcc_ctx.fillRect(x * BOX_WIDTH,
                                y * BOX_HEIGHT,
                                BOX_WIDTH,
                                BOX_HEIGHT)
            }
        }
    }
}
