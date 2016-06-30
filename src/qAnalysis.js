//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global localStorage: false, CORR, evenRound: false, console: false, QAV, $: false, _: false, Handsontable:false, document: false, CENTROID, alasql: false*/

$(document).ready(function () {

    // hide download button until after preliminary results are displayed
    $("#downloadResultsButton").hide();

    //  change the value of checkboxes on factor rotation table when clicked
    $('#factorRotationTable2').on('click', 'td', function () {
        var myTable = $('#factorRotationTable2').DataTable();
        if (myTable.cell($(this)).data() === 'false') {
            myTable.cell($(this)).data('true');
        } else if (myTable.cell($(this)).data() === 'true') {
            myTable.cell($(this)).data('false');
        }
    });

    // display quick results button event listener
    $('#displayQuickResultsButton').on('click', function () {

        // pull the state data (selected factor loadings - checkboxes) from table
        var results = [];
        var loopLen1 = JSON.parse(localStorage.getItem("qavRespondentNames")).length;
        var data = $('#factorRotationTable2').DataTable();
        for (var i = 0; i < loopLen1; i++) {
            var data2 = data.row(i).data();
            results.push(data2);
        }
        localStorage.setItem("results", JSON.stringify(results));

        // get selected factors information
        getFactorsForAnalysis();

        // begins preliminary results display function cascade
        var canOutput = pullFlaggedFactorLoadings();

        if (canOutput !== "false") {
            generateOutput();
            clearPreviousTables();
            
            
            CORR.drawRawSortsRadviz();
            
            showPreliminaryOutput1();
            $("#downloadResultsButton").show();
            $("#clearStorageButton").show();
        }
    });

    // start the output calculations and file write functions cascade
    $("#downloadResultsButton").on("click", function () {
        downloadOutput();
    });

    $("#selectFactorsForOutputButton").on("click", function () {
        appendFactorSelectionCheckboxes();
    });

    $("#clearStorageButton").on("click", function () {
        $('#deleteLocalDataModal').toggleClass('active');
    });


    $("#deleteLocalDataConfirmButton").on("click", function () {
        localStorage.clear();
        sessionStorage.clear();
        $('#deleteLocalDataModal').toggleClass('active');
        $('.successDeleteModal').toggleClass('active');
        setTimeout(function () {
            $('.successDeleteModal').toggleClass('active');
        }, 2000);
    });

    // tracker for results download / display buttons
    localStorage.setItem("outputComplete", "false");

});



// ***********************************************************************  view
// ******  remove previous tables from the DOM  ********************************
// *****************************************************************************
// todo - dry and clean-up this block

function clearPreviousTables() {
    var $temp = $("#factorCorrelationTableTitle");
    var $temp3 = $("#factorCorrelationTableDiv");
    if ($temp) {
        $temp.empty();
        $temp3.empty();
    }
    var $temp2 = $("#factorTables");
    if ($temp2) {
        $temp2.empty();
    }
}


// ************************************************************************  view
// ******  Preliminary Results 1 - draw factor score correlations table  ********
// ******************************************************************************
function showPreliminaryOutput1() {

    $("#factorCorrelationTableTitle").append("<h4>Factor Score Correlations</h4>");

    //  todo - fix ordering error of factors - use large demo set with 7 factors to see error and reduce appends to only one

    $("#factorCorrelationTableDiv").append('<table id="factorCorrelationTable" class="display compact nowrap cell-border stripe"></table>');

    var data = JSON.parse(localStorage.getItem("outputSpreadsheetArray"));

    var newData = data[5];

    var columnHeadersArray = data[5][0];
    var columnHeaders = [];
    for (var i = 0; i < columnHeadersArray.length; i++) {
        var tempObj = {};
        tempObj.title = columnHeadersArray[i];
        tempObj.class = "dt-head-center dt-body-right";
        columnHeaders.push(tempObj);
    }

    columnHeaders[0].class = "dt-head-center dt-body-center";

    newData.shift();

    $("#factorCorrelationTable").DataTable({
        "retrieve": true,
        "searching": false,
        "ordering": false,
        "info": false,
        "scrollY": 350,
        "scrollCollapse": false,
        "scrollX": false,
        "paging": false,
        "data": newData,
        "columns": columnHeaders
    });

    var table = $('#factorCorrelationTable').DataTable();
    var lastIdx = null;
    $('#factorCorrelationTable tbody')
        .on('mouseover', 'td', function () {
            var colIdx = table.cell(this).index().column;
            if (colIdx !== lastIdx) {
                $(table.cells().nodes()).removeClass('highlight');
                $(table.column(colIdx).nodes()).addClass('highlight');
            }
        })
        .on('mouseleave', function () {
            $(table.cells().nodes()).removeClass('highlight');
        });
    showPreliminaryOutput2();
}

// **********************************************************************  view
// ******  Preliminary Results 2 - draw factor score tables  ******************
// ****************************************************************************

// todo - use document fragment to get rid of all these appends

function showPreliminaryOutput2() {

    var userSelectedFactors = JSON.parse(localStorage.getItem("userSelectedFactors"));

    //  todo - fix ordering error of factors - use large demo set with 7 factors to see error

    var data = JSON.parse(localStorage.getItem("outputSpreadsheetArray"));
    var s1, s2, s3;


    // START FOR EACH FACTOR LOOP
    for (var j = 0; j < userSelectedFactors.length; j++) {

        var factorNumber = j + 1;

        var factorH4Label = _.capitalize(userSelectedFactors[j]);

        $("#factorTables").append('<div class="resultsLabel1"><h4>' + factorH4Label + ' - Flagged Q-sort Weights</h4></div><table id="factorWeightResults' + factorNumber + '" class="display compact nowrap cell-border stripe"></table>');

        if (j === 0) {
            s1 = 8;
        }
        var newWeightData = data[s1];
        newWeightData.shift();
        var weightColumnHeaders = [
            {
                title: "Q-Sort",
                class: "dt-head-center dt-body-center",
        },
            {
                title: "Weight",
                class: "dt-head-center dt-body-center",
        }
        ];

        $("#factorWeightResults" + factorNumber).DataTable({
            "retrieve": true,
            "searching": false,
            "ordering": false,
            "info": false,
            "scrollY": 800,
            "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            "data": newWeightData,
            "columns": weightColumnHeaders,
            "columnDefs": [{
                targets: [0],
                className: 'dt-body-center dt-body-name'
                }, {
                targets: '_all',
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData < 0) {
                        $(td).css('color', 'red');
                    }
                }
        }],
        });

        s1 = s1 + 3;

        $("#factorTables").append('<div class="resultsLabel1"><h4>' + factorH4Label + ' - Flagged Q-sort Correlations</h4></div><table id="factorMiniCorrelResults' + factorNumber + '" class="display compact nowrap cell-border stripe"></table>');


        if (j === 0) {
            s2 = 9;
        }


        var newMiniCorrData = data[s2];
        var miniCorrColumnHeaders = [
            {
                title: "Q-Sort",
                class: "dt-head-center dt-body-center",
        }];

        for (var k = 1; k < newMiniCorrData[0].length; k++) {
            var tempObjMC = {};
            tempObjMC.title = newMiniCorrData[0][k];
            tempObjMC.class = "dt-head-center dt-body-center";
            miniCorrColumnHeaders.push(tempObjMC);
        }

        newMiniCorrData.shift();

        $("#factorMiniCorrelResults" + factorNumber).DataTable({
            "retrieve": true,
            "searching": false,
            "ordering": false,
            "info": false,
            "scrollY": 800,
            "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            "data": newMiniCorrData,
            "columns": miniCorrColumnHeaders,
            "columnDefs": [{
                targets: [0],
                className: 'dt-body-center dt-body-name'
                }, {
                targets: '_all',
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData < 0) {
                        $(td).css('color', 'red');
                    }
                }
        }],
        });

        s2 = s2 + 3;

        $("#factorTables").append('<div class="resultsLabel1"><h4>' + factorH4Label + ' - Z-Scores, Sort Values, and Raw Sorts</h4></div><table id="prelimResults' + factorNumber + '" class="display compact nowrap cell-border stripe"></table>');

        if (j === 0) {
            s3 = 10;
        }
        var newData = data[s3];

        var columnHeadersArray = Object.keys(newData[0]);

        // the set leftmost 4 columns
        var columnHeaders = [
            {
                title: "State. No.",
                class: "dt-head-center dt-body-center",
                "data": "Statement Number"
        },
            {
                title: "Statement",
                class: "dt-head-center dt-body-left",
                "data": "Statement"
        },
            {
                "data": "zScore",
                title: "z-Score",
                class: "dt-head-center dt-body-right"
        },
            {
                title: "Sort Value",
                class: "dt-head-center dt-body-center",
                "data": "Sort Value"
        }
        ];
        // looping in all of the raw sort column headers
        for (var i = 4; i < columnHeadersArray.length; i++) {
            var tempObj = {};
            tempObj.title = columnHeadersArray[i];
            tempObj.class = "dt-head-center dt-body-center";
            tempObj.data = columnHeadersArray[i];
            columnHeaders.push(tempObj);
        }

        $("#prelimResults" + factorNumber).DataTable({
            "fixedColumns": {
                leftColumns: 1
            },
            "retrieve": true,
            "searching": false,
            "ordering": true,
            "order": [[2, "desc"]],
            "info": false,
            "scrollY": 800,
            "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            "data": newData,
            "columns": columnHeaders
        });

        s3 = s3 + 3;
    }
}


// **********************************************************************  view
// ******  dynamicallly append checkboxs to select factors for analysis *******
// ****************************************************************************
function appendFactorSelectionCheckboxes() {

    var hasSplitFactor = localStorage.getItem("hasSplitFactor");
    var j, len, k, temp5, pcaFactorLabels = [];
    // read in factor labels to generate checkboxes (and checking for split factor)
    var factorsToSelect;

    var loopLen;

    if (hasSplitFactor > 0) {
        var headers = JSON.parse(localStorage.getItem("factorLabels"));
        var i, temp1, temp3;
        factorsToSelect = [];

        headers.shift();
        headers.shift();
        headers.shift();
        headers.pop();

        for (i = 0; i < headers.length; i++) {
            temp1 = headers[i].title;
            if (temp1 !== "flag") {
                temp3 = temp1.replace(/Ftr/g, 'Factor');
                factorsToSelect.push(temp3);
            }
        }

        loopLen = factorsToSelect.length;

    } else {

        if (QAV.typeOfFactor === "PCA") {
            for (k = 0, len = QAV.numFactorsRetained; k < len; k++) {
                temp5 = "factor " + (k + 1);
                pcaFactorLabels.push(temp5);
            }

            factorsToSelect = pcaFactorLabels;
        } else {

            factorsToSelect = JSON.parse(localStorage.getItem("factorLabels"));
        }
    }
    localStorage.setItem("factorLabelsArray", JSON.stringify(factorsToSelect));
    QAV.factorLabelsArray = factorsToSelect;

    loopLen = QAV.getState("numFactorsRetained");

    // check to see if checkboxes are already appended, and if so remove them
    removeOutputFactorCheckboxes();

    //  generate and append checkboxes
    for (j = 0; j < loopLen; j++) {
        // for (var j = 0; j < factorsToSelect.length; j++) {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "analysisFactors";
        checkbox.value = "value";
        checkbox.id = factorsToSelect[j];

        var label = document.createElement('label');
        label.htmlFor = factorsToSelect[j];
        label.className = "checkboxLabel";
        label.appendChild(document.createTextNode(factorsToSelect[j]));

        document.getElementById("selectFactorsForOutputDiv").appendChild(checkbox);
        document.getElementById("selectFactorsForOutputDiv").appendChild(label);
    }
}

function removeOutputFactorCheckboxes() {
    var temp = document.getElementById("selectFactorsForOutputDiv");
    if (temp) {
        while (temp.firstChild) {
            temp.removeChild(temp.firstChild);
        }
    }
}

// **********************************************************************  model
// **************  pull user-selected factors for analysis *********************
// *****************************************************************************

function getFactorsForAnalysis() {
    var checkboxes = document.getElementsByName('analysisFactors');
    var vals = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            vals.push(checkboxes[i].id);
        }
    }
    localStorage.setItem("userSelectedFactors", JSON.stringify(vals));
}

// *********************************************************************  model
// **************  pull loadings that have been flagged  **********************
// ****************************************************************************

function pullFlaggedFactorLoadings() {
    var numberFactorsExtracted = parseInt(localStorage.getItem("numberFactorsExtracted"));

    var results = JSON.parse(localStorage.getItem("results"));

    // var jLoopLen = (numberFactorsExtracted * 2) + 2;
    var jLoopLen = (numberFactorsExtracted * 2) + 3;
    var significantLoadingsArray = [];
    var i, j;
    var isLoadingSignificant, factorNumber, respondentName, factorLoading;
    // todo check to see if this can be removed see bind dump button function
    var iLoopLen = results.length;
    var factorLabelsArray = JSON.parse(localStorage.getItem("factorLabelsArray"));


    var loadingSortCheckArray = [];
    var userSelectedFactors = JSON.parse(localStorage.getItem("userSelectedFactors"));


    // loop thru results array to find user-selected factor loadings
    for (i = 0; i < iLoopLen; i++) {
        var factorNumberCount = 0;

        var tempArray = [];
        for (j = 4; j < jLoopLen; j += 2) {
            isLoadingSignificant = results[i][j];
            factorNumber = factorLabelsArray[factorNumberCount];
            factorNumberCount = factorNumberCount + 1;
            // respondentName = results[i][0];
            respondentName = results[i][1];
            factorLoading = results[i][j - 1];

            // if flagged and in a user-selected factor
            if (isLoadingSignificant === "true" && (userSelectedFactors.indexOf(factorNumber) > -1)) {
                tempArray.push(factorNumber, respondentName, factorLoading);
                loadingSortCheckArray.push(factorNumber);
            }
        }
        if (tempArray.length === 0) {
            tempArray.push(99, respondentName, "Unique Sort");
            significantLoadingsArray.push(tempArray);
        } else {
            significantLoadingsArray.push(tempArray);
        }
    }

    // check for sorts flagged for more than one factor user error 
    var multipleFlags;
    var problemSort;
    for (var k = 0; k < significantLoadingsArray.length; k++) {

        var test = significantLoadingsArray[k];

        if (test.length > 3) {
            problemSort = significantLoadingsArray[k][1];
            multipleFlags = false;
        }
    }

    // check for user-selected factors with no loading sorts user error
    var loadingSortCheck = $(userSelectedFactors).not(loadingSortCheckArray).length === 0;

    if (loadingSortCheck === false) {
        $('#noFactorLoadingModal').toggleClass('active');

        // prevent display output of factors
        return "false";

    } else if (multipleFlags === false) {
        $("#multipleFlagModalMessageDiv").append("<p>The sort for respondent " + problemSort + " is flagged for more than one factor.</p>");
        $("#sortLoadingMultipleFactorsModal").toggleClass('active');
        return "false";
    } else {
        significantLoadingsArray.sort(function (a, b) {
            if (a[0] < b[0]) {
                return -1;
            }
            if (a[0] > b[0]) {
                return 1;
            }
            return 0;
        });
        computeFactorWeights(significantLoadingsArray);
    }
}


function computeFactorWeights(significantLoadingsArray) {
    for (var i = 0; i < significantLoadingsArray.length; i++) {
        var f = evenRound((significantLoadingsArray[i][2]), 8);
        var f2 = evenRound((f * f), 8);
        var oneMinusF2, w;
        if (f2 === 1) {
            oneMinusF2 = f2;
            w = evenRound((f / oneMinusF2), 8);
        } else if (f2 > 1) {
            oneMinusF2 = evenRound((1 - f2), 8);
            w = evenRound((f / -oneMinusF2), 8);
        } else {
            oneMinusF2 = evenRound((1 - f2), 8);
            w = evenRound((f / oneMinusF2), 8);
        }
        significantLoadingsArray[i].push(w);
    }
    localStorage.setItem("sortWeights", JSON.stringify(significantLoadingsArray));
    findLargestFactorWeights(significantLoadingsArray);
}

// create array of highest values to use later for calcuations
function findLargestFactorWeights(significantLoadingsArray) {

    // remove unique sorts (value 99) from array
    var factorSelect = _.filter(significantLoadingsArray, function (n) {
        return n[0] !== 99;
    });

    // pull out just factor number and W value to array
    var factorNumbersArray2 = [];
    var factorNumbersArray = [];
    _(factorSelect).forEach(function (n) {
        var tempArray = [];
        var factorNumber = n[0];
        factorNumbersArray2.push(factorNumber);
        var factorWeightW = n[3];
        tempArray[0] = factorNumber;
        tempArray[1] = factorWeightW;
        factorNumbersArray.push(tempArray);
    }).value();

    var sigArray = _.cloneDeep(factorNumbersArray2);

    // get unique array of significant factors labels
    var sigFactorNumbersArray = _.uniq(sigArray);

    var maxFactorValuesArray = [];
    var factorValue = 0;
    _(sigFactorNumbersArray).forEach(function () {
        var temp = _(factorNumbersArray).filter(function (j) {
            return j[0] === sigArray[factorValue];
        });

        var tempArray2 = [];
        var maxFactorLoadings = _(temp).forEach(function (q) {
            var tempVar3 = evenRound((Math.abs(1 / q[1])), 8);
            tempArray2.push(tempVar3);
        }).value();

        // numbers inverted, so using min rather max somewhere else
        var maxFactorValue = _.min(tempArray2);

        maxFactorValuesArray.push(maxFactorValue);

        factorValue = factorValue + 1;
    }).value();

    // array
    localStorage.setItem("sigFactorNumbersArray", JSON.stringify(sigFactorNumbersArray));

    // highest values
    weightFactorScores(significantLoadingsArray, sigFactorNumbersArray, maxFactorValuesArray);
}

function weightFactorScores(significantLoadingsArray, sigFactorNumbersArray, maxFactorValuesArray) {

    // var sigNumbersAndValuesArray = _.zip(sigFactorNumbersArray, maxFactorValuesArray);

    // delete non sig factor score information from array
    var significantFactors = [];
    for (var j = 0; j < sigFactorNumbersArray.length; j++) {
        for (var k = 0; k < significantLoadingsArray.length; k++) {
            var temp1 = significantLoadingsArray[k][0];
            var temp2 = sigFactorNumbersArray[j];
            if (temp1 === temp2) {
                var divisor = maxFactorValuesArray[j];
                significantLoadingsArray[k][3] = evenRound((significantLoadingsArray[k][3] * divisor), 8) * 10;
                significantFactors.push(significantLoadingsArray[k]);
            }
        }
    }
    weightRawSorts(significantFactors);
}


function weightRawSorts(significantFactors) {
    var respondentNames = JSON.parse(localStorage.getItem("qavRespondentNames"));
    var rawSorts = JSON.parse(localStorage.getItem("positiveShiftedRawSorts"));
    var rawSortsPrep = _.zip(respondentNames, rawSorts);
    var weightedSorts = [];
    for (var i = 0; i < significantFactors.length; i++) {
        for (var j = 0; j < rawSortsPrep.length; j++) {
            var temp1 = significantFactors[i][1];
            var temp2 = rawSortsPrep[j][0];
            var temp3 = rawSortsPrep[j][1];
            var temp4 = significantFactors[i][3];
            var tempArray = [];
            if (temp1 === temp2) {
                var newWeightedSort = _.map(temp3, roundNumbers);
                // push factor number
                tempArray.push(significantFactors[i][0]);
                // push respondent name
                tempArray.push(temp1);
                tempArray.push(newWeightedSort);
                weightedSorts.push(tempArray);
            }
        }
    }
    combineWeightedSorts(weightedSorts);

    function roundNumbers(n) {
        var temp5 = evenRound((n * temp4), 8);
        return temp5;
    }
}

function combineWeightedSorts(weightedSorts) {
    var sigFactorNumbersArray1 = JSON.parse(localStorage.getItem("sigFactorNumbersArray"));
    var sigFactorNumbersArray = sigFactorNumbersArray1.sort();
    var tempArray2, summedWeightedSorts;

    summedWeightedSorts = [];
    var sigSortsArray = [];

    // looping through all selected factor names in sig factor array
    for (var i = 0; i < sigFactorNumbersArray.length; i++) {
        var tempArray4 = [];
        var tempArray1 = [];
        var factor = sigFactorNumbersArray[i];
        tempArray2 = [];
        var tempObj2 = {};

        // loop through all data for all factors and pull data for only for selected factors
        for (var j = 0; j < weightedSorts.length; j++) {
            var temp2 = weightedSorts[j][0]; // gives number 1 or 2 or 3 etc...
            if (temp2 === factor) {
                tempArray1.push(weightedSorts[j][2]);
                tempArray2.push(weightedSorts[j][1]);
            }
        }

        // pushes factor numbers and representative sorts into array
        tempArray4.push(factor);
        tempArray4.push(tempArray2);

        // converts array of factor numbers and rep sorts to object
        tempObj2["Factor Number"] = factor;
        tempObj2.SigSorts = tempArray2;
        sigSortsArray.push(tempObj2);

        var tempArray3 = [];
        for (var k = 0; k < tempArray1[0].length; k++) {
            var temp3 = 0;
            for (var m = 0; m < tempArray1.length; m++) {
                temp3 = evenRound((temp3 + tempArray1[m][k]), 8);
            }
            tempArray3.push(temp3);
        }
        tempArray4.push(tempArray3);
        summedWeightedSorts.push(tempArray4);
    }
    localStorage.setItem("sigSortsArray", JSON.stringify(sigSortsArray));

    calculateZScores(summedWeightedSorts);
}

function calculateZScores(summedWeightedSorts) {
    // add in statements
    var statements = JSON.parse(localStorage.getItem("qavCurrentStatements"));
    var sigFactorNumbersArray = JSON.parse(localStorage.getItem("sigFactorNumbersArray"));

    // so that the diff 2 factors output is correct
    sigFactorNumbersArray.sort();

    var length = summedWeightedSorts.length;
    var zScoreArray = [];
    var distinguishedStatementArray = [];

    for (var i = 0; i < length; i++) {
        var sortAverage = average(summedWeightedSorts[i][2]);
        var sortStandardDeviation = standardDeviation(summedWeightedSorts[i][2]);
        var zScoreTempObj = {};
        zScoreTempObj.factor = sigFactorNumbersArray[i];

        var tempArray1 = [];
        var zScoreTempArray = [];
        for (var j = 0; j < summedWeightedSorts[0][2].length; j++) {
            var tempObj = {};

            var zScore = evenRound(((summedWeightedSorts[i][2][j] - sortAverage) / sortStandardDeviation), 3);

            tempObj.factor = sigFactorNumbersArray[i];
            tempObj.statement = (j + 1);
            tempObj.sortStatement = statements[j];
            tempObj.zScore = zScore;

            zScoreTempArray.push(zScore);
            tempArray1.push(tempObj);
        }
        zScoreArray.push(tempArray1);
        zScoreTempObj["FactorZscores" + sigFactorNumbersArray[i]] = zScoreTempArray;
        distinguishedStatementArray.push(zScoreTempObj);
    }
    localStorage.setItem(" distinguishedStatementArray", JSON.stringify(distinguishedStatementArray));

    assignFactorScores(zScoreArray);
}

function assignFactorScores(zScoreArray) {

    var qavSortTriangleShape = JSON.parse(localStorage.getItem("qavSortTriangleShape"));
    var sortedZScoreArray = [];
    for (var i = 0; i < zScoreArray.length; i++) {
        var factorNumbers = zScoreArray[i];
        var temp1 = alasql("SELECT * FROM ? ORDER BY zScore ASC", [factorNumbers]);

        for (var j = 0; j < qavSortTriangleShape.length; j++) {
            temp1[j].sortValue = qavSortTriangleShape[j];
        }
        var temp2 = alasql("SELECT * FROM ? ORDER BY statement ASC", [temp1]);
        sortedZScoreArray.push(temp2);
    }
    localStorage.setItem("analysisOutput", JSON.stringify(sortedZScoreArray));
}

/*
*************************************************************************************
************************************************************************************
************************************************************************************

DOWNLOAD FUNCTIONS

*************************************************************************************
************************************************************************************
***********************************************************************************
*/

// todo - bug fix escape codes for "'" in statement listing

function generateOutput() {
    var sheetNames = [];
    var output = [];
    var statements = JSON.parse(localStorage.getItem("qavCurrentStatements"));

    var newSheet = {
        sheetid: "Statements",
        header: true,
    };

    var statementsArray = [];
    var tempObj;
    for (var i = 0; i < statements.length; i++) {
        tempObj = {};
        tempObj.Number = (i + 1);
        tempObj.Statement = statements[i];
        statementsArray.push(tempObj);
    }
    sheetNames.push(newSheet);
    output.push(statementsArray);

    pushSortsToOutputArray(sheetNames, output);
}

function pushSortsToOutputArray(sheetNames, output) {

    var newSheet = {
        sheetid: "Sorts",
        header: true,
    };
    sheetNames.push(newSheet);


    var sortsAsNumbers = JSON.parse(localStorage.getItem("sortsAsNumbers"));
    var respondentNames = JSON.parse(localStorage.getItem("qavRespondentNames"));

    var sortsArray = [];
    var tempObj;
    for (var i = 0; i < sortsAsNumbers.length; i++) {
        tempObj = {};
        tempObj.Respondent = respondentNames[i];
        for (var j = 0; j < sortsAsNumbers[0].length; j++) {
            var statementSort = "S" + (j + 1);
            tempObj[statementSort] = sortsAsNumbers[i][j];
        }
        tempObj["Standard Deviation"] = evenRound((standardDeviation(sortsAsNumbers[i])), 3);
        tempObj.Mean = average(sortsAsNumbers[i]);
        sortsArray.push(tempObj);
    }
    output.push(sortsArray);

    pushCorrelationArray(sheetNames, output);
}

function pushCorrelationArray(sheetNames, output) {
    var newSheet = {
        sheetid: "Correlation Matrix",
        headers: false,
    };
    sheetNames.push(newSheet);

    var correlationTableArrayFormatted = JSON.parse(localStorage.getItem("correlationTableArrayFormatted"));

    output.push(correlationTableArrayFormatted);
    pushCentroidFactorsTableToOutputArray(sheetNames, output);
}

function pushCentroidFactorsTableToOutputArray(sheetNames, output) {

    var factorMatrixTransposed, i, j, k, m, temp, temp1, temp2;
    var newSheet, expVar, centroidsArray, tempObj, respondentNames;

    if (QAV.typeOfFactor === "PCA") {
        // conform PCA to legacy centroid data structure

        factorMatrixTransposed = _.cloneDeep(QAV.eigenVecs);
        respondentNames = QAV.respondentNames;
        for (m = 0; m < (respondentNames.length - 1); m++) {
            factorMatrixTransposed[m].unshift(respondentNames[m + 1]);
        }
        temp1 = QAV.factorLabels;
        temp1.unshift("");
        factorMatrixTransposed.unshift(temp1);

        // add eigenvals to match data structure
        temp = QAV.eigenValuesSorted;
        temp.unshift("Eigenvalues");
        factorMatrixTransposed.push([], temp);
        temp2 = QAV.eigenValuesAsPercents;
        temp2.unshift("");
        factorMatrixTransposed.push(temp2);
    } else {
        factorMatrixTransposed = JSON.parse(localStorage.getItem("factorMatrixTransposed", factorMatrixTransposed));
        expVar = JSON.parse(localStorage.getItem("expVarCentroid"));
        factorMatrixTransposed.push(expVar);
    }

    newSheet = {
        sheetid: "Unrotated Factor Matrix",
        headers: true,
    };
    sheetNames.push(newSheet);

    // convert array to object
    centroidsArray = [];
    for (i = 1; i < factorMatrixTransposed.length; i++) {
        tempObj = {};

        tempObj.Respondent = factorMatrixTransposed[i][0];

        for (j = 0; j < (factorMatrixTransposed[i].length - 1); j++) {
            k = j + 1;
            tempObj["Factor " + k] = factorMatrixTransposed[i][k];
        }
        centroidsArray.push(tempObj);
    }
    output.push(centroidsArray);
    pushCumulativeCommunalitiesMaxtrixToOutputArray(sheetNames, output, factorMatrixTransposed);
}



function pushCumulativeCommunalitiesMaxtrixToOutputArray(sheetNames, output, factorMatrixTransposed) {
    var newSheet, cumulCommMatrix9, explnVarRow, responderHeadersRow;
    var i, j, k, temp1, temp2, respondentName;
    newSheet = {
        sheetid: "Cumul Comm Matrix",
        headers: false,
    };
    sheetNames.push(newSheet);

    // todo - move these calculations to quick results section?

    cumulCommMatrix9 = _.cloneDeep(factorMatrixTransposed);

    explnVarRow = cumulCommMatrix9.pop();

    // get rid of eigenvalue row
    cumulCommMatrix9.pop();
    responderHeadersRow = cumulCommMatrix9.shift();

    for (i = 0; i < cumulCommMatrix9.length; i++) {

        respondentName = cumulCommMatrix9[i].shift();
        for (j = 0; j < cumulCommMatrix9[i].length; j++) {
            if (j === 0) {
                temp1 = cumulCommMatrix9[i][j];
                cumulCommMatrix9[i][j] = evenRound((temp1 * temp1), 4);
            } else {
                temp1 = cumulCommMatrix9[i][j];
                cumulCommMatrix9[i][j] = evenRound(((temp1 * temp1) + cumulCommMatrix9[i][(j - 1)]), 4);
            }
        }
        cumulCommMatrix9[i].unshift(respondentName);
    }
    cumulCommMatrix9.unshift(responderHeadersRow);

    explnVarRow.shift();
    for (k = 0; k < explnVarRow.length; k++) {
        if (k === 0) {} else {
            temp2 = explnVarRow[k];
            explnVarRow[k] = explnVarRow[k] + explnVarRow[(k - 1)];
        }
    }
    explnVarRow.unshift("cum % expl. Var.");

    cumulCommMatrix9.push(explnVarRow);
    output.push(cumulCommMatrix9);
    pushFactorScoreCorrelationsToOutputArray(sheetNames, output);
}

// Element5
function pushFactorScoreCorrelationsToOutputArray(sheetNames, output) {

    var newSheet = {
        sheetid: "Factor Score Correlations",
        headers: false,
    };
    sheetNames.push(newSheet);

    var analysisOutput = JSON.parse(localStorage.getItem("analysisOutput"));
    var userSelectedFactors = JSON.parse(localStorage.getItem("userSelectedFactors"));

    var analysisOutput2 = _.cloneDeep(analysisOutput);

    var factorScoresCorrelationArray2 = [];
    var temp1, temp2, tempArray;

    // i loop through selected factors, j loop through sorts to get new array of z-scores
    // todo - added after other calculations, so now repeats with factor download sheets - dry out
    for (var i = 0; i < userSelectedFactors.length; i++) {
        temp2 = userSelectedFactors[i];
        tempArray = [];
        for (var j = 0; j < analysisOutput2[i].length; j++) {
            temp1 = analysisOutput2[i][j].zScore;
            tempArray.push(temp1);
        }
        factorScoresCorrelationArray2.push(tempArray);
    }

    // todo - converting to integer gives lots variation with PQmethod - use evenRound?
    var factorScoresCorrelationArray = [];
    for (var q = 0; q < factorScoresCorrelationArray2.length; q++) {
        var temp11 = _.map(factorScoresCorrelationArray2[q], evenRoundFunc);
        factorScoresCorrelationArray.push(temp11);
    }

    function evenRoundFunc(n) {
        var temp1 = evenRound((n), 5);
        return temp1;
    }

    var pullX;
    var correlationTableArrayFragment = [];
    var correlationTableArray = [];
    for (var k = 0; k < factorScoresCorrelationArray.length; k++) {
        pullX = factorScoresCorrelationArray[k];
        correlationTableArrayFragment = factorScoresCorrelationsHelper(factorScoresCorrelationArray, pullX);
        correlationTableArray.push(correlationTableArrayFragment);
        correlationTableArrayFragment = [];
    }
 
    function factorScoresCorrelationsHelper(factorScoresCorrelationArray, pullX) {

        var correlationHolder, correlationHolder2;
        var correlationTableArrayFragment = [];

        _(factorScoresCorrelationArray).forEach(function (element) {
            correlationHolder2 = CENTROID.getPqmethodCorrelation(pullX, element);
            correlationHolder = evenRound((correlationHolder2[0]), 4);
            correlationTableArrayFragment.push(correlationHolder);
        }).value();
        return correlationTableArrayFragment;
    }

    // add factor names to first column
    for (var m = 0; m < correlationTableArray.length; m++) {
        var temp8 = userSelectedFactors[m];
        correlationTableArray[m].unshift(temp8);
    }

    var tempArray3 = [];
    tempArray3.push("");
    for (var p = 0; p < userSelectedFactors.length; p++) {
        var temp9 = userSelectedFactors[p];
        tempArray3.push(temp9);
    }
    correlationTableArray.unshift(tempArray3);
    output.push(correlationTableArray);

    pushRotatedFactorsArrayToOutputArray(sheetNames, output);
}


function pushRotatedFactorsArrayToOutputArray(sheetNames, output) {

    var results = JSON.parse(localStorage.getItem("results"));

    var newSheet = {
        sheetid: "Loadings",
        headers: false,
    };
    sheetNames.push(newSheet);

    var formattedResults = [];

    var jLoopLen = results[0].length;

    var i, j;

    var iLoopLen = results.length;
    var temp;
    var tempArray = [];

    var headerRowFromCurrentTable = $('#factorRotationTable2 thead tr')[0];
    $.each(headerRowFromCurrentTable.cells, function (i, v) {
        var temp5 = v.textContent;
        tempArray.push(temp5);
    });
    formattedResults.push(tempArray);

    // resort the array
    results.sort(function (a, b) {
        return a[0] - b[0];
    });

    for (i = 0; i < iLoopLen; i++) {
        for (j = 0; j < jLoopLen; j++) {
            temp = results[i][j];
            if (temp === "true") {
                results[i][j] = "flagged";
            } else if (temp === "false") {
                results[i][j] = "";
            }
        }
        formattedResults.push(results[i]);
    }

    var expVar = JSON.parse(localStorage.getItem("expVar"));
    formattedResults.push(expVar);
    output.push(formattedResults);

    pushRotationListToOutputArray(sheetNames, output);
}


function pushRotationListToOutputArray(sheetNames, output) {
    var newSheet = {
        sheetid: "Project History",
        headers: false,
    };
    sheetNames.push(newSheet);

    var listArray = [];
    var list = document.getElementById("rotationHistoryList");
    var items = list.childNodes;
    var temp, temp1, temp2;

    if (items.length === 0) {
        listArray.push(["no rotations"]);
    } else {

        // pull list items and push to array for output
        for (var i = 0; i < items.length; i++) {
            var listArray1 = [];
            temp = i + 1;
            temp1 = items[i].textContent;
            temp2 = temp1.replace("undo", "");
            listArray1.push(temp, temp2);
            listArray.push(listArray1);
        }
    }
    output.push(listArray);
    pushFactorsToOutputArray(sheetNames, output);
}

function pushFactorsToOutputArray(sheetNames, output) {
    var analysisOutput2 = JSON.parse(localStorage.getItem("analysisOutput"));
    var analysisOutput = _.cloneDeep(analysisOutput2);
    var sigSortsArray = JSON.parse(localStorage.getItem("sigSortsArray"));
    var sortsAsNumbers = JSON.parse(localStorage.getItem("sortsAsNumbers"));
    var qavRespondentNames = JSON.parse(localStorage.getItem("qavRespondentNames"));
    var correlationTableArrayFormatted = JSON.parse(localStorage.getItem("correlationTableArrayFormatted"));
    var userSelectedFactors = JSON.parse(localStorage.getItem("userSelectedFactors"));
    var sortWeights = JSON.parse(localStorage.getItem("sortWeights"));

    for (var i = 0; i < analysisOutput.length; i++) {
        var temp1 = {};
        var temp1a = {};
        var temp1b = {};

        temp1a.sheetid = sigSortsArray[i]["Factor Number"] + " Sorts Weight";
        temp1a.header = true;
        sheetNames.push(temp1a);

        temp1b.sheetid = sigSortsArray[i]["Factor Number"] + " Sorts Corr";
        temp1b.header = true;
        sheetNames.push(temp1b);

        temp1.sheetid = sigSortsArray[i]["Factor Number"];
        temp1.header = true;
        sheetNames.push(temp1);
    }

    // pull raw sorts for factor tables
    var rawSorts = [];
    for (var p = 0; p < sigSortsArray.length; p++) {
        var tempArray = [];
        for (var r = 0; r < sigSortsArray[p].SigSorts.length; r++) {
            var sigSort = sigSortsArray[p].SigSorts[r];
            var rawSortIndex = qavRespondentNames.indexOf(sigSort);
            var rawSortValues = sortsAsNumbers[rawSortIndex];
            tempArray.push(rawSortValues);
        }
        rawSorts.push(tempArray);
    }

    // for each factor check get a sigSort (if another remains)
    // get the raw sort for that specific sigSort
    // read that sigSorts raw sort data into testObj

    //  FOR EACH FACTOR LOOP
    for (var j = 0; j < analysisOutput.length; j++) {

        // FACTOR WEIGHTS TABLES STARTS FROM HERE
        var factorWeightFactorArray = [["Q-Sort", "Weight"]];
        var factorWeightName = userSelectedFactors[j];
        for (var w = 0; w < sortWeights.length; w++) {
            var factorWeightTempArray = [];
            if (sortWeights[w][0] === factorWeightName) {
                factorWeightTempArray.push(sortWeights[w][1], sortWeights[w][3]);
                factorWeightFactorArray.push(factorWeightTempArray);
            }
        }
        output.push(factorWeightFactorArray);

        // FACTOR SCORE MINI CORRELATION TABLES STARTS FROM HERE

        // loop through sigSortsArray to get this factor's sig Sorts
        var miniSortsID = userSelectedFactors[j];
        var miniCorrelationFactorsArray = [];
        for (var t = 0; t < sigSortsArray.length; t++) {
            if (sigSortsArray[t]["Factor Number"] === miniSortsID) {
                miniCorrelationFactorsArray.push(sigSortsArray[t].SigSorts);
            }
        }

        // pull correlations from table
        var miniCorrelationArray = [];
        var miniCorrelationHeaderArray = ["Q-Sort"];
        var miniCorrelationHeaderIndex = correlationTableArrayFormatted[0];

        // loop through all sig Sorts
        for (var t3 = 0; t3 < miniCorrelationFactorsArray[0].length; t3++) {

            miniCorrelationHeaderArray.push(miniCorrelationFactorsArray[0][t3]);

            // loop through correlation table array
            for (var t1 = 0; t1 < correlationTableArrayFormatted.length; t1++) {

                var tempArrayT1 = [];

                // find row for  the sig sorts, then push data
                if (correlationTableArrayFormatted[t1][0] === miniCorrelationFactorsArray[0][t3]) {

                    // push name into left column
                    tempArrayT1.push(miniCorrelationFactorsArray[0][t3]);

                    // cycle through row to find push data for all sigSorts
                    for (var t2 = 0; t2 < miniCorrelationFactorsArray[0].length; t2++) {
                        var index = miniCorrelationHeaderIndex.indexOf(miniCorrelationFactorsArray[0][t2]);
                        tempArrayT1.push(correlationTableArrayFormatted[t1][index]);
                    }
                    miniCorrelationArray.push(tempArrayT1);
                }

            }
        }
        miniCorrelationArray.unshift(miniCorrelationHeaderArray);
        output.push(miniCorrelationArray);


        // FACTOR OUTPUT STARTS FROM HERE
        // convert arrays to object
        var synFactorArray = [];
        for (var m = 0; m < analysisOutput[0].length; m++) {
            var tempObj = {};
            tempObj["Statement Number"] = analysisOutput[j][m].statement;
            tempObj.Statement = analysisOutput[j][m].sortStatement;
            tempObj.zScore = analysisOutput[j][m].zScore;
            tempObj["Sort Value"] = analysisOutput[j][m].sortValue;
            for (var s = 0; s < rawSorts[j].length; s++) {
                tempObj["Raw Sort " + sigSortsArray[j].SigSorts[s]] = rawSorts[j][s][m];
            }
            synFactorArray.push(tempObj);
        }

        // todo - bug fix - find out why alasql is not sorting array
        var synFactorArray1 = alasql("SELECT * FROM ? ORDER BY zScore DESC", [synFactorArray]);
        output.push(synFactorArray1);
    }
    pushFactorPowerSetDiffsToOutputArray(sheetNames, output, analysisOutput2);
}

function pushFactorPowerSetDiffsToOutputArray(sheetNames, output, analysisOutput) {

    var factorPairs = [];
    for (var i = 0; i < analysisOutput.length - 1; i++) {
        for (var j = i; j < analysisOutput.length - 1; j++) {
            factorPairs.push([analysisOutput[i], analysisOutput[j + 1]]);
        }
    }
    var diffArraySorted;

    for (var k = 0; k < factorPairs.length; k++) {
        var oneFactor = factorPairs[k][0][0].factor;
        var anotherFactor = factorPairs[k][1][0].factor;
        var temp1 = {};
        temp1.sheetid = "Diff " + oneFactor + " " + anotherFactor;
        temp1.header = true;
        sheetNames.push(temp1);
    }

    for (var m = 0; m < factorPairs.length; m++) {
        var diffArray = [];
        for (var p = 0; p < factorPairs[m][0].length; p++) {
            var tempObj = {};
            tempObj["No."] = factorPairs[m][0][p].statement;
            tempObj.Statement = factorPairs[m][0][p].sortStatement;
            tempObj[factorPairs[m][0][0].factor] = factorPairs[m][0][p].zScore;
            tempObj[factorPairs[m][1][0].factor] = factorPairs[m][1][p].zScore;
            tempObj.Difference = evenRound(((factorPairs[m][0][p].zScore) - (factorPairs[m][1][p].zScore)), 3);
            diffArray.push(tempObj);
            diffArraySorted = diffArray.sort(function (a, b) {
                return b.Difference - a.Difference;
            });
        }
        output.push(diffArraySorted);
    }
    pushConsensusStatementsToOutput(sheetNames, output, analysisOutput);
}

function pushConsensusStatementsToOutput(sheetNames, output, analysisOutput) {

    var sigFactorNumbersArray = JSON.parse(localStorage.getItem("sigFactorNumbersArray"));
    sigFactorNumbersArray.sort();

    var newSheet = {
        sheetid: "Consensus-Disagreement",
        header: true,
    };
    sheetNames.push(newSheet);

    var zScoreArrayForStatements = [];
    for (var i = 0; i < analysisOutput[0].length; i++) {
        var tempObj = {};
        tempObj["No."] = analysisOutput[0][i].statement;
        tempObj.Statement = analysisOutput[0][i].sortStatement;

        var tempArray = [];
        for (var j = 0; j < analysisOutput.length; j++) {
            var temp1 = sigFactorNumbersArray[j];
            tempObj[temp1] = analysisOutput[j][i].sortValue;
            tempArray.push(analysisOutput[j][i].zScore);
        }
        var zScoreVariance = evenRound((variance(tempArray)), 3);
        tempObj["z-Score Variance"] = zScoreVariance;

        zScoreArrayForStatements.push(tempObj);
    }
    var zScoreArrayForStatementsSorted = zScoreArrayForStatements.sort(function (a, b) {
        return a["z-Score Variance"] - b["z-Score Variance"];
    });
    output.push(zScoreArrayForStatementsSorted);
    pushFactorCharacteristicsToOutput(sheetNames, output, analysisOutput, sigFactorNumbersArray);
}

function pushFactorCharacteristicsToOutput(sheetNames, output, analysisOutput, sigFactorNumbersArray) {
    var newSheet = {
        sheetid: "Factor Character",
        headers: false,
    };
    sheetNames.push(newSheet);

    var factorCharacteristicsArray = [];
    var sigSortsArray = JSON.parse(localStorage.getItem("sigSortsArray"));
    var factorNumber = [];
    var tempObj = {};
    tempObj["Factor Characteristics"] = " ";
    for (var i = 0; i < sigSortsArray.length; i++) {
        factorNumber[i] = sigSortsArray[i]["Factor Number"];
        tempObj[factorNumber[i]] = sigSortsArray[i]["Factor Number"];
    }
    factorCharacteristicsArray.push(tempObj);

    tempObj = {};
    tempObj["Factor Characteristics"] = "No. of Defining Variables";
    for (var j = 0; j < sigSortsArray.length; j++) {
        tempObj[factorNumber[j]] = sigSortsArray[j].SigSorts.length;
    }

    factorCharacteristicsArray.push(tempObj);

    // todo - !important - change this for unrestrained sort patterns
    tempObj = {};
    tempObj["Factor Characteristics"] = "Average Rel. Coef.";
    for (var k = 0; k < sigSortsArray.length; k++) {
        tempObj[factorNumber[k]] = 0.800;
    }

    factorCharacteristicsArray.push(tempObj);

    var nSorts, compositeRel;
    var composRelArray = [];
    tempObj = {};
    tempObj["Factor Characteristics"] = "Composite Reliability";
    for (var m = 0; m < sigSortsArray.length; m++) {
        nSorts = sigSortsArray[m].SigSorts.length;
        compositeRel = evenRound(((nSorts * 0.800) / (1 + ((nSorts - 1) * 0.800))), 3);
        composRelArray.push(compositeRel);
        tempObj[factorNumber[m]] = compositeRel;
    }

    factorCharacteristicsArray.push(tempObj);

    tempObj = {};
    var stndErrorArray = [];
    tempObj["Factor Characteristics"] = "S.E. of Factor Z-Scores";
    for (var p = 0; p < sigSortsArray.length; p++) {
        var stndError = evenRound(Math.sqrt(Math.abs(1.0 - composRelArray[p])), 3);
        stndErrorArray.push(stndError);
        tempObj[factorNumber[p]] = stndError;
    }
    factorCharacteristicsArray.push(tempObj);

    output.push(factorCharacteristicsArray);

    pushStandardErrorsDifferencesToOutput(sheetNames, output, stndErrorArray, sigSortsArray, analysisOutput, sigFactorNumbersArray);
}

function pushStandardErrorsDifferencesToOutput(sheetNames, output, stndErrorArray, sigSortsArray, analysisOutput, sigFactorNumbersArray) {

    var newSheet = {
        sheetid: "Standard Errors for Diffs",
        headers: false,
    };
    sheetNames.push(newSheet);

    var stndErrorDiffArray = [];
    var tempObj = {};
    tempObj.Factors = "Factors";
    var stndErrorDiffDataArray = [];
    var stndErrorDiffDataDistingArray = [];
    for (var i = 0; i < sigSortsArray.length; i++) {
        tempObj["Factor " + sigSortsArray[i]["Factor Number"]] = sigSortsArray[i]["Factor Number"];

    }
    stndErrorDiffArray.push(tempObj);

    var stndError1, stndError2, stndError3;

    for (var j = 0; j < sigSortsArray.length; j++) {
        tempObj = {};

        tempObj.Factors = sigSortsArray[j]["Factor Number"];

        // stndErrorDiffDataArrayTemp1.push("Factor " + sigSortsArray[j]);
        for (var k = 0; k < sigSortsArray.length; k++) {
            var stndErrorDiffDataArrayTemp1 = [];
            var tempArray2 = [];
            stndErrorDiffDataArrayTemp1.push("Factor " + sigSortsArray[j]["Factor Number"]);
            tempArray2.push(sigSortsArray[j]["Factor Number"]);
            stndErrorDiffDataArrayTemp1.push("Factor " + sigSortsArray[k]["Factor Number"]);
            tempArray2.push(sigSortsArray[k]["Factor Number"]);
            stndError1 = stndErrorArray[j];
            stndError2 = stndErrorArray[k];
            stndError3 = evenRound((Math.sqrt((stndError1 * stndError1) + (stndError2 * stndError2))), 3);
            stndErrorDiffDataArrayTemp1.push(stndError3);
            tempArray2.push(stndError3);
            tempObj["Factor " + sigSortsArray[k]["Factor Number"]] = stndError3;
            stndErrorDiffDataArray.push(stndErrorDiffDataArrayTemp1); // this one!
            stndErrorDiffDataDistingArray.push(tempArray2);
        }
        stndErrorDiffArray.push(tempObj);
    }
    output.push(stndErrorDiffArray);
    pushDistinguishingStatementsToOutput(sheetNames, output, sigSortsArray, analysisOutput, stndErrorDiffDataArray, stndErrorDiffDataDistingArray, sigFactorNumbersArray);
}


function pushDistinguishingStatementsToOutput(sheetNames, output, sigSortsArray, analysisOutput, stndErrorDiffDataArray, stndErrorDiffDataDistingArray, sigFactorNumbersArray) {

    // property to count loop iterations for assigning significance * in disting factor output
    formatDistingArrayForDownload.calledTimes = 0;

    // loop to set up worksheet names and push into output array
    for (var i = 0; i < sigSortsArray.length; i++) {
        var newSheet = {
            sheetid: "Dist State " + sigSortsArray[i]["Factor Number"],
            headers: false,
        };
        sheetNames.push(newSheet);
    }

    var sedComparisonValue, j, k, m;
    var consensusStatementComparisonArray05 = [];
    var consensusStatementComparisonArray01 = [];

    // looping through all factors to determine if distinguishing!
    // todo - create if statement for case of only two sig factors-bypass processing of second c 4894
    for (j = 0; j < sigSortsArray.length; j++) {
        // factor j
        // looping through all statements in each j factor
        var distingStatementsTransferArray05 = [];
        var distingStatementsTransferArray01 = [];
        var consensusStatementTransferArray05 = [];
        var consensusStatementTransferArray01 = [];

        for (k = 0; k < analysisOutput[0].length; k++) {
            // statement k
            // looping through each statement's other factor zScores to compare
            // also grabbing the appropriate SED value for each comparison
            var sig05 = false;
            var sig05Array = [];
            var sig01 = false;
            var sig01Array = [];
            var newStatementNum;

            for (m = 0; m < sigSortsArray.length; m++) {
                // factor m
                // check to avoid comparison with self
                if (analysisOutput[j][k].factor === analysisOutput[m][k].factor) {

                } else {
                    // loop through SED array to find comparison value
                    sedComparisonValue = null;

                    for (var p = 0; p < stndErrorDiffDataDistingArray.length; p++) {
                        var searchVal1 = stndErrorDiffDataDistingArray[p][0];
                        var searchVal2 = stndErrorDiffDataDistingArray[p][1];
                        var iteratorJShift = sigFactorNumbersArray[j];
                        var iteratorMShift = sigFactorNumbersArray[m];

                        if (searchVal1 === iteratorJShift && searchVal2 === iteratorMShift) {
                            sedComparisonValue = stndErrorDiffDataDistingArray[p][2];
                        }
                    }

                    if (Math.abs(analysisOutput[j][k].zScore - analysisOutput[m][k].zScore) >= (sedComparisonValue * 1.96)) {
                        sig05 = true;
                        sig05Array.push(sig05);
                    }

                    if (Math.abs(analysisOutput[j][k].zScore - analysisOutput[m][k].zScore) >= (sedComparisonValue * 2.58)) {
                        sig01 = true;
                        sig01Array.push(sig01);
                    }
                }
            }

            newStatementNum = k + 1;

            if (sig05Array.length === (sigFactorNumbersArray.length - 1)) {
                distingStatementsTransferArray05.push(newStatementNum);
            }

            if (sig01Array.length === (sigFactorNumbersArray.length - 1)) {
                distingStatementsTransferArray01.push(newStatementNum);
            }

            if (sig05Array.length === 0) {
                consensusStatementTransferArray05.push(newStatementNum);
            }

            if (sig01Array.length === 0) {
                consensusStatementTransferArray01.push(newStatementNum);
            }
        }

        var distingStatementsTransferArray05b = _.uniq(distingStatementsTransferArray05, true);
        var distingStatementsTransferArray01b = _.uniq(distingStatementsTransferArray01, true);
        var distingStatementsTransferArray05c = _.difference(distingStatementsTransferArray05b, distingStatementsTransferArray01b);

        consensusStatementComparisonArray05.push(consensusStatementTransferArray05);
        consensusStatementComparisonArray01.push(consensusStatementTransferArray01);

        var factorNumber = sigFactorNumbersArray[j];

        var formattedDistingStatements = formatDistingArrayForDownload(distingStatementsTransferArray01b, distingStatementsTransferArray05c, factorNumber, analysisOutput, sigFactorNumbersArray);

        output.push(formattedDistingStatements);


    }

    do {
        consensusStatementComparisonArray05 = reduceDistingArray(consensusStatementComparisonArray05);
    }
    while (consensusStatementComparisonArray05.length > 1);


    do {
        consensusStatementComparisonArray01 = reduceDistingArray(consensusStatementComparisonArray01);
    }
    while (consensusStatementComparisonArray01.length > 1);

    var consensus05 = _.flatten(consensusStatementComparisonArray05);
    var consensusStatementComparisonArray01b = _.flatten(consensusStatementComparisonArray01);

    var consensus01 = _.xor(consensus05, consensusStatementComparisonArray01b);

    var newSheet2 = {
        sheetid: "Consensus Statements",
        headers: false,
    };
    sheetNames.push(newSheet2);


    var formattedConsensusStatements = formatConsensusArrayForDownload(consensus05, consensus01, analysisOutput, sigFactorNumbersArray);

    output.push(formattedConsensusStatements);

    pushSettingsToOutput(sheetNames, output);
}


function pushSettingsToOutput(sheetNames, output) {

    var newSheet = {
        sheetid: "Project Info",
        headers: true
    };
    sheetNames.push(newSheet);

    var settings = [];
    var spacer = [];

    var projectName = JSON.parse(localStorage.getItem("qavProjectName"));
    var projectNameArray = [];
    projectNameArray.push("Project Name", projectName);
    settings.push(projectNameArray, spacer);


    var totalStatements = localStorage.getItem("qavOriginalSortSize");
    var totalNumberStatementsArray = [];
    totalNumberStatementsArray.push("Total Number of Statements", totalStatements);
    settings.push(totalNumberStatementsArray, spacer);

    var sortTriangleShape = JSON.parse(localStorage.getItem("qavSortTriangleShape"));
    var sortTriangleShape2 = sortTriangleShape.join();
    var sortTriangleShapeArray = [];
    sortTriangleShapeArray.push("Sort Triangle Shape", sortTriangleShape2);
    settings.push(sortTriangleShapeArray);

    output.push(settings);


    localStorage.setItem("outputComplete", "true");
    localStorage.setItem("outputSpreadsheetArray", JSON.stringify(output));
    localStorage.setItem("outputSpreadsheetSheetNamesArray", JSON.stringify(sheetNames));

}

//*******************************************************************************
//********  HELPER FUNCTIONS  ***************************************************
//*******************************************************************************


// helper function for distinguishing statements array
function formatConsensusArrayForDownload(consensus05, consensus01, analysisOutput, sigFactorNumbersArray) {


    var outputLength = analysisOutput.length;
    var consensus05Length = consensus05.length;
    var consensus01Length = consensus01.length;

    var printArray = [];
    var printArray2 = [];

    // push headers
    var emptyLineObj = {};
    emptyLineObj["No."] = " ";
    emptyLineObj["SIG "] = " ";
    emptyLineObj["Statement "] = " ";
    emptyLineObj["Num "] = " ";

    for (var i = 0; i < outputLength; i++) {
        emptyLineObj["Q-SV-" + sigFactorNumbersArray[i]] = " ";
        emptyLineObj["Z-SCR-" + sigFactorNumbersArray[i]] = " ";
        emptyLineObj["SIG" + sigFactorNumbersArray[i]] = " ";

    }
    printArray.push(emptyLineObj);
    var printHeaderObj1 = {};
    printHeaderObj1["No."] = "Consensus Statements -- Those That Do Not Distinguish Between ANY Pair of Factors";
    printArray.push(printHeaderObj1);
    printArray.push(emptyLineObj);
    var printHeaderObj2 = {};
    printHeaderObj2["No."] = "All Listed Statements are Non-Significant at P > .01, and Those Flagged with an * are also Non-Significant at P > .05)";
    printArray.push(printHeaderObj2);
    printArray.push(emptyLineObj);
    printArray.push(emptyLineObj);
    var printHeaderObj4 = {};
    printHeaderObj4["No."] = "No.";
    printHeaderObj4["SIG "] = "SIG";
    printHeaderObj4["Statement "] = "Statement";
    printHeaderObj4["Num "] = "No.";

    for (var j = 0; j < outputLength; j++) {
        printHeaderObj4["Q-SV-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " Q-SV";
        printHeaderObj4["Z-SCR-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " Z-SCR";
    }
    printArray.push(printHeaderObj4);

    var tempObj, tempObj2, kShift, pShift;

    // push 05 statements
    for (var k = 0; k < consensus05Length; k++) {
        tempObj = {};
        kShift = consensus05[k];

        // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to ""
        tempObj["No."] = kShift;
        tempObj["SIG "] = "*";
        tempObj["Statement "] = analysisOutput[0][(kShift - 1)].sortStatement;
        tempObj["Num "] = kShift;
        for (var m = 0; m < outputLength; m++) {
            tempObj["Q-SV-" + sigFactorNumbersArray[m]] = analysisOutput[m][(kShift - 1)].sortValue;
            tempObj["Z-SCR-" + sigFactorNumbersArray[m]] = analysisOutput[m][(kShift - 1)].zScore;
        }
        printArray2.push(tempObj);
    }

    // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to "*"
    for (var p = 0; p < consensus01Length; p++) {
        tempObj2 = {};
        pShift = consensus01[p];

        tempObj2["No."] = pShift;
        tempObj2["SIG "] = "";

        tempObj2["Statement "] = analysisOutput[0][(pShift - 1)].sortStatement;
        tempObj2["Num "] = pShift;
        for (var q = 0; q < outputLength; q++) {
            tempObj2["Q-SV-" + sigFactorNumbersArray[q]] = analysisOutput[q][(pShift - 1)].sortValue;
            tempObj2["Z-SCR-" + sigFactorNumbersArray[q]] = analysisOutput[q][(pShift - 1)].zScore;
        }
        printArray2.push(tempObj2);
    }


    var printArray3 = printArray2.sort(function (a, b) {
        return a["No."] - b["No."];
    });

    for (var r = 0; r < printArray3.length; r++) {
        printArray.push(printArray3[r]);
    }
    return printArray;
}


// helper function for distinguishing arrays
function reduceDistingArray(array) {
    var reducedArray = [];
    for (var r = 0; r < array.length; r++) {
        var increment3 = r + 1;
        var commonSet2 = _.intersection(array[r], array[increment3]);
        reducedArray.push(commonSet2);
    }
    if (reducedArray.length > 1) {
        reducedArray.pop();
    }
    return reducedArray;
}


/*
 * helper function
 */
function formatDistingArrayForDownload(distingStatementsTransferArray01, distingStatementsTransferArray05, factorNumber, analysisOutput, sigFactorNumbersArray) {

    var outputLength = analysisOutput.length;
    var disting05Length = distingStatementsTransferArray05.length;
    var disting01Length = distingStatementsTransferArray01.length;

    var printArray = [];
    var printArray2 = [];

    // push headers
    var emptyLineObj = {};
    emptyLineObj["No."] = " ";
    emptyLineObj["Statement "] = " ";
    emptyLineObj["Num "] = " ";

    for (var i = 0; i < outputLength; i++) {
        emptyLineObj["Q-SV-" + sigFactorNumbersArray[i]] = " ";
        emptyLineObj["Z-SCR-" + sigFactorNumbersArray[i]] = " ";
        emptyLineObj["SIG" + sigFactorNumbersArray[i]] = " ";

    }
    printArray.push(emptyLineObj);
    var printHeaderObj1 = {};
    printHeaderObj1["No."] = "Distinguishing Statements for " + factorNumber;
    printArray.push(printHeaderObj1);
    printArray.push(emptyLineObj);
    var printHeaderObj2 = {};
    printHeaderObj2["No."] = "(P < .05 : Asterisk (*) Indicates Significance at P < .01)";
    printArray.push(printHeaderObj2);
    printArray.push(emptyLineObj);
    var printHeaderObj3 = {};
    printHeaderObj3["No."] = "Both the Factor Q-Sort Value and the Z-Score (Z-SCR) are Shown";
    printArray.push(printHeaderObj3);
    printArray.push(emptyLineObj);
    printArray.push(emptyLineObj);
    var printHeaderObj4 = {};
    printHeaderObj4["No."] = "No.";
    printHeaderObj4["Statement "] = "Statement";
    printHeaderObj4["Num "] = "No.";

    for (var j = 0; j < outputLength; j++) {
        printHeaderObj4["Q-SV-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " Q-SV";
        printHeaderObj4["Z-SCR-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " Z-SCR";
        printHeaderObj4["SIG" + sigFactorNumbersArray[j]] = "SIG";

    }
    printArray.push(printHeaderObj4);

    var tempObj, tempObj2, kShift, pShift;

    // push 05 statements
    for (var k = 0; k < disting05Length; k++) {
        tempObj = {};
        kShift = distingStatementsTransferArray05[k];

        // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to ""
        tempObj["No."] = kShift;
        tempObj["Statement "] = analysisOutput[0][(kShift - 1)].sortStatement;
        tempObj["Num "] = kShift;
        for (var m = 0; m < outputLength; m++) {
            tempObj["Q-SV-" + sigFactorNumbersArray[m]] = analysisOutput[m][(kShift - 1)].sortValue;
            tempObj["Z-SCR-" + sigFactorNumbersArray[m]] = analysisOutput[m][(kShift - 1)].zScore;
            tempObj["SIG" + sigFactorNumbersArray[m]] = "";
        }
        printArray2.push(tempObj);
    }

    // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to "*"
    for (var p = 0; p < disting01Length; p++) {
        tempObj2 = {};
        pShift = distingStatementsTransferArray01[p];

        tempObj2["No."] = pShift;

        tempObj2["Statement "] = analysisOutput[0][(pShift - 1)].sortStatement;
        tempObj2["Num "] = pShift;
        for (var q = 0; q < outputLength; q++) {
            tempObj2["Q-SV-" + sigFactorNumbersArray[q]] = analysisOutput[q][(pShift - 1)].sortValue;
            tempObj2["Z-SCR-" + sigFactorNumbersArray[q]] = analysisOutput[q][(pShift - 1)].zScore;
            if (q === formatDistingArrayForDownload.calledTimes) {
                tempObj2["SIG" + sigFactorNumbersArray[q]] = "*";
            } else {
                tempObj2["SIG" + sigFactorNumbersArray[q]] = "";
            }
        }
        printArray2.push(tempObj2);
    }

    var lookupValue = sigFactorNumbersArray[formatDistingArrayForDownload.calledTimes];

    var sortFactorValue = "Z-SCR-" + lookupValue;


    var printArray3 = printArray2.sort(function (a, b) {
        return b[sortFactorValue] - a[sortFactorValue];
    });

    for (var r = 0; r < printArray3.length; r++) {
        printArray.push(printArray3[r]);
    }

    formatDistingArrayForDownload.calledTimes++;
    return printArray;
}

// todo - evenRound the sed comparison values in disting statements function
// todo - check to get rid of outputcomplete check - no longer needed i think by hiding download button

function downloadOutput() {

    var outputComplete, sheetNames, output, timeStamp, projectName, fileName, download;

    outputComplete = localStorage.getItem("outputComplete");

    if (outputComplete === "true") {
        sheetNames =
            JSON.parse(localStorage.getItem("outputSpreadsheetSheetNamesArray"));
        output =
            JSON.parse(localStorage.getItem("outputSpreadsheetArray"));
        timeStamp = currentDate1() + "_" + currentTime1();

        projectName = JSON.parse(localStorage.getItem("qavProjectName"));
        fileName = 'SELECT INTO XLSX("KenQ_output_' + projectName + '_' + timeStamp + '.xlsx", ?) FROM ?';
        download = alasql(fileName, [sheetNames, output]);
    } else {
        generateOutput();
        sheetNames =
            JSON.parse(localStorage.getItem("outputSpreadsheetSheetNamesArray"));
        output =
            JSON.parse(localStorage.getItem("outputSpreadsheetArray"));

        timeStamp = currentDate1() + "_" + currentTime1();
        projectName = JSON.parse(localStorage.getItem("qavProjectName"));
        fileName = 'SELECT INTO XLSX("KenQ_output_' + projectName + '_' + timeStamp + '.xlsx", ?) FROM ?';
        download = alasql(fileName, [sheetNames, output]);
    }
}



/*
********************************************************
HELPER FUNCTIONS

standard deviation and average from:
http://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/

variance from:
http://www.endmemo.com/js/jstatistics.php
********************************************************
*/

function standardDeviation(values) {
    var avg = average(values);

    var squareDiffs = values.map(function (value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff1 = squareDiffs.reduce(function (sum, value) {

        return sum + value;
    }, 0);

    var avgSquareDiff = evenRound((avgSquareDiff1 / (squareDiffs.length - 1)), 8);

    var stdDev = evenRound((Math.sqrt(avgSquareDiff)), 8);
    return stdDev;
}

function average(data) {
    var sum = data.reduce(function (sum, value) {
        return sum + value;
    }, 0);

    var avg = evenRound((sum / data.length), 8);
    return avg;
}

function variance(arr) {
    var len = 0;
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "") {} else if (isNaN(arr[i])) {
            return 0;
        } else {
            len = len + 1;
            sum = sum + parseFloat(arr[i]);
        }
    }
    var v = 0;
    if (len > 1) {
        var mean = sum / len;
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === "") {} else {
                v = v + (arr[i] - mean) * (arr[i] - mean);
            }
        }
        return v / len;
    } else {
        return 0;
    }
}

function currentDate1() {
    var currentDate = new Date();
    var Day = currentDate.getDate();
    if (Day < 10) {
        Day = '0' + Day;
    }
    var Month = currentDate.getMonth() + 1;
    if (Month < 10) {
        Month = '0' + Month;
    }
    var Year = currentDate.getFullYear();
    var fullDate = Year + "-" + Month + "-" + Day;
    return fullDate;
}

function currentTime1() {
    var currentTime = new Date();
    var Minutes = currentTime.getMinutes();
    if (Minutes < 10) {
        Minutes = '0' + Minutes;
    }
    var Hour = currentTime.getHours();
    if (Hour < 10) {
        Hour = '0' + Hour;
    }

    var Time = String(Hour) + "-" + String(Minutes);

    return Time;
}