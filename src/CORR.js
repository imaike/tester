//Ken-Q Analysis 
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, localStorage, _, document, d3, CENTROID, VIEW, PCA, QAV, UTIL, performance*/

// QAV is the global state data store
(function (CORR, QAV, undefined) {

    CORR.drawRawSortsRadviz = function (zoomFactor) {
        var qavRespondentNames, tableHeaders, radvizObject;

        zoomFactor = zoomFactor || 1;

        // positiveShiftedRawSorts = JSON.parse(localStorage.getItem("positiveShiftedRawSorts"));
        qavRespondentNames = JSON.parse(localStorage.getItem("qavRespondentNames"));
        var results = JSON.parse(localStorage.getItem("results"));
        // var tableHeaders = JSON.parse(localStorage.getItem("results"));
        var factorLabelsArray = QAV.getState("factorLabelsArray");

        radvizObject = toRadvizObject(results, qavRespondentNames, factorLabelsArray);

        drawRadvizForCorrelations(radvizObject, zoomFactor);
    };

    function drawRadvizForCorrelations(data, zoomFactor) {

        var statementKeys = Object.keys(data[0]);
        statementKeys.shift();

        var radviz = radvizComponent(zoomFactor)
            .config({
                el: document.querySelector('.radvizContainer1'), // container node or selector
                colorAccessor: function (d) {
                    return d.factorGroup;
                },
                size: 800, // size of the whole SVG
                margin: 80, // margin around the circular panel, to leave some room for the labels
                dimensions: statementKeys, // data keys to use as dimensions
                useTooltip: true, // a simple tooltip component is provided
                // tooltipFormatter: function (d) {
                //    return '<h1>' + d.respondent + '</h1>';
                // }, // the datum for the hovered node is given as arguments
                // colorScale: d3.scale.ordinal().range(['"skyblue", "orange", "lime","blue", "yellow", "red", "green"']), // color palette
                //                colorScale: d3.scale.ordinal().range(['"#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#9cbbd7"']), // color palette
                drawLinks: false, // wether to draw links or not
                zoomFactor: zoomFactor, // gets the dimension nodes on a bigger radius than the panel, to pull nodes away from the center
                dotRadius: 9, // radius of each dot
                useRepulsion: false, // special repulsion effect to spread the nodes from each others so they can be better selected
            })
            .on('panelEnter', function () {

            })
            .on('panelLeave', function () {

            })
            .on('dotEnter', function () {

            })
            .on('dotLeave', function () {

            })
            .render(data);
    }



    function toRadvizObject(results, names, factorLabelsArray) {

        var rv, i, j, k, m, start, factorGroup2, factorGroup, factorGroupArray, radvizArray = [];

        for (k = 0; k < results.length; k++) {
            rv = {};
            start = 3;
            m = 4;
            factorGroupArray = [];
            rv.respondent = results[k][1];
            factorGroup2 = results[k][2];
            factorGroup = factorGroup2.slice(0, 2);
            for (i = 0; i < factorLabelsArray.length; ++i) {
                if (results[k][m] === "true") {
                    factorGroupArray.push(1);
                }
                j = factorLabelsArray[i];
                rv[j] = (results[k][start]) + 1; // +1 to shift positive
                start = start + 2;
                m = m + 2;
            }
            if (factorGroupArray.length) {
                rv.factorGroup = factorGroup;
            } else {
                rv.factorGroup = "F0";
            }
            radvizArray.push(rv);
        }
        console.log(JSON.stringify(radvizArray));
        return radvizArray;
    }

    (function () {
        // control factor loadings table background 
        $("#zoomFactorRadioSelect :radio").on('click', function () {
            var button = $(this);

            $('#zoomFactorRadioSelect input:not(:checked)').parent().removeClass("selected");
            button.parent().addClass("selected");
            var zoomFactor = button.val();
            console.log(zoomFactor);

            d3.select(".radvizContainer1 svg").remove();

            CORR.drawRawSortsRadviz(zoomFactor);
        });

    })();


}(window.CORR = window.CORR || {}, QAV));