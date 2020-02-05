// $('#file-fr').fileinput({
//     theme: 'fas',
//     language: 'fr',
//     uploadUrl: '#',
//     allowedFileExtensions: ['jpg', 'png', 'gif']
// });
// $('#file-es').fileinput({
//     theme: 'fas',
//     language: 'es',
//     uploadUrl: '#',
//     allowedFileExtensions: ['jpg', 'png', 'gif']
// });




// $(".file-input .fileinput-upload-button").on('click', function () {
//     var start = new Date().getTime();
//     console.log(start);
// });

var responseTime;
$('#file-1').on('fileselect', function() {
    var start = new Date().getTime();
    // console.log(start);
    responseTime=start;
});



$("#file-1").fileinput({

    theme: 'fas',
    uploadUrl: 'https://18.211.135.140:5000/speechtotext', // you must set a valid URL here else you will get an error
    allowedFileExtensions: ['jpg', 'png', 'wav'],
    overwriteInitial: false,
    // maxFileSize: 1000,
    'showRemove' : false,
    maxFilesNum: 10,
    maxFileCount: 1,
    //allowedFileTypes: ['image', 'video', 'flash'],
    
    slugCallback: function (filename) {
        return filename.replace('(', '_').replace(']', '_');
    }
}).on('fileuploaded', function(event, previewId, index, fileId) {
    // console.log(previewId.response.text);
    
    
    $("#transcriptionResponse").html('<div class="row"><div class="col-sm-6"><h3>Transcription</h3></div><div class="col-sm-6"><label class="float-right uploadResponseTime">API response time:' + ( (event.timeStamp - responseTime)/1000) +' s</div></div></label><pre class="returnedTranscription">' + previewId.response.text+'</pre>');

    
    //$("#transcriptionResponse").html('<h3>Transcription</h3><pre class="returnedTranscription">' + previewId.response.text+'</pre>');
    // console.log(event,'File Uploaded', 'ID: ' + fileId + ', Thumb ID: ' + previewId);
//    console.log(event.timeStamp);
}).on('fileuploaderror', function(event, data, msg) {
    // console.log('File Upload Error', 'ID: ' + data.fileId + ', Thumb ID: ' + data.previewId);
}).on('filebatchuploadcomplete', function(event, preview, config, tags, extraData) {
    // console.log('File Batch Uploaded', preview, config, tags, extraData);
});







/*
 $(".file").on('fileselect', function(event, n, l) {
 alert('File Selected. Name: ' + l + ', Num: ' + n);
 });
 */
// $("#file-3").fileinput({
//     theme: 'fas',
//     showUpload: false,
//     showCaption: false,
//     browseClass: "btn btn-primary btn-lg",
//     fileType: "any",
//     previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
//     overwriteInitial: false,
//     initialPreviewAsData: true
// });
// $("#file-4").fileinput({
//     theme: 'fas',
//     uploadExtraData: {kvId: '10'}
// });
$(".btn-warning").on('click', function () {
    var $el = $("#file-4");
    if ($el.attr('disabled')) {
        $el.fileinput('enable');
    } else {
        $el.fileinput('disable');
    }
});
$(".btn-info").on('click', function () {
    $("#file-4").fileinput('refresh', {previewClass: 'bg-info'});
});
/*
 $('#file-4').on('fileselectnone', function() {
 alert('Huh! You selected no files.');
 });
 
 $('#file-4').on('filebrowse', function() {
 alert('File browse clicked for #file-4');
 });
 */
$(document).ready(function () {
    
    function hidepanel() {
        $('#loader').hide();
    }
    setTimeout(hidepanel, 1300)

    // $("#test-upload").fileinput({
    //     'theme': 'fas',
    //     'showRemove' : false,
    //     'showPreview': false,
    //     'allowedFileExtensions': ['jpg', 'png', 'wav'],
    //     'elErrorContainer': '#errorBlock'
    // });
    
    /*
     $("#test-upload").on('fileloaded', function(event, file, previewId, index) {
     alert('i = ' + index + ', id = ' + previewId + ', file = ' + file.name);
     });
     */
    $("#file-0b").fileinput();



    
        
});
// $(document).on('ready', function () {
    
//     });