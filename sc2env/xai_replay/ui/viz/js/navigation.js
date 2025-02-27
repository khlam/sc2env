var userInputBlocked = false;
var liveModeInputBlocked = false;

function paintProgress(value) {
	showPositionOnTimeline(value);
	renderExplanationSelectors();
}

var cursorHeight = 60;
var cursorWidth = 4;
function showPositionOnTimeline(value) {
	drawExplanationTimeline();
	var widthOfTimeline = expl_ctrl_canvas.width - 2 * timelineMargin;
	var x = timelineMargin + (value / 100) * widthOfTimeline;
	var y = explanationControlYPosition;

	var xLeft = x - cursorWidth / 2;
	var xRight = x + cursorWidth / 2;
	var yBottom = y + cursorHeight / 2;
	var yTop = y - cursorHeight / 2;
	var ctx = expl_ctrl_ctx;
	ctx.beginPath();

	ctx.fillStyle = 'darkgrey';
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'darkgray';
	var upperLeftVertexX = xLeft;
	var upperLeftVertexY = yTop;
	var upperRightVertexX = xRight;
	var upperRightVertexY = yTop;
	var lowerLeftVertexX = xLeft;
	var lowerLeftVertexY = yBottom;
	var lowerRightVertexX = xRight;
	var lowerRightVertexY = yBottom;

	ctx.moveTo(upperLeftVertexX, upperLeftVertexY);
	ctx.lineTo(upperRightVertexX, upperRightVertexY);
	ctx.lineTo(lowerRightVertexX, lowerRightVertexY);
	ctx.lineTo(lowerLeftVertexX, lowerLeftVertexY);
	ctx.lineTo(upperLeftVertexX, upperLeftVertexY);
	ctx.closePath();
	ctx.fill();
}

function processTimelineClick(e) {
	var clickX = e.offsetX - timelineMargin;
	var replaySequenceTargetStep = sessionIndexManager.getReplaySequencerIndexForClick(clickX);
	var targetStepString = "" + replaySequenceTargetStep;
	//SC2_DEFERRED var logLine = templateMap["expl-control-canvas"];
	//SC2_DEFERRED logLine = logLine.replace("<TIME_LINE_NUM>", targetStepString);
	//SC2_DEFERRED targetClickHandler(e, logLine);
    jumpToStep(targetStepString);
}
function stageUserCommand(userCommand) {
	var scaiiPkt = new proto.ScaiiPacket;
	scaiiPkt.setUserCommand(userCommand);
	userCommandScaiiPackets.push(scaiiPkt);
}
var tryPause = function (e) {
	if (!userInputBlocked) {
		//SC2_DEFERRED var logLine = templateMap["pauseButton"];
		//SC2_DEFERRED logLine = logLine.replace("<TIME_LINE_PAUSE>", "NA");
		//SC2_DEFERRED targetClickHandler(e, logLine);
		pauseGame();
	}
}
function pauseGame() {
	controlsManager.userClickedPause();
	activeSC2UIManager.pause();
	//SC2_TODO_NAV_TEST new logic that disengages the loop driver
}

var tryResume = function (e) {
	if (!userInputBlocked) {
		//SC2_DEFERRED var logLine = templateMap["playButton"];
		//SC2_DEFERRED logLine = logLine.replace("<TIME_LINE_PLAY>", "NA");
		//SC2_DEFERRED targetClickHandler(e, logLine);
		resumeGame();
	}
}

function resumeGame() {
	controlsManager.userClickedResume();
	activeSC2UIManager.play();
	//SC2_TODO_NAV_TEST - new logic that re-engages the driver loop
	// if play button cue arrow present, remove it
	$("#cue-arrow-div").remove();
	if (userStudyMode){
		if (activeStudyQuestionManager.allQuestionsAtDecisionPointAnswered) {
			$('#q-and-a-div').empty();
		}
	}
}

var tryRewind = function (e) {
	if (!userInputBlocked) {
		//SC2_DEFERRED var logLine = templateMap["rewindButton"];
		//SC2_DEFERRED logLine = logLine.replace("<TIME_LINE_RWND>", "NA");
		//SC2_DEFERRED targetClickHandler(e, logLine);
		rewindGame();
	}
}
function rewindGame() {
	pauseGame();
    controlsManager.userClickedRewind();
	jumpToStep(0);
}
var configureControlsManager = function (pauseResumeButton, rewindButton) {
	var manager = {};
	manager.registeredItems = [];
	manager.pendingAction = undefined;
	manager.pauseResumeButton = pauseResumeButton;
	manager.rewindButton = rewindButton;

	manager.registerJQueryHandleForWaitCursor = function (item) {
		manager.registeredItems.push(item)
	}
	manager.setControlsNotReady = function () {
		userInputBlocked = true;
	}

	manager.gameStarted = function () {
		userInputBlocked = false;
		this.enableAllControls();
	}

	manager.startLoadReplayFile = function () {
		userInputBlocked = true;
		this.expressResumeButton();
		this.disablePauseResume();
		this.disableRewind();
		this.setWaitCursor();
	}

	manager.doneLoadReplayFile = function () {
		userInputBlocked = false;
		this.expressResumeButton();
		this.enablePauseResume();
		this.enableRewind();
		this.clearWaitCursor();
	}

	manager.gameSteppingForward = function () {
		this.enableRewind();
	}

	manager.reachedEndOfGame = function () {
		this.expressResumeButton();
		this.disablePauseResume();
	}

	manager.setWaitCursor = function () {
		for (var i in this.registeredItems) {
			var item = this.registeredItems[i];
			item.css("cursor", "wait");
		}
	}

	manager.clearWaitCursor = function () {
		for (var i in this.registeredItems) {
			var item = this.registeredItems[i];
			item.css("cursor", "default");
		}
	}
	//
	//  pause
	//
	manager.userClickedPause = function () {
		// backend not involved so no need to block
		//userInputBlocked = true;
		//this.pendingAction = this.expressResumeButton;
		this.expressResumeButton();
	}

	manager.expressResumeButton = function () {
		//console.log('expressing RESUME button');
		this.pauseResumeButton.onclick = tryResume;
		this.pauseResumeButton.innerHTML = '<img src="imgs/play.png", height="16px" width="14px"/>';
	}

	//
	//  resume
	//

	manager.userClickedResume = function () {
		// backend not involved so no need to block
		//userInputBlocked = true;
		//this.pendingAction = this.expressPauseButton;
		this.expressPauseButton();
	}

	manager.expressPauseButton = function () {
		//console.log('expressing PAUSE button');
		console.log('video.currentTime: ' + video.currentTime);
		this.pauseResumeButton.onclick = tryPause;
		this.pauseResumeButton.innerHTML = '<img src="imgs/pause.png", height="16px" width="14px"/>';
	}

    manager.isPauseButtonDisplayed = function() {
        if (this.pauseResumeButton.onclick == tryPause) {
            return true;
        }
        return false;
    }
	//
	// rewind
	//
	manager.userClickedRewind = function () {
		// backend not involved so no need to block
        //userInputBlocked = true;
		//this.pendingAction = this.adjustToRewindClick;
		this.adjustToRewindClick();
	}

	manager.adjustToRewindClick = function () {
		// since we sent pause command as first part of rewind, we need to show the play button 
		this.expressResumeButton();
		this.disableRewind();
		this.enablePauseResume();
		//console.log('enabled pauseResume after adjustToRewindClick');
	}

	//
	//  enabling/disabling
	//
	manager.disablePauseResume = function () {
		//console.log("disablin' pauseResume");
		$("#pauseResumeButton").css("opacity", "0.6");
		this.pauseResumeButton.disabled = true;
	}

	manager.enablePauseResume = function () {
		//console.log("enablin' pauseResume");
		$("#pauseResumeButton").css("opacity", "1.0");
		this.pauseResumeButton.disabled = false;
	}

	manager.disableRewind = function () {
		//console.log("disablin' rewind");
		$("#rewindButton").css("opacity", "0.6");
		this.rewindButton.disabled = true;
	}

	manager.enableRewind = function () {
		//console.log("enablin' rewind");
		$("#rewindButton").css("opacity", "1.0");
		this.rewindButton.disabled = false;
	}

	manager.enableAllControls = function () {
		this.enableRewind();
		this.enablePauseResume();
	}

	//
	//  do any pending action
	//
	manager.userCommandSent = function () {
		//this.restorePriorStates();
		if (this.pendingAction != undefined) {
            this.pendingAction();
            this.pendingAction = undefined;
		}
		userInputBlocked = false;
	}

	return manager;
}

function isUserInputBlocked() {
	return userInputBlocked || liveModeInputBlocked;
}
function updateButtonsAfterJump() {
	if (sessionIndexManager.isAtGameStart()) {
		controlsManager.expressResumeButton();
		controlsManager.enablePauseResume();
		controlsManager.disableRewind();
	}
	else if (sessionIndexManager.isAtTimelineStepOne()) {
		controlsManager.expressResumeButton();
		controlsManager.enablePauseResume();
		controlsManager.enableRewind();
	}
	else if (sessionIndexManager.isAtEndOfGame()) {
		controlsManager.expressResumeButton();
		controlsManager.disablePauseResume();
		controlsManager.enableRewind();
	}
	else {
		controlsManager.expressResumeButton();
		controlsManager.enablePauseResume();
		controlsManager.enableRewind();
	}
}

function jumpToStep(step){
    clearGameBoard();
	activeSC2UIManager.jumpToFrame(step);
    if (userStudyMode){
        currentExplManager.setExplanationVisibility(activeStudyQuestionManager.squim.decisionPointSteps, step);
	}
}