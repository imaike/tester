//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.

var resources = {
    'en-us': {
        "translation": {
            "versionNumber": "Beta Version 0.9.2 Test Release (May 15, 2017)",
            "Translation by": "",
            "Top": "Top",
            "aData": "1.Data",
            "aCorrelations": "2.Correlations",
            "aExtraction": "3.Extractions",
            "aRotation": "4.Rotation",
            "aLoadings": "5.Loadings",
            "aResults": "6.Results",
            "Licenses": "Licenses",
            "A Web Application for Q Methodology": "A Web Application for Q Methodology",
            "Data": "Data",
            "User input": "USER INPUT",
            "Project name": "Project Name",
            "Paste q-sort statements": "Paste Q-sort statements",
            "Input q-sorts for this data set": "Input q-sorts for this data set",
            "Q-sort range": "Q-sort range",
            "Number of statements in each q-sort column": "Number of statements in each q-sort column",
            "Clear current column selections": "Clear current column selections",
            "Respondent id": "Respondent ID",
            "Statements": "Statements",
            "Respondent id - (IDs are truncated to 8 characters for PQMethod Export)": "Respondent id - (IDs are truncated to 8 characters for PQMethod Export)",
            "Add respondent to data set": "Add respondent to data set",
            "Respondent list": "Respondent list",
            "Stage data for analysis": "Stage Data for Analysis",
            "Export to pqmethod dat file": "Export to PQMethod DAT File",
            "PQMethod File": "PQMETHOD FILE",
            "Paste sort data or upload DAT file": "Paste Sort Data or Upload DAT File From Ken-Q Mobile or PQMethod",
            "Upload": "UPLOAD",
            "Paste Q-Sort Statements Or Upload STA File": "Paste Q-Sort Statements or Upload STA File",
            "Or upload STA file": "Or upload STA file",
            "Clear all data from input boxes": "Clear all data from input boxes",
            "Excel File": "EXCEL FILE",
            "TYPE 1　 EXCEL FILE WITH DATA SORTED BY Q-SORT VALUE": "TYPE 1. EXCEL FILE WITH DATA SORTED BY Q-SORT VALUE",
            "TYPE 2　 EXCEL FILE WITH DATA SORTED BY STATEMENT NUMBER": "TYPE 2. EXCEL FILE WITH DATA SORTED BY STATEMENT NUMBER",
            "TYPE 3　 KEN-Q OUTPUT FILE FROM PREVIOUS SESSION": "TYPE 3. KEN-Q OUTPUT FILE FROM PREVIOUS SESSION",
            "Export q-sorts to pqmethod": "EXPORT Q-SORTS to PQMETHOD",
            "Download a user-coded excel example file here": "Download a user-coded Excel example file",
            "Demo Data": "DEMO DATA",
            "Select data set": "Select Data Set",
            "Analysis data": "Analysis Data",
            "Correlation matrix": "Correlation Matrix",
            "Create correlation table": "Create Correlation Table",
            "Respondent": "Respondent",
            "Factor extraction": "Factor Extraction",
            "Factors": "Factors",
            "Extract centroid factors": "Extract Centroid Factors",
            "Centroid factors": "Centroid Factors",
            "Extract principal components": "Extract Principal Components",
            "Principal components": "Principal Components",
            "Reset analysis": "Reset Analysis",
            "Eigenvalues": "Eigenvalues",
            "% explained variance": "% Explained Variance",
            "cumulative % explained variance": "cumulative % explained variance",
            "Factor rotation": "Factor Rotation",
            "How many factors to keep for rotation": "How many factors to keep for rotation?",
            "Select": "Select",
            "Submit": "Submit",
            "Rotate error 1": "- ERROR - The selection is larger than the number of factors extracted.",
            "Rotate error 2": "- ERROR - Please select the number of factors for rotation. -",
            "Use judgemental rotation": "Use Judgemental Rotation",
            "Judgemental rotation": "Judgemental rotation",
            "Apply varimax rotation": "Apply Varimax Rotation",
            "Varimax rotation applied": "Varimax rotation applied",
            "factor selection text 1": "* Only two factors can be selected. To change the selection first uncheck a factor and then select the new factor. ",
            "factor selection text 2": "* Highlighting indicates that the factor loading for the Q-sort will be auto-flagged",
            "Display selected factors": "Display Selected Factors",
            "Factor loadings – flagging": "Factor Loadings - Flagging",
            "Auto flag factor loadings": "Auto Flag Factor Loadings",
            "Default table ordering": "Default Table Ordering",
            "Highest loading factor": "HIGHEST LOADING FACTOR",
            "Highest loading factor highlighting": "Highest Loading Factor Highlighting",
            "None": "NONE",
            "Gray": "GRAY",
            "Color": "COLOR",
            "Invert factor": "Invert Factor",
            "Split Bipolar Factor": "Split Bipolar Factor",
            "Project history": "Project History",
            "Undo": "Undo",
            "Results": "Results",
            "Choose factors for output": "Choose Factors for Output",
            "Display preliminary output": "Display Preliminary Output",
            "Download complete output": "Download Complete Output",
            "Permanently delete all locally-stored data": "Permanently Delete All Locally-Stored Data",
            "Factor score correlations": "Factor Score Correlations",
            "Flagged q - sort weights": "Flagged q-sort weights",
            "Flagged q-sort correlations": "Flagged q-sort correlations",
            "Z-scores, sort values, raw sorts": "Z-scores, sort values, raw sorts",
            "Clockwise": "Clockwise",
            "Counter-Clockwise": "Counter-Clockwise",
            "SAVE ROTATION": "SAVE ROTATION",
            "Rotate axes": "Rotate axes",
            "degrees": "degree(s)",
            "Please Input a Factor Number": "Please Input a Factor Number",
            "Cancel": "Cancel",
            "Input the Number of the Factor to Split": "Input the Number of the Factor to Split",
            "This functionality is disabled after splitting a bipolar factor": "This functionality is disabled after splitting a bipolar factor.",
            "Delete local data": "Delete Local Data?",
            "Delete all locally-saved data": "Delete all locally-saved Ken-Q data? (including user-entered respondent sorts)",
            "The data will be permanently deleted and cannot be recovered": "The data will be permanently deleted and cannot be recovered.",
            "Are you sure you want to delete this data": "Are you sure you want to delete this data?",
            "No, keep data": "No, Keep Data",
            "Delete": "Delete",
            "Data Deleted": "Data Deleted",
            "Error": "Error",
            "One of the selected factors has no flagged sort": "One of the selected factors has no flagged sort.",
            "Please re-select the factors for analysis": "Please re-select the factors for analysis.",
            "Sort Added": "Sort Added",
            "Sort is not symmetric": "Sort is not symmetric!",
            "Factor": "Factor",
            "Delete Ken-Q Data": "Delete Ken-Q Data?",
            "Scree Plot": "Scree Plot",
            "Factor Number": "Factor Number",
            "Cum % Expln Var": "Cum % Expln Var",
            "Factors Kept": "Factors Kept",
            "Statement": "Statement",
            "Statement Number": "State Num",
            "Weight": "Weight",
            "Z-score": "Z-score",
            "Sort Values": "Composite Sort",
            "8 Principal Components Extracted": "8 Principal Components Extracted",
            "was inverted": "was inverted",
            "and": " and ",
            "rotated": " rotated ",
            "rotated degrees": " degrees", // this is a tricky one - split append text
            "Factors Kept for Rotation": " Factors Kept for Rotation",
            "was split into Factor": " was split into Factor ",
            "_1p and Factor": "1(p) and Factor ",
            "_2n": "2(n)",
            "Centroid Factors Extracted": " Centroid Factors Extracted",
            "Consensus Statements": "Consensus Statements",
            "Those That Do Not Distinguish Between ANY Pair of Factors": "Those That Do Not Distinguish Between ANY Pair of Factors",
            "Distinguishing Statements for": "Distinguishing Statements for ",
            "Distinguishing Statements": "Distinguishing Statements",
            "(P < .05 : Asterisk (*) Indicates Significance at P < .01)": "(P < .05 : Asterisk (*) Indicates Significance at P < .01)",
            "Both the Factor Q-Sort Value and the Z-Score (Z-SCR) are Shown": "Both the Factor Q-Sort Value and the Z-Score (Z-SCR) are Shown",
            "Standard Errors": "Standard Errors",
            "Factor Characteristics": "Factor Characteristics",
            "Consensus-Disagreement": "Consensus-Disagreement",
            "No. of Defining Variables": "No. of Defining Variables",
            "Avg. Rel. Coef.": "Avg. Rel. Coef.",
            "Composite Reliability": "Composite Reliability",
            "S.E. of Factor Z-scores": "S.E. of Factor Z-scores",
            "Variance": "Variance",
            "Significance": "Significance",
            "Difference": "Difference",
            "Sort Correlations": "Sort Correlations",
            "Loadings": "Loadings",
            "Factor Group": "Factor Group",
            "Flag": "Flag",
            "Cumul Comm Matrix": "Cumul Comm Matrix",
            "Unrotated Factor Matrix": "Unrotated Factor Matrix",
            "Standard Deviation": "Standard Deviation",
            "Mean": "Mean",
            "The sort for respondent": "The sort for respondent ",
            "is flagged for more than one factor": " is flagged for more than one factor",
            "Q-sorts": "Q-sorts",
            "Flagged": "Flagged",
            "Sorts Weight": " Sorts Weight",
            "Sorts Corr": " Sorts Corr",
            "Diff": "Diff ",
            "Z-Score Variance": "Z-Score Variance",
            "Standard Errors for Diffs": "Standard Errors for Diffs",
            "Standard Errors for Differences in Factor Z-scores": "Standard Errors for Differences in Factor Z-scores",
            "Dist State": "Dist State ",
            "All Listed Statements are Non-Significant at P > 0.01, and Those Flagged with an * are also Non-Significant at P > 0.05)": "All Listed Statements are Non-Significant at P > 0.01, and Those Flagged with an * are also Non-Significant at P > 0.05)",
            "Num": "Num",
            "Project Overview": "Analysis Overview",
            "Analysis Completed on": "Analysis Completed on ",
            "Total Number of Statements": "Total Number of Statements: ",
            "Q-sort Triangle Shape": "Q-sort Pattern: ",
            "Total Number of Q-sorts": "Total Number of Q-sorts: ",
            "Analysis Process": "Analysis Process",
            "synFactorVizTitle": "Factor Composite Q-sorts",
            "Synthetic Sort for": "Composite Q-Sort for ",
            "downloadImage": " - Download image",
            "Download Scree Plot": "Download Scree Plot",
            "Download Rotation Chart": "Download Rotation Chart",
            "Composite Q-Sort Display Options": "Composite Q-sort Display Options",
            "VIEW": "VIEW",
            "HIDE": "HIDE",
            "panelText1": "Default values are show in the input boxes in a light gray color.",
            "panelText2": "Enter the new values, then click the 'UPDATE COMPOSITE FACTOR DISPLAY' button to refresh the composite Q-sort display.",
            "panelText3": "Downloaded SVG images can be quickly converted to low-resolution PNG files using online conversion websites.",
            "panelText4": "Use the free and open source software program 'Inkscape' to convert the SVG images into high-resolution PNG files.",
            "panelText5": "On Firefox the stripe pattern will display, but not download. If you need to download a composite factor image with a stripe pattern, use Google Chrome.",
            "General": "General",
            "Include legend with image?": "Include legend with image?",
            "YES": "YES",
            "NO": "NO",
            "Prepend statement numbers?": "Prepend statement numbers?",
            "Card Settings": "Card Settings",
            "Adjust card height?": "Adjust card height?",
            "Adjust card width?": "Adjust card width?",
            "Adjust font size?": "Adjust font size?",
            "Adjust line spacing?": "Adjust line spacing?",
            "Trim statements to prevent overflow?": "Trim statements to prevent overflow?",
            "(Asian languages only) Adjust width of statement rows?": "(Asian languages only) Adjust width of statement rows?",
            "Indicate distinguishing statements?": "Indicate distinguishing statements?",
            "Change distinguishing statement indicator?": "-- Change distinguishing statement indicator?",
            "Adjust distinguishing statement indicator font size?": "-- Adjust distinguishing statement indicator font size?",
            "Display distinguishing statement comparison symbols?": "Display distinguishing statement comparison symbols?",
            "Raw Q-Sort Value Match Counts": "Raw Q-Sort Value Match Counts",
            "Display matching count of raw Q-sort values?": "Display matching count of raw Q-sort values?",
            "Display matching count caution indicator?": "Display low matching count indictor?",
            "Set caution indicator cutoff level": "-- Set low matching count indicator cutoff level at less than or equal to",
            "Downloads": "Downloads",
            "Add custom name to image downloads?": "Add custom name to image downloads?",
            "Name": "Name",
            "Custom name position?": "Custom name position?",
            "PREPEND": "PREPEND",
            "APPEND": "APPEND",
            "REPLACE": "REPLACE",
            "UNICODE": "UNICODE",
            "ASCII": "ASCII",
            "Adjust statement width?": "Adjust statement width?",
            "Distinguishing and Consensus Statements": "Distinguishing and Consensus Statements",
            "Set consensus indicator type?": "-- Set consensus indicator type?",
            "STRIPE": "STRIPE",
            "COLOR": "COLOR",
            "Display consensus statements?": "Display consensus statements?",
            "Hex Codes": "Hex Codes",
            "Set custom color?": "Set custom color?",
            "Set caution indicator type?": "-- Set matching count indicator type?",
            "Set overlap indicator type?": "Set overlap indicator type?",
            "CROSSHATCH": "CROSSHATCH",
            "Distinguishing statement at P < 0.05": "Distinguishing statement at P < 0.05",
            "Distinguishing statement at P < 0.01": "Distinguishing statement at P < 0.01",
            "z-Score for the statement is higher than in all of the other factors": "z-Score for the statement is higher than in all of the other factors",
            "z-Score for the statement is lower than in all of the other factors": "z-Score for the statement is lower than in all of the other factors",
            "Consensus statement (non-significant at P > 0.1)": "Consensus statement (non-significant at P > 0.1)",
            "Low number of raw Q-sort matching values (cutoff": "Low number of raw Q-sort matching values (cutoff",
            "Consensus statement with low number of matching values": "Consensus statement with low number of matching values",
            "Legend": "Legend",
            "JSON File": "JSON FILE",
            "Select Respondent ID": "Select Respondent ID",
            "Upload 'Easy HTMLQ' JSON file": "Upload 'Easy HTMLQ' JSON file",
            "DOWNLOAD DATA AS CSV FILE": "DOWNLOAD DATA AS CSV FILE",
            "(Stage Data to enable export in PQMethod Format)": "(Stage Data to enable export in PQMethod Format)",
            "Chart Options": "Chart Options",
            "Factor Color A": "Factor Color A",
            "Factor Color B": "Factor Color B",
            "Remove circle highlighting": "Remove Circle Highlighting?",
            "Remove Circles": "Remove Circles?",
            "Chart identifier": "Chart identifier?",
            "Number": "Number",
            "Apply": "Apply",
            "Rotation Chart Options": "Rotation Chart Options",
            "Free Dist": "Free Dist",
            "Rank": "Rank",
            "Factor Scores with Corresponding Ranks": "Factor Scores with Corresponding Ranks",
            "Factor Score Ranks": "Factor Score Ranks",
            "Statements Ranked at +": "Statements Ranked at +",
            "Positive Statements Ranked Higher in ": "Positive Statements Ranked Higher in ",
            "Array than in Other Factor Arrays": " Array than in Other Factor Arrays",
            "Array than in Other Factor ArraysB": " Array than in Other Factor Arrays",
            "Negative Statements Ranked Lower in ": "Negative Statements Ranked Lower in ",
            "Highest Ranked Statements": "Highest Ranked Statements",
            "Lowest Ranked Statements": "Lowest Ranked Statements",
            " Rel. Ranks": " Rel. Ranks",
            "Relative Ranking of Statements in ": "Relative Ranking of Statements in ",
            "Clear Analysis Data": "Clear Analysis Data",
            "Symmetry Check Disabled": "Symmetry Check Disabled",
            "Disable Audio Error Warning": "Disable Audio Error Warning",
            "AUDIO ERROR WARNING DISABLED": "AUDIO ERROR WARNING DISABLED",
            "Close": "Close",
            "Select Factor to Invert": "Select Factor to Invert",
            "Warning": "Warning",
            "has missing Q-sort values": "has missing Q-sort values",
            "has an incorrect Q-sort value": "has an incorrect Q-sort value",
            "Non-Symmetric Q-sorts": "Non-Symmetric Q-sorts",
            "has missing statement numbers": "has missing statement numbers",
            "has an incorrect statement number": "has an incorrect statement number",
            "The number of statements in the statments sheet of the Excel file does not match the number of statements in the sorts sheet": "The number of statements in the statments sheet of the Excel file does not match the number of statements in the sorts sheet",
            "To convert paper results to Excel use Type 1 format": "To convert paper results to Excel use Type 1 format",
            "To import unforced (non-symmetric) sorts use Type 2 format": "To import unforced (non-symmetric) sorts use Type 2 format",
            "Raw Sort": "Raw Sort",
            "Free Distribution Data Results": "Free Distribution Data Results",
            "Consensus": "Consensus /",
            "Distinguishing": "Distinguishing",
            "between Q-sorts": " between Q-sorts",
            "Cumulative Communalities Matrix": "Cumulative Communalities Matrix",
            "Factor Matrix with Defining Sorts Flagged": "Factor Matrix with Defining Sorts Flagged",
            "Click on the yellow button above for a tutorial on how to import Excel data.": "Click on the yellow button above for a tutorial on how to import Excel data.",
            "Export statements to pqmethod": "Export statements to pqmethod",
            "Download complete output in CSV format": "Download complete output in CSV format",
            "Sorts Correlations": "Sorts Correlations",
            "Factor Scores for ": "Factor Scores for ",
            "Descending Array of Differences Between": "Descending Array of Differences Between",
            "Factor Q-sort Values for Statements sorted by Consensus vs. Disagreement": "Factor Q-sort Values for Statements sorted by Consensus vs. Disagreement",
            "You seem to be using": "You are using ",
            "Please update your browser before using Ken-Q Analysis": "Please update your browser before using Ken-Q Analysis",
            "This browser is not supported by Ken-Q Analysis <br> Please use one of the browsers listed above": "This browser is not supported by Ken-Q Analysis <br> Please use one of the browsers listed above",
            "Ready to begin analysis": " "
        }
    },
    "ja": {
        "translation": {
            "versionNumber": "Beta Version 0.9.1 Test Release (May 15, 2017)",
            "Translation by": "Translation by バナシック",
            "Top": "トップに戻る",
            "aData": "1.データ",
            "aCorrelations": "2.相関関係",
            "aExtraction": "3.抽出",
            "aRotation": "4.回転",
            "aLoadings": "5.負荷量",
            "aResults": "6.結果",
            "Licenses": "ライセンス",
            "A Web Application for Q Methodology": "Q-方法論のウェブアプリ",
            "Data": "データ",
            "User input": "ユーザー　インプット",
            "Project name": "プロジェクト名",
            "Paste q-sort statements": "Q-sortステートメントをペーストする",
            "Input q-sorts for this data set": "このデータセットのQ-sortsを入力する",
            "Q-sort range": "Q-sortの範囲",
            "Number of statements in each q-sort column": "Q-sorts列のステートメントの数",
            "Clear current column selections": "現在の列の選択を削除する",
            "Respondent id": "回答者ID",
            "Statements": "ステートメント",
            "Add respondent to data set": "回答者リストに追加する",
            "Respondent id - (IDs are truncated to 8 characters for PQMethod Export)": "回答者ID（回答者の名前はローマ字八字までに入力）",
            "Respondent list": "回答者リスト",
            "Stage data for analysis": "データ分析の確認へ",
            "Export to pqmethod dat file": "PQMethodフォーマットでダウンロード",
            "PQMethod File": "PQMethodのファイル",
            "Paste sort data or upload DAT file": "Q−sortデータを張り付けるか、PQMethodかKen-Q MobileからのDAT式のファイルをアップロードする",
            "Upload": "アップロード",
            "Paste Q-Sort Statements Or Upload STA File": "ステートメントを張り付けるか、STA式のファイルをアップロードする",
            "Clear all data from input boxes": "入力の所のデータをすべて削除する",
            "Excel File": "エクセルファイル",
            "TYPE 1　 EXCEL FILE WITH DATA SORTED BY Q-SORT VALUE": "タイプ1. Q-sortのデータ値で並べ替えたエクセルファイルをアップロードする",
            "TYPE 2　 EXCEL FILE WITH DATA SORTED BY STATEMENT NUMBER": "タイプ2. ステートメント番号で並べ替えたエクセルファイルをアップロードする",
            "TYPE 3　 KEN-Q OUTPUT FILE FROM PREVIOUS SESSION": "タイプ3. Ken-Qの分析結果ファイルをアップロードする",
            "Export q - sorts to pqmethod": "Q-sortsをPQMethodフォーマットでダウンロード",
            "Download an example Excel file for Type 1": "タイプ1の見本エクセルファイルのダウンロード",
            "Demo Data": "デモ　データ",
            "Select data set": "データ選択",
            "Analysis data": "データ分析の確認",
            "Correlation matrix": "相関係数表",
            "Create correlation table": "相関係数表を作成",
            "Respondent": "回答者",
            "Factor extraction": "因子の抽出",
            "Factors": "因子",
            "Extract centroid factors": "重心因子を抽出する",
            "Centroid factors": "重心因子",
            "Extract principal components": "主成分を抽出する",
            "Principal components": "主成分分析",
            "Reset analysis": "分析をリセット",
            "Eigenvalues": "固有値",
            "% explained variance": "寄与率",
            "cumulative % explained variance": "累積寄与率",
            "Factor rotation": "因子の回転",
            "How many factors to keep for rotation": "回転のため、いくつの因子を残しますか",
            "Select": "選択する",
            "Submit": "提出する",
            "Rotate error 1": "- エラー 選択は抽出された因子の数より大きいです。",
            "Rotate error 2": "- エラー 回転する因子の数を選んでください。",
            "Use judgemental rotation": "判断回転をする",
            "Judgemental rotation": "判断回転",
            "Apply varimax rotation": "バリマックス回転を当てはまる",
            "Varimax rotation applied": "バリマックス回転を当てはまった",
            "factor selection text 1": "因子をふたつしか選択出来ない。選択をかえるなら、選んだ因子をまずuncheckしてから違う因子を選んでください。",
            "factor selection text 2": "ハイライトがしめすのは、そのQ-sortの因子負荷量は自動的に選択される",
            "Display selected factors": "選択した因子を表示する",
            "Factor loadings – flagging": "因子負荷量とフラグ",
            "Auto flag factor loadings": "自動的に有意性的な因子負荷量をフラグする",
            "Default table ordering": "表の発注のデフォルト",
            "Highest loading factor": "最高に負荷量をしている因子",
            "Highest loading factor highlighting": "最高に負荷量をしている因子のハイライト",
            "None": "透明",
            "Gray": "グレー",
            "Color": "色",
            "Invert factor": "因子を反転する",
            "Split Bipolar Factor": "バイポーラの因子をスプリットする",
            "Project history": "プロジェクトの歴史",
            "Undo": "削除",
            "Results": "結果",
            "Choose factors for output": "出力因子を選択する",
            "Display preliminary output": "予備出力を表示する",
            "Download complete output": "すべての結果をダウンロードする",
            "Permanently delete all locally-stored data": "ブラウザに貯えたKen-Qデータをすべて永久に削除する",
            "Factor score correlations": "因子相関係数表",
            "Flagged q - sort weights": "選ばれたQ-sortの荷重",
            "Flagged q-sort correlations": "選ばれたQ-sortの相関係数表",
            "Z-scores, sort values, raw sorts": "zスコア, 合成Q−sort, 元のQ-sorts",
            "Clockwise": "時計回り",
            "Counter-Clockwise": "反時計回り",
            "SAVE ROTATION": "回転を保存する",
            "Rotate axes": "軸を回転する",
            "degrees": "度",
            "Please Input a Factor Number": "因子の番号を入力",
            "Cancel": "キャンセル",
            "Input the Number of the Factor to Split": "因子の番号を入力する",
            "This functionality is disabled after splitting a bipolar factor": "バイポーラの因子をスプリットしてから、この機能性は使用禁止になります。",
            "Delete local data": "このコンピューターに保存しているKen-Qデータを削除する?",
            "Delete all locally-saved data": "このコンピューターに保存しているKen-Qデータ(ユーザーインプットで入力した回答者のQ-sortを含む)を削除する？",
            "The data will be permanently deleted and cannot be recovered": "このデータは永久に削除されるし、回復することが出来ない。",
            "Are you sure you want to delete this data": "本当にこのデータを削除する？",
            "No, keep data": "いいえ、データをそのまま残します。",
            "Delete": "削除する",
            "Data Deleted": "データが削除された。",
            "Error": "エラー",
            "One of the selected factors has no flagged sort": "選ばれた因子の一つ以上には、連結されたQ-sortがありません。",
            "Please re-select the factors for analysis": "もう一回因子を選択してください。",
            "Sort Added": "Q−Sortが付け加えた。",
            "Sort is not symmetric": "対称なQ-sortでわない！",
            "Factor": "因子",
            "Delete Ken-Q Data": "Ken-Qのデータを削除する?",
            "Scree Plot": "固有値プロット",
            "Factor Number": "因子番号",
            "Cum % Expln Var": "累積寄与率",
            "Factors Kept": "因子を保った",
            "Statement": "ステートメント",
            "Statement Number": "ステートメントの番号",
            "Weight": "荷重",
            "Z-score": "zスコア",
            "Sort Values": "合成Q-sort値",
            "8 Principal Components Extracted": "八つの主成分を求めた",
            "was inverted": "が反転された",
            "and": "と",
            "rotated": "が",
            "rotated degrees": "度に回転された",
            "Factors Kept for Rotation": "因子を回転するために保された",
            "was split into Factor": "が、因子",
            "_1p and Factor": "1(p) と因子",
            "_2n": "2(n)に分けられた",
            "Centroid Factors Extracted": "重心因子が抽出された",
            "Consensus Statements": "総意のステートメント",
            "Those That Do Not Distinguish Between ANY Pair of Factors": "（因子を区別しないステートメント）",
            "Distinguishing Statements for": "区別するステートメント　ー　",
            "Distinguishing Statements": "区別するステートメント",
            "(P < .05 : Asterisk (*) Indicates Significance at P < .01)": "(P<0.05)、米印は(P<0.01)を表す。",
            "Both the Factor Q-Sort Value and the Z-Score (Z-SCR) are Shown": "因子のQ-sortとzスコアが示しています",
            "Standard Errors": "標準誤差",
            "Factor Characteristics": "因子の質",
            "Consensus-Disagreement": "総意-不一致",
            "No. of Defining Variables": "定義しているQ-sortの数",
            "Avg. Rel. Coef.": "平均信頼性係数",
            "Composite Reliability": " 複合信頼性",
            "S.E. of Factor Z-scores": "因子zスコアの標準誤差",
            "Variance": "分散",
            "Significance": "有意性",
            "Difference": "差額",
            "Sort Correlations": "Q-Sortの相関",
            "Loadings": "因子負荷量",
            "Factor Group": "因子グループ",
            "Flag": "フラグ",
            "Cumul Comm Matrix": "累積的共通性の行列",
            "Unrotated Factor Matrix": "非回転因子行列",
            "Standard Deviation": "標準偏差",
            "Mean": "平均",
            "The sort for respondent": "回答者のQ-sort",
            "is flagged for more than one factor": "のQ-sortは、一つの因子以上にフラグされた",
            "Q-sorts": "Q-sorts",
            "Flagged": "フラグ",
            "Sorts Weight": " Q-sort荷重",
            "Sorts Corr": " Q-Sort相関",
            "Diff": "差額 ",
            "Z-Score Variance": "zスコアの分散",
            "Standard Errors for Diffs": "差額の標準誤差",
            "Standard Errors for Differences in Factor Z-scores": "Standard Errors for Differences in Factor Z-scores",
            "Dist State": "区別するステートメント ",
            "All Listed Statements are Non-Significant at P > 0.01, and Those Flagged with an * are also Non-Significant at P > 0.05)": "以下のステートメントは、 P > 0.01 で有意性がありません。そして、米印が付いているステートメントは、 P > 0.05 で有意性がありません。",
            "Num": "Num",
            "Project Overview": "分析概要",
            "Analysis Completed on": "分析終了時間：",
            "Total Number of Statements": "ステートメントの数：",
            "Q-sort Triangle Shape": "Q-sort パターン: ",
            "Total Number of Q-sorts": "Q-sort の数",
            "Analysis Process": "分析のプロセス",
            "synFactorVizTitle": "合成Q−sort",
            "Synthetic Sort for": "合成Q−sort - ",
            "downloadImage": " - イメージをダウンロードする",
            "Download Scree Plot": "スクリープロットをダウンロードする",
            "Download Rotation Chart": "回転のプロットをダウンロードする",
            "Composite Q-Sort Display Options": "合成Q-sort表示オプション",
            "VIEW": "見る",
            "HIDE": "隠す",
            "panelText1": "デフォルト値は、薄いグレー色で入力ボックスに表示しています。",
            "panelText2": "新しい選択入力してから、「合成Q-sort表示を更新する」のボタンをクリックすると、合成Q-sort表示がリフレッシュされる。",
            "panelText3": "ダウンロードされたSVGイメージのファイルは、インターネットで低解像度のPNGイメージに変換できます。",
            "panelText4": "タダで、オープンソースのソフトウェア - 'Inkscape' - を使ったら、SVGイメージを高解像度のPNGイメージに変換できま。",
            "panelText5": "Firefoxには ストライプのパターンは表示するが、ダウンロードできません。もしストライプのパターンのイメージが必要なら、グーグルクロームを使ってください。",
            "General": "一般的の選択",
            "Include legend with image?": "凡例を加える？",
            "YES": "はい",
            "NO": "いいえ",
            "Prepend statement numbers?": "ステートメントの番号を先頭に追加します？",
            "Card Settings": "カードの設定",
            "Adjust card height?": "カードの高さを調整する？",
            "Adjust card width?": "カードの幅を調整する？",
            "Adjust font size?": "フォントの大きさを調整する？",
            "Adjust line spacing?": "行間隔を調整する？",
            "Trim statements to prevent overflow?": "オーバーフローを防ぐため、ステートメントをトリムする？",
            "(Asian languages only) Adjust width of statement rows?": "(アジアンの言語だけ) ステートメントの行の幅を調整する？",
            "Indicate distinguishing statements?": "区別するステートメントを示す？",
            "Change distinguishing statement indicator?": "-- 区別するステートメントのシンボルを変化する？",
            "Adjust distinguishing statement indicator font size?": "-- 区別するステートメントのシンボルの大きさを調整する？",
            "Display distinguishing statement comparison symbols?": "区別するステートメントの比較シンボルを示す？",
            "Raw Q-Sort Value Match Counts": "被告のQ-Sortとの比較",
            "Display matching count of raw Q-sort values?": "被告のQ-Sortと合成Q-sortのマッチング数を示す？",
            "Display matching count caution indicator?": "マッチング数の注意のシンボルを示す？",
            "Set caution indicator cutoff level": "-- マッチング数の注意色切除のレベルは小なりイコール",
            "Downloads": "ダウンロード",
            "Add custom name to image downloads?": "カスタムのファイル名をを加える？",
            "Name": "ファイル名",
            "Custom name position?": "カスタムのファイル名の場所？",
            "PREPEND": "先頭に追加する",
            "APPEND": "付け加える",
            "REPLACE": "置き換える",
            "UNICODE": "ユニコード",
            "ASCII": "アスキー",
            "Adjust statement width?": "ステートメントの幅を調整する？",
            "Distinguishing and Consensus Statements": "区別すると総意のステートメント",
            "Set consensus indicator type?": "-- 総意インジケータの種類を設定する？",
            "STRIPE": "ストライプ",
            "COLOR": "色",
            "Display consensus statements?": "総意のステートメントを表示する？",
            "Hex Codes": "16進コード",
            "Set custom color?": "カスタム色を設定する？",
            "Set caution indicator type?": "-- 注意インジケータの種類を設定する？",
            "Set overlap indicator type?": "総意ステートメントとマッチング注意を重なった場合？",
            "CROSSHATCH": "クロスハッチ",
            "Distinguishing statement at P < 0.05": "区別するステートメント - P < 0.05",
            "Distinguishing statement at P < 0.01": "区別するステートメント - P < 0.01",
            "z-Score for the statement is higher than in all of the other factors": "このステートメントのzスコアが、他の因子には高い",
            "z-Score for the statement is lower than in all of the other factors": "このステートメントのzスコアが、他の因子には低い",
            "Consensus statement (non-significant at P > 0.1)": "総意ステートメント (非有意　ー P > 0.1)",
            "Low number of raw Q-sort matching values (cutoff": "被告のQ-Sortのマッチング数が低い（カットオフ ",
            "Consensus statement with low number of matching values": "総意ステートメントとマッチング数が低い",
            "Legend": "凡例",
            "JSON File": "JSONファイル",
            "Upload 'Easy-HtmlQ' JSON file": "'Easy HTMLQ'のJSONファイルをアップロードする",
            "Firebase File": "FIREBASEファイル",
            "Select Respondent ID": "回答者IDを選択する",
            "DOWNLOAD DATA AS CSV FILE": "CSVファイルの形でデータをダウンロードする",
            "(Stage Data to enable export in PQMethod Format)": "(データ分析の確認をしてから、PQMethodの形でデータをダウンロードできる)",
            "Chart Options": "回転図表のオプション",
            "Factor Color A": "因子色A",
            "Factor Color B": "因子色B",
            "Remove circle highlighting": "回転図表の円のハイライト色を取り除く",
            "Remove Circles": "回転図表の円を取り除く",
            "Chart identifier": "回転図表のID",
            "Number": "番号",
            "Apply": "適用する",
            "Rotation Chart Options": "回転図表のオプション",
            "Free Dist": "自由の分布",
            "Rank": "順位",
            "Factor Scores with Corresponding Ranks": "因子zスコアと対応する順位",
            "Factor Score Ranks": "因子zスコア順位",
            "Statements Ranked at +": "ステートメントのQ-sort順位　＝ +",
            "Positive Statements Ranked Higher in ": "他の因子によりも、",
            "Array than in Other Factor Arrays": "に高い順位があるポジティブステートメント",
            "Array than in Other Factor ArraysB": "に低い順位があるスネガティブテートメント",
            "Negative Statements Ranked Lower in ": "他の因子によりも、",
            "Highest Ranked Statements": "一番高い順位のステートメント",
            "Lowest Ranked Statements": "一番低い順位のステートメント",
            " Rel. Ranks": "ステートメント比較順位",
            "Relative Ranking of Statements in ": "ステートメントの比較順位 ",
            "Clear Analysis Data": "分析データを削除する",
            "Symmetry Check Disabled": "対称の検査が無効",
            "Disable Audio Error Warning": "オーディオの警告を無効する",
            "AUDIO ERROR WARNING DISABLED": "オーディオの警告を無効された",
            "Close": "閉まる",
            "Select Factor to Invert": "反転する因子を選択する",
            "Warning": "警告",
            "has missing Q-sort values": "には欠落のQ-sortデータがある",
            "has an incorrect Q-sort value": "には間違っているQ-sortデータがある",
            "Non-Symmetric Q-sorts": "対称がないQ-sortがある",
            "has missing statement numbers": "には欠落のステートメント番号がある",
            "has an incorrect statement number": "には間違っているステートメント番号がある",
            "The number of statements in the statments sheet of the Excel file does not match the number of statements in the sorts sheet": "The number of statements in the statments sheet of the Excel file does not match the number of statements in the sorts sheet",
            "To convert paper results to Excel use Type 1 format": "To convert paper results to Excel use Type 1 format",
            "To import unforced (non-symmetric) sorts use Type 2 format": "To import unforced (non-symmetric) sorts use Type 2 format",
            "Raw Sort": "元のQ-Sort",
            "Free Distribution Data Results": "自由の分布のデータ",
            "Consensus": "総意 (C) /",
            "Distinguishing": "区別する (D)",
            "between Q-sorts": " between Q-sorts",
            "Cumulative Communalities Matrix": "Cumulative Communalities Matrix",
            "Factor Matrix with Defining Sorts Flagged": "Factor Matrix with Defining Sorts Flagged",
            "Click on the yellow button above for a tutorial on how to import Excel data.": "Click on the yellow button above for a tutorial on how to import Excel data.",
            "Export statements to pqmethod": "Export statements to pqmethod",
            "Download complete output in CSV format": "Download complete output in CSV format",
            "Sorts Correlations": "Sorts Correlations",
            "Factor Scores for ": "Factor Scores for ",
            "Descending Array of Differences Between": "Descending Array of Differences Between",
            "Factor Q-sort Values for Statements sorted by Consensus vs. Disagreement": "Factor Q-sort Values for Statements sorted by Consensus vs. Disagreement",
            "You seem to be using": "You are using  ",
            "Please update your browser before using Ken-Q Analysis": "You should update your browser before using Ken-Q Analysis",
            "This browser is not supported by Ken-Q Analysis <br> Please use one of the browsers listed above": "This browser is not supported by Ken-Q Analysis <br> Please use one of the browsers listed above",
            "Ready to begin analysis": "-- ready to begin analysis"
        }
    }
};

// JSlint declarations
/* global $, i18n, QAV, document */

(function () {
    i18n
        .init({
            "lng": 'en-us',
            "resStore": resources,
            "useDataAttrOptions": true,
            "fallbackLng": 'en-us'
        }, function () {
            $(document).i18n();
        });

    $('.languageSelect').on("change", function () {
        var lang = $(this).val();
        // change the UI language variable
        QAV.setState("language", lang);

        i18n.init({
            lng: lang
        }, function () {
            $(document).i18n();
        });
    });
})();