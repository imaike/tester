//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global localStorage: false, document: false, console: false, $: false, _: false, QAV */

/**************************************************************
 ********* exports
            qavOriginalSortSize
            qavRespondentNames
            qavRespondentSortsFromDbStored
            qavCurrentStatements
            qavSortTriangleShape

 **************************************
 ******************************************************************************/

$(document).ready(function () {


    // ****************************************************************  view controller
    // **********  Data source selection event handler **********************************
    // **********************************************************************************
    // Use Demo Data Set Option - display database selected

    $("#existingDatabaseSelect").change(function () {

        var testValue = $(this).val();

        if (testValue === "Lipset") {
            returnLipset();
        } else if (testValue === "Medium") {
            returnMedium();
        } else if (testValue === "Large") {
            returnQuotes();
        }

        //        var $inputButton = $('<input type="button" class="blackHover" id="beginAnalysisLocalData" onclick=CENTROID.callCentroidFromLocalDemoData value="Create Correlation Table">');
        //        if ($('#beginAnalysisLocalData').length === 0) {
        //            $inputButton.appendTo($('#localDataButtonDiv'));
        //        }
        // auto-navigate to next section
        // $("#analysisPrep")[0].click();

    });

});


function returnMedium() {

    var qavProjectName = "Office_Buzz_Medium";
    localStorage.setItem("qavProjectName", JSON.stringify(qavProjectName));

    var qavRespondentNames = ["Res-1", "Res-2", "Res-3", "Res-4", "Res-5", "Res-6", "Res-7", "Res-8", "Res-9", "Res-10", "Res-11", "Res-12", "Res-13", "Res-14", "Res-15", "Res-16", "Res-17", "Res-18", "Res-19", "Res-20", "Res-21", "Res-22", "Res-23", "Res-24", "Res-25", "Res-26", "Res-27", "Res-28", "Res-29", "Res-30", "Res-31", "Res-32", "Res-33", "Res-34", "Res-35", "Res-36", "Res-37", "Res-38", "Res-39", "Res-40", "Res-41", "Res-42", "Res-43", "Res-44", "Res-45", "Res-46", "Res-47", "Res-48", "Res-49", "Res-50", "Res-51", "Res-52", "Res-53", "Res-54", "Res-55", "Res-56", "Res-57", "Res-58", "Res-59", "Res-60"];
    localStorage.setItem("qavRespondentNames", JSON.stringify(qavRespondentNames));
    QAV.respondentNames = qavRespondentNames;

    var qavRespondentSortsFromDbStored = [[-1, 1, 3, -2, -3, -5, -1, 3, 4, 5, -1, 3, -4, -4, 5, 2, -5, -3, 2, -5, 0, 2, -3, 1, -2, 2, 0, -3, 0, -2, -4, 0, 1, 3, -3, -2, 1, 3, 1, 0, -4, 4, 5, 4, 2, 2, 0, -1, -1, -1, 1, 0, -2, 1, 0, -2, 4, -1], [-1, 1, 3, -2, -3, -5, -1, 3, 4, 5, -1, 3, -4, -4, 5, 2, -5, -3, 2, -5, 0, 2, -3, 1, -2, 2, 0, -3, 0, -2, -4, 0, 1, 3, -3, -2, 1, 3, 1, 0, -4, 4, 5, 4, 2, 2, 0, -1, -1, -1, 1, 0, -2, 1, 0, -2, 4, -1], [-1, 4, -2, 0, 1, -2, 0, 1, -1, -1, -1, 0, 2, 2, 4, 5, 4, -4, 0, 1, 3, 1, -2, -3, 3, 1, 0, -4, -2, 0, -3, 0, 2, -2, 1, -3, 2, 0, -5, 2, -3, -5, 2, 5, -4, -4, 3, -1, 5, 4, 3, -1, -5, -3, -2, 3, 1, -1], [-1, 1, 3, -2, -3, -5, -1, 3, 4, 5, -1, 3, -4, -4, 5, 2, -5, -3, 2, -5, 0, 2, -3, 1, -2, 2, 0, -3, 0, -2, -4, 0, 1, -3, 3, -2, 1, 3, 1, 0, -4, 4, 5, 4, 2, 2, 0, -1, -1, -1, 1, 0, -2, 1, 0, -2, 4, -1], [-1, 1, 3, -2, -3, -5, -1, 3, 4, 5, -1, 3, -4, -4, 5, 2, -5, -3, 2, -5, 0, 2, -3, 1, -2, 2, 0, -3, 0, -2, -4, 0, 1, 3, -3, -2, 1, 3, 1, 0, -4, 4, 5, 4, 2, 2, 0, -1, -1, 1, -1, 0, -2, 1, 0, -2, 4, -1], [1, 2, 1, 2, -5, 0, -1, 1, -3, -3, 0, 4, -4, -3, 0, 2, 1, 0, -2, -2, 1, 3, 4, -2, 3, -3, 0, 4, 5, 4, 0, 3, -1, -4, 2, 2, -4, 0, -4, -2, 2, -1, -1, 5, 3, -1, 1, -5, 1, -2, -1, -1, 5, 0, -3, 3, -2, -5], [-4, -4, -2, 0, 5, -3, 1, -4, -3, -2, -1, 1, -1, 0, -2, -1, 0, 3, 0, -1, -1, 0, 5, -1, 0, 1, -3, 4, 3, 2, -5, -1, 4, 3, 1, -2, -3, -5, -2, 0, 2, -3, 1, 2, 4, 2, 5, 3, 0, 3, 2, -5, 2, 1, 4, -2, -4, 1], [-1, 3, -2, -1, 1, -2, -3, 0, 4, 3, 3, -5, 1, 0, 1, -4, 2, 0, -3, 2, -3, 2, -2, -1, 2, -5, 0, -2, 4, 1, -1, 5, 0, 0, 1, 0, 3, 3, -5, 4, -1, 5, -4, 5, 0, 1, -1, 1, -2, -3, 4, 2, 2, -3, -2, -4, -1, -4], [1, -1, 2, 2, -3, -1, -1, 0, -2, 1, 3, -2, -3, -4, -1, 4, 1, -4, 0, -5, -2, 5, -3, 5, -3, -1, 2, 3, 2, 2, -4, -5, -4, 1, -2, 5, -5, 3, 0, 1, -2, -1, 4, 0, 1, 3, -3, 3, 0, -2, 0, 4, 2, 0, -1, 4, 0, 1], [-1, 2, 5, 4, 1, 0, 5, 2, -3, 1, -2, 2, 0, 4, -3, -1, 3, -3, -1, -3, 0, 1, -4, 0, 4, -5, 0, 3, 0, -5, 5, -3, -1, -4, 1, -2, 3, -2, 3, 1, 2, -5, -4, -1, -4, 2, 3, -1, 1, 0, -2, 1, 4, -1, -2, 2, 0, -2], [5, 3, -2, 4, -4, 0, -3, 0, -4, 4, -1, -4, 0, 1, -2, 4, 1, -1, -1, 5, -1, -2, 0, 2, 3, -1, -3, 0, 3, 0, 1, 2, -2, 1, 5, -5, -1, -5, -2, 3, 3, 0, 1, -3, -1, -5, -3, -3, 1, 1, -2, 4, 0, 2, 2, 2, 2, -4], [-3, 0, 4, -5, 3, -3, 0, 0, 3, 1, -3, -5, 2, 2, 0, 1, -1, 1, 0, -3, -4, -4, 2, -4, -1, -2, -2, 3, 1, 5, 1, 4, -5, -3, 0, -4, 2, -1, 1, 4, 3, -1, -1, -1, 5, 2, -2, -2, 0, -2, -2, 5, 1, 2, 3, -1, 4, 0], [4, 2, -4, 3, -2, 4, 0, -1, -2, -4, 0, -4, -1, -3, -3, -5, 1, 0, 0, 2, 0, -2, 5, 1, 1, 5, 3, -2, 0, -4, -3, -1, -5, 3, 2, 1, 1, -1, -1, 3, -1, -3, 2, 1, -2, -1, -5, -2, 3, 1, 5, 2, 0, 2, 0, -3, 4, 4], [-4, -4, -2, -5, -3, -2, -3, -2, 1, 0, -1, 2, 0, -3, 4, -1, -2, 5, -4, -3, -1, 3, -4, 1, 5, 1, -3, 1, 2, 2, 1, -1, -1, 1, -5, 5, 0, 4, 1, 3, 2, -1, -2, 2, -2, 0, -5, 2, 3, 3, 0, 0, 4, 4, -1, 0, 3, 0], [-4, 0, -2, 0, 4, 0, 1, 2, 0, 2, 4, -2, 1, 2, 4, 3, -4, -4, 1, -1, 1, -2, -3, -4, -2, 3, 1, -1, 5, -2, -1, 4, -1, 5, 3, -3, 3, -1, 0, -1, 1, -1, 2, 2, -3, -3, -2, 5, -3, 0, -5, -5, 2, 0, 0, 3, -5, 1], [-3, 3, -5, 1, 2, 1, 0, -2, 1, 4, 5, 1, 1, -4, 3, 5, 2, 2, -1, 4, -4, 0, 0, 0, -1, -2, 0, -3, 3, 0, -1, 5, 1, -1, 2, 4, 0, 3, -2, 2, 4, -1, -4, -1, -5, -1, 3, 1, -3, -3, -3, -5, -2, -2, -2, 2, -4, 0], [0, 5, 0, 0, 2, -1, -3, -1, -4, -3, 4, -1, -5, -2, 3, 3, 2, 1, 4, 2, 0, -4, 5, -1, 1, -3, 4, -3, -2, -4, -3, -2, 0, 1, 3, 2, -4, -1, 0, 5, 2, 3, 3, 1, 0, 1, -2, 1, -2, -1, -2, 0, 4, -5, -5, 2, -1, 1], [0, -1, -1, 2, -4, 2, -3, -2, 5, -5, -1, 0, 2, 2, 0, 0, 4, -5, -1, -1, -3, 1, -2, 5, 3, 4, -4, 2, -4, 3, 1, 0, -4, -3, -3, 1, 4, 3, 1, 3, -2, 1, 2, 1, -1, 5, 0, -2, 3, 0, 0, -1, 1, -2, -3, -2, -5, 4], [1, -1, 3, -3, 2, -2, 2, -2, 1, -3, -5, -2, 1, -1, -4, -4, -4, 0, 5, -1, -1, 0, 0, 4, 4, 2, 3, 2, 0, 4, -3, 1, 4, -3, -2, 1, 1, 3, -3, -2, 0, -1, 0, 3, 1, 3, 0, 5, -4, 2, 0, -5, -5, 2, -1, -2, 5, -1], [0, -3, 1, 0, 4, -4, -5, -4, 3, 1, -3, 2, 2, -1, 1, 4, 3, -3, 1, -1, 0, 3, 0, 5, 4, -2, -2, -5, -1, -1, -4, 1, -1, 3, 2, 2, -2, -2, 1, 2, -5, 0, -2, -3, -1, -2, 5, 2, 4, 0, -4, 3, 5, -3, -1, 1, 0, 0], [2, 1, 1, 5, 2, -1, 0, 2, 0, 1, 4, -2, 0, -5, 0, 1, 4, 0, -4, -1, 1, 2, 0, 5, 3, 1, -4, -4, 0, 5, -1, -5, -1, -3, -4, -2, 3, -3, 3, 2, -1, 3, -2, 2, 3, 4, 1, 4, -1, -3, -2, -3, -2, -1, -2, 0, -3, -5], [2, 2, 5, 0, -2, 0, -2, 4, 1, -1, -3, -1, 2, 4, 3, 3, 1, -2, -2, -2, 3, 0, 2, 3, -2, 3, 0, -4, -4, 4, -1, 1, 0, -1, 5, -3, 0, -1, -3, -3, -4, 0, -1, 4, 1, -3, -1, -5, 1, 0, -5, 1, -4, 1, 5, 2, 2, -5], [3, -5, -1, -2, 1, -2, 0, 3, 3, 0, -4, -1, -4, 3, 2, 2, 2, -3, 2, 0, 2, 5, 3, -1, -2, 0, 0, 0, 4, 1, 1, 1, -2, -3, 5, 4, 0, -4, -4, -5, 4, 1, -1, -2, 1, -1, -1, -5, 0, 2, 4, -3, 1, -3, -3, 5, -2, -1], [0, 3, 2, 2, 5, -1, 1, 4, 5, -5, 0, -3, 2, -5, 5, 4, -1, 0, 1, 4, -1, 0, -2, 0, -2, 3, 1, 1, 3, -3, -2, -4, -4, -1, 0, -3, 3, -2, -5, 1, 1, 3, -2, -3, -3, -1, 0, 2, -4, 2, -2, 1, 0, -1, 4, -4, -1, 2], [-2, -2, 1, -2, 0, -4, 5, 0, -5, 0, 2, -4, 0, -1, 5, 1, -4, 3, -5, -5, 3, 0, -1, -2, 4, 2, 3, 4, -3, -3, 4, 1, 5, 1, -1, 1, -2, 2, 2, 2, -3, -1, 0, -4, -2, -3, -1, 2, 1, 3, 0, -1, 4, -1, -3, 0, 3, 1], [-4, 2, -1, 3, -2, -4, 0, 2, 3, 3, -3, 2, 0, 3, -1, -1, -2, -1, 5, 2, -5, 4, 0, -3, 0, -4, 1, 0, -1, 3, -1, 4, 2, 5, -4, 1, -2, 4, 0, 4, 1, 2, -3, -5, -3, 1, -2, 0, -3, -5, -2, 1, 5, 1, 0, -2, 1, -1], [-1, -2, 3, 4, 2, -1, 5, 1, -2, -4, 3, 2, 0, 3, -4, 2, 0, 4, -2, 3, -1, 4, 0, 0, -3, 1, 1, -5, -4, 5, -1, -3, 2, -1, 0, 1, 4, -4, -2, -2, 1, 2, -5, 3, 0, -2, -1, 0, -3, -5, -1, 1, -3, -3, 5, 1, 0, 2], [0, -1, 1, 3, 0, 5, 1, -3, -1, 0, 5, -4, 4, -1, 3, -2, 0, -3, 0, 3, 4, 2, -2, 1, -1, 1, 4, -3, -4, -5, -2, 3, 2, 2, -5, 0, -1, 3, 0, -2, -1, 2, -2, 4, -1, -5, 2, 1, -2, -3, 0, -4, 2, -3, 1, 1, 5, -4], [1, -1, -4, 0, 1, -2, -2, 3, 0, 2, 1, 0, -1, 2, 3, -4, -2, -3, 5, -2, -1, -2, 2, 2, -5, 3, 0, -1, 3, -3, 1, 2, 0, -1, 2, -1, 5, -4, -3, -5, -1, 1, 0, 4, -3, 3, 1, 4, 0, 5, -5, -4, 4, -3, 1, -2, 0, 4], [-2, -2, -5, -1, 4, -4, 3, -4, -1, -1, 5, 2, 1, 2, -1, -1, 0, 4, 1, -3, 1, 3, -2, 2, 0, -4, 0, 5, -2, 0, 0, -2, 1, -5, -2, -3, 0, 1, 2, -3, 4, 4, -1, 0, -3, 2, 2, 3, 1, 1, -3, 3, -4, -5, 5, 0, -1, 3], [3, 4, 1, -2, 1, -5, 4, 4, -4, -4, -5, 2, -2, 3, 1, 1, 3, -5, 0, 5, 0, -4, -3, 0, 0, 2, 2, -3, -1, 5, 5, 0, -1, -2, 3, -3, 0, 1, -2, -4, -2, 2, -3, -1, 0, -1, -2, 2, -1, 2, 1, -1, 0, 1, -1, 4, -3, 3], [4, -1, 2, 2, -3, -1, -3, -1, 0, -4, 5, 1, -1, 2, 1, 1, -4, 1, 2, 3, 5, 0, -1, 2, -3, 3, -4, 3, 4, 1, -3, 0, 5, 0, 3, -2, 4, -2, -3, -1, 0, -2, 4, 0, -2, -5, 0, -5, -2, -4, 2, -5, 0, -2, 1, 3, 1, -1], [0, 2, 0, -3, -3, 2, 2, -2, -2, 4, -4, -1, 3, 4, 2, -4, 0, 1, 0, 4, -5, 0, -3, -1, 2, -3, 1, 1, -1, 1, 1, -5, 3, -1, 0, 3, -1, -2, 3, 0, -2, 1, 5, 4, -1, 5, 3, 1, -3, 5, 2, 0, -5, -4, -4, -1, -2, -2], [0, 3, 3, -1, 1, 0, -3, 2, 4, 5, -1, -2, 5, -1, 0, 0, 1, 2, -4, 4, -3, -3, -5, -2, 3, 2, -1, 0, 2, 1, -2, -4, 1, 3, -3, 1, -1, 0, -2, -1, 4, -4, -4, 1, -5, 1, 0, 3, 5, -1, 2, 0, -2, -2, 4, -3, -5, 2], [3, 0, -3, -1, 2, 1, 5, -3, -2, -3, 0, -4, 0, -1, 5, 4, -1, 0, 0, 4, -2, 2, -4, 3, 2, 4, 4, 2, -2, -1, -4, 1, 2, -2, 3, 1, -1, 3, -4, 0, 0, -1, -5, 1, -5, -3, 3, 2, -5, -1, -3, -2, 1, 1, -2, 0, 5, 1], [1, 5, -3, 2, 0, 2, -3, 3, 3, 0, -2, -2, 5, 4, -4, -1, -3, -1, 0, -5, 0, 0, 4, -4, 3, 2, -1, 2, 4, -2, 1, 3, -2, -1, 1, -2, 5, -2, 1, -1, -1, 4, 2, 1, 3, 2, 0, 0, 0, -1, -5, 1, -4, -3, -4, -5, -3, 1], [4, -1, -5, 2, -3, 3, -5, 0, 0, 4, 1, -1, 0, -2, -2, 3, 0, -2, 2, 3, 2, 5, -1, 4, -1, -3, 0, 3, 4, -2, 5, 0, -3, -4, 2, -2, -2, -1, -4, 5, 2, 1, 2, 1, 1, -5, 3, -4, -1, 0, 1, -3, 1, -1, 0, -4, -3, 1], [1, 1, 2, -2, -4, 0, -1, -2, 3, 2, 3, -5, 4, -3, -1, 1, 1, -5, 5, 0, 0, -3, -1, -1, -1, 2, 4, -3, -2, 4, 1, 0, 0, 5, -4, -4, 1, 3, 0, 3, -2, -1, 2, -1, 0, -5, 3, -2, -2, 0, -3, -4, 4, 1, 5, 2, 2, -3], [1, 1, 0, 3, -5, 1, -3, 5, 3, 2, -1, 4, -2, -2, 5, -4, 0, 4, -3, -1, 0, -3, 0, 0, -4, 1, 2, 3, -3, -2, 2, -5, -1, 3, -5, 2, -2, 2, 0, 1, -1, 1, 4, 3, 5, -1, 0, 4, -4, 1, -2, -2, -4, 0, -1, 2, -1, -3], [-1, -1, 4, 2, 1, 2, -5, -3, 1, -4, -4, 3, 5, 0, 0, 4, -5, 2, 2, 0, -2, -3, 0, -4, -4, 3, 5, 4, -1, 2, -1, 2, -2, 1, 1, -1, 4, -2, 1, 0, 3, -3, 1, -1, -2, 5, -2, 1, 0, -3, -3, 3, -1, 0, 3, 0, -2, -5], [0, 2, 4, 3, -1, 0, 2, -2, -3, -1, -1, 4, 1, -3, 2, 3, 1, 5, 1, -2, -3, -4, 3, 1, -3, -1, -3, 2, 1, -4, -1, 2, -4, 1, 3, -1, -2, -2, 2, 4, 5, 0, 1, -5, 0, 0, -5, 5, 4, -2, 3, -4, -1, -5, 0, -2, 0, 0], [3, 4, -1, -2, 1, -5, 1, -3, -2, 3, 4, -3, 0, 2, 0, -2, 5, 1, 3, -3, 5, 5, 0, 3, 4, -3, -5, -1, 1, 2, 0, -2, 3, 4, -2, -5, 0, 0, -2, 2, 1, 2, -4, 2, -4, 1, 0, -4, -1, -1, -1, -1, -3, 2, 0, -4, 1, -1], [-5, 3, 4, -2, -2, -4, 4, -1, 1, -1, -1, -5, 3, 0, -3, -1, 0, 2, -2, -3, -1, 0, 3, 3, 4, 1, -4, -3, 1, 0, 2, -3, -4, 5, 5, 2, 3, 1, 0, 0, -2, 1, 4, 5, -2, 0, 2, 2, -2, 0, -1, 1, 1, -3, -4, -1, -5, 2], [-1, 4, -3, -3, 0, -2, 1, 2, -5, -5, 1, -4, 5, -1, -2, 1, -4, 3, 2, 5, -1, 2, 1, 0, 3, -5, 1, 2, -1, 0, -1, 0, -2, -1, 2, 2, 4, 1, 4, -2, 5, -3, 4, 1, 0, -1, -3, 0, 0, -3, 3, -2, -2, 0, 3, 3, -4, -4], [3, -4, -1, 0, 2, 4, 3, -5, -2, -1, -3, -2, 1, 4, -3, 1, 1, 3, 0, 0, 5, -4, -1, 5, 3, -1, 0, -4, -2, 0, 2, 1, 2, -5, -3, -2, 1, 0, -4, 0, -1, 2, 0, 1, 5, 4, -2, -3, 4, -2, -5, -1, 1, 3, -3, 2, -1, 2], [3, 4, 2, 4, 1, 2, -2, 0, -3, -3, 1, 3, -2, 0, 0, 5, -1, -5, 3, -4, 1, -3, -1, -3, 1, -1, -5, 0, 2, 2, 5, 0, -1, 1, 3, 0, 0, 2, 2, -2, -1, -4, 1, -1, -3, 4, -4, -4, 5, -1, -2, 1, 0, -2, 3, -5, -2, 4], [-1, 1, -2, 1, -4, 5, 1, -5, 3, -4, 0, -2, 3, -2, -1, 3, -4, 4, 2, 0, 0, 4, 0, 2, -3, 1, 4, -1, -2, 2, -3, 2, -1, -5, 4, 3, 2, 0, -2, 1, 2, -2, 0, -1, 5, 5, -5, 1, 1, 0, -4, 0, 3, -3, -3, -1, -3, -1], [1, 1, -5, -2, 3, 2, -2, 1, -4, -2, 1, -3, 2, 0, 4, 1, -1, 4, -1, -1, 0, -3, -1, 0, 0, -3, 5, -2, -2, 0, -4, -4, -4, 4, 3, -1, 3, 0, -1, -1, -5, 3, 2, 2, 0, 0, 5, 4, 1, 5, 1, -3, -3, 3, 2, -5, -2, 2], [-5, -1, -1, -3, 3, 1, -4, 1, 0, 1, -2, -2, -1, -1, -2, 3, 0, 2, 4, 0, -5, 0, -1, -2, 1, 4, 2, -4, -3, 0, 2, -3, 2, -3, 1, -3, 1, 2, -5, -4, -4, 3, 1, -2, 4, 5, -2, 5, -1, 0, 3, 4, 2, 3, -1, 0, 0, 5], [0, 1, 2, 5, -3, -2, 0, -3, 0, 2, -1, -1, -2, 2, 0, 4, -1, 1, -4, -5, -1, -3, 3, -5, 0, -3, -4, -1, 1, 0, 1, -4, 1, 1, 2, -1, 4, 4, -2, -2, 2, -2, 0, -3, 3, -2, 4, 3, 3, 0, -1, 3, 1, 5, 2, -4, -5, 5], [3, -3, 4, 3, 2, 3, 0, 4, 0, -2, 4, 2, 0, -4, -4, -1, 1, -1, 0, -1, 2, -1, 0, 1, 1, -2, -4, -2, -3, 4, 0, -4, -3, 0, -3, -2, 5, 1, -5, 2, -2, 5, 1, -1, 3, -3, 2, -1, -5, -5, 5, 1, 3, 1, 0, -1, -2, 2], [5, 1, 5, 1, 2, 3, 2, 2, 2, -4, -3, 4, -2, 1, 4, 4, -3, 0, 0, 4, -1, -4, 0, 0, -1, 3, -5, -1, -1, -4, 0, -3, -5, 3, 3, -3, 1, 0, 0, 1, -2, -3, -2, 2, 2, 5, -2, -5, -2, 1, -4, -1, 3, 0, -1, -1, -2, 1], [2, -1, 1, 0, -2, -4, 4, -2, 4, 0, -3, -3, -2, -5, 0, -3, 0, 0, -4, -2, -1, 0, 2, -2, -1, 3, -1, 3, -4, 3, 0, -5, 4, 1, 2, 1, 2, 1, -4, 3, 1, -1, 5, -3, 2, -1, 0, -2, 2, 4, 1, -5, 3, 5, -3, 5, 1, -1], [1, 5, -3, -4, -2, -4, 1, 4, 3, -3, 5, 4, 1, -1, -1, 2, -1, 0, 1, 4, -2, 1, 3, 0, -2, 4, 0, -1, -2, -2, 0, 2, 1, 0, 0, 3, 0, -3, 2, 2, -1, -5, 1, 2, 2, 3, -4, -3, -4, -3, 0, -2, 5, -1, -5, -1, -5, 3], [0, -1, -5, 3, -3, -2, 4, -3, 0, -1, 1, -2, 2, -4, -3, -1, 0, 1, 1, 0, 0, 3, -1, 2, 3, 2, 3, 4, -5, -4, 4, 5, 1, -2, 1, -3, -1, 4, 0, 0, -4, 5, -3, 2, -2, -2, -2, -5, -4, 0, 1, -1, 2, 2, 3, -1, 1, 5], [-1, 4, -2, 0, 1, -2, 0, 1, -1, -1, -1, 0, 2, 2, 4, 5, 4, -4, 0, 1, 3, 1, -2, -3, 3, 1, 0, -4, -2, 0, -3, 0, 2, -2, 1, -3, 2, 0, -5, 2, -3, -5, 2, 5, -4, -4, 3, -1, 5, 4, 3, -1, -5, -3, -2, 3, 1, -1], [-1, 4, -2, 0, 1, -2, 0, 1, -1, -1, -1, 0, 2, 2, 4, 5, 4, -4, 0, 1, 3, 1, -2, -3, 3, 1, 0, -4, -2, 0, -3, 0, 2, -2, 1, -3, 2, 0, -5, 2, -3, -5, 2, 5, -4, -4, 3, -1, 5, 4, 3, -1, -5, -3, -2, 3, 1, -1], [-1, 1, 3, -2, -3, -5, -1, 3, 4, 5, -1, 3, -4, -4, 5, 2, -5, -3, 2, -5, 0, 2, -3, 1, -2, 2, 0, -3, 0, -2, -4, 0, 1, 3, -3, -2, 1, 3, 1, 0, -4, 4, 5, 4, 2, 2, 0, -1, -1, -1, 1, 0, -2, 1, 0, -2, 4, -1], [-1, 4, -2, 0, 1, -2, 0, 1, -1, -1, -1, 0, 2, 2, 4, 5, 4, -4, 0, 1, 3, 1, -2, 3, -3, 1, 0, -4, -2, 0, -3, 0, 2, -2, 1, -3, 2, 0, -5, 2, -3, -5, 2, 5, -4, -4, 3, -1, 5, 4, 3, -1, -5, -3, -2, 3, 1, -1], [-1, 4, -2, 0, 1, -2, 0, -1, 1, -1, -1, 0, 2, 2, 4, 5, 4, -4, 0, 1, 3, 1, -2, -3, 3, 1, 0, -4, -2, 0, -3, 0, 2, -2, 1, -3, 2, 0, -5, 2, -3, -5, 2, 5, -4, -4, 3, -1, 5, 4, 3, -1, -5, -3, -2, 3, 1, -1]];

    localStorage.setItem("qavRespondentSortsFromDbStored", JSON.stringify(qavRespondentSortsFromDbStored));

    var qavCurrentStatements = ["Collaboratively administrate empowered markets via plug-and-play networks.", "Dynamically procrastinate B2C users after installed base benefits.", "Dramatically visualize customer directed convergence without revolutionary ROI.", "Efficiently unleash cross-media information without cross-media value.", "Quickly maximize timely deliverables for real-time schemas.", "Dramatically maintain clicks-and-mortar solutions without functional solutions.", "Completely synergize resource taxing relationships via premier niche markets.", "Professionally cultivate one-to-one customer service with robust ideas.", "Dynamically innovate resource-leveling customer service for state of the art customer service.", "Objectively innovate empowered manufactured products whereas parallel platforms.", "Holisticly predominate extensible testing procedures for reliable supply chains.", "Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.", "Proactively envisioned multimedia based expertise and cross-media growth strategies.", "Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing.", "Holistically pontificate installed base portals after maintainable products.", "Phosfluorescently engage worldwide methodologies with web - enabled technology.", "Interactively coordinate proactive e - commerce via process - centric 'outside the box' thinking.", "Completely pursue scalable customer service through sustainable potentialities.", "Collaboratively administrate turnkey channels whereas virtual e - tailers.", "Objectively seize scalable metrics whereas proactive e - services.", "Seamlessly empower fully researched growth strategies and interoperable internal or 'organic' sources.", "Credibly innovate granular internal or 'organic' sources whereas high standards in web - readiness.", "Energistically scale future - proof core competencies vis - a - vis impactful experiences.", "Dramatically synthesize integrated schemas with optimal networks.", "Interactively procrastinate high - payoff content without backward - compatible data.", "Quickly cultivate optimal processes and tactical architectures.", "Completely iterate covalent strategic theme areas via accurate e - markets.", "Globally incubate standards compliant channels before scalable benefits.", "Quickly drive clicks - and - mortar catalysts for change before vertical architectures.", "Credibly reintermediate backend ideas for cross - platform models.", "Continually reintermediate integrated processes through technically sound intellectual capital.", "Holistically foster superior methodologies without market - driven best practices.", "Distinctively exploit optimal alignments for intuitive bandwidth.", "Quickly coordinate e - business applications through revolutionary catalysts for change.", "Seamlessly underwhelm optimal testing procedures whereas bricks - and - clicks processes.", "Synergistically evolve 2.0 technologies rather than just in time initiatives.", "Quickly deploy strategic networks with compelling e - business.", "Credibly pontificate highly efficient manufactured products and enabled data.", "Dynamically target high - payoff intellectual capital for customized technologies.", "Objectively integrate emerging core competencies before process - centric communities.", "Dramatically evisculate holistic innovation rather than client - centric data.", "Progressively maintain extensive infomediaries via extensible niches.", "Dramatically disseminate standardized metrics after resource - leveling processes.", "Objectively pursue diverse catalysts for change for interoperable meta - services.", "Proactively fabricate one - to - one materials via effective e - business.", "Completely synergize scalable e - commerce rather than high standards in e - services.", "Assertively iterate resource maximizing products after leading - edge intellectual capital.", "Distinctively re - engineer revolutionary meta - services and premium architectures.", "Intrinsically incubate intuitive opportunities and real - time potentialities.", "Appropriately communicate one - to - one technology after plug - and - play networks.", "Quickly aggregate B2B users and worldwide potentialities.", "Progressively plagiarize resource - leveling e - commerce through resource - leveling core competencies.", "Dramatically mesh low - risk high - yield alignments before transparent e - tailers.", "Appropriately empower dynamic leadership skills after business portals.", "Globally myocardinate interactive supply chains with distinctive quality vectors.", "Globally revolutionize global sources through interoperable services.", "Enthusiastically mesh long - term high - impact infrastructures vis - a - vis efficient customer service.", "Professionally fashion wireless leadership rather than prospective experiences."];
    localStorage.setItem("qavCurrentStatements", JSON.stringify(qavCurrentStatements));

    var qavSortTriangleShape = [-5, -5, -5, -4, -4, -4, -4, -3, -3, -3, -3, -3, -2, -2, -2, -2, -2, -2, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5];

    localStorage.setItem("qavSortTriangleShape", JSON.stringify(qavSortTriangleShape));

    var originalSortSize = 58;
    localStorage.setItem("qavOriginalSortSize", originalSortSize);
    QAV.originalSortSize = originalSortSize;

    if ($("#existingDatabaseStatementList").length > 0) {
        $("#existingDatabaseStatementList").empty();
        $("#existingDatabaseRespondentList").empty();
    }

    for (var i = 0; i < qavCurrentStatements.length; i++) {
        var sortStatement = qavCurrentStatements[i];
        $("#existingDatabaseStatementList").append("<li>" + sortStatement + "</li>");
    }

    for (var j = 0; j < qavRespondentSortsFromDbStored.length; j++) {
        var sortItem = qavRespondentSortsFromDbStored[j];
        var respondent = qavRespondentNames[j];
        $("#existingDatabaseRespondentList").append("<li>" + respondent + "&nbsp;&nbsp;&nbsp" + sortItem + "</li>");
    }
}

function returnLipset() {
    var qavProjectName = "Lipset";
    localStorage.setItem("qavProjectName", JSON.stringify(qavProjectName));

    var qavRespondentNames = ['US1', 'US2', 'US3', 'US4', 'JP5', 'CA6', 'UK7', 'US8', 'FR9'];
    localStorage.setItem("qavRespondentNames", JSON.stringify(qavRespondentNames));
    QAV.respondentNames = qavRespondentNames;

    var qavRespondentSortsFromDbStored = ['-1 0-2 0-2 1 0-1 0-1 1 1 2 3-1-4-3-3-1-4 3 2 3 1 1 0 4 2 2-3-2-2 4', '-1 0-1-3 2 3 1 1-4 0 2-1 4-1 1-3 0-2-2 0 3-2 1 0 2 1 2 3-1-4-2-3 4', ' 2-2-2 4-1 0-4-3 1-4-3 3 3 2 0-3 2-1 1 0 1-2 0 2-2 3 1-1 0-1-1 4 1', ' 3 1-3-1-1 3-3-2 0-4-1 0 3-2-3-4-1 2 4-2 4 1 1-2 0 1-1 2 0 2 1 2 0', '-4-1 3-1 1 1 4 2-4 4 2 0-1 3 0 2 0-2-2 0-1 2 1-3-3-3 3 0 1-2 1-2-1', ' 1-3 0 3 3 4-2 0-2-2 1-1 1 0-4 3-1 0 1-1-2-3-1-4 2 2 0 4-1 2 1 2-3', ' 2 0-2 1 0 1-1-3 0-1 1-1 1 2-4 4 3 2 0 2-2-1-3-4 3-2 0 4-3 1-1 3-2', '-2 2 0-3-4 4 0-1-1-1 1-1 1-1 4 0 0 1-3 1 2 2 3 3-3 1-4 3 0-2-2-2 2', ' 3 1 0 1-4-3 2 2-2 0 0-2 1 4-1-2 2-1 2 1 3-3-3-2 1 0-1-4 0-1 3-1 4'];
    localStorage.setItem("qavRespondentSortsFromDbStored", JSON.stringify(qavRespondentSortsFromDbStored));

    var qavCurrentStatements = ["We accept improvements in status and power of lower class  ", "All men expected to try to improve selves                  ", "Success in life by a previously deprived person is resented", "Men can expect fair treatment according to merit           ", "Lower-class not revolutionary                              ", "Political goals relatively moderate, even conservative     ", "Those born to high place in society should retain it       ", "Person with wealth deserves place in high society          ", "We try to eliminate privileged classes                     ", "We accept aristocratic-type titles and other honors        ", "The government has its secrets, this is generally accepted ", "Emphasis on publicity in political matters: no secrets     ", "Encouraged to think of ourselves as competing for success  ", "Social status equated with manner of speech                ", "We take law into our own hands, mob action and vigilantes  ", "Close ties to Mother Country, as Britain still is for many ", "We prefer companionship and helping hand                   ", "Some disdain for acquiring wealth for its own sake         ", "High value placed on protecting and promoting underdog     ", "We like the idea of a welfare state                        ", "We value the race for success                              ", "Corrupt means of achieving success are accepted            ", "One law for the rich, another for the poor                 ", "Lack of respect for the police, and law enforcement        ", "Trust in police has sunk deeply into our national character", "Worth of a man is judged by what he is, not by education   ", "Deep respect for the rich, the educated, the social elite  ", "We are tolerant of popular opinion, don&#39;t like extremes", "Poor on earth will enjoy higher status in after-life       ", "Respect for civil liberties and minority rights            ", "Virtue tends to be its own reward                          ", "Position of depressed classes must be raised               ", "Emphasis is on getting ahead"];
    localStorage.setItem("qavCurrentStatements", JSON.stringify(qavCurrentStatements));

    var qavSortTriangleShape = [-4, -4, -3, -3, -3, -2, -2, -2, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4];
    localStorage.setItem("qavSortTriangleShape", JSON.stringify(qavSortTriangleShape));

    var originalSortSize = 33;
    localStorage.setItem("qavOriginalSortSize", originalSortSize);
    QAV.originalSortSize = originalSortSize;

    if ($("#existingDatabaseStatementList").length > 0) {
        $("#existingDatabaseStatementList").empty();
        $("#existingDatabaseRespondentList").empty();
    }

    for (var i = 0; i < qavCurrentStatements.length; i++) {
        var sortStatement = qavCurrentStatements[i];
        $("#existingDatabaseStatementList").append("<li>" + sortStatement + "</li>");
    }

    for (var j = 0; j < qavRespondentSortsFromDbStored.length; j++) {
        var sortItem = qavRespondentSortsFromDbStored[j];
        var respondent = qavRespondentNames[j];
        $("#existingDatabaseRespondentList").append("<li>" + respondent + "&nbsp;&nbsp;&nbsp" + sortItem + "</li>");
    }
}

function returnQuotes() {

    var qavProjectName = "Motivation";
    localStorage.setItem("qavProjectName", JSON.stringify(qavProjectName));

    var qavRespondentNames = ["Res-1", "Res-2", "Res-3", "Res-4", "Res-5", "Res-6", "Res-7", "Res-8", "Res-9", "Res-10", "Res-11", "Res-12", "Res-13", "Res-14", "Res-15", "Res-16", "Res-17", "Res-18", "Res-19", "Res-20", "Res-21", "Res-22", "Res-23", "Res-24", "Res-25", "Res-26", "Res-27", "Res-28", "Res-29", "Res-30", "Res-31", "Res-32", "Res-33", "Res-34", "Res-35", "Res-36", "Res-37", "Res-38", "Res-39", "Res-40", "Res-41", "Res-42", "Res-43", "Res-44", "Res-45", "Res-46", "Res-47", "Res-48", "Res-49", "Res-50", "Res-51", "Res-52", "Res-53", "Res-54", "Res-55", "Res-56", "Res-57", "Res-58", "Res-59", "Res-60", "Res-61", "Res-62", "Res-63", "Res-64", "Res-65", "Res-66", "Res-67", "Res-68", "Res-69", "Res-70", "Res-71", "Res-72", "Res-73", "Res-74", "Res-75", "Res-76", "Res-77", "Res-78", "Res-79", "Res-80", "Res-81", "Res-82", "Res-83", "Res-84", "Res-85", "Res-86", "Res-87", "Res-88", "Res-89", "Res-90", "Res-91", "Res-92", "Res-93", "Res-94", "Res-95", "Res-96", "Res-97", "Res-98", "Res-99", "Res-100", "Res-101", "Res-102", "Res-103", "Res-104", "Res-105", "Res-106", "Res-107", "Res-108", "Res-109", "Res-110", "Res-111", "Res-112", "Res-113", "Res-114", "Res-115", "Res-116", "Res-117", "Res-118", "Res-119", "Res-120"];
    localStorage.setItem("qavRespondentNames", JSON.stringify(qavRespondentNames));
    QAV.respondentNames = qavRespondentNames;

    var array = [-5, -5, -5, -5, -5, -4, -4, -4, -4, -4, -4, -3, -3, -3, -3, -3, -3, -3, -2, -2, -2, -2, -2, -2, -2, -2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5];
    var qavRespondentSortsFromDbStored = [];
    for (var i = 0; i < 120; i++) {
        var arr = _.shuffle(array);
        qavRespondentSortsFromDbStored.push(arr);
    }
    localStorage.setItem("qavRespondentSortsFromDbStored", JSON.stringify(qavRespondentSortsFromDbStored));

    var qavCurrentStatements = ["In times of stress, be bold and valiant", " Do not play for safety; it is the most dangerous thing in the world", " People are always blaming their circumstances for what they are", " I do not believe in circumstances", " The people who get on in this world are the people who get up and look for the circumstances they want, and, if they cannot find them, make them", " Every man takes the limits of his own field of vision, for the limits of the world", " Never be bullied into silence", " Never allow yourself to be made a victim", " Accept no ones definition of your life, but define yourself", " Have no fear of perfection you will never reach it", " The Universe Law is impartial", " It will give you anything you believe", " It will throw you garbage or roses depending on the energy you put in", " You are the one in charge, and you must accept that and stand alone", " Never be bullied into silence", " Never allow yourself to be made a victim", " Accept no ones definition of your life, but define yourself", " If you are not afraid to face the music, you may someday lead the band", " Do not tell me this a difficult problem", " If it were not difficult it would not be a problem", " Some people walk in the rain, others just get wet", "Always do your best", " The rich substance of the Universe is yours to do with as you wish", " Why settle for so little in life when you can have so much, just be daring to be different in your thinking", " Energy and persistence conquer all things", " It is by what we ourselves have done, and not by what others have done for us, that we shall be remembered in after ages", " To avoid criticism, do nothing, say nothing, be nothing", " We achieve a sense of self from what we do for ourselves and how we develop our capacities", " If all your efforts have gone into developing others, you are bound to feel empty", " You cannot cross a chasm in two small jumps", " First we will be best, and then we will be first", " Normal is not something to aspire to, it is something to get away from", " The grass is not, in fact, always greener on the other side of the fence", " No, not at all", " Fences have nothing to do with it", " The grass is greenest where it is watered", " When crossing over fences, carry water with you and tend the grass wherever you may be", " Make the most of today", " He who has begun his task has half done it", " We can try to avoid making choices by doing nothing, but even that is a decision", " There is a time for departure even when there is no certain place to go", " When one door closes another opens", " Expect that new door to reveal even greater wonders and glories and surprises", " Feel yourself grow with every experience", " And look for the reason for it In the long run, men hit only what they aim at", " Therefore, they had better aim at something high", " Make the most of today", " Translate your good intentions into actual deeds", " He who has begun his task has half done it", " Do not be afraid to take big steps", " You cannot cross a chasm in two small jumps", " Some people have greatness thrust upon them", " Very few have excellence thrust upon them", " Make the most of today", " Translate your good intentions into actual deeds", " There is a time for departure even when there is no certain place to go", " Every man takes the limits of his own field of vision, for the limits of the world", " Men who try to do something and fail are infinitely better off than those who try to do nothing and succeed", " Don't Sweat the Small Stuff, and it's All Small Stuff", " Quit now, you will never make it", " If you disregard this advice, you will be halfway there", " The Universe Law is impartial", " It will give you anything you believe", " It will throw you garbage or roses depending on the energy you put in", " You are the one in charge, and you must accept that and stand alone", " If you think God is coming down to fix things for you, forget it, God is out playing golf", "Never be bullied into silence", " Never allow yourself to be made a victim", " Accept no ones definition of your life, but define yourself", " Remember, a dead fish can float downstream, but it takes a live one to swim upstream", " Nurture your mind with great thoughts, for you will never go any higher than you think", " Once you make the fundamental choice to be the predominant creative force in your life, any approach you choose to take for your own growth and development can work", " Self-image sets the boundaries of individual accomplishment", " Believing is one thing, doing another", " Many talk like the sea but their lives are stagnant marshes", " Self-image sets the boundaries of individual accomplishment", " People are not remembered by how few times they fail but by how often they succeed", " Every wrong step is another step forward", " If you are not fired with enthusiasm, you will be fired with enthusiasm", " Argue for your limitations, and sure enough, they are yours"];
    localStorage.setItem("qavCurrentStatements", JSON.stringify(qavCurrentStatements));

    var qavSortTriangleShape = [-5, -5, -5, -5, -5, -4, -4, -4, -4, -4, -4, -3, -3, -3, -3, -3, -3, -3, -2, -2, -2, -2, -2, -2, -2, -2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5];
    localStorage.setItem("qavSortTriangleShape", JSON.stringify(qavSortTriangleShape));

    var originalSortSize = 80;
    localStorage.setItem("qavOriginalSortSize", originalSortSize);
    QAV.originalSortSize = originalSortSize;

    if ($("#existingDatabaseStatementList").length > 0) {
        $("#existingDatabaseStatementList").empty();
        $("#existingDatabaseRespondentList").empty();
    }

    for (var k = 0; k < qavCurrentStatements.length; k++) {
        var sortStatement = qavCurrentStatements[k];
        $("#existingDatabaseStatementList").append("<li>" + sortStatement + "</li>");
    }

    for (var j = 0; j < qavRespondentSortsFromDbStored.length; j++) {
        var sortItem = qavRespondentSortsFromDbStored[j];
        var respondent = qavRespondentNames[j];
        $("#existingDatabaseRespondentList").append("<li>" + respondent + "&nbsp;&nbsp;&nbsp" + sortItem + "</li>");
    }
}