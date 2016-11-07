//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, localStorage, _, document, CENTROID, VIEW, PCA, QAV, UTIL, performance*/

// QAV is the global state data store
(function(QAV, undefined) {

    // set default language
    QAV.language = "en-us";

    QAV.setState = function(key, value) {
        var value2 = _.cloneDeep(value);
        QAV[key] = value2;
    };

    QAV.getState = function(key) {
        var value = _.cloneDeep(QAV[key]);
        return value;
    };

    // set defaults for composite factor visualizations
    QAV.vizConfig = {};
    QAV.vizConfig.consensusCustomColor = "#D6D6D6";
    QAV.vizConfig.matchCountCustomColor = "#D6D6D6";
    QAV.vizConfig.overlapCustomColor = "#D6D6D6";
    QAV.vizConfig.shouldUseToIndicateOverlap = "crosshatch";
    QAV.vizConfig.shouldUseToIndicateConsensus = "stripe";
    QAV.vizConfig.shouldUseToIndicateMatchCaution = "stripe";
    QAV.vizConfig.shouldIndicateDistinguishing = true;
    QAV.vizConfig.shouldUseUnicode = true;
    QAV.vizConfig.shouldShowZscoreArrows = true;

    $('#prependStateNoDiv .vizButtonYes').addClass("active");
    $('#showSignificanceSymbolsDiv .vizButtonYes').addClass("active");
    $('#useUnicodeSymbolsDiv .vizButtonYes').addClass("selected");
    $('#zscoreArrowDirectionDiv .vizButtonYes').addClass("active");

}(window.QAV = window.QAV || {}));
