// http://stackoverflow.com/a/1145525/1608986
// http://stackoverflow.com/a/1137579/1608986
String.prototype.replaceAll = function (find, replace) {
    return this.split(find).join(replace);
}

function countLines(evt) {
    var nLines = evt.target.result.split("\n").length;
    document.getElementById("fileLines").innerHTML = nLines;
}

function convertTSVtoCSV(evt) {
    var TSV = evt.target.result;
    // TODO: make this less naive.
    return TSV.replaceAll('\t', ',');
}

function downloadCSV(CSVString) {
    // http://stackoverflow.com/a/20194533/1608986
    var tempAnchor = window.document.createElement('a');
    CSVBlob = new Blob([CSVString], {type: 'text/csv'});
    tempAnchor.href = window.URL.createObjectURL(CSVBlob);
    tempAnchor.download = 'test.csv';
    tempAnchor.style.display = 'none';

    // Append anchor to body.
    document.body.appendChild(tempAnchor);
    tempAnchor.click();

    // Remove anchor from body
    document.body.removeChild(tempAnchor);
}


function processFile(evt) {
    countLines(evt);
    downloadCSV(convertTSVtoCSV(evt));
}

function updateFileInfo(files) {
    // For the moment, assume we have only one file.
    var currentFile = files[0];
    document.getElementById("filename").innerHTML = currentFile.name;
    document.getElementById("mimetype").innerHTML = currentFile.type;
    document.getElementById("fileSize").innerHTML = currentFile.size + " bytes.";
    var reader = new FileReader();
    reader.onload = processFile;
    reader.readAsText(currentFile);
}

function handleFiles(files) {
    updateFileInfo(files);
}
function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}

function makeTable(matrix) {
    var table = document.createElement('table');

    for (var i = 0; i < matrix.length; i++) {
        var table_row = document.createElement('tr');
        table.appendChild(table_row)
        var row = matrix[i]
        for (var j = 0; j < row.length; j++) {
            var element = row[j];
            var table_element = document.createTextNode(element.toString());
            var table_data = document.createElement('td');
            table_data.appendChild(table_element);
            table_row.appendChild(table_data);
        }
    }

    var table_holder = document.getElementById("table_holder");
    table_holder.appendChild(table);
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}
function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    var dt = e.dataTransfer;
    var files = dt.files;
    handleFiles(files);
}
window.onload = function() {
    var dropzone;
    dropzone = document.getElementById("dropzone");
    dropzone.addEventListener("dragenter", dragenter, false);
    dropzone.addEventListener("dragover", dragover, false);
    dropzone.addEventListener("drop", drop, false);
}
