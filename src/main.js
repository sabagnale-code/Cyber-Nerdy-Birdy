import Preload from "./scenes/Preload.js";
import TitleScene from "./scenes/TitleScene.js";
import LoginScene from "./scenes/LoginScene.js";
import JourneyMapScene from "./scenes/JourneyMapScene.js";
import Level1 from "./scenes/Level1.js";
import LeaderboardScene from "./scenes/LeaderboardScene.js";
import BadgesScene from "./scenes/BadgesScene.js";
import HudScene from "./scenes/HudScene.js";
import HudExtras from "./scenes/HudExtras.js";

import Level from "./scenes/Level.js";
import Scene_Level_1_a from "./scenes/Scene_Level_1_a.js";

import Scene_Level_2_a from "./scenes/Scene_Level_2_a.js";
import feedback_correct from "./scenes/FeedbackScene.js";
import feedback_incorrect from "./scenes/feedback_incorrect.js";


class Boot extends Phaser.Scene {

	preload() {
		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	create() {
		this.scene.start("Preload");
	}
}

window.addEventListener("load", function () {

	const game = new Phaser.Game({
		width: 1536,
		height: 1024,
		type: Phaser.AUTO,
		backgroundColor: "#000b28",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.scene.add("Boot", Boot, true);
	game.scene.add("Preload", Preload);
	game.scene.add("LoginScene", LoginScene);
	game.scene.add("TitleScene", TitleScene);
	game.scene.add("Level1", Level1);
	game.scene.add("Level", Level);
	game.scene.add("JourneyMapScene", JourneyMapScene);
	game.scene.add("HudScene", HudScene);
	game.scene.add("Scene_Level_1_a", Scene_Level_1_a);
	game.scene.add("Scene_Level_2_a", Scene_Level_2_a);
	game.scene.add("feedback_correct", feedback_correct);
	game.scene.add("feedback_incorrect", feedback_incorrect);
	game.scene.add("LeaderboardScene", LeaderboardScene);
	game.scene.add("BadgesScene", BadgesScene);
	game.scene.add("HudExtras", HudExtras, true);

});
