var activeSC2DataManager = undefined;
function getSC2DataManager(sc2ReplaySessionConfig) {
    var frameInfos = extractFrameInfosFromReplaySessionConfig(sc2ReplaySessionConfig);
    return getSC2DataManagerFromFrameInfos(frameInfos);
}

function getSC2DataManagerFromJson(jsonData){
    var frameInfos =getFrameInfosFromJson(jsonData);
    return getSC2DataManagerFromFrameInfos(frameInfos);
}
function getSC2DataManagerFromFrameInfos(frameInfos) {
    var dm = {};
    dm.frameInfos = frameInfos;
    
    dm.malFormedMessage = validateFrameInfos(dm.frameInfos);
    dm.stepCount = frameInfos.length;
    console.log("step count found to be "+ dm.stepCount);

    dm.getMalformedMessage = function() { //SC2_TEST
        return this.malFormedMessage;
    }
    
    dm.getStepCount = function() { //SC2_TEST
        return this.frameInfos.length;
    }

    dm.validateStep = function(step){//SC2_TEST
        if (step > this.stepCount - 1){
            return this.stepCount - 1;
        }
        else {
            return step;
        }
    }
    // find the indices of all the decision_point frames
    dm.getExplanationStepsList = function() { //SC2_TEST
        var stepsWithExplanations = [];
        var index = 0
        for (i in this.frameInfos){
            var frameInfo = this.frameInfos[i];
            if (frameInfo["frame_info_type"] == "decision_point"){
                stepsWithExplanations.push(index);
            }
            index += 1;
        }
        return stepsWithExplanations;
    }

    dm.getExplanationTitlesList = function(){//SC2_TEST
        var actionNames = [];
        for (i in this.frameInfos){
            var frameInfo = this.frameInfos[i];
            if (frameInfo["frame_info_type"] + "decision_point"){
                actionnames.push(frameInfo["action"]);
            }
        }
        return actionnames;
    }

    dm.getCumulativeRewards = function() {//SC2_DEFERRED
        alert('sc2DataManager.getCumulativeRewards unimplemented')
    }
    dm.getClosestUnitInRange = function(mouseCanvasX, mouseCanvasY) {//SC2_TEST
        var gameMousePixelX = convertCanvasXToGamePixelX(mouseCanvasX, sc2GameWidth);
        var gameMousePixelY = convertCanvasYToGamePixelY(mouseCanvasY, sc2GameHeight);
        var minDistance = 30;
        var minDistanceUnit = undefined;
        var frame_info = this.frameInfos[sessionIndexManager.getCurrentIndex()];
        var units = frame_info["units"];
        for (i in units){
            var unit = units[i];
            var gameUnitX = Number(unit["x"]);
            var gameUnitY = Number(unit["y"]);
            var gameUnitPixelX = convertGameXToGamePixelX(gameUnitX);
            var gameUnitPixelY = convertGameYToGamePixelY(gameUnitY);
            var dx = gameMousePixelX - gameUnitPixelX;
            var dy = gameMousePixelY - gameUnitPixelY;
            var distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < minDistance){
                minDistance = distance;
                minDistanceUnit = unit;
            }
        }
        return minDistanceUnit;
    }

    dm.getFrameInfo = function(step){//SC2_TEST
        if (step < this.stepCount){
            return this.frameInfos[step];
        }
        else {
            return undefined;
        }
    }

    dm.getUnitInfos = function(step){ //SC2_TEST
        if (step < 0){
            throw('sc2DataManager - step cannot be below zero ' + step);
        }
        if (step >= this.frameInfos.length){
            throw('sc2DataManager - step is out of range ' + step + "...max step is " + this.frameInfos.length - 1); 
        }
        var frameInfo = this.frameInfos[step]
        return frameInfo.units;
    }
    return dm;
}

function getFrameInfosFromJson(jsonData) {
    var result = JSON.parse(jsonData);
    return result;
}

function extractFrameInfosFromReplaySessionConfig(sc2ReplaySessionConfig) {
    var jsonData = sc2ReplaySessionConfig.getJsonData();
    return getFrameInfosFromJson(jsonData);
}

function validateFrameInfos(frameInfos){//SC2_TODO_DEFER implement this 
    return undefined;
}

function convertSC2QValuesToJSChart(frameInfo){
    var chart = {};
    chart.title = "CHART TITLE";
    chart.v_title = "VERTICAL AXIS"
    chart.h_title = "HORIZONTAL AXIS";
    chart.actions = [];
    var qValues = frameInfo["q_values"];
    var actionAttackQ1 = collectActionInfo("Attack Q1", qValues["Top_Right"]);
    var actionAttackQ2 = collectActionInfo("Attack Q2", qValues["Top_Left"]);
    var actionAttackQ3 = collectActionInfo("Attack Q3", qValues["Bottom_Left"]);
    var actionAttackQ4 = collectActionInfo("Attack Q4", qValues["Bottom_Right"]);
    chart.actions.push(actionAttackQ1);
    chart.actions.push(actionAttackQ2);
    chart.actions.push(actionAttackQ3);
    chart.actions.push(actionAttackQ4);
    return chart;
}

function averageValuesInDictionary(actionValues){//SC2_TEST
    var values = Object.values(actionValues);
    var valuesCount = values.length;
    var total = 0;
    for (i in values){
        var value = values[i];
        total += Number(value);
    }
    var average = total / valuesCount;
    return average;
}

function collectActionInfo(actionName, actionValues){
    var action = {};
    action.name = actionName;
    action.bars = [];
    action.saliencyId = undefined; //SC2_SALIENCY
    action.value = averageValuesInDictionary(actionValues);
    var keys = Object.keys(actionValues);
    for (i in keys){
        var rewardName = keys[i];
        var bar = collectBarInfo(rewardName, actionValues[rewardName]);
        action.bars.push(bar);
    }
    return action;
}

function collectBarInfo(barName, barValue){
    var bar = {};
    bar.name = barName;
    bar.saliencyId = undefined; //SC2_SALIENCY
    bar.value = barValue;
    return bar;
}