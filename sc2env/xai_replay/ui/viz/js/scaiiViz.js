
//
// SC2_TODO - do we need these?  If not, can ditch google lib.  If so, why did missing ones not cause problems
//
// goog.require('proto.ExplanationPoint');
// goog.require('proto.MultiMessage');
// goog.require('proto.ScaiiPacket');

/**
* Copyright (c) 2017-present, Oregon State University, Inc.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree. An additional grant
* of patent rights can be found in the PATENTS file in the same directory.
*/

var main2 = function(){
	activeSC2DataManager = getSC2DataManagerFromJson(getTestJson());
    activeSC2VideoManager = getSC2VideoManager(getVideoFilepath("test"));
	activeSC2UIManager = getSC2UIManager(activeSC2DataManager, activeSC2VideoManager);
	
	video = document.createElement("video");
	video.setAttribute("width", sc2GameRenderWidth + "px");
	video.setAttribute("height", sc2GameRenderHeight + "px");
	video.src = "./replays/test.mp4";
	$("#scaii-gameboard").append(video);
	
	video.addEventListener("timeupdate", function(){
		if (this.currentTime > 10.0){
			this.pause();
		}
	})
	
	initUI();
	video.load();	
	video.playbackRate = 0.125;
	video.play();
	//vidStep();
	//window.requestAnimationFrame(vidStep);
}
var main = function () {
    runTests();
	initUI();
	var debug = true;
	if (debug) {
		var connectButton = document.createElement("BUTTON");
		var connectText = document.createTextNode("Start");
		connectButton.setAttribute("class", "connectButton");
		connectButton.setAttribute("id", "connectButton");
		connectButton.appendChild(connectText);
		connectButton.onclick = function () {
			tryConnect('.', 0);
		};
		$("#playback-controls-panel").append(connectButton);
		$("#connectButton").css("font-size", "14px");
		$("#connectButton").css("padding-left", "20px");
		$("#connectButton").css("padding-right", "20px");
		$("#connectButton").css("width", "15%");
	} else {
		tryConnect('.', 0);
	}
}
function debug(position, message){
	//$("#debug" + position).html(message);
}
function getTestJson(){
	result = `
	[
		{
			"action": "Top_Left",
			"decision_point_number": 1,
			"frame_info_type": "decision_point",
			"game_loop": 16,
			"q_values": {
				"Bottom_Left": {
					"damageToHydralisk": 13.863428115844727,
					"damageToMarine": -10.08613395690918,
					"damageToRoach": -20.70306396484375,
					"damageToStalker": -58.8233528137207,
					"damageToZealot": -44.328609466552734,
					"damageToZergling": 0.973254919052124
				},
				"Bottom_Right": {
					"damageToHydralisk": 6.426095962524414,
					"damageToMarine": 15.717697143554688,
					"damageToRoach": 20.90287971496582,
					"damageToStalker": -131.32810974121094,
					"damageToZealot": 81.66240692138672,
					"damageToZergling": -20.25028419494629
				},
				"Top_Left": {
					"damageToHydralisk": 82.2960433959961,
					"damageToMarine": -64.12120819091797,
					"damageToRoach": -21.076534271240234,
					"damageToStalker": 6.829153060913086,
					"damageToZealot": 51.97297668457031,
					"damageToZergling": 84.44025421142578
				},
				"Top_Right": {
					"damageToHydralisk": 74.77254486083984,
					"damageToMarine": -115.07205200195312,
					"damageToRoach": 6.373652458190918,
					"damageToStalker": 32.45026779174805,
					"damageToZealot": 24.283700942993164,
					"damageToZergling": 44.9611930847168
				}
			},
			"reward": "NA",
			"units": [
				{
					"alliance": 1,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 125.0,
					"health_max": 125.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": true,
					"owner": 1,
					"radius": 0.5625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4314890245,
					"unit_type": 51,
					"x": 19.4375,
					"y": 18.875,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 45.0,
					"health_max": 45.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4303093763,
					"unit_type": 48,
					"x": 28.75,
					"y": 12.375,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 100.0,
					"health_max": 100.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.5,
					"shield": 50.0,
					"shield_max": 50.0,
					"tag": 4297588739,
					"unit_type": 73,
					"x": 28.5,
					"y": 27.0,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4315414531,
					"unit_type": 1923,
					"x": 3.583251953125,
					"y": 35.375,
					"z": 7.99609375
				},
				{
					"alliance": 1,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 125.0,
					"health_max": 125.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": true,
					"owner": 1,
					"radius": 0.5625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4309909507,
					"unit_type": 51,
					"x": 19.4375,
					"y": 21.125,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 45.0,
					"health_max": 45.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4300210179,
					"unit_type": 48,
					"x": 28.0,
					"y": 12.0,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 45.0,
					"health_max": 45.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4307025923,
					"unit_type": 48,
					"x": 12.0,
					"y": 11.6865234375,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 80.0,
					"health_max": 80.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.625,
					"shield": 80.0,
					"shield_max": 80.0,
					"tag": 4310171651,
					"unit_type": 74,
					"x": 28.0,
					"y": 11.0615234375,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4316200963,
					"unit_type": 1926,
					"x": 6.25,
					"y": 35.333251953125,
					"z": 7.99609375
				},
				{
					"alliance": 1,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 125.0,
					"health_max": 125.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": true,
					"owner": 1,
					"radius": 0.5625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4296278019,
					"unit_type": 51,
					"x": 21.125,
					"y": 20.5625,
					"z": 7.99609375
				},
				{
					"alliance": 1,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 125.0,
					"health_max": 125.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": true,
					"owner": 1,
					"radius": 0.5625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4301520899,
					"unit_type": 51,
					"x": 19.4375,
					"y": 20.0,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 145.0,
					"health_max": 145.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.5,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4308074499,
					"unit_type": 110,
					"x": 28.5,
					"y": 28.0,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 100.0,
					"health_max": 100.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.5,
					"shield": 50.0,
					"shield_max": 50.0,
					"tag": 4305977347,
					"unit_type": 73,
					"x": 27.5,
					"y": 28.0,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4316725251,
					"unit_type": 1928,
					"x": 8.04150390625,
					"y": 35.375,
					"z": 7.99609375
				},
				{
					"alliance": 1,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 125.0,
					"health_max": 125.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": true,
					"owner": 1,
					"radius": 0.5625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4310433795,
					"unit_type": 51,
					"x": 20.5625,
					"y": 19.4375,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 100.0,
					"health_max": 100.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.5,
					"shield": 50.0,
					"shield_max": 50.0,
					"tag": 4294967299,
					"unit_type": 73,
					"x": 11.5,
					"y": 28.0,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4315938819,
					"unit_type": 1925,
					"x": 5.333251953125,
					"y": 35.333251953125,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4315152387,
					"unit_type": 1922,
					"x": 2.658935546875,
					"y": 35.375,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 4.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4302569473,
					"unit_type": 1934,
					"x": 11.25,
					"y": 35.6875,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 145.0,
					"health_max": 145.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.5,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4303355907,
					"unit_type": 110,
					"x": 12.5,
					"y": 27.0,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4316463107,
					"unit_type": 1927,
					"x": 7.16650390625,
					"y": 35.375,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4317511683,
					"unit_type": 1931,
					"x": 8.833251953125,
					"y": 34.91650390625,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 45.0,
					"health_max": 45.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4300734467,
					"unit_type": 48,
					"x": 11.904296875,
					"y": 12.419677734375,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 3.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4302831617,
					"unit_type": 1935,
					"x": 12.125,
					"y": 35.6875,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4317249539,
					"unit_type": 1930,
					"x": 9.79150390625,
					"y": 35.6875,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4316987395,
					"unit_type": 1929,
					"x": 8.91650390625,
					"y": 35.6875,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4315676675,
					"unit_type": 1924,
					"x": 4.458251953125,
					"y": 35.375,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4317773827,
					"unit_type": 1932,
					"x": 9.708251953125,
					"y": 34.91650390625,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 35.0,
					"health_max": 35.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4307288067,
					"unit_type": 105,
					"x": 12.528076171875,
					"y": 12.1279296875,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4318035971,
					"unit_type": 1933,
					"x": 10.708251953125,
					"y": 34.91650390625,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 90.0,
					"health_max": 90.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4308336643,
					"unit_type": 107,
					"x": 13.25,
					"y": 28.0,
					"z": 7.99609375
				}
			]
		},
		{
			"frame_info_type": "clock_tick",
			"game_loop": 24,
			"units": [
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4315414531,
					"unit_type": 1923,
					"x": 3.583251953125,
					"y": 35.375,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 90.0,
					"health_max": 90.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4308336643,
					"unit_type": 107,
					"x": 13.25,
					"y": 28.0,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 145.0,
					"health_max": 145.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.5,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4308074499,
					"unit_type": 110,
					"x": 28.5,
					"y": 28.0,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 100.0,
					"health_max": 100.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.5,
					"shield": 50.0,
					"shield_max": 50.0,
					"tag": 4297588739,
					"unit_type": 73,
					"x": 28.5,
					"y": 27.0,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 35.0,
					"health_max": 35.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4307288067,
					"unit_type": 105,
					"x": 12.528076171875,
					"y": 12.1279296875,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 45.0,
					"health_max": 45.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4303093763,
					"unit_type": 48,
					"x": 28.75,
					"y": 12.375,
					"z": 7.99609375
				},
				{
					"alliance": 1,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 2.4059925079345703,
					"health": 125.0,
					"health_max": 125.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": true,
					"owner": 1,
					"radius": 0.5625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4310433795,
					"unit_type": 51,
					"x": 19.767578125,
					"y": 20.232421875,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4316725251,
					"unit_type": 1928,
					"x": 8.04150390625,
					"y": 35.375,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4317511683,
					"unit_type": 1931,
					"x": 8.833251953125,
					"y": 34.91650390625,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 100.0,
					"health_max": 100.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.5,
					"shield": 50.0,
					"shield_max": 50.0,
					"tag": 4294967299,
					"unit_type": 73,
					"x": 11.5,
					"y": 28.0,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 80.0,
					"health_max": 80.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.625,
					"shield": 80.0,
					"shield_max": 80.0,
					"tag": 4310171651,
					"unit_type": 74,
					"x": 28.0,
					"y": 11.0615234375,
					"z": 7.99609375
				},
				{
					"alliance": 1,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 2.4059925079345703,
					"health": 125.0,
					"health_max": 125.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": true,
					"owner": 1,
					"radius": 0.5625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4309909507,
					"unit_type": 51,
					"x": 18.642578125,
					"y": 21.919921875,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 100.0,
					"health_max": 100.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.5,
					"shield": 50.0,
					"shield_max": 50.0,
					"tag": 4305977347,
					"unit_type": 73,
					"x": 27.5,
					"y": 28.0,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4315938819,
					"unit_type": 1925,
					"x": 5.333251953125,
					"y": 35.333251953125,
					"z": 7.99609375
				},
				{
					"alliance": 1,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 2.4059925079345703,
					"health": 125.0,
					"health_max": 125.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": true,
					"owner": 1,
					"radius": 0.5625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4296278019,
					"unit_type": 51,
					"x": 20.330078125,
					"y": 21.357421875,
					"z": 7.99609375
				},
				{
					"alliance": 1,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 2.4059925079345703,
					"health": 125.0,
					"health_max": 125.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": true,
					"owner": 1,
					"radius": 0.5625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4301520899,
					"unit_type": 51,
					"x": 18.642578125,
					"y": 20.794921875,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 145.0,
					"health_max": 145.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.5,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4303355907,
					"unit_type": 110,
					"x": 12.5,
					"y": 27.0,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4315676675,
					"unit_type": 1924,
					"x": 4.458251953125,
					"y": 35.375,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 45.0,
					"health_max": 45.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4300210179,
					"unit_type": 48,
					"x": 28.0,
					"y": 12.0,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 45.0,
					"health_max": 45.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4300734467,
					"unit_type": 48,
					"x": 11.904296875,
					"y": 12.419677734375,
					"z": 7.99609375
				},
				{
					"alliance": 1,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 2.4059925079345703,
					"health": 125.0,
					"health_max": 125.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": true,
					"owner": 1,
					"radius": 0.5625,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4314890245,
					"unit_type": 51,
					"x": 18.642578125,
					"y": 19.669921875,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 3.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4302831617,
					"unit_type": 1935,
					"x": 12.125,
					"y": 35.6875,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4317249539,
					"unit_type": 1930,
					"x": 9.79150390625,
					"y": 35.6875,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4316987395,
					"unit_type": 1929,
					"x": 8.91650390625,
					"y": 35.6875,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4317773827,
					"unit_type": 1932,
					"x": 9.708251953125,
					"y": 34.91650390625,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4315152387,
					"unit_type": 1922,
					"x": 2.658935546875,
					"y": 35.375,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4316200963,
					"unit_type": 1926,
					"x": 6.25,
					"y": 35.333251953125,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4316463107,
					"unit_type": 1927,
					"x": 7.16650390625,
					"y": 35.375,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 2.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4318035971,
					"unit_type": 1933,
					"x": 10.708251953125,
					"y": 34.91650390625,
					"z": 7.99609375
				},
				{
					"alliance": 3,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 4.0,
					"health_max": 452607.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": false,
					"is_selected": false,
					"owner": 16,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4302569473,
					"unit_type": 1934,
					"x": 11.25,
					"y": 35.6875,
					"z": 7.99609375
				},
				{
					"alliance": 4,
					"build_progress": 1.0,
					"cloak": 3,
					"display_type": 1,
					"energy": 0.0,
					"energy_max": 0.0,
					"facing": 4.71238899230957,
					"health": 45.0,
					"health_max": 45.0,
					"is_blip": false,
					"is_burrowed": false,
					"is_flying": false,
					"is_on_screen": true,
					"is_selected": false,
					"owner": 2,
					"radius": 0.375,
					"shield": 0.0,
					"shield_max": 0.0,
					"tag": 4307025923,
					"unit_type": 48,
					"x": 12.0,
					"y": 11.6865234375,
					"z": 7.99609375
				}
			]
		}
	]
	`
	return result;
}
main();
