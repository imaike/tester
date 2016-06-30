//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, window, localStorage, QAV, PCA, document, performance*/


//***************************************************************************   model
//******* custom rounding - to evens  ***********************************************
//***********************************************************************************
// another attempt at custom rounding to mimic pqmethod? "bankers / gaussian rounding"
function evenRound(num, decimalPlaces) {
    var d = decimalPlaces || 0;
    var m = Math.pow(10, d);
    var n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
    var i = Math.floor(n),
        f = n - i;
    var e = 1e-8; // Allow for rounding errors in f
    var r = (f > 0.5 - e && f < 0.5 + e) ?
        ((i % 2 === 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
}




(function (UTIL, QAV, undefined) {

    UTIL.drawDatatable = function (configObj) {
        $(configObj.domElement).DataTable({
            "fixedColumns": configObj.fixed,
            "retrieve": true,
            "searching": false,
            "ordering": configObj.ordering,
            "info": false,
            "destroy": true,
            "scrollY": 800,
            "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            "data": configObj.data,
            "columns": configObj.headers,
            "columnDefs": configObj.colDefs,
        });

        var table = $(configObj.domElement).DataTable();
        $(configObj.domElement + ' tbody')
            .on('mouseenter', 'td', function () {
                var colIdx = table.cell(this).index().column;
                $(table.cells().nodes()).removeClass('highlight');
                $(table.column(colIdx).nodes()).addClass('highlight');
            })
            .on('mouseleave', function () {
                $(table.cells().nodes()).removeClass('highlight');
                $(table.columns().nodes()).removeClass('highlight');
            });
    };

    UTIL.addFactorSelectCheckboxesRotation = function (loopLength) {
        //       
        // clear checkboxes if previously added to DOM
        var checkboxFrameCheck = $("#checkboxFrame");
        if (checkboxFrameCheck.length > 0) {
            checkboxFrameCheck.empty();
        }

        // add checkboxes to DOM according to number factors extracted
        for (var k = 0; k < loopLength; k++) {
            var incrementedK = k + 1;

            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "radioCheck";
            checkbox.value = incrementedK;
            checkbox.className = "checkbox";
            checkbox.id = "checkChart" + incrementedK;

            var label = document.createElement('label');
            label.htmlFor = "checkChart" + incrementedK;
            label.className = "checkboxLabel";
            label.appendChild(document.createTextNode("Factor " + incrementedK));

            document.getElementById("checkboxFrame").appendChild(checkbox);
            document.getElementById("checkboxFrame").appendChild(label);
            // document.getElementById("checkboxFrame").appendChild(checkboxDiv1);
            // document.getElementById("checkboxFrame").appendChild(checkboxDiv1);
        }


    };


    // **************************************************************************   model
    // ***** check for unique names and sanitize  ***************************************
    // **********************************************************************************
    UTIL.checkUniqueName = function (namesFromExistingData) {
        var namesUniqueArrayTest2 = _.cloneDeep(namesFromExistingData);
        var namesUniqueArrayTest = _.uniq(namesUniqueArrayTest2);

        if (namesFromExistingData.length !== namesUniqueArrayTest.length) {
            for (var i = 0; i < namesFromExistingData.length; i++) {
                // stripping out "." because of display error in datatables
                var ii = i + 1;
                var currentName = namesFromExistingData[i];
                var currentName2 = currentName.replace(/\./g, "");
                namesFromExistingData[i] = ii + "_" + currentName2;
            }
        } else {
            for (var j = 0; j < namesFromExistingData.length; j++) {
                // stripping out "." because of display error in datatables
                namesFromExistingData[j] = namesFromExistingData[j].replace(/\./g, " ");
            }
        }
        return namesFromExistingData;
    };




    UTIL.calculateSortTriangleShape = function (pyramidShapeNumbers) {

        var sortPossibleValues = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        var qavSortTriangleShape = [];
        for (var i = 0; i < sortPossibleValues.length; i++) {
            for (var j = 0; j < pyramidShapeNumbers[i]; j++) {
                qavSortTriangleShape.push(sortPossibleValues[i]);
            }
        }
        localStorage.setItem("qavSortTriangleShape", JSON.stringify(qavSortTriangleShape));
        QAV.setState("qavSortTriangleShape", qavSortTriangleShape);
    };



    // todo - remove autocomplete="off" from index.html and use this
    //    (function () {
    //        $(window).unload(function() {
    //            $('#existingDatabaseSelect select option').remove();
    //           
    //
    //        });
    //    })();
    //


}(window.UTIL = window.UTIL || {}, QAV));