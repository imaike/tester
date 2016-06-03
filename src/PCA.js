//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global numeric, window, QAV, $, document, JQuery, evenRound, UTIL, localStorage, _ */

(function (PCA, QAV, undefined) {

    PCA.doPrincipalComponents = function (X) {

        var m, sigma, svd, numberOfSorts, eigens, eigenVecs, p;
        var eigenValuesSorted, y, percentNumber, eigenValuesAsPercents;
        var eigenValuesCumulPercentArray, eigenValuesPercent, pcaFactorsToExtractArray;
        var eigenValueCumulPercentAccum, k;
        var critInflectionValue, temp4, i, j, temp1, temp3, temp5, s, t;
        var centroidFactors, numberFactorsExtracted;
        var factorLabels = [];
        var numberofPrincipalComps = 8;
        var inflectionArray = [];

        // set state typeOfFactor - to differentiate output functions
        QAV.typeOfFactor = "PCA";

        // get state totalNumberSorts
        numberOfSorts = QAV.totalNumberSorts;


        // determine the max number of factors to extract
        // get state originalSortSize, totalNumberSorts
        temp4 = QAV.originalSortSize;
        temp5 = QAV.totalNumberSorts;
        pcaFactorsToExtractArray = [8, temp4, temp5];
        numberFactorsExtracted = _.min(pcaFactorsToExtractArray);

        localStorage.setItem("numberFactorsExtracted", numberFactorsExtracted);
        UTIL.addFactorSelectCheckboxesRotation(numberFactorsExtracted);

        // labels according to factors extacted (above)
        for (m = 0; m < numberFactorsExtracted; m++) {
            factorLabels.push("Factor " + (m + 1));
        }

        // set state factorLabels
        QAV.factorLabels = factorLabels;

        // svd = matrix of all principle components as column vectors          
        m = X.length;
        // m = 4;
        sigma = numeric.div(numeric.dot(numeric.transpose(X), X), m);
        svd = numeric.svd(sigma).U;

        // eigens = eigenvalues for data X 
        eigens = numeric.eig(X);

        // setup empty array
        eigenVecs = [];
        for (p = 0; p < numberOfSorts; p++) {
            eigenVecs.push([]);
        }

        // sort eigenValues from numeric
        eigenValuesSorted = eigens.lambda.x;
        eigenValuesSorted.sort(function (a, b) {
            return (b - a);
        });

        // round off numbers 
        for (y = 0; y < eigenValuesSorted.length; y++) {
            eigenValuesSorted[y] = evenRound((eigenValuesSorted[y]), 4);
        }

        percentNumber = 100 / numberOfSorts;
        eigenValuesAsPercents = [];
        eigenValuesCumulPercentArray = [];
        eigenValueCumulPercentAccum = 0;

        for (k = 0; k < eigenValuesSorted.length; k++) {
            eigenValuesPercent = evenRound((eigenValuesSorted[k] * percentNumber), 0);
            eigenValuesAsPercents.push(eigenValuesPercent);
            eigenValueCumulPercentAccum = eigenValueCumulPercentAccum + eigenValuesPercent;
            eigenValuesCumulPercentArray.push(eigenValueCumulPercentAccum);
        }

        // loop through each component    
        for (i = 0; i < numberofPrincipalComps; i++) {

            temp1 = Math.sqrt(eigenValuesSorted[i]);

            critInflectionValue = 0;

            // loop through each QSort to get loading and also calc CRIT
            for (j = 0; j < svd.length; j++) {
                temp3 = evenRound((svd[j][i] * temp1), 4);
                eigenVecs[j][i] = temp3;
                // set up data for influection test
                temp4 = evenRound((temp3 * Math.abs(temp3)), 4);
                critInflectionValue = critInflectionValue + temp4;
            }
            inflectionArray.push(critInflectionValue);
        }

        // check and inflect components if necessary
        for (s = 0; s < eigenVecs[0].length; s++) {
            if (inflectionArray[s] < 0.0) {
                for (t = 0; t < eigenVecs.length; t++) {
                    eigenVecs[t][s] = -eigenVecs[t][s];
                }
            }
        }

        // set state centroidFactors, eigenValuesSorted, eigenVecs
        QAV.centroidFactors = centroidFactors;
        QAV.eigenValuesSorted = eigenValuesSorted;
        QAV.eigenValuesAsPercents = eigenValuesAsPercents;
        QAV.eigenValuesCumulPercentArray = eigenValuesCumulPercentArray;
        QAV.eigenVecs = eigenVecs;

        $("#rotationHistoryList").append('<li>8 Principal Components Extracted</button></li>');


        return [eigenValuesSorted, eigenValuesAsPercents, eigenValuesCumulPercentArray, eigenVecs];
    };

    PCA.drawExtractedFactorsTable = function () {
        // get state eigenVecs
        var eigenVecs = _.cloneDeep(QAV.eigenVecs);
        var i, j, names;

        // get state respondentNames
        names = QAV.respondentNames;
        for (i = 0; i < eigenVecs.length; i++) {
            j = i + 1;
            eigenVecs[i].unshift(j, names[j]);
        }

        var configObj = {};
        configObj.domElement = "#factorRotationTable1";
        configObj.fixed = false;
        configObj.data = eigenVecs;
        configObj.headers = [
            {
                title: "Number"
            }, {
                title: "Respondent"
                    },
            {
                title: "Factor 1"
                    },
            {
                title: "Factor 2"
                    },
            {
                title: "Factor 3"
                    },
            {
                title: "Factor 4"
                    },
            {
                title: "Factor 5"
                    },
            {
                title: "Factor 6"
                    },
            {
                title: "Factor 7"
                    },
            {
                title: "Factor 8"
                    },
                ];
        configObj.colDefs = [{
                targets: [0, 1],
                className: 'dt-head-center dt-body-center dt-body-name'
        },
            {
                targets: [2, 3, 4, 5, 6, 7, 8, 9],
                className: 'dt-head-center dt-body-right'
                             },
            {
                targets: '_all',
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData < 0) {
                        $(td).css('color', 'red');
                    }
                }
        }];

        UTIL.drawDatatable(configObj);
        PCA.createFooter();

    };

    PCA.createFooter = function () {
        // create footer
        var footer, temp, temp2, temp3, tableArray, array, array2, array3, tr, th;

        // get state eigenValues
        temp = _.clone(QAV.eigenValuesSorted);
        temp.unshift("", "Eigenvalues");
        array = temp.slice(0, 10);

        temp2 = _.clone(QAV.eigenValuesAsPercents);
        temp2.unshift("", "% Exp Var");
        array2 = temp2.slice(0, 10);

        temp3 = _.clone(QAV.eigenValuesCumulPercentArray);
        temp3.unshift("", "Cum % Exp Var");
        array3 = temp3.slice(0, 10);


        tableArray = [];
        tableArray.push(array, array2, array3);


        var configObj = {};
        configObj.domElement = "#factorRotationTable1Footer";
        configObj.fixed = false;
        configObj.data = tableArray;
        configObj.ordering = false;
        configObj.headers = [
            {
                title: ""
            }, {
                title: ""
            },
            {
                title: "Factor 1"
            },
            {
                title: "Factor 2"
            },
            {
                title: "Factor 3"
            },
            {
                title: "Factor 4"
            },
            {
                title: "Factor 5"
            },
            {
                title: "Factor 6"
            },
            {
                title: "Factor 7"
            },
            {
                title: "Factor 8"
            },
        ];
        configObj.colDefs = [{
                targets: [0, 1],
                className: 'dt-head-center dt-body-center dt-body-name'
        },
            {
                targets: [2, 3, 4, 5, 6, 7, 8, 9],
                className: 'dt-head-center dt-body-right'
                             },
            {
                targets: '_all',
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData < 0) {
                        $(td).css('color', 'red');
                    }
                }
                             }];

        UTIL.drawDatatable(configObj);

    };

}(window.PCA = window.PCA || {}, QAV));